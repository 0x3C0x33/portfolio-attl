// src/components/windows/CreditsWindow.tsx
import "xp.css/dist/XP.css";

export function CreditsWindow() {
  return (
    <div
      className="window-body"
      style={{
        margin: 0,
        padding: "8px",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        backgroundColor: "#ece9d8",
      }}
    >
      {/* ÁREA PRINCIPAL: Estilo Bloc de Notas / Editor de texto */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          border: "2px solid #7f9db9",
          padding: "10px 12px",
          overflowY: "auto",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "11px",
          lineHeight: "1.5",
          color: "#000",
          boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textDecoration: "underline", fontWeight: "bold", marginBottom: "8px" }}>
          ==================================================
          <br />
          PORTFOLIO XP - CRÉDITOS Y RECURSOS UTILIZADOS
          <br />
          ==================================================
        </div>

        {/* RECURSOS DE AUDIO */}
        <div style={{ marginBottom: "12px" }}>
          <strong>[ AUDIO & EFECTOS DE SONIDO ]</strong>
          <br />
          • Sonido de encendido / inicio:
          <br />
          &nbsp;&nbsp;Autor: Johnmode
          <br />
          &nbsp;&nbsp;Fuente:{" "}
          <a href="https://freesound.org/people/Johnmode/" target="_blank" rel="noreferrer">
            https://freesound.org/people/Johnmode/
          </a>
        </div>

        {/* RECURSOS VISUALES Y WALLPAPERS */}
        <div style={{ marginBottom: "12px" }}>
          <strong>[ FONDO DE PANTALLA & WALLPAPERS ]</strong>
          <br />
          • Wallpaper Puente:
          <br />
          &nbsp;&nbsp;Autor: Martin Damboldt
          <br />
          &nbsp;&nbsp;Fuente:{" "}
          <a href="https://www.pexels.com/es-es/@mdx014/" target="_blank" rel="noreferrer">
            https://www.pexels.com/es-es/@mdx014/
          </a>
          <br />
          • Wallpaper Monte Fuji:
          <br />
          &nbsp;&nbsp;Autor: Pixabay
          <br />
          &nbsp;&nbsp;Fuente:{" "}
          <a href="https://www.pexels.com/es-es/@pixabay/" target="_blank" rel="noreferrer">
            https://www.pexels.com/es-es/@pixabay/
          </a>
          <br />
          • Wallpaper Bliss Reimagined:
          <br />
          &nbsp;&nbsp;Autor: Chris Barbalis
          <br />
          &nbsp;&nbsp;Fuente:{" "}
          <a href="https://unsplash.com/es/@cbarbalis" target="_blank" rel="noreferrer">
            https://unsplash.com/es/@cbarbalis
          </a>
          <br />
          • Wallpaper PC Retro:
          <br />
          &nbsp;&nbsp;Autor: Lorenzo Herrera
          <br />
          &nbsp;&nbsp;Fuente:{" "}
          <a href="https://unsplash.com/es/@lorenzoherrera" target="_blank" rel="noreferrer">
            https://unsplash.com/es/@lorenzoherrera
          </a>
          <br />
          • Wallpaper Cabaña:
          <br />
          &nbsp;&nbsp;Autor: Mert Ceyhan
          <br />
          &nbsp;&nbsp;Fuente:{" "}
          <a href="https://unsplash.com/es/@mertceyhan" target="_blank" rel="noreferrer">
            https://unsplash.com/es/@mertceyhan
          </a>
        </div>

        {/* ICONOS */}
        <div style={{ marginBottom: "12px" }}>
          <strong>[ ICONOGRAFÍA ]</strong>
          <br />
          • Iconos de Windows XP en Alta Resolución:
          <br />
          &nbsp;&nbsp;Recopilados / Creados por: R.O.B.
          <br />
          &nbsp;&nbsp;Comunidad: WinClassic
          <br />
          &nbsp;&nbsp;Fuente:{" "}
          <a
            href="https://winclassic.net/thread/96/resolution-windows-icons-official-microsoft"
            target="_blank"
            rel="noreferrer"
          >
            https://winclassic.net/thread/96/...
          </a>
        </div>

        {/* LIBRERÍAS Y FRAMEWORKS */}
        <div style={{ marginBottom: "8px" }}>
          <strong>[ LIBRERÍAS & DESARROLLO ]</strong>
          <br />
          • XP.css (Estilos Windows XP):
          <br />
          &nbsp;&nbsp;Autor: Botond Szabo (botond)
          <br />
          &nbsp;&nbsp;GitHub:{" "}
          <a href="https://github.com/botond/xp.css" target="_blank" rel="noreferrer">
            https://github.com/botond/xp.css
          </a>
          <br />
          • react-rnd (Gestión de Ventanas Arrastrables y Redimensionables):
          <br />
          &nbsp;&nbsp;Autor: Naoki Koido (bokuweb)
          <br />
          &nbsp;&nbsp;GitHub:{" "}
          <a href="https://github.com/bokuweb/react-rnd" target="_blank" rel="noreferrer">
            https://github.com/bokuweb/react-rnd
          </a>
        </div>
      </div>
    </div>
  );
}