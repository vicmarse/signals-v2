"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Cake,
  Check,
  ChevronRight,
  Home as HomeIcon,
  Infinity,
  Heart,
  Moon,
  Plus,
  Radio,
  Search,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { BottomNav } from "@/components/BottomNav";
import { FloatingParticles } from "@/components/FloatingParticles";
import { GlassCard } from "@/components/GlassCard";
import { ScreenShell } from "@/components/ScreenShell";
import { SignalOrb } from "@/components/SignalOrb";
import {
  initialSignals,
  recipients,
  signalTemplates,
  type Recipient,
  type Signal,
} from "@/data/mock";

type Screen = "feed" | "signals" | "send" | "recipients" | "launch" | "sent" | "people" | "profile" | "person";
type NavTab = "feed" | "signals" | "send" | "people" | "profile";

const nowLabel = "Today, 20:45";
const profileRecipient = recipients.find((recipient) => recipient.id === "jen") ?? recipients[0];
const groupRecipient = recipients.find((recipient) => recipient.isGroup) ?? recipients[0];
const mostConnectedName = "Jen";
const birthdaySignals = [
  { name: "Ana", date: "June 4", note: "sister" },
  { name: "Jen", date: "June 18", note: "creative mirror" },
  { name: "Edu", date: "July 2", note: "side kick" },
  { name: "Mira", date: "July 14", note: "studio friend" },
  { name: "Javi", date: "August 9", note: "chosen brother" },
  { name: "Mariuska", date: "September 21", note: "soulful anchor" },
];
const receivedSignals: Signal[] = [
  {
    id: "r1",
    intention: "saw this and thought of your launch",
    recipient: "Jen",
    tone: "warm echo",
    time: "19:12",
    color: "from-[#fff1bf] to-[#cfc7ff]",
    kind: "instant",
    date: "Today",
  },
  {
    id: "r2",
    intention: "soft landing for tonight",
    recipient: "Friends & Family",
    tone: "group glow",
    time: "08:40",
    color: "from-[#d9fff3] to-[#8f79d5]",
    kind: "daily",
    date: "Today",
  },
  {
    id: "r3",
    intention: "you have enough time",
    recipient: "Mira",
    tone: "steady lavender",
    time: "17:05",
    color: "from-[#eee2ff] to-[#ffe9cf]",
    kind: "instant",
    date: "Yesterday",
  },
  {
    id: "r4",
    intention: "tiny courage for the afternoon",
    recipient: "Edu",
    tone: "steady spark",
    time: "14:18",
    color: "from-[#fff0c9] to-[#d8d2ff]",
    kind: "instant",
    date: "Yesterday",
  },
  {
    id: "r5",
    intention: "for the whole build room",
    recipient: "Brionx",
    tone: "team current",
    time: "11:04",
    color: "from-[#d9fff3] to-[#b7a3ea]",
    kind: "daily",
    date: "May 24",
  },
  {
    id: "r6",
    intention: "rest your nervous system",
    recipient: "Ana",
    tone: "soft amber",
    time: "22:16",
    color: "from-[#fff1bf] to-[#cfc7ff]",
    kind: "instant",
    date: "May 23",
  },
];

function recipientForName(name: string) {
  return recipients.find((recipient) => recipient.name === name);
}

