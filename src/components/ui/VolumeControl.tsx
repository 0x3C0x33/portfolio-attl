// src/components/ui/VolumeControl.tsx
import { useState, useRef, useEffect} from "react";
import type { ChangeEvent } from "react";
import "xp.css/dist/XP.css";

export function VolumeControl() {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(80);
  const [lastVolume, setLastVolume] = useState(80);
  const rangeRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSliderInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newVolume = event.target.valueAsNumber;

    if (newVolume > 0) {
      setLastVolume(newVolume);
    }
    setVolume(newVolume);
    audioSearch(newVolume);
  };

  const handleToggleMute = () => {
    if (volume > 0) {
      setLastVolume(volume);
      setVolume(0);
      audioSearch(0);
    } else {
      const restoredVolume = lastVolume > 0 ? lastVolume : 80;
      setVolume(restoredVolume);
      audioSearch(restoredVolume);
    }
  };

  function audioSearch(volumeValue = volume) {
    document.querySelectorAll<HTMLMediaElement>("audio, video").forEach((media) => {
      media.volume = volumeValue / 100;
    });
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      {/* Botón Altavoz en System Tray */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Volumen"
        style={{
          background: "transparent",
          border: "none",
          padding: "1px 3px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "0px",
        }}
      >
        <span style={{ fontSize: "12px", lineHeight: "1" }}>
          {volume === 0 ? "🔇" : "🔊"}
        </span>
      </button>

      {/* Popover del Control */}
      {isOpen && (
        <div
          className="window"
          style={{
            position: "absolute",
            bottom: "28px",
            left: "-28px",
            padding: "8px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            zIndex: 10000,
            boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            borderRadius: "0px",
          }}
        >
          <span style={{ fontSize: "11px", fontFamily: "Tahoma, sans-serif", marginBottom: "20px" }}>
            Volumen
          </span>

          <div className="field-row">
            {volume}%
            <div className="is-vertical" style={{ height: "100px", margin: "5px 5px 25px 5px" }}>
              <input
                ref={rangeRef}
                id="volumen"
                className="has-box-indicator"
                type="range"
                min="0"
                max="100"
                step="1"
                value={volume}
                onChange={handleSliderInput}
              />
            </div>
          </div>

          <div className="field-row" style={{ marginTop: "2px" }}>
            <button
              onClick={handleToggleMute}
              style={{
                fontSize: "10px",
                padding: "1px 6px",
                minWidth: "auto",
                cursor: "pointer",
              }}
            >
              {volume === 0 ? "Activar" : "Silencio"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
