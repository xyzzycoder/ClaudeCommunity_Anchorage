/* The Wall — interaction.
 *
 * Guardrails live in this file's structure, not in a prompt:
 *   - the only inputs are card selection and three button taps
 *   - exactly three questions, then the flow ends
 *   - output always renders the same three sections
 *   - nothing is stored, logged, or sent anywhere
 * See memory/03-build/architecture.md.
 */

const $ = (s) => document.querySelector(s);

const views = { board: $("#board"), interview: $("#interview"), result: $("#result") };
const show = (name) => {
  for (const [k, el] of Object.entries(views)) el.hidden = k !== name;
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
};

/* ---------- voice out (local, no network) ---------- */

const speech = {
  on: false,
  ok: "speechSynthesis" in window,
  say(text) {
    if (!this.on || !this.ok) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.98;
    u.pitch = 1.05;
    speechSynthesis.speak(u);
  },
  stop() {
    if (this.ok) speechSynthesis.cancel();
  },
};

const voiceBtn = $("#voice");
if (!speech.ok) voiceBtn.hidden = true;
voiceBtn.addEventListener("click", () => {
  speech.on = !speech.on;
  voiceBtn.setAttribute("aria-pressed", String(speech.on));
  voiceBtn.querySelector(".lbl").textContent = speech.on ? "Voice on" : "Voice off";
  if (speech.on) speech.say("Voice is on. I'll read the questions out loud.");
  else speech.stop();
});

/* ---------- the board ---------- */

// The six cards Megan collected from other teams during the build.
const EVENT_DAY = "Aug 4";

let filter = "all";

function renderFilters() {
  const nav = $(".filters");
  nav.innerHTML = "";
  const all = [["all", "All questions"], ...Object.entries(TOPICS).map(([k, t]) => [k, t.label])];
  for (const [key, label] of all) {
    const b = document.createElement("button");
    b.className = "chip" + (key === filter ? " on" : "");
    b.dataset.topic = key;
    b.textContent = label;
    b.addEventListener("click", () => {
      filter = key;
      renderFilters();
      renderWall();
    });
    nav.appendChild(b);
  }
}

function renderWall() {
  const wall = $("#wall");
  wall.innerHTML = "";
  for (const card of CARDS) {
    if (filter !== "all" && card.topic !== filter) continue;
    const b = document.createElement("button");
    b.className = "card";
    // Many writers labelled their card "Hope", "Fear" or "Question" themselves.
    // That framing is theirs, so it's shown rather than flattened into "a card".
    b.innerHTML = `
      <img src="cards/${card.id}.jpg" alt="Handwritten index card: ${esc(card.excerpt)}">
      <span class="tag">
        ${(card.kinds || [card.kind])
          .map((k) => `<em class="kind kind-${esc(k)}">${esc(k)}</em>`)
          .join("")}
        ${esc(TOPICS[card.topic].label)}
      </span>
      <p class="ex">${esc(card.excerpt)}</p>
      ${card.date === "2026-08-04"
        ? `<p class="gathered">✳ brought back by Megan, ${esc(EVENT_DAY)}</p>`
        : ""}`;
    b.addEventListener("click", () => startInterview(card));
    wall.appendChild(b);
  }
}

/* ---------- the interview ---------- */

let current = null; // { card, answers: [] }

function startInterview(card) {
  current = { card, answers: [] };
  $("#ivCard").src = `cards/${card.id}.jpg`;
  $("#ivCard").alt = `Handwritten index card: ${card.excerpt}`;
  $("#ivText").textContent = card.full;
  show("interview");
  askNext();
}

function askNext() {
  const { card, answers } = current;
  const topic = TOPICS[card.topic];

  if (answers.length === 3) return renderResult();

  const q = topic.questions[answers.length];
  $("#qStep").textContent = String(answers.length + 1);
  $("#qAsk").textContent = q.ask;

  const box = $("#qOpts");
  box.innerHTML = "";
  for (const opt of q.options) {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = opt.label;
    b.addEventListener("click", () => {
      answers.push(opt.id);
      askNext();
    });
    box.appendChild(b);
  }
  speech.say(q.ask);
}

/* ---------- the result ---------- */

function renderResult() {
  const { card, answers } = current;
  const topic = TOPICS[card.topic];

  $("#rsCard").src = `cards/${card.id}.jpg`;
  $("#rsCard").alt = `Handwritten index card: ${card.excerpt}`;

  fill($("#rsTrade"), card.tradeoffs);
  fill($("#rsAsk"), answers.map((a) => topic.prompts[a]));
  $("#rsWrong").textContent = card.wrong;

  show("result");
  speech.say("Here's what I'd weigh, and three questions to take with you.");
}

function fill(list, items) {
  list.innerHTML = "";
  for (const text of items) {
    const li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);
  }
}

/* ---------- navigation ---------- */

for (const b of document.querySelectorAll("[data-back]")) {
  b.addEventListener("click", () => {
    speech.stop();
    current = null;
    show("board");
  });
}

$("#redo").addEventListener("click", () => {
  if (!current) return show("board");
  current.answers = [];
  show("interview");
  askNext();
});

$("#showAbout").addEventListener("click", (e) => {
  e.preventDefault();
  $("#about").showModal();
});

/* ---------- utils ---------- */

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

renderFilters();
renderWall();
