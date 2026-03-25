import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Login from './Login';

function ProtectedRoute({ children }) {
  const [sesion, setSesion] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSesion(session);
      setCargando(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSesion(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (cargando) return <div style={{ textAlign: 'center', marginTop: '40vh', fontSize: '1.5rem' }}>Cargando...</div>;
  if (!sesion) return <Login />;
  return children;
}

export default ProtectedRoute;