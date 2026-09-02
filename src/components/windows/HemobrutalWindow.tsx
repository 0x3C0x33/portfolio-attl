// src/components/windows/HemobrutalWindow.tsx
import { useState } from "react";

export function HemobrutalWindow() {
  const [selectedOption, setSelectedOption] = useState<"about" | "project" | "desktop_stickers">("about");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "12px",
        backgroundImage: `linear-gradient(rgba(5, 5, 12, 0.75), rgba(5, 5, 12, 0.85)), url('/wallpapers/dark_castle.gif')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated",
        color: "#fff",
        fontFamily: "'Courier New', Courier, monospace",
        userSelect: "none",
        overflowY: "auto",
      }}
    >
      {/* Título Principal estilo Menú de Juego */}
      <div style={{ textAlign: "center", margin: "4px 0 8px 0" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(20px, 5vw, 28px)",
            color: "#ff2a2a",
            textShadow: "2px 2px 0px #000, 0 0 10px rgba(255, 42, 42, 0.7)",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontFamily: "Impact, sans-serif",
          }}
        >
          HEMOBRUTAL
        </h1>
        <div style={{ fontSize: "10px", color: "#aaa", letterSpacing: "1.5px", marginTop: "2px" }}>
          -[ INDIE GAME STUDIO & SOFTWARE ]-
        </div>
      </div>

      {/* Cuerpo principal: Menú Interactivo + Panel Informativo (Flex Wrap Responsivo) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          flex: 1,
          alignItems: "stretch",
          margin: "8px 0",
          minHeight: "0",
        }}
      >
        {/* Opciones del Menú */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flex: "1 1 130px",
            minWidth: "120px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "1px solid #ff2a2a",
            padding: "10px",
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.2)",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setSelectedOption("about")}
            style={{
              background: "transparent",
              border: "none",
              color: selectedOption === "about" ? "#ff4d4d" : "#ccc",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: "bold",
              fontFamily: "inherit",
              textShadow: selectedOption === "about" ? "0 0 5px #ff0000" : "none",
              padding: "4px 2px",
              touchAction: "manipulation",
            }}
          >
            {selectedOption === "about" ? "► ESTUDIO" : "  ESTUDIO"}
          </button>

          <button
            onClick={() => setSelectedOption("project")}
            style={{
              background: "transparent",
              border: "none",
              color: selectedOption === "project" ? "#ff4d4d" : "#ccc",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: "bold",
              fontFamily: "inherit",
              textShadow: selectedOption === "project" ? "0 0 5px #ff0000" : "none",
              padding: "4px 2px",
              touchAction: "manipulation",
            }}
          >
            {selectedOption === "project" ? "► PROYECTO ACTUAL" : "  PROYECTO ACTUAL"}
          </button>

          <button
            onClick={() => setSelectedOption("desktop_stickers")}
            style={{
              background: "transparent",
              border: "none",
              color: selectedOption === "desktop_stickers" ? "#ff4d4d" : "#ccc",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: "bold",
              fontFamily: "inherit",
              textShadow: selectedOption === "desktop_stickers" ? "0 0 5px #ff0000" : "none",
              padding: "4px 2px",
              touchAction: "manipulation",
            }}
          >
            {selectedOption === "desktop_stickers" ? "► DESKTOP STICKERS" : "  DESKTOP STICKERS"}
          </button>
        </div>

        {/* Panel Informativo */}
        <div
          style={{
            flex: "2 1 200px",
            minWidth: "160px",
            backgroundColor: "rgba(10, 10, 15, 0.8)",
            border: "1px solid #444",
            padding: "10px 14px",
            boxSizing: "border-box",
            overflowY: "auto",
            fontSize: "11px",
            lineHeight: "1.5",
            color: "#e0e0e0",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)",
          }}
        >
          {selectedOption === "about" && (
            <div>
              <h3 style={{ margin: "0 0 8px 0", color: "#ff4d4d", fontSize: "12px" }}>
                [ SOBRE HEMOBRUTAL ]
              </h3>
              <p style={{ margin: "0 0 8px 0" }}>
                <strong>HemoBrutal</strong> es un sello personal enfocado en el desarrollo de software independiente, herramientas interactivas y experiencias de juego.
              </p>
              <p style={{ margin: 0 }}>
                Abarca desde el diseño de aplicaciones de escritorio personalizadas hasta la experimentación con mecánicas de juego en 2D y sistemas interactivos.
              </p>
            </div>
          )}

          {selectedOption === "project" && (
            <div>
              <h3 style={{ margin: "0 0 8px 0", color: "#ff4d4d", fontSize: "12px" }}>
                [ PROYECTO: DESKTOP STICKERS ]
              </h3>
              <p style={{ margin: "0 0 6px 0" }}>
                <strong>Estado:</strong> En Desarrollo Activo (2026)
              </p>
              <p style={{ margin: "0 0 8px 0" }}>
                Una aplicación de escritorio ligera diseñada para colocar widgets, notas interactivas y stickers personalizados directamente en el entorno de trabajo del sistema operativo.
              </p>
              <p style={{ margin: 0, color: "#888", fontSize: "10px" }}>
                * Desarrollado con Tauri + React para optimizar el consumo de recursos al máximo.
              </p>
            </div>
          )}

          {selectedOption === "desktop_stickers" && (
            <div>
              <h3 style={{ margin: "0 0 8px 0", color: "#ff4d4d", fontSize: "12px" }}>
                [ DESKTOP STICKERS ] (2026)
              </h3>
              <p style={{ margin: "0 0 8px 0" }}>
                Una aplicación de escritorio ligera diseñada para colocar widgets, notas interactivas y stickers personalizados directamente en el entorno de trabajo del sistema operativo.
              </p>
              <p style={{ margin: 0, color: "#888", fontSize: "10px" }}>
                * Desarrollado con Tauri + React para optimizar el consumo de recursos al máximo.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer estilo HUD de juego */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px",
          fontSize: "9px",
          color: "#888",
          borderTop: "1px solid #333",
          paddingTop: "6px",
          marginTop: "4px",
        }}
      >
        <span>PRESS [CLICK] TO SELECT</span>
        <span>PARA VOSOTROS JUGADORES</span>
        <span>HEMOBRUTAL FOREVER</span>
      </div>
    </div>
  );
}