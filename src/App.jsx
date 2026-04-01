import { useState } from 'react';
import { supabase } from './supabase';
import ProtectedRoute from './components/ProtectedRoute';
import Frases from './components/Frases';
import Corrector from './components/Corrector';
import Chat from './components/Chat';
import Gramatica from './components/Gramatica';
import Diagnostico from './components/Diagnostico';
import Vocabulario from './components/Vocabulario';
import Situaciones from './components/Situaciones';
import Dictado from './components/Dictado';
import Lectura from './components/Lectura';
import Progreso from './components/Progreso';
import Cultura from './components/Cultura';
import Ejercicios from './components/Ejercicios';
import './App.css';

const IDIOMAS = [
  { codigo: 'ingles',    nombre: 'Inglés',     bandera: '🇺🇸' },
  { codigo: 'frances',   nombre: 'Francés',    bandera: '🇫🇷' },
  { codigo: 'portugues', nombre: 'Portugués',  bandera: '🇧🇷' },
  { codigo: 'italiano',  nombre: 'Italiano',   bandera: '🇮🇹' },
  { codigo: 'aleman',    nombre: 'Alemán',     bandera: '🇩🇪' },
  { codigo: 'espanol',   nombre: 'Español',    bandera: '🇪🇸' },
  { codigo: 'chino',     nombre: 'Chino',      bandera: '🇨🇳' },
  { codigo: 'japones',   nombre: 'Japonés',    bandera: '🇯🇵' },
];

function App() {
  const [moduloActivo, setModuloActivo] = useState('corrector');
  const [nivelUsuario, setNivelUsuario] = useState(
    localStorage.getItem('nivel_ingles') || ''
  );
  const [idioma, setIdioma] = useState(
    localStorage.getItem('idioma_seleccionado') || 'ingles'
  );
  const [mostrarIdiomas, setMostrarIdiomas] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleIdioma = (codigo) => {
    setIdioma(codigo);
    localStorage.setItem('idioma_seleccionado', codigo);
    setMostrarIdiomas(false);
  };

  const idiomaActual = IDIOMAS.find(i => i.codigo === idioma);

  return (
    <ProtectedRoute>
      <div className="app">
        <header>
          <h1>🌍 Language Learning App</h1>
          <p>Tu tutor de idiomas personal con IA</p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
            
            {/* Selector de idioma */}
          <div style={{ position: 'relative' }}>
  <button
    onClick={() => setMostrarIdiomas(!mostrarIdiomas)}
    style={{ background: '#e8f0fe', color: '#1a237e', border: 'none', borderRadius: '12px', padding: '4px 12px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}>
    {idiomaActual?.bandera} {idiomaActual?.nombre} ▼
  </button>
  {mostrarIdiomas && (
    <div style={{ position: 'fixed', top: 'auto', left: 'auto', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', zIndex: 9999, minWidth: '180px', maxHeight: '320px', overflowY: 'auto', border: '1px solid #ddd' }}>
      {IDIOMAS.map(i => (
        <div
          key={i.codigo}
          onClick={() => handleIdioma(i.codigo)}
          style={{ display: 'block', width: '100%', padding: '10px 16px', background: idioma === i.codigo ? '#e8f0fe' : 'white', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem', fontWeight: idioma === i.codigo ? '600' : '400', color: '#333' }}>
          {i.bandera} {i.nombre}
        </div>
      ))}
    </div>
  )}
</div>  

            {nivelUsuario && (
              <span style={{ background: '#e8f0fe', color: '#1a237e', padding: '4px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '500' }}>
                Nivel {nivelUsuario}
              </span>
            )}
            <button onClick={handleLogout} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '12px', padding: '4px 12px', fontSize: '0.82rem', fontWeight: '500', cursor: 'pointer' }}>
              Cerrar sesión
            </button>
          </div>
        </header>

        <nav style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          <button className={moduloActivo === 'corrector'    ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('corrector')}>✅ Corrector</button>
          <button className={moduloActivo === 'conversacion' ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('conversacion')}>💬 Conversación</button>
          <button className={moduloActivo === 'frases'       ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('frases')}>📚 Frases</button>
          <button className={moduloActivo === 'gramatica'    ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('gramatica')}>📝 Gramática</button>
          <button className={moduloActivo === 'diagnostico'  ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('diagnostico')}>🎯 Mi nivel</button>
          <button className={moduloActivo === 'vocabulario'  ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('vocabulario')}>🧠 Vocabulario</button>
          <button className={moduloActivo === 'situaciones'  ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('situaciones')}>🎭 Situaciones</button>
          <button className={moduloActivo === 'dictado'      ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('dictado')}>🎧 Dictado</button>
          <button className={moduloActivo === 'lectura'      ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('lectura')}>📖 Lectura</button>
          <button className={moduloActivo === 'progreso'     ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('progreso')}>📊 Mi progreso</button>
          <button className={moduloActivo === 'cultura'      ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('cultura')}>🌎 Cultura</button>
          <button className={moduloActivo === 'ejercicios'   ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('ejercicios')}>✏️ Ejercicios</button>
        </nav>

        <main>
          {moduloActivo === 'corrector'    && <Corrector idioma={idioma} />}
          {moduloActivo === 'conversacion' && <Chat idioma={idioma} />}
          {moduloActivo === 'frases'       && <Frases idioma={idioma} />}
          {moduloActivo === 'gramatica'    && <Gramatica idioma={idioma} />}
          {moduloActivo === 'diagnostico'  && <Diagnostico idioma={idioma} onNivelDeterminado={(nivel) => setNivelUsuario(nivel)} />}
          {moduloActivo === 'vocabulario'  && <Vocabulario idioma={idioma} nivelUsuario={nivelUsuario} />}
          {moduloActivo === 'situaciones'  && <Situaciones idioma={idioma} nivelUsuario={nivelUsuario} />}
          {moduloActivo === 'dictado'      && <Dictado idioma={idioma} nivelUsuario={nivelUsuario} />}
          {moduloActivo === 'lectura'      && <Lectura idioma={idioma} nivelUsuario={nivelUsuario} />}
          {moduloActivo === 'progreso'     && <Progreso />}
          {moduloActivo === 'cultura'      && <Cultura idioma={idioma} nivelUsuario={nivelUsuario} />}
          {moduloActivo === 'ejercicios'   && <Ejercicios idioma={idioma} nivelUsuario={nivelUsuario} />}
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default App;