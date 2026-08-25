// src/components/windows/AboutWindow.tsx
import { useState } from "react";
import "xp.css/dist/XP.css";

interface AboutWindowProps {
  onClose?: () => void;
}

export function AboutWindow({ onClose }: AboutWindowProps) {
  const [activeTab, setActiveTab] = useState<"general" | "experience" | "contact">("general");

  return (
    <div className="window-body" style={{ margin: 0, padding: "8px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      {/* Sistema de Pestañas estándar de XP.css */}
      <menu role="tablist">
        <button
          aria-selected={activeTab === "general"}
          aria-controls="general"
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          aria-selected={activeTab === "experience"}
          aria-controls="experience"
          onClick={() => setActiveTab("experience")}
        >
          Trayectoria
        </button>
        <button
          aria-selected={activeTab === "contact"}
          aria-controls="contact"
          onClick={() => setActiveTab("contact")}
        >
          Contacto
        </button>
      </menu>

      {/* PESTAÑA 1: GENERAL */}
      <article role="tabpanel" id="general" hidden={activeTab !== "general"} style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Cabecera: Avatar + Título */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                border: "2px solid #7f9db9",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.2)",
                flexShrink: 0,
              }}
            >
              <img src="./images/vampire_epic_face.webp" alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <div>
              <h3 style={{ margin: "0 0 2px 0", fontSize: "12px", fontWeight: "bold" }}>
                Administrador del sistema
              </h3>
              <p style={{ margin: 0, color: "#444" }}>
                Desarrollador de software
              </p>
              <p style={{ margin: "2px 0 0 0", color: "#666", fontSize: "10px" }}>
                Bleh :P un poco de información sobre mí y mis proyectos.
              </p>
            </div>
          </div>

          <fieldset>
            <legend>Registro de Usuario</legend>
            <div className="field-row">
              <strong>Desarrollador:</strong>
              <span>Adrián T. / @0x3C0x33 </span>
            </div>
            <div className="field-row">
              <strong>Ubicación:</strong>
              <span>España</span>
            </div>
          </fieldset>

          <fieldset>
            <legend>Especificaciones Técnicas (Tech Stack)</legend>
            <div>
              <strong>Lenguajes: </strong>
              <span>Go, C#, Java, JavaScript/TS, Rust, SQL, Bash / Shell Scripting</span>
              
            </div>
            <div>
              <strong>Desarrollos de Software: </strong>
              <span>REST APIs, Arquitectura Modular, Tauri, React</span>
            </div>
            <div>
              <strong>DevOps, Infraestructura & Servidores: </strong>
              <span>Linux, Docker, Proxmox VE, TrueNAS SCALE (RAID), Cloudflare</span>
            </div>
            <div>
              <strong>Herramientas: </strong>
              <span>Vite, Git, Node.js</span>
            </div>
            <div>
              <strong>Monitorización & Datos: </strong>
              <span>Grafana, Prometheus, Kafka, Bases de datos SQL y NoSQL</span>
            </div>
            <div>
              <strong>Tecnologías Emergentes & IA: </strong>
              <span>Model Context Protocol (MCP), Integración de Agentes/Subagentes autónomos, Workflows Asistidos por IA</span>
            </div>
          </fieldset>
        </div>
      </article>

      {/* PESTAÑA 2: TRAYECTORIA */}
      <article role="tabpanel" id="experience" hidden={activeTab !== "experience"} style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <fieldset>
            <legend>Experiencia Profesional</legend>
            <div style={{ padding: "2px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <strong style={{ color: "#0a246a" }}>📄 Desarrollador de aplicaciones industriales</strong>
                <p style={{ margin: "2px 0 0 0", color: "#333", fontSize: "11px" }}>
                  Junio - Octubre 2024, Xmart Connectivity Solutions (5 meses)                
                </p>
                <ul style={{ margin: "4px 0 0 16px", color: "#333", fontSize: "11px", lineHeight: "1.3" }}>
                    <li>Desarrollo de software en Go dentro de un equipo dedicado a la recolección y tratamiento de datos de plantas eléctricas con comunicaciones REST.</li>
                    <li>Monitoreo y control de métricas mediante Prometheus y Grafana.</li>
                    <li>Gestión de eventos con Kafka y consulta/lectura de datos en Redis.</li>
                </ul>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #d0d0d0", margin: "2px 0" }} />

              <div>
                <strong style={{ color: "#0a246a" }}>📄 Desarrollador de videojuegos en Unity VR (Becario)</strong>
                <p style={{ margin: "2px 0 0 0", color: "#333", fontSize: "11px" }}>
                  Abril  - Junio 2023, Cerebroom (3 meses)              
                </p>
                <ul style={{ margin: "4px 0 0 16px", color: "#333", fontSize: "11px", lineHeight: "1.3" }}>
                    <li>Desarrollo de videojuegos en Unity usando el lenguaje C#</li>
                    <li>Proyecto relacionado con el mundo del VR.</li>
                    <li>Encargado de las funciones multijugador usando la API Mirror, comportamiento de NPCs y demás mecánicas.</li>
                </ul>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Proyectos Personales</legend>
            <div style={{ padding: "2px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <strong style={{ color: "#0a246a" }}>📁 Desktop Stickers (2026)</strong>
                <p style={{ margin: "2px 0 0 0", color: "#333", fontSize: "11px" }}>
                  Aplicación de escritorio desarrollada con Tauri y React para colocar widgets y stickers interactivos personalizados.
                </p>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #d0d0d0", margin: "2px 0" }} />

              <div>
                <strong style={{ color: "#0a246a" }}>📁 portfolio-attl (2026)</strong>
                <p style={{ margin: "2px 0 0 0", color: "#333", fontSize: "11px" }}>
                  Portfolio interactivo con interfaz estilo Windows XP, gestión de ventanas modular y soporte de temas personalizados con React.
                </p>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Hardware & Personalización</legend>
            <p style={{ margin: "4px", color: "#333", fontSize: "11px", lineHeight: "1.3" }}>
              Experiencia práctica en ensamblaje de PC, diagnóstico técnico y modificación de hardware.
            </p>
          </fieldset>
        </div>
      </article>

      {/* PESTAÑA 3: CONTACTO */}
      <article role="tabpanel" id="contact" hidden={activeTab !== "contact"} style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <fieldset>
            <legend>Conexiones de Red</legend>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "4px" }}>
              <div className="field-row">
                <span>🌐</span>
                <strong>GitHub:</strong>
                <a href="https://github.com/0x3C0x33" target="_blank" rel="noreferrer">
                  0x3C0x33
                </a>
              </div>

              <div className="field-row">
                <span>💼</span>
                <strong>Email trabajo:</strong>
                <a href="mailto:trabajo@attl.dev">
                  trabajo@attl.dev
                </a>
              </div>

              <div className="field-row">
                <span>✉️</span>
                <strong>Email contacto / soporte / opiniones:</strong>
                <a href="mailto:contacto@attl.dev">
                  contacto@attl.dev
                </a>
              </div>
            </div>
          </fieldset>

          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #7f9db9",
              padding: "8px",
            }}
          >
            <span style={{ fontWeight: "bold", display: "block", marginBottom: "2px" }}>
              Estado del Sistema:
            </span>
            <span style={{ color: "green" }}>● Disponible para proyectos y colaboraciones.</span>
          </div>
        </div>
      </article>

      {/* Botón inferior de la ventana */}
      <section className="field-row" style={{ justifyContent: "flex-end", marginTop: "8px" }}>
        <button onClick={onClose} style={{ minWidth: "60px" }}>Aceptar</button>
      </section>
    </div>
  );
}