function entityVariant(name: string) {
  const recipient = recipientForName(name);
  if (recipient?.isGroup) return "group";
  if (name === mostConnectedName) return "favorite";
  return "person";
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("feed");
  const [signals, setSignals] = useState<Signal[]>(initialSignals);
  const [intention, setIntention] = useState("stinky support signal");
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient>(profileRecipient);
  const [lastSignal, setLastSignal] = useState<Signal | null>(null);
  const [isReleasing, setIsReleasing] = useState(false);
  const [personBack, setPersonBack] = useState<Screen>("people");

  const activeTab: NavTab =
    screen === "feed"
      ? "feed"
      : screen === "signals"
        ? "signals"
        : screen === "send" || screen === "recipients" || screen === "launch" || screen === "sent"
          ? "send"
          : screen === "profile"
            ? "profile"
            : "people";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [screen]);

  function prepareSignal(recipient = selectedRecipient) {
    if (isReleasing) return;

    const nextSignal: Signal = {
      id: crypto.randomUUID(),
      intention: intention.trim() || "thinking of you",
      recipient: recipient.name,
      tone: "quietly sent",
      time: "20:45",
      date: "Today",
      kind: recipient.isGroup ? "daily" : "instant",
      color: recipient.gradient.replace("via-[#f4d7ff] ", ""),
    };

    setSelectedRecipient(recipient);
    setLastSignal(nextSignal);
    setScreen("launch");
  }

  function completeLaunch() {
    if (!lastSignal || isReleasing) return;

    setIsReleasing(true);
    window.setTimeout(() => {
      setSignals((current) => [lastSignal, ...current]);
      setIsReleasing(false);
      setScreen("sent");
    }, 320);
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Image
        src="/images/signals-ambient.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover opacity-60 mix-blend-soft-light"
      />
      <div className="ambient-noise pointer-events-none absolute inset-0" />
      <div className="ambient-energy pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-[#ffc6da]/55 blur-3xl" />
      <div className="ambient-energy-slow pointer-events-none absolute -right-28 top-4 h-80 w-80 rounded-full bg-[#b9b1ef]/55 blur-3xl" />
      <div className="ambient-energy pointer-events-none absolute left-[38%] top-[52%] h-72 w-72 rounded-full bg-[#fff0c7]/35 blur-3xl" />
      <FloatingParticles />

      <div className="phone-frame relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden">
        <ScreenShell screenKey={screen}>
          {screen === "feed" && (
            <HomeFeed
              signals={signals}
              onViewAll={() => setScreen("signals")}
              onOpenSignal={(signal) => {
                const match = recipients.find((recipient) => recipient.name === signal.recipient);
                setSelectedRecipient(match ?? profileRecipient);
                setPersonBack("feed");
                setScreen("person");
              }}
            />
          )}

          {screen === "signals" && (
            <SignalsHistory
              signals={signals}
              onOpenSignal={(signal) => {
                const match = recipients.find((recipient) => recipient.name === signal.recipient);
                setSelectedRecipient(match ?? profileRecipient);
                setPersonBack("signals");
                setScreen("person");
              }}
            />
          )}

          {screen === "send" && (
            <SendSignal
              intention={intention}
              setIntention={setIntention}
              selectedRecipient={selectedRecipient}
              onBack={() => setScreen("feed")}
              onChoose={() => setScreen("recipients")}
            />
          )}

          {screen === "recipients" && (
            <ChooseRecipient
              selectedRecipient={selectedRecipient}
              isReleasing={isReleasing}
              onBack={() => setScreen("send")}
              onSelect={setSelectedRecipient}
              onNext={() => prepareSignal()}
            />
          )}

          {screen === "launch" && (
            <LaunchSignal
              signal={lastSignal}
              recipient={selectedRecipient}
              onBack={() => setScreen("recipients")}
              onComplete={completeLaunch}
            />
          )}

          {screen === "sent" && (
            <SignalSent
              signal={lastSignal}
              recipient={selectedRecipient}
              onFeed={() => setScreen("feed")}
              onView={() => {
                setPersonBack("signals");
                setScreen("person");
              }}
            />
          )}

          {screen === "profile" && (
            <UserProfile
              signals={signals}
            />
          )}

          {screen === "people" && (
            <PeopleList
              selectedRecipient={selectedRecipient}
              onOpen={(recipient) => {
                setSelectedRecipient(recipient);
                setPersonBack("people");
                setScreen("person");
              }}
            />
          )}

          {screen === "person" && (
            <PersonProfile
              recipient={selectedRecipient}
              signals={signals}
              onBack={() => setScreen(personBack)}
              onSend={() => {
                setIntention(`signal to ${selectedRecipient.name}`);
                setScreen("send");
              }}
            />
          )}
        </ScreenShell>

        {screen !== "launch" && (
          <div className="fixed inset-x-0 bottom-6 z-20 px-5">
            <BottomNav
              active={activeTab}
              onChange={(tab) => {
                if (tab === "feed") setScreen("feed");
                if (tab === "signals") setScreen("signals");
                if (tab === "send") setScreen("send");
                if (tab === "people") setScreen("people");
                if (tab === "profile") setScreen("profile");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function TopBar({
  title,
  onBack,
  action,
}: {
  title?: string;
  onBack?: () => void;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex h-8 items-center justify-between">
      <span aria-hidden="true" className="w-10" />
      {onBack ? (
        <button type="button" onClick={onBack} aria-label="Back" className="icon-button mr-auto">
          <ArrowLeft size={18} />
        </button>
      ) : null}
      {title ? (
        <p className="absolute left-1/2 -translate-x-1/2 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#312742]">
          {title}
        </p>
      ) : null}
      <div className="ml-auto">{action}</div>
    </header>
  );
}

function StarTile({ className = "", variant = "person" }: { className?: string; variant?: "person" | "group" | "favorite" }) {
  return (
    <div
      className={`star-tile star-tile-${variant} grid place-items-center rounded-[1.35rem] shadow-[0_0_34px_rgba(255,207,224,0.72)] ${className}`}
    >
      {variant === "group" ? (
        <UsersRound size={25} className="text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.95)]" />
      ) : (
        <Sparkles size={26} className="text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.95)]" />
      )}
    </div>
  );
}

function HomeFeed({
  signals,
  onViewAll,
  onOpenSignal,
}: {
  signals: Signal[];
  onViewAll: () => void;
  onOpenSignal: (signal: Signal) => void;
}) {
  return (
    <section>
      <TopBar
        action={
          <span aria-hidden="true" className="icon-button glow-button">
            <HomeIcon size={18} />
          </span>
        }
      />

      <div className="mb-9">
        <div className="flex items-start gap-2">
          <h1 className="text-[2.45rem] font-light leading-none tracking-normal text-[#21182e]">Signals</h1>
          <Sparkles size={16} className="mt-1 text-[#21182e]" />
        </div>
        <p className="mt-1 text-sm text-[#51425a]">Care. Quietly sent.</p>
      </div>

      <GlassCard className="energy-card p-5">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#382c44]">Your energy balance</p>
        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-5">
          <div>
            <Infinity size={64} strokeWidth={1.55} className="text-[#cf7fb0] drop-shadow-[0_0_14px_rgba(255,226,203,0.95)]" />
            <p className="mt-5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#41324b]">Unlimited</p>
          </div>
          <div className="h-24 w-px bg-[#927a92]/25" />
          <div className="space-y-3 text-[0.67rem] font-semibold uppercase leading-5 tracking-[0.14em] text-[#403247]">
            <p>Good energy</p>
            <p>Doesn't run out.</p>
            <p>Keep sending it.</p>
          </div>
        </div>
      </GlassCard>

      <div className="mb-4 mt-7 flex items-center justify-between">
        <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#33273d]">Recent signals</h2>
        <button type="button" onClick={onViewAll} className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#33273d]">
          View all
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="signal-list overflow-hidden rounded-[1.45rem]">
        {signals.slice(0, 3).map((signal) => (
          <SignalRow key={signal.id} signal={signal} onClick={() => onOpenSignal(signal)} />
        ))}
      </div>

    </section>
  );
}

function SignalRow({ signal, onClick, direction = "sent" }: { signal: Signal; onClick?: () => void; direction?: "sent" | "received" }) {
  const isDaily = signal.kind === "daily";
  const variant = entityVariant(signal.recipient);

  return (
    <button type="button" onClick={onClick} className="signal-row group w-full text-left">
      <div
        className={`signal-avatar signal-avatar-${variant} grid h-14 w-14 shrink-0 place-items-center rounded-[1rem] bg-gradient-to-br ${signal.color} soft-ring`}
      >
        {variant === "group" ? <UsersRound size={24} className="text-white" /> : isDaily ? <Heart size={24} className="text-white" /> : <Sparkles size={24} className="text-white" />}
      </div>
      <div className="min-w-0 flex-1">
        {signal.kind ? <span className={`tag ${isDaily ? "tag-daily" : ""}`}>{signal.kind}</span> : null}
        <p className="mt-1 text-sm font-medium text-[#281f32]">{direction === "received" ? "From" : "To"}: {signal.recipient}</p>
        <p className="truncate text-[0.74rem] text-[#2f2635]">{signal.intention}</p>
      </div>
      <div className="text-right text-[0.68rem] leading-5 text-[#382d40]">
        <p>{signal.date}</p>
        <p>{signal.time}</p>
      </div>
      <ChevronRight size={17} className="text-[#4d4057] transition group-active:translate-x-0.5" />
    </button>
  );
}

function SignalsHistory({
  signals,
  onOpenSignal,
}: {
  signals: Signal[];
  onOpenSignal: (signal: Signal) => void;
}) {
  const [mode, setMode] = useState<"sent" | "received">("sent");
  const visibleSignals = mode === "sent" ? signals : receivedSignals;

  return (
    <section className="signals-history-screen">
      <div className="signals-history-head">
        <TopBar
          title="Signals"
          action={
            <span aria-hidden="true" className="icon-button glow-button">
              <Radio size={18} />
            </span>
          }
        />

        <div className="mb-7">
          <h1 className="text-[2.2rem] font-light leading-none text-[#21182e]">Signal history</h1>
          <p className="mt-2 max-w-none text-[0.82rem] leading-6 text-[#5f5264]">
            Every small pulse of care you have sent and received,
            <br />
            kept in one quiet place.
          </p>
        </div>

        <div className="history-toggle">
          <button type="button" onClick={() => setMode("sent")} className={mode === "sent" ? "history-toggle-active" : ""}>
            <span>Sent</span>
          </button>
          <button type="button" onClick={() => setMode("received")} className={mode === "received" ? "history-toggle-active" : ""}>
            <span>Received</span>
          </button>
        </div>
      </div>

      <div className="signal-list signals-history-list overflow-hidden rounded-[1.45rem]">
        {visibleSignals.map((signal) => (
          <SignalRow key={signal.id} signal={signal} direction={mode} onClick={() => onOpenSignal(signal)} />
        ))}
      </div>
    </section>
  );
}

function PeopleList({
  selectedRecipient,
  onOpen,
}: {
  selectedRecipient: Recipient;
  onOpen: (recipient: Recipient) => void;
}) {
  const [query, setQuery] = useState("");
  const filteredRecipients = recipients.filter((recipient) =>
    `${recipient.name} ${recipient.relationship} ${recipient.aura}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section>
      <TopBar
        title="People"
        action={
          <span aria-hidden="true" className="icon-button glow-button">
            <UsersRound size={18} />
          </span>
        }
      />

      <div className="mb-7">
        <h1 className="text-[2.2rem] font-light leading-none text-[#21182e]">Your people</h1>
        <p className="mt-2 text-sm leading-6 text-[#5f5264]">The small circle you send care to most often.</p>
      </div>

      <button type="button" onClick={() => onOpen(groupRecipient)} className="create-group-card mb-5">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white/45 text-[#4f3b75]">
          <Plus size={22} />
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block text-sm font-semibold text-[#2d2337]">Create group</span>
          <span className="mt-1 block text-xs text-[#746779]">Example: Friends & Family</span>
        </span>
        <ArrowRight size={18} className="text-[#6c5c75]" />
      </button>

      <label className="search-field">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search contacts..."
          aria-label="Search contacts"
        />
      </label>

      <div className="mt-5 overflow-hidden rounded-[1.45rem] bg-white/25 ring-1 ring-white/45 backdrop-blur-2xl">
        {filteredRecipients.map((recipient) => {
          const active = selectedRecipient.id === recipient.id;

          return (
            <button type="button" key={recipient.id} onClick={() => onOpen(recipient)} className="person-row">
              <StarTile
                variant={recipient.isGroup ? "group" : recipient.name === mostConnectedName ? "favorite" : "person"}
                className={`h-[3.25rem] w-[3.25rem] ${recipient.id === "jo" || recipient.id === "martin" ? "night-tile" : ""}`}
              />
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-semibold text-[#30263a]">{recipient.name}</p>
                <p className="truncate text-xs text-[#746779]">{recipient.relationship}</p>
                <p className="mt-1 truncate text-xs text-[#95879a]">
                  {recipient.isGroup ? `${recipient.members?.length ?? 0} members` : recipient.aura}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#3b2d46]">{recipient.signals}</p>
                <p className="text-[0.55rem] uppercase tracking-[0.12em] text-[#8d7d91]">signals</p>
              </div>
              {active ? <Check size={16} className="text-[#503b83]" /> : <ChevronRight size={17} className="text-[#7b6e82]" />}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function UserProfile({ signals }: { signals: Signal[] }) {
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const [showAllBirthdays, setShowAllBirthdays] = useState(false);
  const profileGroups = recipients
    .filter((recipient) => recipient.isGroup)
    .map((recipient) => ({
      ...recipient,
      admin: recipient.id === "brionx" ? "Edu" : "Jen",
      addedBy: recipient.id === "brionx" ? "Edu" : "Jen",
    }));
  const favoritePerson = useMemo(() => {
    const counts = signals.reduce<Record<string, number>>((acc, signal) => {
      acc[signal.recipient] = (acc[signal.recipient] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Jen";
  }, [signals]);

  return (
    <section>
      <TopBar
        title="Profile"
        action={
          <span aria-hidden="true" className="icon-button glow-button">
            <UserRound size={18} />
          </span>
        }
      />

      <div className="mb-8 flex items-center gap-5">
        <div className="grid h-24 w-24 place-items-center rounded-[2rem] bg-[radial-gradient(circle_at_35%_30%,#fff7dc_0%,#ffc8dd_34%,#ad91df_72%,#55418d_100%)] text-2xl font-light text-white shadow-[0_18px_50px_rgba(95,70,130,0.24)]">
          VM
        </div>
        <div>
          <h1 className="text-3xl font-light text-[#21182e]">Vicente <span aria-hidden="true">🖖</span></h1>
          <p className="mt-1 text-sm text-[#51445a]">quiet care sender</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8d7e92]">Signals founder mode</p>
        </div>
      </div>

      <GlassCard className="mb-5 p-5">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-white/45 text-[#644c83]">
            <Heart size={21} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#89798e]">Current intention</p>
            <p className="mt-1 text-xl font-light text-[#2a2035]">gentle boosts, steady courage, and soft check-ins</p>
          </div>
        </div>
      </GlassCard>

      <div className="mb-5 grid grid-cols-3 gap-3">
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-light text-[#2d2238]">{signals.length}</p>
          <p className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-[#86768c]">Sent</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-light text-[#2d2238]">{recipients.length}</p>
          <p className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-[#86768c]">People</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-light text-[#2d2238]">9d</p>
          <p className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-[#86768c]">Streak</p>
        </GlassCard>
      </div>

      <GlassCard className="mb-5 p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-[#89798e]">Care pattern</p>
        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-2 flex justify-between text-sm text-[#372b42]">
              <span>Soft support</span>
              <span>72%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/45">
              <div className="h-full w-[72%] rounded-full bg-[#7551c7]" />
            </div>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm text-[#372b42]">
              <span>Night signals</span>
              <span>40%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/45">
              <div className="h-full w-[40%] rounded-full bg-[#2d275f]" />
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="mb-5 p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#89798e]">Groups</p>
            <p className="mt-1 text-2xl font-light text-[#2a2035]">{profileGroups.length}</p>
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[#d9fff3]/55 text-[#4d3478]">
            <UsersRound size={21} />
          </span>
        </div>
        <div className="space-y-3">
          {profileGroups.map((group) => {
            const expanded = openGroupId === group.id;

            return (
              <button
                type="button"
                key={group.id}
                onClick={() => setOpenGroupId(expanded ? null : group.id)}
                className="profile-group-card"
              >
                <StarTile variant="group" className="h-11 w-11 rounded-full" />
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-sm font-semibold text-[#2d2337]">{group.name}</span>
                  <span className="mt-1 block text-xs text-[#746779]">Added by {group.addedBy}</span>
                  {expanded ? (
                    <span className="mt-3 block text-xs leading-5 text-[#62546a]">
                      Admin: {group.admin}
                      <br />
                      Members: {group.members?.join(", ")}
                    </span>
                  ) : null}
                </span>
                <ChevronRight size={17} className={`text-[#6c5c75] transition ${expanded ? "rotate-90" : ""}`} />
              </button>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard className="mb-5 p-5">
        <div className="flex items-center gap-3">
          <StarTile variant="favorite" className="h-12 w-12 rounded-full" />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#89798e]">Most connected</p>
            <p className="mt-1 text-2xl font-light text-[#2a2035]">{favoritePerson}</p>
          </div>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#6f6172]">
          You and Jen trade steady little boosts: practical reassurance, late-night softness, and tiny sparks of "you got this" when one of you is carrying a lot.
        </p>
      </GlassCard>

      <GlassCard className="p-5">
        <button type="button" onClick={() => setShowAllBirthdays((current) => !current)} className="profile-birthday-card">
          <span className="birthday-icon">
            <Cake size={22} />
          </span>
          <span className="min-w-0 flex-1 text-left">
            <span className="block text-xs uppercase tracking-[0.18em] text-[#89798e]">Birthday signals</span>
            <span className="mt-1 block text-sm text-[#62546a]">Upcoming birthdays</span>
          </span>
          <ChevronRight size={17} className={`text-[#6c5c75] transition ${showAllBirthdays ? "rotate-90" : ""}`} />
        </button>
        {showAllBirthdays ? (
          <div className="mt-4 space-y-2">
            {birthdaySignals.map((birthday) => (
              <div key={birthday.name} className="birthday-row">
                <span>
                  <span className="block text-sm font-semibold text-[#2d2337]">{birthday.name}</span>
                  <span className="mt-0.5 block text-xs text-[#8a7a8e]">{birthday.note}</span>
                </span>
                <span className="text-sm font-medium text-[#5d4a75]">{birthday.date}</span>
              </div>
            ))}
          </div>
        ) : null}
      </GlassCard>

    </section>
  );
}

function SendSignal({
  intention,
  setIntention,
  selectedRecipient,
  onBack,
  onChoose,
}: {
  intention: string;
  setIntention: (value: string) => void;
  selectedRecipient: Recipient;
  onBack: () => void;
  onChoose: () => void;
}) {
  const remaining = Math.max(0, 120 - intention.length);

  return (
    <section>
      <TopBar title="Send a signal" onBack={onBack} action={<button type="button" className="icon-button glow-button" aria-label="Spark"><Sparkles size={18} /></button>} />

      <div className="relative mb-8 grid place-items-center py-5">
        <div className="orb-orbit h-64 w-64" />
        <SignalOrb size="lg" active />
      </div>

      <label className="mb-3 block text-sm font-medium text-[#30253a]">What's your signal about?</label>
      <GlassCard className="p-4">
        <textarea
          value={intention}
          onChange={(event) => setIntention(event.target.value.slice(0, 120))}
          className="min-h-36 w-full resize-none border-0 bg-transparent text-sm leading-6 text-[#493d4f] outline-none placeholder:text-[#9f8f9f]"
          placeholder="Share your thought, intention or whatever is in your heart..."
        />
        <p className="text-right text-[0.68rem] text-[#806f82]">{remaining}/120</p>
      </GlassCard>

      <div className="mt-5 flex flex-wrap gap-2">
        {signalTemplates.slice(0, 8).map((template) => (
          <button type="button" key={template} onClick={() => setIntention(template)} className="chip">
            {template}
          </button>
        ))}
        <button type="button" aria-label="More intentions" className="chip aspect-square px-0">
          <Plus size={16} />
        </button>
      </div>

      <label className="mb-3 mt-7 block text-sm font-medium text-[#30253a]">Who's it for?</label>
      <button type="button" onClick={onChoose} className="recipient-select">
        <span>{selectedRecipient ? selectedRecipient.name : "Choose a person"}</span>
        <ChevronRight size={17} />
      </button>
    </section>
  );
}

function ChooseRecipient({
  selectedRecipient,
  isReleasing,
  onBack,
  onSelect,
  onNext,
}: {
  selectedRecipient: Recipient;
  isReleasing: boolean;
  onBack: () => void;
  onSelect: (recipient: Recipient) => void;
  onNext: () => void;
}) {
  const [query, setQuery] = useState("");
  const filteredRecipients = recipients.filter((recipient) =>
    `${recipient.name} ${recipient.relationship}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section>
      <AnimatePresence>
        {isReleasing && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: [0, 1, 0], scale: [0.82, 1.35, 1.85] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-0 z-30 m-auto h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.82)_0%,rgba(255,205,231,0.46)_34%,rgba(207,199,255,0.2)_58%,transparent_72%)]"
          />
        )}
      </AnimatePresence>

      <TopBar title="Choose who" onBack={onBack} action={<span aria-hidden="true" className="icon-button glow-button"><Sparkles size={18} /></span>} />

      <label className="search-field">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search people..."
          aria-label="Search people"
        />
      </label>

      <div className="recipient-list mt-5 overflow-hidden rounded-[1.45rem] bg-white/25 ring-1 ring-white/45 backdrop-blur-2xl">
        {filteredRecipients.map((recipient) => {
          const active = selectedRecipient.id === recipient.id;

          return (
            <button
              type="button"
              key={recipient.id}
              disabled={isReleasing}
              onClick={() => onSelect(recipient)}
              className="recipient-row"
            >
              <StarTile
                variant={recipient.isGroup ? "group" : recipient.name === mostConnectedName ? "favorite" : "person"}
                className={`h-12 w-12 ${recipient.id === "jo" || recipient.id === "martin" ? "night-tile" : ""}`}
              />
              <span className="flex-1 text-sm font-medium text-[#30263a]">{recipient.name}</span>
              <span className={`radio-dot ${active ? "radio-dot-active" : ""}`}>
                {active ? <span /> : null}
              </span>
            </button>
          );
        })}
        <button type="button" className="recipient-row">
          <span className="grid h-12 w-12 place-items-center text-[#2f2439]">
            <Plus size={20} />
          </span>
          <span className="flex-1 text-sm font-medium text-[#30263a]">Add new person</span>
        </button>
      </div>

      <button type="button" onClick={onNext} disabled={isReleasing} className="primary-button mt-8 disabled:opacity-70">
        <span>Next</span>
        <ArrowRight size={22} />
      </button>
    </section>
  );
}

function LaunchSignal({
  signal,
  recipient,
  onBack,
  onComplete,
}: {
  signal: Signal | null;
  recipient: Recipient;
  onBack: () => void;
  onComplete: () => void;
}) {
  const [power, setPower] = useState(0);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    if (!launched) return;

    const timer = window.setTimeout(onComplete, 760);
    return () => window.clearTimeout(timer);
  }, [launched, onComplete]);

  const progress = launched ? 100 : power;
  const beamWidth = 18 + progress * 1.08;
  const beamHeight = 34 + progress * 0.62;
  const beamOpacity = progress / 115;
  const coreY = 18 - progress * 0.24;
  const coreScale = 0.92 + progress * 0.0065;
  const coreGlow = 0.7 + progress / 120;
  const coreIntensity = 1 + progress / 230;
  const cueOpacity = launched ? 0 : Math.max(0, 1 - progress / 78);

  function updatePower(value: number) {
    if (launched) return;

    const nextValue = Math.max(0, Math.min(100, value));
    setPower(nextValue);
    if (nextValue >= 96) {
      setPower(100);
      setLaunched(true);
    }
  }

  function handleSliderPointer(event: ReactPointerEvent<HTMLDivElement>) {
    if (launched) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = event.currentTarget.getBoundingClientRect();
    updatePower(((rect.bottom - event.clientY) / rect.height) * 100);
  }

  return (
    <section
      className={`launch-screen ${launched ? "launch-screen-complete" : ""}`}
      style={{
        "--launch-power": `${progress}%`,
        "--beam-width": `${beamWidth}px`,
        "--beam-height": `${beamHeight}vh`,
        "--beam-opacity": `${beamOpacity}`,
        "--core-y": `${coreY}px`,
        "--core-scale": `${coreScale}`,
        "--core-glow": `${coreGlow}`,
        "--core-intensity": `${coreIntensity}`,
        "--cue-opacity": `${cueOpacity}`,
      } as CSSProperties}
    >
      <button type="button" onClick={onBack} aria-label="Back" className="icon-button launch-back">
        <ArrowLeft size={18} />
      </button>

      <div aria-hidden="true" className="launch-beam" />
      <div aria-hidden="true" className="launch-core" />
      <div aria-hidden="true" className="launch-scroll-cue">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} style={{ "--cue-delay": `${index * 0.18}s` } as CSSProperties} />
        ))}
      </div>
      <div aria-hidden="true" className="launch-flash" />

      <div className="launch-copy">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#51415b]">Release signal</p>
        <h1 className="mt-3 text-3xl font-light leading-tight text-[#21182e]">Slide up to send</h1>
        <p className="mt-3 text-sm leading-6 text-[#645768]">
          To {recipient.name}
          <br />
          "{signal?.intention ?? "thinking of you"}"
        </p>
      </div>

      <div
        className="launch-slider-wrap"
        role="slider"
        tabIndex={0}
        aria-label="Slide up to launch signal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        onPointerDown={handleSliderPointer}
        onPointerMove={(event) => {
          if (event.buttons === 1) handleSliderPointer(event);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp") updatePower(power + 12);
          if (event.key === "ArrowDown") updatePower(power - 12);
          if (event.key === "Home") updatePower(0);
          if (event.key === "End") updatePower(100);
        }}
      >
        <div className="launch-slider-track">
          <div className="launch-slider-fill" />
          <div className="launch-slider-thumb">
            <Sparkles size={24} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalSent({
  signal,
  recipient,
  onFeed,
  onView,
}: {
  signal: Signal | null;
  recipient: Recipient;
  onFeed: () => void;
  onView: () => void;
}) {
  return (
    <section className="sent-screen relative flex flex-col text-center">
      <button type="button" aria-label="New signal" className="icon-button sent-top-action">
        <Sparkles size={18} />
      </button>

      <div aria-hidden="true" className="sent-pulse-field">
        <div className="sent-pulse">
          <span className="sent-pulse-star">
            <Sparkles size={62} strokeWidth={1.45} />
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[21rem] flex-1 flex-col items-center">
        <h1 className="flex items-start justify-center gap-2 text-[2.35rem] font-light leading-none text-[#21182e]">
          Signal sent
          <Sparkles size={17} />
        </h1>
        <p className="sent-recipient-pill mt-7">To {recipient.name}</p>
        <p className="mt-6 text-base text-[#241b2c]">"{signal?.intention ?? "thinking of you"}"</p>
        <div className="sent-divider" />
        <p className="text-sm font-medium text-[#817386]">{nowLabel}</p>
      </div>

      <button type="button" onClick={onView} className="primary-button mt-7">
        <span>View signal</span>
        <ArrowRight size={22} />
      </button>
      <button type="button" onClick={onFeed} className="mx-auto mt-4 block text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-[#6f5a82]">
        Back to home
      </button>
    </section>
  );
}

function AbstractSilhouette() {
  return (
    <div aria-hidden="true" className="abstract-wrap">
      <div className="abstract-head" />
      <div className="abstract-body" />
      <div className="abstract-orb">
        <SignalOrb size="md" active />
      </div>
      <div className="abstract-rings" />
    </div>
  );
}

function PersonProfile({
  recipient,
  signals,
  onBack,
  onSend,
}: {
  recipient: Recipient;
  signals: Signal[];
  onBack: () => void;
  onSend: () => void;
}) {
  const history = useMemo(() => {
    const matching = signals.filter((signal) => signal.recipient === recipient.name);
    return matching.length > 0 ? matching : initialSignals.filter((signal) => signal.recipient === profileRecipient.name);
  }, [recipient.name, signals]);

  return (
    <section>
      <TopBar onBack={onBack} action={<button type="button" aria-label="People" className="icon-button"><UsersRound size={18} /></button>} />

      <div className="mb-9 flex items-center gap-5">
        <StarTile variant={recipient.isGroup ? "group" : recipient.name === mostConnectedName ? "favorite" : "person"} className="h-20 w-20" />
        <div>
          <h1 className="text-3xl font-light text-[#21182e]">{recipient.name}</h1>
          <p className="mt-1 text-sm text-[#403544]">{recipient.connection}</p>
          <p className="mt-1 text-sm text-[#403544]">{recipient.signals} signals</p>
        </div>
      </div>

      <div className="mb-7 grid grid-cols-2 border-b border-[#806e82]/18 text-center">
        <button type="button" className="border-b border-[#34283e] pb-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#2d2336]">
          History
        </button>
        <button type="button" className="pb-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#65576a]">
          About
        </button>
      </div>

      <div className="profile-history overflow-hidden rounded-[1.45rem] bg-white/24 ring-1 ring-white/45 backdrop-blur-2xl">
        {history.slice(0, 5).map((signal) => (
          <SignalRow key={signal.id} signal={signal} />
        ))}
      </div>

      <button type="button" onClick={onSend} className="primary-button mt-10">
        <span>Send signal to {recipient.name}</span>
        <ArrowRight size={22} />
      </button>
    </section>
  );
}
