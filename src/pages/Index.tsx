import { useState, useEffect } from "react";
import { SleepClock } from "@/components/SleepClock";
import { ParentSidebar } from "@/components/ParentSidebar";

const Index = () => {
  const [sleepTime, setSleepTime] = useState("19:30");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [showClock, setShowClock] = useState(true);
  const [timeOverride, setTimeOverride] = useState<number | null>(null);
  const [now, setNow] = useState(new Date());

  // Tick every second
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Build the display time (real or overridden)
  const displayTime = timeOverride !== null
    ? (() => {
        const d = new Date(now);
        d.setHours(Math.floor(timeOverride / 60), timeOverride % 60, 0, 0);
        return d;
      })()
    : now;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ParentSidebar
        sleepTime={sleepTime}
        wakeTime={wakeTime}
        showClock={showClock}
        timeOverride={timeOverride}
        onSleepTimeChange={setSleepTime}
        onWakeTimeChange={setWakeTime}
        onShowClockChange={setShowClock}
        onTimeOverrideChange={setTimeOverride}
      />
      <SleepClock
        currentTime={displayTime}
        sleepTime={sleepTime}
        wakeTime={wakeTime}
        showClock={showClock}
      />
    </div>
  );
};

export default Index;
