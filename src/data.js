/* Content for the card wall.
 *
 * Plain JS, not JSON, on purpose: the page must open from file:// with no server,
 * and fetch() of a local JSON file is blocked by CORS. This is a demo-safety
 * decision, not a style one. See memory/03-build/architecture.md.
 *
 * Card text is transcribed from the July 21, 2026 Anchorage session. Source of
 * truth for the transcriptions is inbox/OCR/; card images are split from the
 * flatbed scans by scripts/split_cards.py. (?) marks an uncertain read of the
 * handwriting; the writer's own spelling is kept. No card writer is named.
 *
 * Structure:
 *   TOPICS[key].questions  three interview questions, three options each
 *   TOPICS[key].prompts    answer id -> the question that answer earns you
 *   CARDS[]                one entry per card: excerpt, full text, tradeoffs, wrong
 */

const TOPICS = {
  kids: {
    label: "Kids & school",
    blurb: "What to say, and when to say nothing yet.",
    questions: [
      {
        ask: "Who are you thinking about right now?",
        options: [
          { id: "young", label: "A kid under about 10" },
          { id: "teen", label: "A teenager" },
          { id: "other", label: "Someone else's kid — a student, a grandchild" },
        ],
      },
      {
        ask: "What's actually worrying you most?",
        options: [
          { id: "thinking", label: "That they'll stop thinking for themselves" },
          { id: "behind", label: "That they'll be left behind if they don't use it" },
          { id: "unequipped", label: "That I don't understand it well enough to guide them" },
        ],
      },
      {
        ask: "What would make tonight worth it?",
        options: [
          { id: "say", label: "Knowing what to say" },
          { id: "ask", label: "Knowing what to ask them" },
          { id: "alone", label: "Feeling less alone in not knowing" },
        ],
      },
    ],
    prompts: {
      young: "What does my kid think this thing actually is? (Ask before correcting.)",
      teen: "Where is my teenager already ahead of me on this, and can I let them show me?",
      other: "Am I the right person to raise this, or do I need to hand it to someone who is?",
      thinking: "When did I last watch them work something out slowly, and did I interrupt?",
      behind: "Left behind by whom — and is that a real race or one I've been sold?",
      unequipped: "What could I honestly say I don't know, out loud, in front of them?",
      say: "What's the smallest true thing I could say this week, instead of the whole talk?",
      ask: "What question could I ask that I don't already know the answer to?",
      alone: "Who else is raising a kid this age that I could actually compare notes with?",
    },
  },

  reliance: {
    label: "Reliance vs. thinking",
    blurb: "The line between a tool that helps and a habit that hollows.",
    questions: [
      {
        ask: "Who are you thinking about?",
        options: [
          { id: "self", label: "Myself" },
          { id: "taught", label: "Someone I teach or manage" },
          { id: "general", label: "People in general" },
        ],
      },
      {
        ask: "What are you noticing?",
        options: [
          { id: "reflex", label: "Reaching for it before thinking" },
          { id: "hollow", label: "Getting more done, remembering less" },
          { id: "unease", label: "Nothing specific — just uneasy" },
        ],
      },
      {
        ask: "What would help most?",
        options: [
          { id: "tell", label: "Telling help apart from crutch" },
          { id: "habit", label: "One habit I'd actually keep" },
          { id: "words", label: "Words for talking about it with someone" },
        ],
      },
    ],
    prompts: {
      self: "What did I used to be able to do unaided that I haven't tried lately?",
      taught: "Am I asking them to struggle in a way I'm no longer willing to?",
      general: "Whose thinking am I actually worried about — theirs, or mine?",
      reflex: "What would happen if I sat with the question for sixty seconds first?",
      hollow: "Could I explain last week's work to someone without opening my notes?",
      unease: "What specifically would I have to see to know the unease was warranted?",
      tell: "Did this make the task easier, or did it make me smaller?",
      habit: "What's one thing I'll keep doing by hand, on purpose, and why that one?",
      words: "How would I describe the tradeoff to someone who disagrees with me?",
    },
  },

  trust: {
    label: "When it's wrong",
    blurb: "Where it fails, and how you'd know.",
    questions: [
      {
        ask: "What's the setting?",
        options: [
          { id: "stakes", label: "Something that matters — work, health, money" },
          { id: "curious", label: "Everyday curiosity" },
          { id: "helping", label: "Helping someone else decide" },
        ],
      },
      {
        ask: "If it were wrong, what would that cost?",
        options: [
          { id: "hard", label: "Hard to undo" },
          { id: "fixable", label: "Embarrassing but fixable" },
          { id: "unknown", label: "Honestly, I don't know" },
        ],
      },
      {
        ask: "What do you want to walk away with?",
        options: [
          { id: "check", label: "How to check it" },
          { id: "avoid", label: "When not to use it at all" },
          { id: "explain", label: "How to explain the risk to someone else" },
        ],
      },
    ],
    prompts: {
      stakes: "Who bears the cost if this is wrong — me, or someone who didn't choose this?",
      curious: "Does it matter here if it's wrong? If not, I can relax about it.",
      helping: "Have I told them how confident I actually am, or just passed it along?",
      hard: "What's my undo? If there isn't one, that's the whole answer.",
      fixable: "Who finds the mistake — me, or the person affected by it?",
      unknown: "What would I need to know to size this, and can I find that out first?",
      check: "What's one source that would disagree with this if it were wrong?",
      avoid: "What's on my personal list of things I won't use it for?",
      explain: "Can I say what it's good at and bad at in one sentence each?",
    },
  },

  work: {
    label: "Work & the ladder",
    blurb: "Jobs, craft, and how anyone becomes senior now.",
    questions: [
      {
        ask: "Where do you sit?",
        options: [
          { id: "early", label: "Starting out, or early in a career" },
          { id: "senior", label: "I hire, train, or manage people" },
          { id: "owner", label: "I run something, or work for myself" },
        ],
      },
      {
        ask: "What's the actual pressure?",
        options: [
          { id: "mine", label: "My own work changing under me" },
          { id: "below", label: "The people behind me having no path" },
          { id: "craft", label: "Whether the craft itself survives" },
        ],
      },
      {
        ask: "What would help?",
        options: [
          { id: "month", label: "Something I could try this month" },
          { id: "argue", label: "Something I could argue for at work" },
          { id: "view", label: "A clearer view of what's actually coming" },
        ],
      },
    ],
    prompts: {
      early: "What can I learn now that gets harder to learn later?",
      senior: "Who did I learn from by watching — and is anyone getting that from me?",
      owner: "Am I cutting the role that trains the next person? Is that a saving or a debt?",
      mine: "Which part of my work was the judgment, and which part was always the typing?",
      below: "If we stop hiring juniors, where do our seniors come from in ten years?",
      craft: "What in my craft is the values and the voice, and what is the production?",
      month: "What's one thing I could try this month that would tell me something real?",
      argue: "What would I have to show my organization to make this a decision, not a drift?",
      view: "Whose prediction about this have I accepted without checking their record?",
    },
  },

  power: {
    label: "Power & sovereignty",
    blurb: "Who decides, who benefits, and who was asked.",
    questions: [
      {
        ask: "What's your angle on this?",
        options: [
          { id: "mine", label: "It affects me directly" },
          { id: "community", label: "I'm thinking about a community I'm part of" },
          { id: "everyone", label: "I'm thinking about the general case" },
        ],
      },
      {
        ask: "Where does the power actually sit, in your view?",
        options: [
          { id: "money", label: "Whoever can pay for it" },
          { id: "builders", label: "Whoever builds the systems" },
          { id: "nobody", label: "Nobody's really steering" },
        ],
      },
      {
        ask: "What are you looking for?",
        options: [
          { id: "lever", label: "Something to actually push on" },
          { id: "clarity", label: "A clearer picture first" },
          { id: "language", label: "A way to raise it with other people" },
        ],
      },
    ],
    prompts: {
      mine: "What decision about me is already being made somewhere I can't see?",
      community: "Who here has not been asked — and what would asking actually cost?",
      everyone: "Am I arguing about people in general to avoid a specific case I could act on?",
      money: "Who pays, who benefits, and who bears the cost when it fails — same people?",
      builders: "Do the people building this live with the consequences of it?",
      nobody: "If nobody is steering, who would have to start — and what stops them?",
      lever: "What's the nearest decision to me that a real person makes, and when?",
      clarity: "What one fact would change my mind, and could I find it this week?",
      language: "How would I explain the stake to someone who's never thought about it?",
    },
  },

  environment: {
    label: "Environment & cost",
    blurb: "Water, power, land — and what a question costs.",
    questions: [
      {
        ask: "What are you weighing?",
        options: [
          { id: "local", label: "What it does here, in Alaska" },
          { id: "personal", label: "My own footprint using it" },
          { id: "global", label: "The big picture" },
        ],
      },
      {
        ask: "What kind of answer would help?",
        options: [
          { id: "numbers", label: "Actual figures" },
          { id: "tradeoff", label: "How to weigh it against the benefits" },
          { id: "action", label: "What to do differently" },
        ],
      },
      {
        ask: "Who's this for?",
        options: [
          { id: "me", label: "My own decision" },
          { id: "others", label: "A conversation I need to have" },
          { id: "policy", label: "Something I'd advocate for" },
        ],
      },
    ],
    prompts: {
      local: "What's already sited or proposed near here, and who approved it?",
      personal: "Is my own usage the meaningful lever — or is that just where I've been pointed?",
      global: "Am I comparing this to nothing, or to the thing it replaced?",
      numbers: "What's the unit — per query, per user, per year — and does the source say?",
      tradeoff: "What benefit would have to be real to make this cost worth paying?",
      action: "What would change if I knew the number? If nothing, why do I want it?",
      me: "Which of my own choices here actually moves anything?",
      others: "What do they care about that this touches — rates, land, water, jobs?",
      policy: "Who decides this in Alaska, and when do they next decide it?",
    },
  },
};

