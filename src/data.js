/* Content for the card wall.
 *
 * Plain JS, not JSON, on purpose: the page must open from file:// with no server,
 * and fetch() of a local JSON file is blocked by CORS. This is a demo-safety
 * decision, not a style one. See memory/03-build/architecture.md.
 *
 * Card text is transcribed from the July 21, 2026 Anchorage session card wall.
 * Transcriptions are best-effort reads of handwriting; [?] marks uncertainty.
 * No card writer is named anywhere.
 */

const TOPICS = {
  kids: {
    label: "Kids & parenting",
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
    // answer id -> the question this person leaves with
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
      hollow: "Would I be able to explain last week's work to someone without notes?",
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
};

const CARDS = [
  {
    id: "kids-9-12-15",
    topic: "kids",
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
    id: "grandchildren",
    topic: "kids",
    excerpt:
      "I am concerned that my grandchildren, if unsupervised… will not inspire critical thinking, using AI alone.",
    full:
      "Front + Back. I am concerned that my grandchildren, if unsupervised with an " +
      "active thinking human contributing, will not inspire critical thinking, using AI alone.",
    tradeoffs: [
      "\"Unsupervised\" is doing a lot of work here. Supervision that's presence and conversation is different from supervision that's monitoring — kids can tell which one they're getting.",
      "An adult who thinks alongside them is the intervention this card names. That's a resource question — who has the hours — more than a technology question.",
      "The same worry was raised about calculators, television, and search. That history doesn't make the worry wrong; it does suggest the outcome depends on what adults did next.",
    ],
    wrong:
      "This assumes solo use is the risky case. Sometimes a kid working alone with a patient tool asks more questions than a kid working next to an impatient adult. Watch which one is actually happening before acting.",
  },
  {
    id: "schools-overwhelmed",
    topic: "kids",
    excerpt:
      "Our schools are already overwhelmed + underfunded — how can school staff be trained to teach children to think critically… without overwhelming both?",
    full:
      "Our schools are already overwhelmed + underfunded — how can teachers + school " +
      "staff be trained to teach children to think critically + give them the tools to " +
      "succeed? Without overwhelming both students + staff?",
    tradeoffs: [
      "Any answer that adds a training day, a new platform, or a committee has already failed this card's actual test.",
      "Critical thinking isn't a new subject to add — it's a way of running the lessons already on the schedule. That reframing costs nothing and is the only version that fits.",
      "Staff who are underwater don't need to be convinced this matters. They need someone to take something off the list first.",
    ],
    wrong:
      "This tool has no idea what your district's budget, contract, or staffing actually looks like. Anyone offering a school solution without that knowledge — including this page — is guessing. The people who know are in the building.",
  },
  {
    id: "attention-span",
    topic: "reliance",
    excerpt: "How will it (and does it) impact our attention span and multitasking ability?",
    full: "How will it (and does it) impact our attention span and multitasking ability?",
    tradeoffs: [
      "The honest state of the evidence: we don't have good long-run data on this yet. Anyone who tells you we do is selling something.",
      "\"Does it\" is answerable for you personally, this week, by paying attention. \"Will it\" is not answerable by anyone right now.",
      "Offloading attention isn't automatically loss — you offloaded phone numbers years ago. The question is whether what you offloaded was load-bearing.",
    ],
    wrong:
      "Framing this as attention span may itself be the wrong frame — it's borrowed from the social media debate, and these tools are used differently. If the frame is off, so is everything built on it.",
  },
  {
    id: "knowledge-stunted",
    topic: "reliance",
    excerpt:
      "Continual knowledge growth might be stunted by AI doing everything. The less a person has to learn, the more they give up.",
    full:
      "Continual knowledge growth might be stunted by AI doing everything. The Less a " +
      "person has to learn, the more they give up.",
    tradeoffs: [
      "\"The less a person has to learn, the more they give up\" is a claim about motivation, and it cuts both ways — some people learn more when the boring part is handled.",
      "Effort is not the same as learning. Some struggle builds understanding; some just burns time. Removing the second kind is a gain.",
      "The risk is sharpest at the beginning of a skill, when you can't yet judge whether the output is any good.",
    ],
    wrong:
      "This treats knowledge as one thing. Losing recall while gaining judgment isn't obviously a loss — and this tool can't tell you which one is happening to you. Only you can notice that.",
  },
  {
    id: "llm-addiction",
    topic: "reliance",
    excerpt:
      "Are we headed toward LLM addiction, akin to social media? If not, how do you know?",
    full:
      "Are we headed toward LLM addiction, akin to social media? If not, how do you " +
      "know? Are there any actions the dev community are doing to prevent?",
    tradeoffs: [
      "\"If not, how do you know?\" is the strongest question on this wall. Nobody defending the technology has a clean answer to it.",
      "One real structural difference: social media is optimized to keep you scrolling; a tool you use to finish a task and leave has a different incentive. That difference is a design choice, not a law — it can be changed at any time.",
      "The tell isn't hours used. It's whether stopping feels like a decision or a struggle.",
    ],
    wrong:
      "This page is itself an AI-shaped answer to a question about whether AI is trustworthy. That's a conflict of interest worth naming out loud, and worth weighing against what you observe yourself.",
  },
  {
    id: "resist-us-stronger",
    topic: "reliance",
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
    id: "brains-facts",
    topic: "trust",
    excerpt: "Will youth be able to differentiate between facts and AI?",
    full:
      "How can we have community AI systems to promote ingenuity instead of having " +
      "thoughts and ideas washed out by the global AI? How will AI change how our " +
      "brains work? Will youth be able to differentiate between facts and AI? Will we " +
      "get to a point where we feel lost without AI? I am hopeful about how AI can " +
      "help people with disabilities.",
    tradeoffs: [
      "\"Facts vs. AI\" is a false pair — the real skill is telling a supported claim from an unsupported one, whatever produced it. That skill transfers; a rule about AI specifically doesn't.",
      "Young people are often better at spotting synthetic media than adults assume, and worse at spotting confident wrong prose. The worry may be aimed at the wrong failure.",
      "The same card hopes this helps people with disabilities. Both things are true at once, and a policy that only addresses the fear loses the benefit.",
    ],
    wrong:
      "This tool produces fluent, confident text — which is exactly the thing the card is worried about. Fluency here is not evidence of accuracy, including in this sentence.",
  },
  {
    id: "safeguards",
    topic: "trust",
    excerpt:
      "Fear: using a tool without knowing or trusting the safeguards that exist or do not exist.",
    full:
      "Hope: force multiplier for communities to amplify their work. Fear: Using a " +
      "tool without knowing or trusting the safeguards that exist or do not exist.",
    tradeoffs: [
      "You can read what a company publishes about its safeguards. You generally cannot verify it independently. That gap is real and doesn't close by reading more marketing.",
      "Trusting an institution you can't audit isn't unique to AI — it's true of your bank and your water utility. What's missing here is the track record and the regulator, not the possibility of trust.",
      "The same card calls it a force multiplier for communities. Both are held by one person; that's not confusion, it's an accurate read of an unsettled situation.",
    ],
    wrong:
      "You are reading an assessment of AI trustworthiness rendered by an AI. Treat it as a starting point for your own inquiry, not the end of one.",
  },
  {
    id: "individual-agency",
    topic: "trust",
    excerpt:
      "How do we avoid a future where those who can afford more compute have more power? How do we democratize the benefit of AI?",
    full:
      "I AM CONCERNED ABOUT INDIVIDUAL AGENCY. How do we avoid a future where those " +
      "who can afford more compute have more power to influence, govern, and rule " +
      "others? How do we democratize the benefit of AI?",
    tradeoffs: [
      "Access is getting cheaper and capability is concentrating, at the same time. Both trends are real, and which one dominates isn't settled.",
      "\"Democratize\" can mean everyone gets access, or everyone gets a say in how it's built. The July 21 wall asked for the second more often than the first.",
      "This is a policy question wearing a technology costume. It gets decided in legislatures and procurement contracts, not in product design.",
    ],
    wrong:
      "This card is about power, and this tool is made by a company with a stake in the answer. Weight it accordingly — and go find someone with no stake before you settle your view.",
  },
  {
    id: "future-generations",
    topic: "trust",
    excerpt: "What does this mean for our future generations? — Environment · Safety · Humanity",
    full: "What does this mean for our future generations? - Environment - Safety - Humanity",
    tradeoffs: [
      "The environment part is the most concrete and least discussed: data centers draw water and power, and in Alaska that lands on electricity rates, land use, and subsistence activities.",
      "Long-horizon questions resist honest answers. The useful move is usually to ask what would have to be true for the bad version, and then watch for those things.",
      "Three very different questions are stacked on one card. They have different evidence, different timelines, and different people who could act on them.",
    ],
    wrong:
      "Nobody can answer this card, including this page. What it can do is break the question into pieces small enough that someone in Anchorage could actually check one.",
  },
];
