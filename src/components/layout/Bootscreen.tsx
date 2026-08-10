// src/components/layout/Bootscreen.tsx
import { useState, useEffect } from "react";
import type { BootState } from "../../hooks/useBootSequence";
import "xp.css/dist/XP.css";

interface BootscreenProps {
  bootState: BootState;
  durationMs?: number;
}

export function Bootscreen({ bootState, durationMs = 3000 }: BootscreenProps) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (bootState !== "booting") return;

    const intervalTime = 50;
    const increment = 100 / (durationMs / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [bootState, durationMs]);

  if (bootState === "ready") return null;

  // Si ya no está en 'booting' (ej. 'fading'), nos aseguramos de que muestre el 100% de forma derivada
  const currentProgress = bootState !== "booting" ? 100 : Math.round(progress);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000000",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: bootState === "fading" ? 0 : 1,
        transition: "opacity 1s ease-in-out",
        pointerEvents: bootState === "fading" ? "none" : "auto",
        userSelect: "none",
      }}
    >
      <div>
        <img
          src="/images/boot.png"
          alt="attl.dev Logo"
          style={{ width: "400px", height: "auto", marginBottom: "20px" }}
        />
      </div>

      {/* Contenedor de la Progress Bar estilo XP */}
      <div
        style={{
          width: "180px",
          height: "14px",
          padding: "2px",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <progress max="100" value={currentProgress} style={{ width: "100%" }}></progress>
      </div>
    </div>
  );
}