export function CreditsWindow() {
  return (
    <div style={{ padding: '8px', fontFamily: 'Tahoma, sans-serif', fontSize: '12px', color: '#000' }}>
      <p style={{ marginTop: 0, fontWeight: 'bold' }}>
        Agradecimientos y Créditos
      </p>
      <p>
        Este proyecto ha sido desarrollado utilizando recursos open-source y assets de la comunidad:
      </p>
      <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
        <li><strong>Estilos UI:</strong> <a href="https://botoxparty.github.io/XP.css/" target="_blank" rel="noreferrer">xp.css</a> por Botond Dániel.</li>
        <li><strong>Iconografía:</strong> Colección clásica de Windows XP de Microsoft / Open-source.</li>
        <li><strong>Efectos de Audio:</strong> Sonidos originales del sistema Windows XP.</li>
      </ul>
      <hr style={{ border: 'none', borderTop: '1px solid #c0c0c0', margin: '12px 0' }} />
      <p style={{ fontSize: '11px', color: '#555', textAlign: 'center' }}>
        Desarrollado por <strong>attl.dev</strong>
      </p>
    </div>
  );
}