// src/components/windows/EmptyProgramWindow.tsx
import 'xp.css/dist/XP.css';

interface EmptyProgramWindowProps {
  programId: string;
  title: string;
  iconUrl?: string;
  onClose?: () => void;
}

export function EmptyProgramWindow({
  programId,
  title,
  iconUrl,
  onClose,
}: EmptyProgramWindowProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#ece9d8',
        userSelect: 'none',
        overflow: 'hidden',
        fontFamily: 'Tahoma, sans-serif',
      }}
    >
      {/* Barra de menú clásica de Windows XP */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          padding: '2px 8px',
          borderBottom: '1px solid #dcdad5',
          fontSize: '11px',
          color: '#000000',
        }}
      >
        <span style={{ cursor: 'pointer' }}>Archivo</span>
        <span style={{ cursor: 'pointer' }}>Edición</span>
        <span style={{ cursor: 'pointer' }}>Ver</span>
        <span style={{ cursor: 'pointer' }}>Ayuda</span>
      </div>

      {/* Área de trabajo central (vacia / lista para modificar) */}
      <div
        style={{
          flex: 1,
          margin: '4px',
          backgroundColor: '#ffffff',
          border: '2px inset #ffffff',
          boxShadow: 'inset 1px 1px 2px #716f64',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
          overflow: 'auto',
        }}
      >
        {iconUrl && (
          <img
            src={iconUrl}
            alt={title}
            width={48}
            height={48}
            style={{
              width: '48px',
              height: '48px',
              objectFit: 'contain',
              marginBottom: '12px',
            }}
          />
        )}

        <h3
          style={{
            margin: '0 0 8px 0',
            fontSize: '13px',
            color: '#0a246a',
            fontWeight: 'bold',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: '11px',
            color: '#444444',
            maxWidth: '320px',
            lineHeight: '1.4',
          }}
        >
          Ventana preparada para <strong>{title}</strong>. Este componente está listo en{' '}
          <code>src/components/windows/</code> para añadir su funcionalidad y contenido.
        </p>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '4px 14px',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            Aceptar
          </button>
        )}
      </div>

      {/* Barra de estado clásica */}
      <div
        className="status-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '2px 6px',
          borderTop: '1px solid #d4d0c8',
          fontSize: '11px',
          color: '#555555',
          backgroundColor: '#ece9d8',
        }}
      >
        <span className="status-bar-field">Preparado</span>
        <span className="status-bar-field" style={{ minWidth: '80px', textAlign: 'right' }}>
          ID: {programId}
        </span>
      </div>
    </div>
  );
}