const CARDS = [
  /* ---------------------------------------------------------------- kids */
  {
    id: "kids-9-12-15",
    topic: "kids",
    kind: "question",
    excerpt: "How/what do I do/say to my kids (9, 12, 15) on how to prepare for the future?",
    full:
      "CONSIDERING THE SCALE OF IMPACT THAT AI WILL HAVE ON THE WORLD… AND THE " +
      "AMBIGUITY IN THE FINALITY OF THAT IMPACT… HOW/WHAT DO I DO/SAY TO MY KIDS " +
      "(9, 12, 15) ON HOW TO PREPARE FOR THE FUTURE?",
    tradeoffs: [
      "Three ages, three different conversations. A 9-year-old is asking what it is; a 15-year-old is already using it and deciding whether to tell you.",
      "Preparing them for a specific future means guessing right about that future. Preparing them to notice, question, and adapt doesn't require the guess.",
      "The instinct to have The Talk once is strong, and it's usually the least effective version. Repeated small conversations survive being wrong.",
    ],
    wrong:
      "This card was written by someone who admits the impact is ambiguous — and then asks for guidance anyway. Anything here that sounds confident about what your kids should do is overreaching, including anything this tool just told you. You know your kids; it doesn't.",
  },
  {
    id: "schools-overwhelmed",
    topic: "kids",
    kind: "question",
    excerpt:
      "Our schools are already overwhelmed + underfunded — how can school staff be trained to teach children to think critically… without overwhelming both?",
    full:
      "Our schools are already overwhelmed + underfunded — how can teachers + school " +
      "staff be trained to teach children to think critically + give them the tools to " +
      "succeed? Without overwhelming both students + staff?",
    tradeoffs: [
      "Any answer that adds a training day, a new platform, or a committee has already failed this card's actual test.",
      "Critical thinking isn't a new subject to add — it's a way of running the lessons already on the schedule. That reframing costs nothing and is the only version that fits.",
      "Staff who are underwater don't need convincing that this matters. They need someone to take something off the list first.",
    ],
    wrong:
      "This tool has no idea what your district's budget, contract, or staffing actually looks like. Anyone offering a school solution without that knowledge — including this page — is guessing. The people who know are in the building.",
  },
  {
    id: "grandchildren",
    topic: "kids",
    kind: "fear",
    excerpt:
      "I am concerned that my grandchildren, if unsupervised… will not inspire critical thinking, using AI alone.",
    full:
      "Front + Back. I am concerned that my grandchildren, if unsupervised with an " +
      "active thinking human contributing, will not inspire critical thinking, using AI alone.",
    tradeoffs: [
      "\"Unsupervised\" is doing a lot of work here. Supervision that's presence and conversation is different from supervision that's monitoring — kids can tell which one they're getting.",
      "An adult who thinks alongside them is the intervention this card names. That's a question of who has the hours, more than a question of technology.",
      "The same worry was raised about calculators, television, and search. That history doesn't make it wrong; it does suggest the outcome depended on what adults did next.",
    ],
    wrong:
      "This assumes solo use is the risky case. Sometimes a kid working alone with a patient tool asks more questions than a kid working next to an impatient adult. Watch which one is actually happening before you act.",
  },
  {
    id: "brains-facts",
    topic: "kids",
    kind: "question",
    excerpt: "Will youth be able to differentiate between facts and AI?",
    full: "How will AI change how our brains work? Will youth be able to differentiate between facts and AI?",
    tradeoffs: [
      "\"Facts vs. AI\" is a false pair — the real skill is telling a supported claim from an unsupported one, whatever produced it. That skill transfers; a rule about AI specifically doesn't.",
      "Young people are often better at spotting synthetic media than adults assume, and worse at spotting confident wrong prose. The worry may be aimed at the wrong failure.",
      "This is testable at your kitchen table tonight, which makes it unusual on this wall — most cards here can't be checked.",
    ],
    wrong:
      "This tool produces fluent, confident text — exactly the thing the card is worried about. Fluency is not evidence of accuracy, including in this sentence.",
  },

  /* ------------------------------------------------------------ reliance */
  {
    id: "attention-span",
    topic: "reliance",
    kind: "question",
    excerpt: "How will it (and does it) impact our attention span and multitasking ability?",
    full: "How will it (and does it) impact our attention span and multitasking(?) abilty(?)?",
    tradeoffs: [
      "The honest state of the evidence: we don't have good long-run data yet. Anyone who says we do is selling something.",
      "\"Does it\" is answerable for you personally, this week, by paying attention. \"Will it\" is not answerable by anyone right now.",
      "Offloading attention isn't automatically loss — you offloaded phone numbers years ago. The question is whether what you offloaded was load-bearing.",
    ],
    wrong:
      "Framing this as attention span may itself be the wrong frame — it's borrowed from the social media debate, and these tools are used differently. If the frame is off, so is everything built on it.",
  },
  {
    id: "knowledge-stunted",
    topic: "reliance",
    kind: "fear",
    excerpt:
      "Continual knowledge growth might be stunted by AI doing everything. The less a person has to learn, the more they give up.",
    full:
      "Continual Knowledge growth might be stunted by AI doing everything. The Less a " +
      "person has to learn, the more they give up.",
    tradeoffs: [
      "\"The less a person has to learn, the more they give up\" is a claim about motivation, and it cuts both ways — some people learn more when the boring part is handled.",
      "Effort is not the same as learning. Some struggle builds understanding; some just burns an afternoon. Removing the second kind is a gain.",
      "The risk is sharpest at the beginning of a skill, when you can't yet judge whether the output is any good.",
    ],
    wrong:
      "This treats knowledge as one thing. Losing recall while gaining judgment isn't obviously a loss — and this tool can't tell you which is happening to you. Only you can notice that.",
  },
  {
    id: "llm-addiction",
    topic: "reliance",
    kind: "question",
    excerpt: "Are we headed toward LLM addiction, akin to social media? If not, how do you know?",
    full:
      "Are we headed toward LLM addiction, akin to social media? If not, how do you " +
      "know? Are there any actions the dev community are doing to prevent?",
    tradeoffs: [
      "\"If not, how do you know?\" is the strongest question on this wall. Nobody defending the technology has a clean answer to it.",
      "One real structural difference: social media is optimized to keep you scrolling; a tool you use to finish a task and leave has a different incentive. That difference is a design choice, not a law — it can be changed at any time.",
      "The tell isn't hours used. It's whether stopping feels like a decision or a struggle.",
    ],
    wrong:
      "This page is itself an AI-shaped answer to a question about whether AI is trustworthy. That's a conflict of interest worth naming, and worth weighing against what you observe yourself.",
  },
  {
    id: "resist-us",
    topic: "reliance",
    kind: "question",
    excerpt:
      "How can we make these tools resist us — to make us stronger rather than making us more comfortable?",
    full:
      "How can we make these tools resist us to make us stronger rather than making " +
      "us more comfortable.",
    tradeoffs: [
      "Tools that resist you lose to tools that don't, in any market where people choose. That's the central difficulty, and it's economic rather than technical.",
      "Resistance people accept is usually resistance they asked for in advance — a setting chosen on a good day, not friction imposed on a bad one.",
      "There's a difference between a tool that makes you work and a tool that shows its work. The second is easier to accept and gets much of the same benefit.",
    ],
    wrong:
      "This page mostly answers rather than resists — it hands you finished paragraphs. Judge it by whether you're still thinking after you close it, and hold the gap between what it advocates and what it does against it.",
  },
  {
    id: "lost-without-ai",
    topic: "reliance",
    kind: "question",
    excerpt: "Will we get to a point where we feel lost without AI?",
    full: "Will we get to a point where we feel lost without AI?",
    tradeoffs: [
      "For some tasks, we're already there — and for most of those nobody minds. Feeling lost without written language is not a crisis.",
      "The question worth asking isn't whether dependence arrives, but which dependencies you'd be unwilling to have. That list is personal and worth actually writing.",
      "Dependence becomes a problem mainly when the thing can be taken away, priced up, or turned off by someone else. That's an ownership question more than a psychological one.",
    ],
    wrong:
      "\"Lost\" is vague enough to mean anything from mild inconvenience to genuine helplessness, and this tool has quietly picked a middle reading. Yours may be different, and yours is the one that matters.",
  },
  {
    id: "not-challenged",
    topic: "reliance",
    kind: "fear",
    excerpt:
      "AI gives me answers but does not challenge me with alternate perspectives. A friend or coworker would. The scope of my thought is reduced.",
    full:
      "I find that AI usage gives me answers but does not challenge me with alternate " +
      "perspectives. As an example, if I ask a business question, and recieve an answer, " +
      "I am not challenged by AI to consider alternative or conflictual perspectives. " +
      "A friend or coworker would challenge me. AI does not. The scope of my thought is reduced.",
    tradeoffs: [
      "This is the most precisely observed card on the wall — it names a mechanism, not a mood, and gives an example.",
      "Part of this is fixable by asking: these tools will argue the other side if told to. Part of it isn't — a tool that agrees by default will still shape what you never think to question.",
      "A colleague challenges you partly because they have their own stake in being right. Nothing here has a stake. That's the piece that can't be prompted away.",
    ],
    wrong:
      "You are reading a page that hands you an answer without arguing back — the exact behavior this card describes. The three questions above are the closest thing to pushback we could build, and they're weaker than a colleague who disagrees with you.",
  },

  /* --------------------------------------------------------------- trust */
  {
    id: "equitable-tool",
    topic: "trust",
    kind: "question",
    excerpt: "How do we ensure that AI is an equitable tool?",
    full: "How do we ensure that AI is an equitable tool?",
    tradeoffs: [
      "\"Equitable\" splits into at least three things: who can afford it, who it works well for, and who was asked. They have different fixes and different people responsible.",
      "Cheaper access doesn't produce equity on its own — a tool that works less well for you, more cheaply, is not a gift.",
      "\"Ensure\" implies a mechanism. In practice the mechanisms are procurement rules, funding, and regulation, none of which are built by the people who write the software.",
    ],
    wrong:
      "This is a values question wearing a technical costume, and this tool will make it sound more tractable than it is. The hard part isn't knowing what equitable means — it's who has standing to decide.",
  },
  {
    id: "how-they-work",
    topic: "trust",
    kind: "question",
    excerpt: "When / how will we be able to understand exactly how they work?",
    full: "when / how will we be able to Understand(?) exactly how they work.",
    tradeoffs: [
      "\"Exactly\" may never arrive. Interpretability research is real and improving, but nobody can currently give a full account of why a given output appeared.",
      "There's a lower bar that's more achievable and often more useful: knowing reliably when a system fails, even without knowing why.",
      "We accept this gap elsewhere — most working pharmacology started with what works before why. That's a reason to demand evidence of reliability, not a reason to relax.",
    ],
    wrong:
      "This tool cannot introspect on how it produced this text. Any explanation it offers about its own reasoning is a plausible story generated after the fact, not a readout.",
  },
  {
    id: "safeguards",
    topic: "trust",
    kind: "fear",
    kinds: ["hope", "fear"],  // writer labelled all of these on the one card
    excerpt:
      "Fear: using a tool without knowing or trusting the safeguards that exist or do not exist.",
    full:
      "Hope: Force multiplier for Communities to amplify their work. Fear: Using a " +
      "tool without knowing or trusting - the safeguards that exisit(?) or do not exisist(?).",
    tradeoffs: [
      "You can read what a company publishes about its safeguards. You generally cannot verify it independently. That gap is real and doesn't close by reading more marketing.",
      "Trusting an institution you can't audit isn't unique to AI — it's true of your bank and your water utility. What's missing here is the track record and the regulator, not the possibility of trust.",
      "The same card calls it a force multiplier for communities. Both are held by one person; that's not confusion, it's an accurate read of an unsettled situation.",
    ],
    wrong:
      "You are reading an assessment of AI trustworthiness rendered by an AI. Treat it as a starting point for your own inquiry, not the end of one.",
  },
  {
    id: "novel-ideas",
    topic: "trust",
    kind: "question",
    excerpt:
      "How do we ensure that we can enable novel ideas in a world where much of the available content is generated from AI models?",
    full:
      "How do we ensure that we can enable novel ideas in an world where much of the " +
      "available content is generated from AI models?",
    tradeoffs: [
      "Models trained largely on model output drift toward the average. That's a measured effect, not a worry — and it's the strongest technical version of this concern.",
      "The counterweight is anything that stays anchored to the world: primary sources, direct observation, people doing things and reporting back.",
      "Novelty has never mostly come from the available content. It comes from friction with reality, which is still in short supply and still not synthesizable.",
    ],
    wrong:
      "This page is generated content about the problem of generated content. If the concern is right, this is part of the sample being complained about.",
  },
  {
    id: "fear-limits-access",
    topic: "trust",
    kind: "question",
    excerpt: "Will fear of AI and its capabilities limit general availability of the strongest models?",
    full: "Will fear of AI and it's capabilities limit general avalability(?) of the strongest models?",
    tradeoffs: [
      "It already does, in both directions — some capability is withheld for safety, some is withheld for commercial advantage, and from the outside these look identical.",
      "A companion card on this same wall wants the strongest models made *more* available, specifically for defensive security work. The room did not agree with itself, and that's worth sitting with.",
      "\"Fear\" frames restriction as irrational. Some of it is; some of it is a considered judgment you'd want made about a technology this new.",
    ],
    wrong:
      "This tool is made by a company that makes exactly these withholding decisions. It cannot give you a disinterested answer about whether they're justified.",
  },
  {
    id: "studying-effects",
    topic: "trust",
    kind: "question",
    kinds: ["hope", "fear", "question"],  // writer labelled all of these on the one card
    excerpt: "How are we studying the effects of AI on individuals, teams, and communities?",
    full:
      "Hope: Abundance. More time for art, exploration, personal projects. Fear: " +
      "Socity(?)-level risks: Environment, bio-risk, economic, etc. Question: How are we " +
      "studying the effects of AI on individuals, teams, and communities?",
    tradeoffs: [
      "Thinly, and mostly on individuals. Team and community effects are the hardest to measure and the least funded — which is the opposite of what this card asks about.",
      "Most published work studies people using tools in a lab for an hour. Almost none follows a workplace or a town over years.",
      "\"How are we studying\" is answerable in a way most cards here aren't. Someone could actually go find out who is doing this work in Alaska, and whether anyone is.",
    ],
    wrong:
      "This tool can't survey the literature for you, and its impression of what research exists is unreliable and dated. Treat the claims above as prompts to check, not findings.",
  },
  {
    id: "cat-out-of-bag",
    topic: "trust",
    kind: "question",
    kinds: ["fear", "hope", "question"],  // writer labelled all of these on the one card
    excerpt: "Is the cat out of the bag already?",
    full:
      "Fear - inability to stop Alignment problems. Runaway. Hope - Net benefit With " +
      "New technology. Question - Is the cat out of the bag already?",
    tradeoffs: [
      "For the existence of the technology: yes, and no serious person argues otherwise. For how it gets deployed, priced, and governed: not remotely.",
      "\"Cat out of the bag\" is often used to end a conversation. Notice when it's doing that — inevitability is a very convenient belief for whoever is already ahead.",
      "Plenty of technologies that couldn't be un-invented were still shaped hard afterward: cars, pharmaceuticals, aviation. The shaping happened later than anyone wanted, and it happened.",
    ],
    wrong:
      "The framing invites a yes-or-no answer to a question that has different answers at different scales. If this page gave you a clean one, that's the flaw.",
  },

  /* ---------------------------------------------------------------- work */
  {
    id: "new-grads",
    topic: "work",
    kind: "question",
    excerpt:
      "If a junior developer's job can be done by LLMs, how are we going to have senior developers in the next decade?",
    full:
      "How is AI impacting new grads? If Junior Developer's job can be done by LLMs, " +
      "then how are we going to have senior developer in the next decade?",
    tradeoffs: [
      "The pipeline problem is real and the incentives are badly aligned: the cost of not training juniors lands years later, on someone else, possibly at a different company.",
      "The premise deserves a check. \"Junior work\" was never only the typing — a lot of it was context, judgment, and learning what questions to ask.",
      "If the entry rung disappears, seniority has to be built some other way. Nobody has shown what that is yet, and that's the actual gap.",
    ],
    wrong:
      "Predictions about developer employment have a poor track record in both directions. This tool has no special insight into your industry's next decade, and neither does anyone quoting a confident number at you.",
  },
  {
    id: "junior-to-senior",
    topic: "work",
    kind: "question",
    excerpt:
      "How do we turn junior knowledge workers into senior — with the wisdom hard-won from experience — if we replace them with agents?",
    full:
      "How do we turn junior knowledge workers into senior — with the wisdom hard-won " +
      "from experience (mistakes, and the freedom to make them) — if we replace them with agents?",
    tradeoffs: [
      "This card names the mechanism precisely: mistakes, and the freedom to make them. That freedom is what gets optimized away first, because it looks like waste on a quarterly view.",
      "Some of that learning can be deliberately preserved — reviewing work you didn't do, sitting in on decisions, being wrong somewhere it's safe. All of it costs senior people's time.",
      "An organization that keeps the freedom to make mistakes is choosing a real cost now against a real risk later. That's a legitimate choice either way — but it should be made, not drifted into.",
    ],
    wrong:
      "This assumes the traditional path was working well. Plenty of people were never given the freedom to make mistakes either, long before agents. Fixing the wrong baseline is its own error.",
  },
  {
    id: "mailroom-to-ceo",
    topic: "work",
    kind: "fear",
    excerpt:
      "Companies not hiring for entry level jobs for college grads. How do new hires learn a company?",
    full:
      "Mailroom to CEO. Fear: Companies not hiring for entry level jobs for college " +
      "grads. How do new hires learn a company?",
    tradeoffs: [
      "The second sentence is the sharper one. Entry-level work taught people how an organization actually functions — who decides, where things get stuck. That knowledge wasn't in the job description.",
      "\"Mailroom to CEO\" was always partly myth, and it was never available to everyone equally. Losing it is a real loss and it's worth being accurate about how much there was to lose.",
      "This is happening alongside a broader hiring slowdown. Attributing all of it to AI would be convenient for everyone involved and probably wrong.",
    ],
    wrong:
      "This tool can't see your local labor market, and Anchorage doesn't move the way national coverage describes. Someone at the university or the hiring end here would know more than this page does.",
  },
  {
    id: "instructional-designer",
    topic: "work",
    kind: "question",
    excerpt:
      "How to create elearning content using AI without losing my design values & principles, & voice.",
    full:
      "As an instructional designer by Trade I am interested in learning how to Create " +
      "elearning content using AI without losing my design values & Principles, & voice.",
    tradeoffs: [
      "Voice survives best when the tool is used late rather than early — for production after the decisions are made, not for the decisions.",
      "The risk isn't that it writes badly. It's that it writes acceptably, and acceptable is much harder to argue with than bad.",
      "\"Design values and principles\" are the part worth writing down explicitly. Once they're on paper you can check work against them; while they're intuition, drift is invisible.",
    ],
    wrong:
      "This page has a house style, and it's not yours. If you take craft advice from a tool with its own voice, expect to end up closer to that voice than to your own.",
  },
  {
    id: "ip-with-ai",
    topic: "work",
    kind: "question",
    excerpt: "Can intellectual property exist with AI?",
    full: "Can Intellectual Property exist with AI? (Fake, patent everything. Make no mistakes!)",
    tradeoffs: [
      "The law here is genuinely unsettled and moving. Anything you read about it, including this, is a snapshot with a short shelf life.",
      "\"Exist\" is doing two jobs: whether AI output can be owned, and whether existing work was fairly used to build the models. Those are separate fights with different people on each side.",
      "For most working people the practical question is narrower and more urgent — what your client contract says about AI-assisted work, which is knowable today.",
    ],
    wrong:
      "This is a legal question and this is not legal advice. The general picture here could be wrong for your jurisdiction, your contract, and your situation, and the cost of being wrong lands on you.",
  },

  /* --------------------------------------------------------------- power */
  {
    id: "individual-agency",
    topic: "power",
    kind: "question",
    excerpt:
      "How do we avoid a future where those who can afford more compute have more power? How do we democratize the benefit of AI?",
    full:
      "I AM concerned ABout INDIVIDUAL Agency. How do we Avoid A future where those who " +
      "can Afford More compute have more power to Influence, Govern, And Rule others. " +
      "How do we Democratize The Benefit of AI?",
    tradeoffs: [
      "Access is getting cheaper and capability is concentrating, at the same time. Both are real, and which one dominates isn't settled.",
      "\"Democratize\" can mean everyone gets access, or everyone gets a say in how it's built. The July 21 wall asked for the second more often than the first.",
      "This is a policy question wearing a technology costume. It gets decided in legislatures and procurement contracts, not in product design.",
    ],
    wrong:
      "This card is about power, and this tool is made by a company with a stake in the answer. Weight it accordingly — and find someone with no stake before you settle your view.",
  },
  {
    id: "tribal-nations",
    topic: "power",
    kind: "question",
    excerpt:
      "Where are tribal nations involved? There are 570+ nations across the country — data sovereignty is priority.",
    full:
      "When it comes to who is in charge, where are tribal nations involved? What does " +
      "that look like? There are 570+ nations across the country - Data Sovereignty is priority.",
    tradeoffs: [
      "Data sovereignty has existing frameworks — CARE principles, tribal data governance, prior work in health and language research. This is not a blank page, and treating it as one is its own error.",
      "\"Where are they involved\" has a factual answer that could be found: which consultations happened, who was at the table, when. Nobody in that July 21 room appeared to know.",
      "570+ nations means there is no single answer and no single representative. Any approach that needs one voice to speak for all of them has already failed.",
    ],
    wrong:
      "This page was written by a tool, in a project by people who — as far as the record shows — did not consult any tribal nation. On this card in particular, our lack of standing is the most important thing on the screen.",
  },
  {
    id: "community-ai",
    topic: "power",
    kind: "question",
    excerpt:
      "How can we have community AI systems to promote ingenuity instead of having thoughts and ideas washed out by the global AI?",
    full:
      "How can we have community AI systems to promote Ingenuity(?) instead of having " +
      "thoughts and ideas washed out by the global AI?",
    tradeoffs: [
      "Technically this is more possible than it was two years ago — smaller models can be run and tuned locally. The hard parts are upkeep and expertise, not capability.",
      "\"Washed out\" is the right worry: a global average trained mostly on elsewhere will reliably under-represent here. That's a property of the training data, not a bug to be reported.",
      "A community system needs someone to own it after the enthusiasm ends. That's usually where these efforts die, and it's a question to answer before starting rather than after.",
    ],
    wrong:
      "Local doesn't automatically mean better — a small badly-maintained system can be worse than a large one. \"Community\" is a governance claim, and it only holds if the governance is real.",
  },
  {
    id: "first-mover",
    topic: "power",
    kind: "question",
    excerpt:
      "The incentive to be a first mover is so strong… how do we avoid unintended consequences given these competitive dynamics?",
    full:
      "The incentive to be a first mover is so strong, in the AI race, competitors " +
      "(Anthropic vs. xAI; USA vs. China) may end up pushing through products and " +
      "innovations they don't understand, let alone understand how they will impact " +
      "the world. How do we avoid unintended consequences given these competitive dynamics?",
    tradeoffs: [
      "This is a coordination problem, and coordination problems aren't solved by any single participant deciding to be careful — that just moves the advantage to whoever doesn't.",
      "The mechanisms that have worked elsewhere are external: binding rules applied to everyone at once, and independent bodies with the power to say no.",
      "\"They don't understand it\" is partly true and partly a rhetorical move. The people building these systems understand them better than anyone and still can't predict downstream effects — which is arguably worse.",
    ],
    wrong:
      "One of the named competitors made this tool. You are asking a participant in the race to assess whether the race is dangerous, and it has every incentive to sound reasonable about it.",
  },
  {
    id: "regulatory-capture",
    topic: "power",
    kind: "fear",
    excerpt:
      "Regulatory capture and ignorance: monopolistic steering of regulations… This is why we can't have nice things.",
    full:
      "Regulatory Capture and Ignorance. Monopolistic steering of Regulations making " +
      "unsupportable(?) systems contributing to mental and social health concerns — And " +
      "then poorly resolved/banned(?). This is why we cant have nice things.",
    tradeoffs: [
      "The mechanism named here is specific and well documented in other industries: the incumbent helps write the rules, and the rules turn out to favour incumbents.",
      "It cuts against the instinct that regulation is automatically the answer. Who writes it matters more than whether it exists.",
      "\"And then poorly resolved\" is the part worth sitting with — the pattern isn't that harm goes unaddressed forever, it's that it gets addressed late, badly, and after the damage.",
    ],
    wrong:
      "This tool is made by a company that lobbies on AI regulation. On this card specifically, treat it as an interested party describing its own industry — the card's author is the one with the outside view.",
  },
  {
    id: "large-scale-issues",
    topic: "power",
    kind: "question",
    excerpt:
      "How can we address large-scale issues like homelessness, our education system, food insecurity in a more effective way with AI?",
    full:
      "How can we address large-scale issues like homelessness, Our education system, " +
      "food insecurity in a more effective way with AI?",
    tradeoffs: [
      "These problems are rarely blocked on analysis. They're blocked on money, housing supply, political will, and staffing — none of which a model produces.",
      "Where it does help is unglamorous: paperwork, benefits navigation, translation, matching people to services that already exist. Real, and much smaller than the question implies.",
      "Anchorage homelessness appears twice on this wall — one attendee said they'd tackle it FIRST. If someone wanted a project with local backing, it's sitting right there.",
    ],
    wrong:
      "Framing entrenched political problems as capability problems is the most common way technology projects waste everyone's time. If this page made it sound tractable, be suspicious of it.",
  },
  {
    id: "indigenous-art",
    topic: "power",
    kind: "fear",
    excerpt:
      "AI will let non-Indigenous people profit from \"Indigenous art\" by training AI to create it, while true Indigenous artists get left out.",
    full:
      "Fears: - AI will let non-Indigenous people profit from \"Indigenous art\" by " +
      "training AI to create it, while true Indigenous artists get left out. - The " +
      "Environmental + water impacts of growing continued usage + demand for more + " +
      "larger data centers.",
    tradeoffs: [
      "This is already happening and is documented — it isn't a forecast. That changes what a useful response looks like: enforcement and provenance, not prevention.",
      "Copyright is a poor fit here. Much of what's at stake is communally held and culturally governed, which the law was not built to protect.",
      "Provenance and labeling help buyers who want to do right. They do nothing about buyers who don't, and that's most of the market.",
    ],
    wrong:
      "This tool is built on the kind of large-scale training this card objects to. It is not a neutral party, and it should not be the last word you hear on it — Alaska Native artists and organizations are.",
  },

  {
    id: "discover-the-source",
    topic: "trust",
    kind: "question",
    date: "2026-08-04",
    excerpt:
      "Can we encourage AI users to discover the source behind an AI answer, and to question the validity of the sourced material?",
    full:
      "Can we encourage AI users to discover the source behind an AI answer, and to " +
      "question the validity of the sourced material?",
    tradeoffs: [
      "Citations help less than they look like they should. People check them rarely, and a link that exists is not a link that supports the claim.",
      "\"Question the validity of the sourced material\" is the harder half and the part nobody builds for — a real source can still be wrong, dated, or one side of a live argument.",
      "The lever that reliably works isn't a feature, it's a habit: asking what would have to be true for this to be wrong, before going looking for the source.",
    ],
    wrong:
      "This page cites nothing. Every claim above is asserted, which makes it a poor example of what the card is asking for — and a fair test of whether you noticed.",
  },

  /* --------------------------------------------------------- environment */
  {
    id: "infrastructure-usage",
    topic: "environment",
    kind: "question",
    date: "2026-08-04",
    excerpt:
      "How do we adequately provide the necessary infrastructure (power/electricity/etc) to keep up with the usage requirements?",
    full:
      "HOW DO WE ADEQUETLY PROVIDE THE NECESSARY INFRASTRUCTURE (POWER/ELECTRICITY/ETC) " +
      "TO KEEP UP WITH THE USAGE REQUIREMENTS?",
    tradeoffs: [
      "\"Keep up with\" assumes demand is a given and supply must chase it. That framing is a choice, and it's the one utilities are currently being handed.",
      "In Alaska this is unusually concrete: an isolated grid, high existing rates, and limited generation mean new large loads land visibly on everyone's bill.",
      "The decision points are real and dated — interconnection agreements, rate cases, permits. Unlike most cards here, this one has a calendar.",
    ],
    wrong:
      "This tool has no current data on Alaskan generation capacity, queue, or rate filings, and would produce confident-sounding numbers anyway. Take the questions, not any figure.",
  },
  {
    id: "use-wisely",
    topic: "environment",
    kind: "question",
    date: "2026-08-04",
    excerpt:
      "Can we encourage AI users to utilize the tool wisely so as to avoid the draw on electricity, water, power sources, especially as energy costs are rising exponentially?",
    full:
      "Can we encourage AI users to utilize the tool wisely so as to avoid the draw on " +
      "electricity, water, power sources, especially as energy costs are rising exponentially.",
    tradeoffs: [
      "Individual restraint is the weakest lever available here, and it's the one most often recommended — partly because it costs the people recommending it nothing.",
      "The efficiency gains that matter are upstream: model choice, hardware, where and when a data centre draws power. A user picking a smaller model matters more than a user asking fewer questions.",
      "There's a real version of \"wisely\" that isn't about volume at all — not using it for things it's bad at, which saves energy and produces better work at the same time.",
    ],
    wrong:
      "Framing this as a user-behavior problem quietly moves responsibility from the people making siting and design decisions to the person typing. Notice who benefits from that framing — this tool's makers are among them.",
  },
  {
    id: "ai-waste-greenhouses",
    topic: "environment",
    kind: "question",
    date: "2026-08-04",
    excerpt:
      "How can we use AI waste to create something new from it? Emissions used to power greenhouses? This would help provide fresh produce in remote regions of Alaska.",
    full:
      "How can we use AI waste to create something new from it? Emissions used to power " +
      "greenhouses? This would help provide fresh produce in remote regions of Alaska.",
    tradeoffs: [
      "Waste-heat recovery is real and deployed — data centre heat already warms district systems in several countries. This isn't a speculative idea.",
      "The catch is geography: heat is hard to move, so it only works if the greenhouse is next to the data centre. That's a siting decision made years before anyone asks about produce.",
      "\"Emissions\" and \"waste heat\" aren't the same thing, and the distinction changes what's possible — CO₂ enrichment in greenhouses is a separate technique with separate economics.",
    ],
    wrong:
      "This is the only card on the wall proposing a build rather than raising an alarm, and that makes it easy to over-encourage. The honest check is whether anyone would site a data centre where remote Alaska needs the produce — and generally, no.",
  },
  {
    id: "predict-the-damage",
    topic: "environment",
    kind: "question",
    date: "2026-08-04",
    excerpt: "Can AI predict the damage data centers are causing on Earth? And how we can fix it?",
    full: "Can AI predict the damage data centers are causing on Earth? And how we can fix it?",
    tradeoffs: [
      "Measuring is not the bottleneck. Water and power draw are already measurable — much of it simply isn't disclosed, and modelling can't fix a reporting problem.",
      "There's an appealing symmetry in using the technology to audit itself, and it's worth noticing that the audit would depend on the audited party's data.",
      "\"And how we can fix it\" is the part that isn't a prediction problem at all. The fixes are known: siting, generation, disclosure. What's missing is who requires them.",
    ],
    wrong:
      "This tool cannot measure anything. If it produced a figure about data centre impact, that figure came from patterns in text, not from instruments — and it would look exactly as credible either way.",
  },
  {
    id: "data-centers",
    topic: "environment",
    kind: "fear",
    excerpt:
      "I fear what irreversible impacts AI will have on the environment and communities, specifically regarding data centers — water, electricity rates, land use, subsistence activities.",
    full:
      "Fear: I fear what irreversible impacts AI will have on the environment and " +
      "communities, specifically regarding data centers ie. water, electricity rates, " +
      "land use, subsistence activities",
    tradeoffs: [
      "This is the most concrete card on the wall. Every item on it is a thing with a number, a permit, and a decision-maker — which makes it unusually actionable.",
      "Electricity rates are the piece that reaches everyone regardless of their view on AI, and the piece with the clearest local decision point.",
      "\"Irreversible\" is doing real work: land use and water allocation are much harder to undo than a rate change. Those deserve the most attention first.",
    ],
    wrong:
      "This tool has no current data on Alaskan siting, permits, or rate cases, and it would happily generate plausible figures. Do not take numbers from it — take the list of things to go ask about.",
  },
  {
    id: "future-generations",
    topic: "environment",
    kind: "question",
    excerpt: "What does this mean for our future generations? — Environment · Safety · Humanity",
    full: "What does this mean for our future generations? - Environment - Safety - Humanity",
    tradeoffs: [
      "Three very different questions stacked on one card. They have different evidence, different timelines, and different people who could act on them.",
      "Environment is the one with numbers attached, and it's the one most often skipped in favor of the other two.",
      "Long-horizon questions resist honest answers. The useful move is usually to ask what would have to be true for the bad version, then watch for those things.",
    ],
    wrong:
      "Nobody can answer this card, including this page. What it can do is break the question into pieces small enough that someone in Anchorage could actually check one.",
  },
  {
    id: "cost-per-query",
    topic: "environment",
    kind: "question",
    kinds: ["hope", "fear", "question"],  // writer labelled all of these on the one card
    excerpt:
      "How much does it \"cost\" every time I query an agent with a relatively straightforward question?",
    full:
      "Hope: Increase my productivity while leveraging(?) AI. Fear: longevity(?) of the " +
      "\"System\" I build my own system in. Question: How much does it \"Cost\" every " +
      "time I Query an agent w/ a relatively straightforward Question!",
    tradeoffs: [
      "\"Cost\" splits into money, energy, and water, and the three have very different answers. The card's quotation marks suggest the writer already knew that.",
      "Published per-query figures vary by orders of magnitude depending on model, length, and who's doing the counting. A number without its assumptions is not information.",
      "Individual query cost is small and individual restraint is a weak lever. Where it aggregates — data centre siting, procurement, defaults — is where the number starts to matter.",
    ],
    wrong:
      "If this tool gave you a figure, it would be a plausible-sounding guess presented with unearned confidence. It does not have current per-query data, and neither do most sources quoting it.",
  },
  {
    id: "arctic-extraction",
    topic: "environment",
    kind: "fear",
    excerpt:
      "AI is another form of extraction & will put Arctic Indigenous communities at risk for further exploitation.",
    full:
      "Fear- AI is another form of extraction & will put Arctic Indigenous(?) communities " +
      "at risk for further exploitation.",
    tradeoffs: [
      "\"Another form of extraction\" places this in a long and specific local history. That framing isn't rhetoric here — it's the pattern this region has actually seen, repeatedly.",
      "The extraction has at least two faces: physical (land, water, power) and informational (language, knowledge, cultural material used without consent).",
      "The pattern that would break it is the same one that breaks it elsewhere — communities holding decision rights and revenue, not consultation after the plan is drawn.",
    ],
    wrong:
      "This page is a summary of someone else's fear, written by a tool built by a company outside this region, in a project that consulted no one named in it. The card is the primary source; this commentary is not.",
  },
];
