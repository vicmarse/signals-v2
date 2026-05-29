"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Ellipsis,
  Infinity,
  Moon,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

type Screen = "feed" | "send" | "recipients" | "sent" | "profile";
type NavTab = "feed" | "signals" | "send" | "people" | "profile";

const nowLabel = "Today, 20:45";
const profileRecipient = recipients.find((recipient) => recipient.id === "jen") ?? recipients[0];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("feed");
  const [signals, setSignals] = useState<Signal[]>(initialSignals);
  const [intention, setIntention] = useState("stinky support signal");
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient>(profileRecipient);
  const [lastSignal, setLastSignal] = useState<Signal | null>(null);
  const [isReleasing, setIsReleasing] = useState(false);

  const activeTab: NavTab =
    screen === "feed" ? "feed" : screen === "send" || screen === "sent" ? "signals" : "people";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [screen]);

  function createSignal(recipient = selectedRecipient) {
    if (isReleasing) return;

    const nextSignal: Signal = {
      id: crypto.randomUUID(),
      intention: intention.trim() || "thinking of you",
      recipient: recipient.name,
      tone: "quietly sent",
      time: "20:45",
      date: "Today",
      kind: intention.toLowerCase().includes("bed") ? "nightly support" : "instant",
      color: recipient.gradient.replace("via-[#f4d7ff] ", ""),
    };

    setSelectedRecipient(recipient);
    setLastSignal(nextSignal);
    setIsReleasing(true);

    window.setTimeout(() => {
      setSignals((current) => [nextSignal, ...current]);
      setIsReleasing(false);
      setScreen("sent");
    }, 720);
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
              onOpenSignal={(signal) => {
                const match = recipients.find((recipient) => recipient.name === signal.recipient);
                setSelectedRecipient(match ?? profileRecipient);
                setScreen("profile");
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
              onNext={() => createSignal()}
            />
          )}

          {screen === "sent" && (
            <SignalSent
              signal={lastSignal}
              recipient={selectedRecipient}
              onFeed={() => setScreen("feed")}
              onView={() => setScreen("profile")}
            />
          )}

          {screen === "profile" && (
            <PersonProfile
              recipient={selectedRecipient}
              signals={signals}
              onBack={() => setScreen("feed")}
              onSend={() => {
                setIntention(`signal to ${selectedRecipient.name}`);
                setScreen("send");
              }}
            />
          )}
        </ScreenShell>

        {(screen === "feed" || screen === "profile") && (
          <div className="fixed inset-x-0 bottom-4 z-20 px-4">
            <BottomNav
              active={activeTab}
              onChange={(tab) => {
                if (tab === "feed") setScreen("feed");
                if (tab === "signals" || tab === "send") setScreen("send");
                if (tab === "people" || tab === "profile") setScreen("profile");
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
      <span className="w-10 text-xs font-medium text-white">20:47</span>
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

function StarTile({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid place-items-center rounded-[1.35rem] bg-[radial-gradient(circle_at_35%_28%,#fff7da_0%,#ffc7d6_36%,#9c8bd5_72%,#2a245f_100%)] shadow-[0_0_34px_rgba(255,207,224,0.72)] ${className}`}
    >
      <Sparkles size={26} className="text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.95)]" />
    </div>
  );
}

function HomeFeed({
  signals,
  onOpenSignal,
}: {
  signals: Signal[];
  onOpenSignal: (signal: Signal) => void;
}) {
  return (
    <section>
      <TopBar
        action={
          <span aria-hidden="true" className="icon-button glow-button">
            <Sparkles size={18} />
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
        <button type="button" className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#33273d]">
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

function SignalRow({ signal, onClick }: { signal: Signal; onClick?: () => void }) {
  const isNight = signal.kind === "nightly support";

  return (
    <button type="button" onClick={onClick} className="signal-row group w-full text-left">
      <div
        className={`grid h-14 w-14 shrink-0 place-items-center rounded-[1rem] bg-gradient-to-br ${signal.color} soft-ring`}
      >
        {isNight ? <Moon size={26} className="text-white" /> : <Sparkles size={24} className="text-white" />}
      </div>
      <div className="min-w-0 flex-1">
        <span className="tag">{signal.kind}</span>
        <p className="mt-1 text-sm font-medium text-[#281f32]">To: {signal.recipient}</p>
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

      <TopBar title="Choose who" onBack={onBack} />

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
              <StarTile className={`h-12 w-12 ${recipient.id === "jo" || recipient.id === "martin" ? "night-tile" : ""}`} />
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
    <section className="flex min-h-[calc(100vh-8rem)] flex-col">
      <TopBar action={<button type="button" aria-label="New signal" className="icon-button"><Sparkles size={18} /></button>} />

      <div className="relative flex flex-1 flex-col items-center justify-center pb-10 text-center">
        <AbstractSilhouette />
        <div className="relative z-10 mt-auto">
          <h1 className="flex items-start justify-center gap-1 text-[2rem] font-light leading-none text-[#21182e]">
            Signal sent
            <Sparkles size={15} />
          </h1>
          <p className="mt-6 text-sm text-[#241b2c]">To {recipient.name}</p>
          <p className="mt-2 text-base text-[#241b2c]">"{signal?.intention ?? "thinking of you"}"</p>
          <p className="mt-7 text-xs text-[#817386]">{nowLabel}</p>
        </div>
      </div>

      <button type="button" onClick={onView} className="primary-button">
        <span>View signal</span>
        <ArrowRight size={22} />
      </button>
      <button type="button" onClick={onFeed} className="mx-auto mt-6 block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#5c4e61]">
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
      <TopBar onBack={onBack} action={<button type="button" aria-label="Profile options" className="icon-button"><Ellipsis size={19} /></button>} />

      <div className="mb-9 flex items-center gap-5">
        <StarTile className="h-20 w-20" />
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
