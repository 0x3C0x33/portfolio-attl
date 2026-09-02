// src/components/layout/StartMenu.tsx
import { useState, useRef, useEffect } from "react";
import "xp.css/dist/XP.css";

interface StartMenuProps {
  onLogOff?: () => void;
  onTurnOff?: () => void;
}

export function StartMenu({ onLogOff, onTurnOff }: StartMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera del menú de inicio
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} style={{ position: "relative", height: "100%", zIndex: 100000 }}>
      {/* 1. DESPLEGABLE DEL MENÚ DE INICIO */}
      {isOpen && (
        <div
          style={{
            width: "min(380px, calc(100vw - 8px))",
            maxHeight: "calc(100vh - 40px)",
            height: "460px",
            backgroundColor: "#4282d6",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "Tahoma, sans-serif",
            fontSize: "11px",
            userSelect: "none",
            position: "absolute",
            bottom: "100%", // Se despliega justo encima del botón
            left: "0px",
            zIndex: 100001,
          }}
        >
          {/* Cabecera: Avatar y Nombre */}
          <div
            style={{
              height: "54px",
              background: "linear-gradient(to bottom, #0a5fcf 0%, #2979e7 100%)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 12px",
              borderBottom: "2px solid #e59f37",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "4px",
                border: "2px solid #ffffff",
                backgroundColor: "#d1e2f7",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img src="./images/vampire_epic_face.webp" alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span
              style={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "14px",
                textShadow: "1px 1px 1px rgba(0,0,0,0.6)",
              }}
            >
              Adrián T.
            </span>
          </div>

          {/* Cuerpo de dos columnas */}
          <div
            style={{
              flex: 1,
              display: "flex",
              backgroundColor: "#ffffff",
              border: "1px solid #0a5fcf",
              borderTop: "none",
              borderBottom: "none",
              minHeight: 0,
            }}
          >
            {/* Columna Izquierda (Aplicaciones) */}
            <div
              style={{
                width: "50%",
                backgroundColor: "#ffffff",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {/* Futuros programas / accesos */}
              </div>

              <div
                style={{
                  borderTop: "1px solid #e0e0e0",
                  paddingTop: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontWeight: "bold",
                  color: "#000",
                  cursor: "pointer",
                }}
              >
                <span>All Programs</span>
                <span
                  style={{
                    width: "0",
                    height: "0",
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: "7px solid #228b22",
                  }}
                />
              </div>
            </div>

            {/* Columna Derecha (Sistema) */}
            <div
              style={{
                width: "50%",
                backgroundColor: "#d3e5fa",
                borderLeft: "1px solid #9bbcf2",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {/* Futuros accesos de sistema */}
            </div>
          </div>

          {/* Footer de Apagado */}
          <div
            style={{
              height: "42px",
              background: "linear-gradient(to bottom, #2979e7 0%, #0a5fcf 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "12px",
              padding: "0 12px",
              borderTop: "1px solid #4282d6",
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => {
                onLogOff?.();
                setIsOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "11px",
                fontFamily: "inherit",
                touchAction: "manipulation",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  backgroundColor: "#ffbb00",
                  borderRadius: "2px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                🔑
              </div>
              <span>Log Off</span>
            </button>

            <button
              onClick={() => {
                onTurnOff?.();
                setIsOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "11px",
                fontFamily: "inherit",
                touchAction: "manipulation",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  backgroundColor: "#e13e3e",
                  borderRadius: "2px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                ⏻
              </div>
              <span>Turn Off Computer</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. BOTÓN INICIO (XP) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          height: "100%",
          padding: "0 12px 0 8px",
          border: "none",
          borderRadius: "0 8px 8px 0",
          background: isOpen
            ? "linear-gradient(to bottom, #1e541e 0%, #2b702b 100%)"
            : "linear-gradient(to bottom, #388e3c 0%, #2e7d32 100%)",
          color: "white",
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: "14px",
          textShadow: "1px 1px 1px #000",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          boxShadow: isOpen
            ? "inset 1px 1px 2px #000"
            : "inset 0 1px 1px rgba(255,255,255,0.4)",
          touchAction: "manipulation",
        }}
      >
        <span style={{ fontSize: "15px", fontStyle: "normal" }}>💻</span>
        Inicio
      </button>
    </div>
  );
}