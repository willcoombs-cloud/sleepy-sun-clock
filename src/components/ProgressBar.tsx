interface ProgressBarProps {
  progress: number; // 0–1
}

export function ProgressBar({ progress }: ProgressBarProps) {
  if (progress <= 0) return null;

  return (
    <div className="w-64 md:w-80 mx-auto">
      <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "hsl(var(--progress-track))" }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-linear progress-glow"
          style={{
            width: `${Math.min(progress * 100, 100)}%`,
            background: `linear-gradient(90deg, hsl(var(--progress-fill)), hsl(45 100% 70%))`,
          }}
        />
      </div>
      <p className="text-center mt-2 text-sm font-semibold text-night-foreground opacity-60">
        Morning is coming…
      </p>
    </div>
  );
}
