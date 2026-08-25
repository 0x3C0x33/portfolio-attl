// src/components/windows/HemobrutalWindow.tsx
import { useState } from "react";

export function HemobrutalWindow() {
  const [selectedOption, setSelectedOption] = useState<"about" | "project" | "tech">("about");

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
        padding: "16px",
        backgroundImage: `linear-gradient(rgba(5, 5, 12, 0.75), rgba(5, 5, 12, 0.85)), url('/wallpapers/dark_castle.gif')`, // Ajusta la ruta a tu imagen
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated",
        color: "#fff",
        fontFamily: "'Courier New', Courier, monospace",
        userSelect: "none",
      }}
    >
      {/* Título Principal estilo Menú de Juego */}
      <div style={{ textAlign: "center", marginTop: "8px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#ff2a2a",
            textShadow: "2px 2px 0px #000, 0 0 10px rgba(255, 42, 42, 0.7)",
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontFamily: "Impact, sans-serif",
          }}
        >
          HEMOBRUTAL
        </h1>
        <div style={{ fontSize: "10px", color: "#aaa", letterSpacing: "2px", marginTop: "2px" }}>
          -[ INDIE GAME STUDIO & SOFTWARE ]-
        </div>
      </div>

      {/* Cuerpo principal: Menú Interactivo + Panel Informativo */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          flex: 1,
          alignItems: "center",
          margin: "16px 0",
        }}
      >
        {/* Opciones del Menú (Izquierda) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minWidth: "160px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            border: "1px solid #ff2a2a",
            padding: "12px",
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.2)",
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
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "inherit",
              textShadow: selectedOption === "about" ? "0 0 5px #ff0000" : "none",
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
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "inherit",
              textShadow: selectedOption === "project" ? "0 0 5px #ff0000" : "none",
            }}
          >
            {selectedOption === "project" ? "► PROYECTO ACTUAL" : "  PROYECTO ACTUAL"}
          </button>

          <button
            onClick={() => setSelectedOption("tech")}
            style={{
              background: "transparent",
              border: "none",
              color: selectedOption === "tech" ? "#ff4d4d" : "#ccc",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "inherit",
              textShadow: selectedOption === "tech" ? "0 0 5px #ff0000" : "none",
            }}
          >
            {selectedOption === "tech" ? "► TECH STACK" : "  TECH STACK"}
          </button>
        </div>

        {/* Panel Informativo (Derecha) */}
        <div
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "rgba(10, 10, 15, 0.75)",
            border: "1px solid #444",
            padding: "12px 16px",
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
              <h3 style={{ margin: "0 0 8px 0", color: "#ff4d4d", fontSize: "13px" }}>
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
              <h3 style={{ margin: "0 0 8px 0", color: "#ff4d4d", fontSize: "13px" }}>
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

          {selectedOption === "tech" && (
            <div>
              <h3 style={{ margin: "0 0 8px 0", color: "#ff4d4d", fontSize: "13px" }}>
                [ ARSENAL TÉCNICO ]
              </h3>
              <ul style={{ margin: 0, paddingLeft: "16px" }}>
                <li><strong>Motor / Framework:</strong> Tauri & React</li>
                <li><strong>Lenguajes:</strong> TypeScript, C#, Go</li>
                <li><strong>Plataforma:</strong> Windows / Desktop</li>
                <li><strong>Game Dev:</strong> Godot / Pixel Art UI</li>
              </ul>
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
          fontSize: "10px",
          color: "#888",
          borderTop: "1px solid #333",
          paddingTop: "6px",
        }}
      >
        <span>PRESS [CLICK] TO SELECT</span>
        <span>HEMOBRUTAL v0.5.0</span>
      </div>
    </div>
  );
}