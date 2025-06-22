import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CodeEditor from '../components/CodeEditor';
import DiagramTypeSelector from '../components/DiagramTypeSelector';
import DiagramViewer from '../components/DiagramViewer';
import ExportButtons from '../components/ExportButtons';
import API from '../api';

export default function EditorPage() {
  const { logout } = useContext(AuthContext);
  const [code, setCode] = useState('');
  const [type, setType] = useState('ER');
  const [diagram, setDiagram] = useState(null);
  const [loading, setLoading] = useState(false);

  const generar = async () => {
    if (!code.trim()) return alert('Escribe tu definición antes de generar');
    setLoading(true);
    try {
      const { data } = await API.post('/generate', { code, type });
      setDiagram(data.svgBase64);
    } catch {
      alert('Error generando diagrama');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFE6F0',
      padding: '1.5rem'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: '800',
          color: '#FF99BB',
          textAlign: 'center',
          flex: '1'
        }}>
          awslovers
        </h1>
        <button 
          onClick={logout} 
          style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: 'white',
            borderRadius: '0.375rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          Logout
        </button>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <DiagramTypeSelector value={type} onChange={setType} />
            <button
              onClick={generar}
              disabled={loading}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#FFCCDD',
                color: 'white',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#FF99BB')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#FFCCDD')}
            >
              {loading ? 'Generando…' : 'Generar'}
            </button>
          </div>
          <CodeEditor value={code} onChange={setCode} />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '1rem',
          padding: '1.5rem',
          minHeight: '400px'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#FF99BB',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Diagrama Generado
          </h2>
          
          {diagram ? (
            <>
              <div style={{
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px dashed #FFCCDD',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'white'
              }}>
                <DiagramViewer svgBase64={diagram} />
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <ExportButtons svgBase64={diagram} />
              </div>
            </>
          ) : (
            <div style={{
              flex: '1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px dashed #FFCCDD',
              borderRadius: '0.5rem',
              color: '#6b7280',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}>
              Todavía no hay diagrama
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
