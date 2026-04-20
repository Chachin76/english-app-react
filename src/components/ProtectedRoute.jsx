import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Login from './Login';
import ResetPassword from './ResetPassword';

function ProtectedRoute({ children }) {
  const [sesion, setSesion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [resetMode, setResetMode] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSesion(session);
      setCargando(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSesion(session);
      if (event === 'PASSWORD_RECOVERY') {
        setResetMode(true);
      }
      if (event === 'SIGNED_IN' && resetMode) {
        setResetMode(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (cargando) return <div style={{ textAlign: 'center', marginTop: '40vh', fontSize: '1.5rem' }}>Cargando...</div>;
  if (resetMode) return <ResetPassword onVolver={() => { setResetMode(false); supabase.auth.signOut(); }} />;
  if (!sesion) return <Login />;
  return children;
}

export default ProtectedRoute;