import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function NightSky() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "hsl(var(--star-glow))",
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
