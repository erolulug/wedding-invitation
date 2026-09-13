import { useEffect, useState } from "react";
import { Button } from "./Button";

export interface EnvelopeIntroProps {
  monogram: string;
  date: string;
  prompt: string;
  onOpened?: () => void;
}

function BotanicalSprig({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 84 270" aria-hidden="true">
      <g className="sprig-shadow" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M42 262C37 225 43 195 39 160C36 126 42 91 39 54C38 36 41 19 45 7" />
        <path d="M40 222c-15-13-26-15-34-8 8 13 19 17 34 14M40 198c15-13 27-15 36-7-9 13-21 17-36 13M39 167c-16-13-27-15-35-7 9 13 20 17 35 13M39 143c15-13 27-15 36-7-9 13-21 17-36 13M39 111c-14-12-25-14-33-7 8 12 19 16 33 12M40 87c14-12 25-14 33-7-8 12-19 16-33 12M41 56c-11-10-20-12-27-6 7 10 16 13 27 10" />
        <circle cx="40" cy="131" r="4" />
        <path d="M39 131c-13-9-14-19-5-26 11 5 14 14 5 26M41 131c13-9 14-19 5-26-11 5-14 14-5 26M41 49c-12-10-10-22 1-30 12 9 12 19-1 30M42 48c14-7 24-2 27 9-12 8-22 5-27-9" />
      </g>
    </svg>
  );
}

export function EnvelopeIntro({ monogram, date, prompt, onOpened }: EnvelopeIntroProps) {
  const [phase, setPhase] = useState<"closed" | "opening" | "revealed" | "gone">("closed");

  useEffect(() => {
    if (phase !== "opening") return;
    const reveal = window.setTimeout(() => setPhase("revealed"), 1050);
    const finish = window.setTimeout(() => {
      setPhase("gone");
      onOpened?.();
    }, 2550);
    return () => { window.clearTimeout(reveal); window.clearTimeout(finish); };
  }, [phase, onOpened]);

  if (phase === "gone") return null;

  return (
    <div className={`envelope-stage envelope-stage--${phase}`}>
      <div className="envelope-scene">
        <div className="invitation-peek" aria-hidden={phase === "closed"}>
          <span className="invitation-peek__mark">{monogram}</span>
          <span className="invitation-peek__rule" />
          <span className="invitation-peek__date">{date}</span>
        </div>
        <div className="envelope-object">
          <div className="envelope-back" />
          <div className="envelope-front">
            <div className="fold fold--left" />
            <div className="fold fold--right" />
            <div className="fold fold--bottom" />
            <BotanicalSprig className="botanical botanical--left-top" />
            <BotanicalSprig className="botanical botanical--right-top" />
            <BotanicalSprig className="botanical botanical--left-bottom" />
            <BotanicalSprig className="botanical botanical--right-bottom" />
          </div>
          <div className="envelope-flap" />
          <Button
            variant="seal"
            size="icon"
            className="wax-seal"
            aria-label={prompt}
            disabled={phase !== "closed"}
            onClick={() => setPhase("opening")}
          >
            <span>{monogram}</span>
          </Button>
        </div>
      </div>
      <div className="envelope-instruction" aria-hidden={phase !== "closed"}>
        <span className="envelope-instruction__chevron">⌃</span>
        <span>{prompt}</span>
      </div>
    </div>
  );
}
