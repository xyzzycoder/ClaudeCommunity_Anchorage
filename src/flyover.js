/* EXPERIMENT — not part of the app. Hover a card, get a note about the handwriting.
 *
 * Two rules held the whole time this was written:
 *
 *   1. Graphology is not a real science. It cannot tell you anything about a
 *      person's character, and this file does not pretend otherwise. The panel
 *      says so out loud.
 *   2. These are strangers who wrote something honest on a card. Every note here
 *      is about the *marks on the page* — pressure, slant, corrections, how the
 *      writer handled running out of room — and any leap beyond that is
 *      obviously, visibly a joke at nobody's expense.
 *
 * If a note here would make its writer wince if they read it over your shoulder
 * at the demo table, it does not belong in this file. Several drafts got cut on
 * exactly that test.
 */

const HANDWRITING = {
  /* --- kids & school --- */
  "kids-9-12-15":
    "Confident block capitals — then two edits mid-thought, HAS becoming WILL HAVE, OF becoming IN. Someone revising their own tense in real time about their own kids.",
  "schools-overwhelmed":
    "Fast looping cursive with five words struck through and every one still perfectly readable. Crossings-out that don't actually hide anything.",
  "grandchildren":
    "Small, even, and headed \"Front + Back\" before a word was written. Planned for running out of room and told you about it in advance.",
  "brains-facts":
    "Round upright print with question marks drawn a little larger than the letters. The questions get the emphasis, which seems right.",

  /* --- reliance vs. thinking --- */
  "attention-span":
    "Light pressure, small letters, and the lines drift gently upward toward the right margin. Written by someone thinking rather than declaring.",
  "knowledge-stunted":
    "Neat print that shrinks steadily toward the end of each line. The letters give up space before the sentence does.",
  "llm-addiction":
    "Compact, tight margins, six lines with almost nothing wasted. Four questions stacked in the footprint most people use for one.",
  "resist-us":
    "Unhurried cursive — and then \"making\" underlined, the only mark of force on the whole card.",
  "lost-without-ai":
    "One line, wide airy spacing, three-quarters of the card left blank. Asked the question and declined to elaborate.",
  "not-challenged":
    "The longest text on the wall, in small even cursive that never once speeds up. Nine lines and the last is as controlled as the first.",

  /* --- when it's wrong --- */
  "equitable-tool":
    "Enormous deliberate print, three short lines, one question. Written at a size that assumes it'll be read from across the room.",
  "how-they-work":
    "Hurried, small, crowded into the top-left corner — and ends with a full stop where a question mark was clearly heading.",
  "safeguards":
    "Flowing hand with Hope and Fear both underlined, given exactly equal billing. A card that refuses to pick one.",
  "novel-ideas":
    "A word scribbled out, and \"ensure that we can\" wedged in above the line with a caret. Rewritten mid-sentence and repaired in place.",
  "fear-limits-access":
    "Slanted quick cursive with \"strongest\" underlined. The whole question turns on that one word and the pen knew it.",
  "studying-effects":
    "Tiny tidy print, three labelled sections, generous gaps between them. Hope, fear and question filed as separate items with room to breathe.",
  "cat-out-of-bag":
    "Three labelled thoughts spaced far apart down a card with plenty left over. Unhurried, for a card about runaway problems.",
  "discover-the-source":
    "Even rounded print, wide margins, not a single correction. Wrote it once and meant it.",
  "genie-back-in-bottle":
    "Tall confident cursive on a card turned portrait — the only one on the wall that way. Four lines, enormous margins, no hesitation.",

  /* --- work & the ladder --- */
  "new-grads":
    "Quick forward-slanting cursive that gets faster down the card. The last line outruns the first.",
  "junior-to-senior":
    "Even, patient cursive that pauses to open a parenthesis for \"mistakes, and the freedom to make them\" — the aside the whole card is really about.",
  "mailroom-to-ceo":
    "Big bold print, and \"Mailroom to CEO\" squeezed in at the top afterwards. The title arrived after the fear did.",
  "instructional-designer":
    "Small and tidy, with one strikethrough turning \"learn\" into \"learning\". A designer correcting their own copy on an index card.",
  "ip-with-ai":
    "Large print for the question, then a smaller, faster hand for the joke in brackets. Two voices, same pen.",

  /* --- power & sovereignty --- */
  "individual-agency":
    "Mixed capitals with three separate phrases underlined. Someone marking up their own sentence as they build it.",
  "tribal-nations":
    "Round, even, unhurried — five lines that hold the same pace from \"When it comes\" to \"is priority\".",
  "community-ai":
    "Forward-leaning print, four dense lines across the top, the rest left empty. Said it and stopped.",
  "first-mover":
    "The smallest hand on the wall, eight lines where others fit four, with two false starts struck out. Most words per square inch of anyone here.",
  "large-scale-issues":
    "Open rounded hand with \"way\" inserted above the line at the last second. Homelessness, education and food insecurity, all in one breath.",
  "indigenous-art":
    "Careful cursive, two dash bullets, no crossings-out. Written like something already thought through before the pen moved.",
  "regulatory-capture":
    "A sprawling loose hand with the title twice the size of the body — and it runs onto a second card. Ran out of room and kept going.",

  /* --- environment & cost --- */
  "data-centers":
    "Round print with the specifics indented underneath: water, electricity rates, land use, subsistence. A list that knew it was a list.",
  "future-generations":
    "Round print, three dash bullets, one word each. Environment. Safety. Humanity. No elaboration offered.",
  "cost-per-query":
    "The only card in pencil — light grey, three underlined labels, and the last line cramps hard as the space runs out.",
  "arctic-extraction":
    "Flowing steady cursive that doesn't rush the word \"extraction\". Four lines, no corrections.",
  "infrastructure-usage":
    "Firm block capitals with one word struck through hard enough to be a decision rather than a slip.",
  "use-wisely":
    "Large loose cursive sloping downhill across six lines, finishing with \"exponentially\" — the only long word, given the most room.",
  "ai-waste-greenhouses":
    "Print that tilts down toward the right and runs almost off the edge on \"remote regions of Alaska\". Enthusiasm outpacing the margin.",
  "predict-the-damage":
    "Big spacious print, then the second thought — \"And how we can fix it?\" — indented underneath like an afterthought that wouldn't be left out.",
};

