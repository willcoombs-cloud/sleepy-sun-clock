import { NightSky } from "./NightSky";
import { OwlIcon } from "./OwlIcon";
import { SunIcon } from "./SunIcon";
import { ProgressBar } from "./ProgressBar";

interface SleepClockProps {
  currentTime: Date;
  sleepTime: string; // "HH:MM"
  wakeTime: string;  // "HH:MM"
  showClock: boolean;
}

function parseTime(timeStr: string): { h: number; m: number } {
  const [h, m] = timeStr.split(":").map(Number);
  return { h, m };
}

function getMinutesSinceMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

function timeStrToMinutes(str: string): number {
  const { h, m } = parseTime(str);
  return h * 60 + m;
}

export function SleepClock({ currentTime, sleepTime, wakeTime, showClock }: SleepClockProps) {
  const nowMins = getMinutesSinceMidnight(currentTime);
  const wakeMins = timeStrToMinutes(wakeTime);
  const sleepMins = timeStrToMinutes(sleepTime);

  // Determine if it's "night" (sleep time)
  // Sleep spans midnight typically: e.g. 19:30 -> 07:00
  let isNight: boolean;
  if (sleepMins > wakeMins) {
    // spans midnight
    isNight = nowMins >= sleepMins || nowMins < wakeMins;
  } else {
    isNight = nowMins >= sleepMins && nowMins < wakeMins;
  }

  // Progress bar: show in the last 120 minutes before wake
  let progress = 0;
  const LEAD_MINUTES = 120;
  if (isNight) {
    let minsUntilWake: number;
    if (nowMins < wakeMins) {
      minsUntilWake = wakeMins - nowMins;
    } else {
      minsUntilWake = (24 * 60 - nowMins) + wakeMins;
    }
    if (minsUntilWake <= LEAD_MINUTES) {
      progress = 1 - minsUntilWake / LEAD_MINUTES;
    }
  }

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={`relative flex-1 flex flex-col items-center justify-center transition-all duration-[2000ms] ${
        isNight ? "night-gradient" : "morning-gradient"
      }`}
    >
      {isNight && <NightSky />}

      <div className="relative z-10 flex flex-col items-center gap-8">
        {isNight ? <OwlIcon /> : <SunIcon />}

        {isNight && progress > 0 && <ProgressBar progress={progress} />}

        {showClock && (
          <p
            className={`text-5xl md:text-7xl font-extrabold tabular-nums tracking-tight ${
              isNight ? "text-night-foreground opacity-40" : "text-morning-foreground opacity-70"
            }`}
          >
            {formattedTime}
          </p>
        )}
      </div>
    </div>
  );
}
