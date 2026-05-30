export type Recipient = {
  id: string;
  name: string;
  relationship: string;
  aura: string;
  initials: string;
  gradient: string;
  signals: number;
  connection: string;
  isGroup?: boolean;
  members?: string[];
};

export type Signal = {
  id: string;
  intention: string;
  recipient: string;
  tone: string;
  time: string;
  color: string;
  pulsePalette?: string[];
  kind?: "instant" | "daily";
  date: string;
};

export const recipients: Recipient[] = [
  {
    id: "friends-family",
    name: "Friends & Family",
    relationship: "care group",
    aura: "A shared circle for one signal sent to everyone",
    initials: "FF",
    gradient: "from-[#ffe4c7] via-[#ffcbdc] to-[#8f79d5]",
    signals: 31,
    connection: "group of 6 people",
    isGroup: true,
    members: ["Jen", "Mira", "Jo", "Ana", "Javi", "Juanin"],
  },
  {
    id: "mira",
    name: "Mira",
    relationship: "studio friend",
    aura: "Needs softness before a big opening",
    initials: "MI",
    gradient: "from-[#ffd6e8] via-[#f4d9ff] to-[#d6e5ff]",
    signals: 18,
    connection: "studio friend",
  },
  {
    id: "brionx",
    name: "Brionx",
    relationship: "build group",
    aura: "A focused crew for brave work and clean launches",
    initials: "BX",
    gradient: "from-[#d9fff3] via-[#d7e9ff] to-[#9f86df]",
    signals: 16,
    connection: "group of 7 people",
    isGroup: true,
    members: ["Edu", "Laura", "Mateo", "Ana", "Patri", "Victor", "Julia"],
  },
  {
    id: "jo",
    name: "Jo",
    relationship: "chosen family",
    aura: "Moving through a quiet reset",
    initials: "JO",
    gradient: "from-[#ffe9c8] via-[#ffd3da] to-[#dbd2ff]",
    signals: 15,
    connection: "chosen family",
  },
  {
    id: "sol",
    name: "Sol",
    relationship: "collaborator",
    aura: "Preparing for a brave conversation",
    initials: "SO",
    gradient: "from-[#d9fff3] via-[#ffe2f0] to-[#f8e0ff]",
    signals: 9,
    connection: "collaborator",
  },
  {
    id: "ana",
    name: "Ana",
    relationship: "sister",
    aura: "Could use evening calm",
    initials: "AN",
    gradient: "from-[#fff1bf] via-[#ffcbd7] to-[#cfc7ff]",
    signals: 22,
    connection: "sister",
  },
  {
    id: "jen",
    name: "Jen",
    relationship: "creative mirror",
    aura: "Holding a lot with grace",
    initials: "JE",
    gradient: "from-[#ffe1f1] via-[#f4d7ff] to-[#d7f0ff]",
    signals: 12,
    connection: "You have connected",
  },
  {
    id: "edu",
    name: "Edu",
    relationship: "side kick",
    aura: "Needs courage for a clean start",
    initials: "ED",
    gradient: "from-[#fff0c9] via-[#ffd6df] to-[#d8d2ff]",
    signals: 7,
    connection: "side kick",
  },
  {
    id: "mariuska",
    name: "Mariuska",
    relationship: "soulful anchor",
    aura: "Could use a wave of tenderness",
    initials: "MA",
    gradient: "from-[#e0fff6] via-[#ffe0ef] to-[#eee0ff]",
    signals: 19,
    connection: "soulful anchor",
  },
  {
    id: "martin",
    name: "Martin",
    relationship: "deep listener",
    aura: "Moving through a focused season",
    initials: "MR",
    gradient: "from-[#ffe6c8] via-[#ffd2ea] to-[#d6e3ff]",
    signals: 10,
    connection: "deep listener",
  },
  {
    id: "javi",
    name: "Javi",
    relationship: "chosen brother",
    aura: "Needs lightness and good luck",
    initials: "JA",
    gradient: "from-[#f7ffd1] via-[#ffd8e2] to-[#d9d1ff]",
    signals: 14,
    connection: "chosen brother",
  },
  {
    id: "juanin",
    name: "Juanin",
    relationship: "heart circle",
    aura: "Ready for a soft reminder",
    initials: "JU",
    gradient: "from-[#dff5ff] via-[#ffe2e9] to-[#f2ddff]",
    signals: 6,
    connection: "heart circle",
  },
];

export const signalTemplates = [
  "care",
  "support",
  "love",
  "gratitude",
  "thinking of you",
  "strength and peace",
  "focus",
  "pre-bed support",
  "good luck today",
  "rest and recharge",
];

export const initialSignals: Signal[] = [
  {
    id: "s1",
    intention: "rest and recharge",
    recipient: "Ana",
    tone: "warm blush",
    time: "20:45",
    color: "from-[#ffe2ed] to-[#d9d1ff]",
    kind: "instant",
    date: "Today",
  },
  {
    id: "s6",
    intention: "daily warmth for the whole circle",
    recipient: "Friends & Family",
    tone: "shared glow",
    time: "09:00",
    color: "from-[#ffe4c7] to-[#8f79d5]",
    kind: "daily",
    date: "Today",
  },
  {
    id: "s2",
    intention: "a little steadiness for the morning",
    recipient: "Mira",
    tone: "lavender hush",
    time: "23:00",
    color: "from-[#eee2ff] to-[#ffe9cf]",
    date: "Today",
  },
  {
    id: "s3",
    intention: "good luck today",
    recipient: "Sol",
    tone: "peach light",
    time: "18:30",
    color: "from-[#ffdfd1] to-[#d5ecff]",
    kind: "instant",
    date: "Yesterday",
  },
  {
    id: "s4",
    intention: "sweet dreams",
    recipient: "Jen",
    tone: "moon calm",
    time: "23:00",
    color: "from-[#171642] to-[#ffd9f0]",
    date: "May 18",
  },
  {
    id: "s5",
    intention: "you got this",
    recipient: "Jen",
    tone: "steady glow",
    time: "10:22",
    color: "from-[#ffd4e4] to-[#d8ccff]",
    kind: "instant",
    date: "May 18",
  },
  {
    id: "s7",
    intention: "keep the room warm while you ship",
    recipient: "Brionx",
    tone: "team glow",
    time: "16:10",
    color: "from-[#d9fff3] to-[#9f86df]",
    kind: "daily",
    date: "May 17",
  },
  {
    id: "s8",
    intention: "a quiet yes for the hard part",
    recipient: "Edu",
    tone: "steady current",
    time: "12:32",
    color: "from-[#fff0c9] to-[#d8d2ff]",
    kind: "instant",
    date: "May 16",
  },
  {
    id: "s9",
    intention: "you are allowed to move slowly",
    recipient: "Mariuska",
    tone: "soft anchor",
    time: "21:08",
    color: "from-[#e0fff6] to-[#eee0ff]",
    kind: "instant",
    date: "May 15",
  },
  {
    id: "s10",
    intention: "one clean breath before the call",
    recipient: "Javi",
    tone: "light luck",
    time: "09:44",
    color: "from-[#f7ffd1] to-[#d9d1ff]",
    kind: "instant",
    date: "May 14",
  },
];

export const profileStats = [
  { label: "signals sent", value: "128" },
  { label: "care circle", value: "20" },
  { label: "streak", value: "9d" },
];