/* ---------- flyover ---------- */

const panel = document.createElement("aside");
panel.className = "flyover";
panel.hidden = true;
panel.innerHTML = `
  <p class="fly-eyebrow">✳ a note on the handwriting</p>
  <p class="fly-body"></p>
  <p class="fly-disclaimer">
    For fun. Handwriting analysis tells you nothing real about a person — these
    are just observations about marks on paper, written with affection.
  </p>`;
document.body.appendChild(panel);

const body = panel.querySelector(".fly-body");
let pinned = null;
let enabled = true;

/* ---------- toggle ---------- */

/* Built here rather than in flyover.html so the whole experiment stays in the
   two files you can delete. Deliberately not persisted — the app stores nothing
   about a visitor, and an experiment is not a reason to start. */
const toggle = document.createElement("button");
toggle.className = "voice fly-toggle";
toggle.setAttribute("aria-pressed", "true");
toggle.title = "Show a note on the handwriting when you hover a card";
toggle.innerHTML = `<span class="ico" aria-hidden="true">✳</span><span class="lbl">Handwriting on</span>`;
document.querySelector(".site .wrap").appendChild(toggle);

toggle.addEventListener("click", () => {
  enabled = !enabled;
  toggle.setAttribute("aria-pressed", String(enabled));
  toggle.querySelector(".lbl").textContent = enabled ? "Handwriting on" : "Handwriting off";
  if (!enabled) {
    panel.hidden = true;
    pinned = null;
  }
});

function place(e) {
  const pad = 16;
  const w = panel.offsetWidth;
  const h = panel.offsetHeight;
  let x = e.clientX + 20;
  let y = e.clientY + 20;
  if (x + w + pad > window.innerWidth) x = e.clientX - w - 20;
  if (y + h + pad > window.innerHeight) y = e.clientY - h - 20;
  panel.style.left = `${Math.max(pad, x)}px`;
  panel.style.top = `${Math.max(pad, y)}px`;
}

function noteFor(el) {
  const img = el.querySelector("img");
  if (!img) return null;
  const id = img.getAttribute("src").split("/").pop().replace(/\.jpg.*$/, "");
  return HANDWRITING[id] || null;
}

document.addEventListener("mouseover", (e) => {
  if (!enabled) return;
  const card = e.target.closest("#wall .card");
  if (!card || card === pinned) return;
  const note = noteFor(card);
  if (!note) return;
  pinned = card;
  body.textContent = note;
  panel.hidden = false;
  place(e);
});

document.addEventListener("mousemove", (e) => {
  if (!panel.hidden && pinned && pinned.contains(e.target)) place(e);
});

document.addEventListener("mouseout", (e) => {
  if (!pinned) return;
  if (e.relatedTarget && pinned.contains(e.relatedTarget)) return;
  panel.hidden = true;
  pinned = null;
});

/* keyboard parity — the wall is all buttons, so focus works the same way */
document.addEventListener("focusin", (e) => {
  if (!enabled) return;
  const card = e.target.closest("#wall .card");
  if (!card) return (panel.hidden = true);
  const note = noteFor(card);
  if (!note) return;
  body.textContent = note;
  panel.hidden = false;
  const r = card.getBoundingClientRect();
  place({ clientX: r.right - 40, clientY: r.top + 40 });
});

const missing = [...document.querySelectorAll("#wall .card")].filter((c) => !noteFor(c));
if (missing.length) console.warn(`flyover: ${missing.length} card(s) without a note`);
console.info(`flyover: ${Object.keys(HANDWRITING).length} handwriting notes loaded`);
