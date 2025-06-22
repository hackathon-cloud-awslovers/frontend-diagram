import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

export default function ExportButtons({ svgBase64 }) {
  const containerId = 'diagram-container';

  const exportPng = () => {
    const node = document.getElementById(containerId);
    domtoimage.toPng(node).then(dataUrl => saveAs(dataUrl, 'diagram.png'));
  };
  const exportSvg = () => {
    const blob = new Blob([atob(svgBase64)], { type: 'image/svg+xml' });
    saveAs(blob, 'diagram.svg');
  };
  const exportPdf = () => {
    // podrías usar jsPDF u otra lib, o bien convertir el PNG y luego embebirlo
    alert('Implementar export a PDF según tu preferencia');
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#FFCCDD',
    color: 'white',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '600',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button 
        onClick={exportPng} 
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#FF99BB'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#FFCCDD'}
      >
        PNG
      </button>
      <button 
        onClick={exportSvg} 
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#FF99BB'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#FFCCDD'}
      >
        SVG
      </button>
      <button 
        onClick={exportPdf} 
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#FF99BB'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#FFCCDD'}
      >
        PDF
      </button>
    </div>
  );
}
