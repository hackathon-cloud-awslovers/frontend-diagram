import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ user_id: '', tenant_id: '', password: '' });
  const nav = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    if (!form.user_id || !form.tenant_id || !form.password) {
      return alert('Completa todos los campos');
    }
    try {
      await login(form);
      nav('/editor');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 1rem'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        width: '100%',
        maxWidth: '24rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#F06292',
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>
          Diagram as Code
        </h2>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: '800',
          color: '#FF99BB',
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          awslovers
        </h1>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* User ID */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}>
              User ID
            </label>
            <input
              type="text"
              value={form.user_id}
              onChange={e => setForm({ ...form, user_id: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          {/* Tenant ID */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}>
              Tenant ID
            </label>
            <input
              type="text"
              value={form.tenant_id}
              onChange={e => setForm({ ...form, tenant_id: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          {/* Password */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}>
              Contraseña
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.5rem 0',
              marginTop: '0.5rem',
              backgroundColor: '#FFCCDD',
              color: 'white',
              fontWeight: '600',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#FF99BB'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#FFCCDD'}
          >
            Entrar
          </button>
        </form>

        <p style={{
          marginTop: '1rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          ¿No tienes cuenta?{' '}
          <Link to="/signup" style={{
            fontWeight: '500',
            color: '#FF99BB',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
