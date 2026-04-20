import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

function ResetPassword({ onVolver }) {
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [listo, setListo] = useState(false);
  const [verPassword, setVerPassword] = useState(false);

  async function cambiarPassword() {
    if (!password.trim()) { setMensaje('Ingresa una contraseña.'); return; }
    if (password.length < 6) { setMensaje('La contraseña debe tener al menos 6 caracteres.'); return; }
    if (password !== confirmar) { setMensaje('Las contraseñas no coinciden.'); return; }
    setCargando(true);
    setMensaje('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMensaje('Error: ' + error.message);
    } else {
      setListo(true);
      setMensaje('Contraseña actualizada correctamente.');
    }
    setCargando(false);
  }

  if (listo) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
        <h2 style={{ color: '#166534' }}>Contraseña actualizada</h2>
        <p style={{ color: '#666' }}>Ya podés ingresar con tu nueva contraseña.</p>
        <button onClick={onVolver} style={{ marginTop: '16px', width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          Ir al login
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#4f46e5' }}>Nueva contraseña</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px' }}>Ingresa tu nueva contraseña</p>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <input
            type={verPassword ? 'text' : 'password'}
            placeholder="Nueva contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', paddingRight: '100px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box', color: '#333' }}
          />
          <button onClick={() => setVerPassword(!verPassword)} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#4f46e5', fontSize: '0.85rem', fontWeight: '600' }}>
            {verPassword ? 'Ocultar' : 'Ver'}
          </button>
        </div>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <input
            type={verPassword ? 'text' : 'password'}
            placeholder="Confirmar contraseña"
            value={confirmar}
            onChange={e => setConfirmar(e.target.value)}
            style={{ width: '100%', padding: '12px', paddingRight: '100px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box', color: '#333' }}
          />
        </div>
        {mensaje && (
          <p style={{ color: listo ? '#166534' : '#991b1b', marginBottom: '12px', fontSize: '0.9rem', textAlign: 'center' }}>
            {mensaje}
          </p>
        )}
        <button onClick={cambiarPassword} disabled={cargando}
          style={{ width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
          {cargando ? 'Actualizando...' : 'Cambiar contraseña'}
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;