// src/components/ui/WallpaperSelector.tsx
import { useState, useRef, useEffect } from "react";
import { WALLPAPERS } from "../../types/wallpapers";
import "xp.css/dist/XP.css";

interface WallpaperSelectorProps {
  currentWallpaper: string;
  onSelectWallpaper: (url: string) => void;
}

export function WallpaperSelector({
  currentWallpaper,
  onSelectWallpaper,
}: WallpaperSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Fondo de pantalla"
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
        <span style={{ fontSize: "12px", lineHeight: "1" }}>🖼️</span>
      </button>

      {isOpen && (
        <div
          className="window"
          style={{
            position: "absolute",
            bottom: "28px",
            right: "0px",
            width: "min(240px, calc(100vw - 16px))",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            zIndex: 10000,
            boxShadow: "2px 2px 5px rgba(0,0,0,0.4)",
            borderRadius: "0px",
          }}
        >
          <div className="title-bar" style={{ borderRadius: "0px" }}>
            <div className="title-bar-text" style={{ fontSize: "11px" }}>
              Propiedades de Pantalla
            </div>
          </div>

          <span
            style={{
              fontSize: "11px",
              fontFamily: "Tahoma, sans-serif",
              margin: "4px",
            }}
          >
            Selecciona un fondo:
          </span>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              maxHeight: "180px",
              overflowY: "auto",
              padding: "4px",
              backgroundColor: "#fff",
              border: "1px solid #7f9db9",
              margin: "4px",
            }}
          >
            {WALLPAPERS.map((item) => {
              const isSelected = currentWallpaper === item.url;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectWallpaper(item.url)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "4px",
                    backgroundColor: isSelected ? "#316ac5" : "transparent",
                    color: isSelected ? "#fff" : "#000",
                    border: isSelected
                      ? "1px solid #000080"
                      : "1px solid transparent",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "50px",
                      overflow: "hidden",
                      border: "1px solid #000",
                      backgroundColor: "#000",
                    }}
                  >
                    <img
                      src={item.url}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "Tahoma, sans-serif",
                      marginTop: "3px",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      maxWidth: "80px",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="field-row"
            style={{ justifyContent: "flex-end", margin: "4px" }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: "10px",
                padding: "2px 10px",
                minWidth: "auto",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}