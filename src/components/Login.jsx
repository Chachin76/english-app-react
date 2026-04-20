import { useState } from 'react';
import { supabase } from '../supabase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modo, setModo] = useState('password'); // 'password' o 'magic'
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [modoReset, setModoReset] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);

  const handleLogin = async () => {
    setCargando(true);
    setMensaje('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMensaje('❌ ' + error.message);
    setCargando(false);
  };

const handleReset = async () => {
  if (!email.trim()) { setMensaje('Ingresa tu email primero.'); return; }
  setCargando(true);
  setMensaje('');
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://english-app-react.vercel.app'
  });
  if (error) setMensaje('Error: ' + error.message);
  else setEmailEnviado(true);
  setCargando(false);
};

  const handleRegistro = async () => {
    setCargando(true);
    setMensaje('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMensaje('❌ ' + error.message);
    else setMensaje('✅ Revisá tu email para confirmar el registro');
    setCargando(false);
  };

  const handleMagicLink = async () => {
    setCargando(true);
    setMensaje('');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setMensaje('❌ ' + error.message);
    else setMensaje('✅ Te enviamos un link a tu email. Revisá tu bandeja.');
    setCargando(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '8px' }}>🇺🇸 English Learning App</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px' }}>Tu tutor de inglés personal con IA</p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button
            onClick={() => setModo('password')}
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: modo === 'password' ? '#4f46e5' : '#e8eaf6', color: modo === 'password' ? 'white' : '#333', cursor: 'pointer', fontWeight: '500' }}>
            🔑 Contraseña
          </button>
          <button
            onClick={() => setModo('magic')}
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: modo === 'magic' ? '#4f46e5' : '#e8eaf6', color: modo === 'magic' ? 'white' : '#333', cursor: 'pointer', fontWeight: '500' }}>
            ✨ Magic Link
          </button>
        </div>

        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '12px', fontSize: '1rem', boxSizing: 'border-box' }}
        />

        {modo === 'password' && (
          <input
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '12px', fontSize: '1rem', boxSizing: 'border-box' }}
          />
        )}

        {mensaje && (
          <p style={{ textAlign: 'center', color: mensaje.startsWith('❌') ? '#c62828' : '#2e7d32', marginBottom: '12px', fontSize: '0.9rem' }}>
            {mensaje}
          </p>
        )}

        {modo === 'password' ? (
       <button onClick={handleLogin} disabled={cargando} style={{ width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
  {cargando ? 'Cargando...' : 'Ingresar'}
</button>   
        ) : (
          <button onClick={handleMagicLink} disabled={cargando} style={{ width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
            {cargando ? 'Enviando...' : '✨ Enviar Magic Link'}
          </button>
<button onClick={() => setModoReset(!modoReset)} style={{ width: '100%', padding: '10px', background: 'transparent', border: 'none', color: '#4f46e5', cursor: 'pointer', fontSize: '0.9rem', marginTop: '8px' }}>
          {modoReset ? 'Volver al login' : 'Olvide mi contraseña'}
        </button>
        {modoReset && !emailEnviado && (
          <button onClick={handleReset} disabled={cargando} style={{ width: '100%', padding: '12px', background: '#e8eaf6', color: '#4f46e5', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '8px' }}>
            {cargando ? 'Enviando...' : 'Enviar email de recuperacion'}
          </button>
        )}
        {emailEnviado && (
          <p style={{ textAlign: 'center', color: '#166534', marginTop: '8px', fontSize: '0.9rem' }}>
            Revisa tu email para recuperar tu contraseña
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;