export default function DiagramViewer({ svgBase64 }) {
  return (
    <div id="diagram-container" style={{
      border: '1px solid #e5e7eb',
      padding: '0.5rem',
      backgroundColor: 'white',
      borderRadius: '0.375rem',
      maxWidth: '100%',
      maxHeight: '100%'
    }}>
      <img 
        src={`data:image/svg+xml;base64,${svgBase64}`} 
        alt="Diagrama" 
        style={{
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
}
