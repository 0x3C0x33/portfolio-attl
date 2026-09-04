// src/components/windows/MyPageWindow.tsx
import { useState } from "react";
import { useLivePerformance } from "../../hooks/useLivePerformance";
import "xp.css/dist/XP.css";

type TabView = "all" | "about" | "lighthouse" | "stack";

export function MyPageWindow() {
  const [currentUrl, setCurrentUrl] = useState("https://attl.dev/portfolio-xp");
  const [activeSection, setActiveSection] = useState<TabView>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { metrics, refreshMetrics } = useLivePerformance();

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshMetrics();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 450);
  };

  const handleNavigate = (url: string, section: TabView) => {
    setCurrentUrl(url);
    setActiveSection(section);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return { border: "#0cce6b", bg: "#e6f9f0", text: "#008844" };
    if (score >= 50) return { border: "#ffa400", bg: "#fff8e6", text: "#b37400" };
    return { border: "#ff4e42", bg: "#ffebee", text: "#c41d13" };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "#ece9d8",
        fontFamily: "Tahoma, sans-serif",
        fontSize: "11px",
        userSelect: "none",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* 1. BARRA DE MENÚ (Classic IE Menu Bar) */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          padding: "2px 8px",
          backgroundColor: "#ece9d8",
          borderBottom: "1px solid #d0cebf",
          color: "#000",
          fontSize: "11px",
        }}
      >
        <span style={{ cursor: "pointer" }}>Archivo</span>
        <span style={{ cursor: "pointer" }}>Edición</span>
        <span style={{ cursor: "pointer" }}>Ver</span>
        <span style={{ cursor: "pointer" }}>Favoritos</span>
        <span style={{ cursor: "pointer" }}>Herramientas</span>
        <span style={{ cursor: "pointer" }}>Ayuda</span>
      </div>

      {/* 2. BARRA DE HERRAMIENTAS DE NAVEGACIÓN (Toolbar) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "3px 6px",
          backgroundColor: "#ece9d8",
          borderBottom: "1px solid #999",
          gap: "4px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {/* Botón Atrás */}
          <button
            onClick={() => handleNavigate("https://attl.dev/portfolio-xp", "all")}
            title="Atrás"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 6px",
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "12px" }}>⬅️</span>
            <span>Atrás</span>
          </button>

          {/* Botón Adelante */}
          <button
            title="Adelante"
            disabled
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 6px",
              fontSize: "11px",
              opacity: 0.6,
            }}
          >
            <span style={{ fontSize: "12px" }}>➡️</span>
          </button>

          {/* Separador */}
          <div style={{ width: "1px", height: "20px", backgroundColor: "#b0af9f", margin: "0 4px" }} />

          {/* Botón Detener */}
          <button
            title="Detener"
            style={{ padding: "2px 6px", fontSize: "11px", cursor: "pointer" }}
            onClick={() => setIsRefreshing(false)}
          >
            <span>🛑</span> Detener
          </button>

          {/* Botón Actualizar */}
          <button
            title="Actualizar y re-medir telemetría"
            onClick={handleRefresh}
            style={{ padding: "2px 6px", fontSize: "11px", cursor: "pointer", fontWeight: "bold" }}
          >
            <span style={{ display: "inline-block", transform: isRefreshing ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}>🔄</span> Medir en Vivo
          </button>

          {/* Botón Inicio */}
          <button
            title="Página Principal"
            onClick={() => handleNavigate("https://attl.dev/portfolio-xp", "all")}
            style={{ padding: "2px 6px", fontSize: "11px", cursor: "pointer" }}
          >
            <span>🏠</span> Inicio
          </button>

          {/* Separador */}
          <div style={{ width: "1px", height: "20px", backgroundColor: "#b0af9f", margin: "0 4px" }} />

          {/* Botón Lighthouse */}
          <button
            onClick={() => handleNavigate("https://attl.dev/portfolio-xp#lighthouse", "lighthouse")}
            style={{ padding: "2px 6px", fontSize: "11px", cursor: "pointer" }}
          >
            <span>⚡</span> Telemetría
          </button>

          {/* Botón Favoritos */}
          <button
            onClick={() => handleNavigate("https://attl.dev/portfolio-xp#about", "about")}
            style={{ padding: "2px 6px", fontSize: "11px", cursor: "pointer" }}
          >
            <span>⭐</span> Info Web
          </button>
        </div>

        {/* Logo giratorio retro de Windows/IE */}
        <div
          style={{
            width: "28px",
            height: "28px",
            border: "1px solid #7f9db9",
            backgroundColor: "#0a246a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "2px",
            boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              display: "inline-block",
              animation: isRefreshing ? "spin 1s linear infinite" : "none",
            }}
          >
            🌐
          </span>
        </div>
      </div>

      {/* 3. BARRA DE DIRECCIÓN (Address Bar) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "4px 8px",
          backgroundColor: "#ece9d8",
          borderBottom: "1px solid #7f9db9",
        }}
      >
        <span style={{ color: "#444", fontWeight: "bold", fontSize: "11px" }}>Dirección</span>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            border: "1px solid #7f9db9",
            padding: "2px 6px",
            height: "22px",
            boxShadow: "inset 1px 1px 1px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src="/icons/Earth (fixed).webp"
            alt="Web Icon"
            style={{ width: "14px", height: "14px", marginRight: "6px" }}
          />
          <input
            type="text"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "11px",
              fontFamily: "Tahoma, sans-serif",
              backgroundColor: "transparent",
            }}
          />
          <span style={{ fontSize: "11px", color: "green", fontWeight: "bold" }}>🔒 HTTPS</span>
        </div>

        {/* Botón Ir */}
        <button
          onClick={handleRefresh}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "2px 8px",
            fontSize: "11px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <span style={{ color: "#228b22", fontSize: "12px" }}>➔</span> Ir
        </button>
      </div>

      {/* 4. BARRA DE VÍNCULOS RÁPIDOS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "2px 8px",
          backgroundColor: "#f0ede0",
          borderBottom: "1px solid #c0bfae",
          fontSize: "10px",
          color: "#555",
        }}
      >
        <strong style={{ color: "#222" }}>Vínculos:</strong>
        <span
          onClick={() => handleNavigate("https://attl.dev/portfolio-xp", "all")}
          style={{
            cursor: "pointer",
            color: activeSection === "all" ? "#0a5fcf" : "#333",
            textDecoration: activeSection === "all" ? "underline" : "none",
            fontWeight: activeSection === "all" ? "bold" : "normal",
          }}
        >
          [ 🏠 Ver Todo ]
        </span>
        <span
          onClick={() => handleNavigate("https://attl.dev/portfolio-xp#about", "about")}
          style={{
            cursor: "pointer",
            color: activeSection === "about" ? "#0a5fcf" : "#333",
            textDecoration: activeSection === "about" ? "underline" : "none",
            fontWeight: activeSection === "about" ? "bold" : "normal",
          }}
        >
          [ 💡 Sobre Esta Web ]
        </span>
        <span
          onClick={() => handleNavigate("https://attl.dev/portfolio-xp#lighthouse", "lighthouse")}
          style={{
            cursor: "pointer",
            color: activeSection === "lighthouse" ? "#0a5fcf" : "#333",
            textDecoration: activeSection === "lighthouse" ? "underline" : "none",
            fontWeight: activeSection === "lighthouse" ? "bold" : "normal",
          }}
        >
          [ ⚡ Auditoría en Vivo ]
        </span>
        <span
          onClick={() => handleNavigate("https://attl.dev/portfolio-xp#stack", "stack")}
          style={{
            cursor: "pointer",
            color: activeSection === "stack" ? "#0a5fcf" : "#333",
            textDecoration: activeSection === "stack" ? "underline" : "none",
            fontWeight: activeSection === "stack" ? "bold" : "normal",
          }}
        >
          [ 🛠️ Stack & Arquitectura ]
        </span>
      </div>

      {/* 5. VIEWPORT DEL NAVEGADOR (Página Web Renderizada) */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          overflowY: "auto",
          padding: "16px",
          color: "#222222",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          lineHeight: "1.5",
          userSelect: "text",
        }}
      >
        {/* Cabecera / Hero de la Web */}
        <div
          style={{
            borderBottom: "2px solid #0a5fcf",
            paddingBottom: "12px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "20px",
                color: "#0a246a",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>💻</span> Portfolio ATTL - Windows XP Edition
            </h1>
            <p style={{ margin: "4px 0 0 0", color: "#555", fontSize: "12px" }}>
              Un entorno interactivo y nostálgico de escritorio retro construido con tecnologías web de última generación.
            </p>
          </div>

          {/* Badges de tecnología */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <span
              style={{
                backgroundColor: "#e7f3ff",
                color: "#0a5fcf",
                padding: "3px 8px",
                borderRadius: "4px",
                border: "1px solid #b3d7ff",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              ⚛️ React 19
            </span>
            <span
              style={{
                backgroundColor: "#f0fdf4",
                color: "#166534",
                padding: "3px 8px",
                borderRadius: "4px",
                border: "1px solid #bbf7d0",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              ⚡ Vite 8
            </span>
            <span
              style={{
                backgroundColor: "#faf5ff",
                color: "#6b21a8",
                padding: "3px 8px",
                borderRadius: "4px",
                border: "1px solid #e9d5ff",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              🔷 TypeScript
            </span>
          </div>
        </div>

        {/* SECCIÓN 1: SOBRE ESTA WEB */}
        {(activeSection === "all" || activeSection === "about") && (
          <div style={{ marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "15px",
                color: "#0a5fcf",
                borderBottom: "1px solid #e0e0e0",
                paddingBottom: "4px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>💡</span> Filosofía del Proyecto & Concepto
            </h2>
            <p style={{ margin: "0 0 10px 0", fontSize: "12px" }}>
              En lugar de optar por el formato habitual de portfolio estático de una sola página (landing page), 
              <strong> portfolio-attl</strong> transforma el navegador del usuario en un sistema operativo virtual 
              completamente interactivo inspirado en <strong>Windows XP Luna Blue</strong>.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "10px",
                marginTop: "12px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                  borderRadius: "6px",
                  padding: "10px",
                }}
              >
                <strong style={{ color: "#0a246a", display: "block", marginBottom: "4px", fontSize: "12px" }}>
                  🪟 Microinteracciones Fieles
                </strong>
                <p style={{ margin: 0, fontSize: "11px", color: "#555" }}>
                  Arrastre fluido y redimensionado de ventanas con <code>react-rnd</code>, cálculo en píxeles absolutos, soporte para maximizar/restaurar con doble clic y minimizado a la barra de tareas.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                  borderRadius: "6px",
                  padding: "10px",
                }}
              >
                <strong style={{ color: "#0a246a", display: "block", marginBottom: "4px", fontSize: "12px" }}>
                  🧠 Gestión de Z-Index & Foco
                </strong>
                <p style={{ margin: 0, fontSize: "11px", color: "#555" }}>
                  Pila de capas dinámica con elevación automática al interactuar con cualquier ventana o pestaña de la barra de tareas.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                  borderRadius: "6px",
                  padding: "10px",
                }}
              >
                <strong style={{ color: "#0a246a", display: "block", marginBottom: "4px", fontSize: "12px" }}>
                  ⏳ Boot Sequence & Audio
                </strong>
                <p style={{ margin: 0, fontSize: "11px", color: "#555" }}>
                  Emulación de pantalla de arranque con barra de carga, reproducción sincronizada de sonido clásico y desvanecimiento progresivo.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 2: MÉTRICAS 100% EN VIVO (W3C Performance Observer & DOM Audit) */}
        {(activeSection === "all" || activeSection === "lighthouse") && (
          <div
            style={{
              marginBottom: "24px",
              backgroundColor: "#fbfcfd",
              border: "1px solid #dbeafe",
              borderRadius: "8px",
              padding: "14px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "8px",
                marginBottom: "14px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    color: "#0a5fcf",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>⚡</span> Auditoría en Vivo & Telemetría Real (W3C APIs)
                </h2>
                <span style={{ fontSize: "11px", color: "#64748b" }}>
                  Medido en tiempo real en tu máquina y navegador mediante <code>PerformanceObserver</code> y DOM Tree Inspection.
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    backgroundColor: "#059669",
                    color: "#fff",
                    fontSize: "10px",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#fff", display: "inline-block" }} />
                  EN VIVO (1.5s)
                </span>
                <button
                  onClick={handleRefresh}
                  style={{
                    fontSize: "10px",
                    padding: "2px 8px",
                    cursor: "pointer",
                  }}
                >
                  🔄 Recalcular
                </button>
              </div>
            </div>

            {/* CÍRCULOS DE PUNTUACIÓN CALCULADOS DINÁMICAMENTE */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                gap: "12px",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              {/* Performance */}
              {(() => {
                const colors = getScoreColor(metrics.scores.performance);
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px 6px",
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        border: `4px solid ${colors.border}`,
                        backgroundColor: colors.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: colors.text,
                        marginBottom: "6px",
                      }}
                    >
                      {metrics.scores.performance}
                    </div>
                    <strong style={{ fontSize: "11px", color: "#1e293b" }}>Rendimiento</strong>
                    <span style={{ fontSize: "10px", color: colors.border, fontWeight: "bold" }}>Performance</span>
                  </div>
                );
              })()}

              {/* Accessibility */}
              {(() => {
                const colors = getScoreColor(metrics.scores.accessibility);
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px 6px",
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        border: `4px solid ${colors.border}`,
                        backgroundColor: colors.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: colors.text,
                        marginBottom: "6px",
                      }}
                    >
                      {metrics.scores.accessibility}
                    </div>
                    <strong style={{ fontSize: "11px", color: "#1e293b" }}>Accesibilidad</strong>
                    <span style={{ fontSize: "10px", color: colors.border, fontWeight: "bold" }}>Accessibility</span>
                  </div>
                );
              })()}

              {/* Best Practices */}
              {(() => {
                const colors = getScoreColor(metrics.scores.bestPractices);
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px 6px",
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        border: `4px solid ${colors.border}`,
                        backgroundColor: colors.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: colors.text,
                        marginBottom: "6px",
                      }}
                    >
                      {metrics.scores.bestPractices}
                    </div>
                    <strong style={{ fontSize: "11px", color: "#1e293b" }}>Prácticas</strong>
                    <span style={{ fontSize: "10px", color: colors.border, fontWeight: "bold" }}>Best Practices</span>
                  </div>
                );
              })()}

              {/* SEO */}
              {(() => {
                const colors = getScoreColor(metrics.scores.seo);
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px 6px",
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        border: `4px solid ${colors.border}`,
                        backgroundColor: colors.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: colors.text,
                        marginBottom: "6px",
                      }}
                    >
                      {metrics.scores.seo}
                    </div>
                    <strong style={{ fontSize: "11px", color: "#1e293b" }}>SEO</strong>
                    <span style={{ fontSize: "10px", color: colors.border, fontWeight: "bold" }}>Optimizado</span>
                  </div>
                );
              })()}
            </div>

            {/* TABLA DETALLADA DE TELEMETRÍA EN VIVO */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "6px", border: "1px solid #e2e8f0", padding: "12px" }}>
              <div style={{ fontWeight: "bold", fontSize: "12px", marginBottom: "8px", color: "#334155", display: "flex", justifyContent: "space-between" }}>
                <span>📊 Diagnóstico en Tiempo Real (Valores Medidos en tu Navegador):</span>
                <span style={{ color: "#64748b", fontWeight: "normal", fontSize: "10px" }}>
                  Uptime: {metrics.uptimeSeconds}s | Actualizado: {metrics.lastUpdated.toLocaleTimeString()}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "8px",
                }}
              >
                {/* FCP */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", backgroundColor: "#f8fafc", borderRadius: "4px" }}>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>First Contentful Paint (FCP):</span>
                  <strong style={{ color: (metrics.fcp ?? 0) <= 1000 ? "#059669" : "#d97706", fontSize: "11px" }}>
                    {metrics.fcp !== null ? `${metrics.fcp} ms` : "Midiendo..."} 🟢
                  </strong>
                </div>

                {/* LCP */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", backgroundColor: "#f8fafc", borderRadius: "4px" }}>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>Largest Contentful Paint (LCP):</span>
                  <strong style={{ color: (metrics.lcp ?? 0) <= 2500 ? "#059669" : "#d97706", fontSize: "11px" }}>
                    {metrics.lcp !== null ? `${metrics.lcp} ms` : "Midiendo..."} 🟢
                  </strong>
                </div>

                {/* TBT */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", backgroundColor: "#f8fafc", borderRadius: "4px" }}>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>Total Blocking Time (TBT):</span>
                  <strong style={{ color: metrics.tbt <= 50 ? "#059669" : "#d97706", fontSize: "11px" }}>
                    {metrics.tbt} ms 🟢
                  </strong>
                </div>

                {/* CLS */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", backgroundColor: "#f8fafc", borderRadius: "4px" }}>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>Cumulative Layout Shift (CLS):</span>
                  <strong style={{ color: metrics.cls <= 0.1 ? "#059669" : "#d97706", fontSize: "11px" }}>
                    {metrics.cls.toFixed(4)} 🟢
                  </strong>
                </div>

                {/* TTFB */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", backgroundColor: "#f8fafc", borderRadius: "4px" }}>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>Time to First Byte (TTFB):</span>
                  <strong style={{ color: (metrics.ttfb ?? 0) <= 800 ? "#059669" : "#d97706", fontSize: "11px" }}>
                    {metrics.ttfb !== null ? `${metrics.ttfb} ms` : "N/A"} 🟢
                  </strong>
                </div>

                {/* DOM Content Loaded */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", backgroundColor: "#f8fafc", borderRadius: "4px" }}>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>DOMContentLoaded Time:</span>
                  <strong style={{ color: "#059669", fontSize: "11px" }}>
                    {metrics.domLoadTime !== null ? `${metrics.domLoadTime} ms` : "N/A"} 🟢
                  </strong>
                </div>

                {/* JS Heap Memory */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", backgroundColor: "#f8fafc", borderRadius: "4px" }}>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>Memoria JS en Uso (Heap):</span>
                  <strong style={{ color: "#0a5fcf", fontSize: "11px" }}>
                    {metrics.usedJSHeapMB !== null ? `${metrics.usedJSHeapMB} MB / ${metrics.totalJSHeapMB} MB` : "N/D (Chromium API)"}
                  </strong>
                </div>

                {/* Recursos de red */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", backgroundColor: "#f8fafc", borderRadius: "4px" }}>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>Recursos & Peticiones:</span>
                  <strong style={{ color: "#334155", fontSize: "11px" }}>
                    {metrics.resourceCount} recursos cargados
                  </strong>
                </div>
              </div>

              {/* Diagnósticos específicos encontrados */}
              {(metrics.audits.accessibilityIssues.length > 0 || metrics.audits.bestPracticeIssues.length > 0 || metrics.audits.seoIssues.length > 0) && (
                <div style={{ marginTop: "10px", padding: "8px", backgroundColor: "#fffbeb", borderRadius: "4px", border: "1px solid #fef3c7", fontSize: "11px", color: "#92400e" }}>
                  <strong>Avisos detectados en el DOM:</strong>
                  <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                    {metrics.audits.accessibilityIssues.map((msg, i) => (
                      <li key={`a11y-${i}`}>Accesibilidad: {msg}</li>
                    ))}
                    {metrics.audits.bestPracticeIssues.map((msg, i) => (
                      <li key={`bp-${i}`}>Prácticas: {msg}</li>
                    ))}
                    {metrics.audits.seoIssues.map((msg, i) => (
                      <li key={`seo-${i}`}>SEO: {msg}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Resumen de optimización */}
              <div style={{ marginTop: "10px", paddingTop: "8px", borderTop: "1px dashed #e2e8f0", fontSize: "11px", color: "#64748b" }}>
                📦 <strong>Motor de Rendimiento:</strong> Aplicación SPA optimizada en Vite 8. La telemetría anterior se genera llamando directamente a la API de rendimiento de tu navegador (<code>PerformanceObserver</code>).
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 3: ARQUITECTURA Y STACK */}
        {(activeSection === "all" || activeSection === "stack") && (
          <div>
            <h2
              style={{
                fontSize: "15px",
                color: "#0a5fcf",
                borderBottom: "1px solid #e0e0e0",
                paddingBottom: "4px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>🛠️</span> Estructura y Tecnologías Utilizadas
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "10px",
              }}
            >
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "10px", backgroundColor: "#f8fafc" }}>
                <strong style={{ color: "#0a5fcf", display: "block", marginBottom: "4px" }}>⚛️ Frontend & React 19</strong>
                <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "11px", color: "#475569" }}>
                  <li>React 19 con Hooks personalizados.</li>
                  <li>TypeScript para seguridad estática de tipos.</li>
                  <li>Vite 8 con Hot Module Replacement (HMR).</li>
                </ul>
              </div>

              <div style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "10px", backgroundColor: "#f8fafc" }}>
                <strong style={{ color: "#0a5fcf", display: "block", marginBottom: "4px" }}>🎨 Diseño & Sistema de Ventanas</strong>
                <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "11px", color: "#475569" }}>
                  <li>Librería <code>xp.css</code> para componentes nativos.</li>
                  <li><code>react-rnd</code> para cálculo de arrastre y límites.</li>
                  <li>Persistencia en <code>localStorage</code> (wallpapers).</li>
                </ul>
              </div>

              <div style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "10px", backgroundColor: "#f8fafc" }}>
                <strong style={{ color: "#0a5fcf", display: "block", marginBottom: "4px" }}>🔊 Multimedia & Assets</strong>
                <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "11px", color: "#475569" }}>
                  <li>Iconos originales de XP en alta resolución.</li>
                  <li>Audio HTML5 con bypass seguro de autoplay.</li>
                  <li>Fondos WebP y GIF pixel-art optimizados.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Footer interior de la página web */}
        <div
          style={{
            marginTop: "24px",
            paddingTop: "12px",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "11px",
            color: "#64748b",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span>© 2026 Adrián T. (@0x3C0x33) — attl.dev</span>
          <span>Desarrollado con dedicación y telemetría en tiempo real</span>
        </div>
      </div>

      {/* 6. BARRA DE ESTADO INFERIOR (IE Status Bar) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "22px",
          padding: "0 6px",
          backgroundColor: "#ece9d8",
          borderTop: "1px solid #7f9db9",
          fontSize: "11px",
          color: "#000",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#228b22", fontSize: "11px" }}>✔️</span>
          <span>Listo</span>
          <div
            style={{
              width: "80px",
              height: "10px",
              backgroundColor: "#fff",
              border: "1px solid #7f9db9",
              borderRadius: "1px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: isRefreshing ? "60%" : "100%",
                height: "100%",
                backgroundColor: "#316ac5",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ borderLeft: "1px solid #999", paddingLeft: "8px" }}>
            🔒 Modo protegido: Desactivado
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              borderLeft: "1px solid #999",
              paddingLeft: "8px",
            }}
          >
            <img src="/icons/Earth (fixed).webp" alt="Internet" style={{ width: "12px", height: "12px" }} />
            Internet | Zona protegida
          </span>
          <span style={{ borderLeft: "1px solid #999", paddingLeft: "8px" }}>
            100%
          </span>
        </div>
      </div>
    </div>
  );
}