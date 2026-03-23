export function OwlIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center owl-breathe ${className}`}>
      <span className="text-[8rem] md:text-[12rem] leading-none select-none drop-shadow-2xl">
        🦉
      </span>
      <p className="mt-4 text-2xl md:text-4xl font-bold tracking-wide text-night-foreground opacity-80">
        Sleepy Time
      </p>
    </div>
  );
}
