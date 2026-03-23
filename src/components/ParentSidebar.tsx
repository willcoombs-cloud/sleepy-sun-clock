import { useState } from "react";
import { Moon, Sun, Eye, EyeOff, Clock, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface ParentSidebarProps {
  sleepTime: string;
  wakeTime: string;
  showClock: boolean;
  timeOverride: number | null;
  onSleepTimeChange: (v: string) => void;
  onWakeTimeChange: (v: string) => void;
  onShowClockChange: (v: boolean) => void;
  onTimeOverrideChange: (v: number | null) => void;
}

export function ParentSidebar({
  sleepTime,
  wakeTime,
  showClock,
  timeOverride,
  onSleepTimeChange,
  onWakeTimeChange,
  onShowClockChange,
  onTimeOverrideChange,
}: ParentSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        aria-label="Toggle parent controls"
      >
        {open ? <ChevronLeft className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
      </button>

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 left-0 h-full z-40 bg-sidebar text-sidebar-foreground w-72 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } flex flex-col shadow-2xl`}
      >
        <div className="pt-16 px-6 pb-6 flex-1 overflow-y-auto space-y-8">
          <h2 className="text-lg font-bold text-sidebar-primary flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Parent Dashboard
          </h2>

          {/* Sleep Time */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sidebar-foreground">
              <Moon className="w-4 h-4 text-sidebar-primary" />
              Sleepy Time
            </Label>
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => onSleepTimeChange(e.target.value)}
              className="w-full rounded-lg px-3 py-2 bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border focus:ring-2 focus:ring-sidebar-ring outline-none"
            />
          </div>

          {/* Wake Time */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sidebar-foreground">
              <Sun className="w-4 h-4 text-sidebar-primary" />
              Wake Up Time
            </Label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => onWakeTimeChange(e.target.value)}
              className="w-full rounded-lg px-3 py-2 bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border focus:ring-2 focus:ring-sidebar-ring outline-none"
            />
          </div>

          {/* Show Clock Toggle */}
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sidebar-foreground">
              {showClock ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              Show Clock
            </Label>
            <Switch checked={showClock} onCheckedChange={onShowClockChange} />
          </div>

          {/* Time Traveler Slider */}
          <div className="space-y-3 pt-4 border-t border-sidebar-border">
            <Label className="flex items-center gap-2 text-sidebar-foreground">
              <Clock className="w-4 h-4 text-sidebar-primary" />
              Time Traveler
            </Label>
            <p className="text-xs text-sidebar-foreground opacity-50">
              Slide to preview any time of day
            </p>
            <Slider
              min={0}
              max={1439}
              step={1}
              value={[timeOverride ?? new Date().getHours() * 60 + new Date().getMinutes()]}
              onValueChange={([v]) => onTimeOverrideChange(v)}
              className="w-full"
            />
            <p className="text-sm font-mono text-sidebar-primary text-center">
              {formatMinutes(timeOverride ?? new Date().getHours() * 60 + new Date().getMinutes())}
            </p>
            {timeOverride !== null && (
              <button
                onClick={() => onTimeOverrideChange(null)}
                className="w-full text-xs py-1.5 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-border transition-colors"
              >
                Reset to Real Time
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function formatMinutes(totalMins: number): string {
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}
