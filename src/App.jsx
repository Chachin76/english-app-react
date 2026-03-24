import { useState } from 'react';
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

function App() {
  const [moduloActivo, setModuloActivo] = useState('corrector');
  const [nivelUsuario, setNivelUsuario] = useState(
    localStorage.getItem('nivel_ingles') || ''
  );

  function pedirKey() {
    const key = prompt('Ingresá tu API Key de Anthropic (empieza con sk-ant-):');
    if (key && key.startsWith('sk-ant')) {
      localStorage.setItem('anthropic_key', key);
      alert('✅ API Key guardada correctamente.');
    }
  }

  return (
    <div className="app">
      <header>
        <h1>🇺🇸 English Learning App</h1>
        <p>Tu tutor de inglés personal con IA</p>
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', marginTop:'8px' }}>
          <button className="btn-key" onClick={pedirKey}>🔑 API Key</button>
          {nivelUsuario && (
            <span style={{ background:'#e8f0fe', color:'#1a237e', padding:'4px 12px', borderRadius:'12px', fontSize:'0.82rem', fontWeight:'500' }}>
              Nivel {nivelUsuario}
            </span>
          )}
        </div>
      </header>

      <nav style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'8px', marginBottom:'24px' }}>
        <button className={moduloActivo === 'corrector'    ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('corrector')}>✍️ Corrector</button>
        <button className={moduloActivo === 'conversacion' ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('conversacion')}>💬 Conversación</button>
        <button className={moduloActivo === 'frases'       ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('frases')}>📖 Frases</button>
        <button className={moduloActivo === 'gramatica'    ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('gramatica')}>📚 Gramática</button>
        <button className={moduloActivo === 'diagnostico'  ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('diagnostico')}>🎯 Mi nivel</button>
        <button className={moduloActivo === 'vocabulario'  ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('vocabulario')}>🗂️ Vocabulario</button>
        <button className={moduloActivo === 'situaciones'  ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('situaciones')}>🎭 Situaciones</button>
        <button className={moduloActivo === 'dictado'      ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('dictado')}>🎧 Dictado</button>
        <button className={moduloActivo === 'lectura'      ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('lectura')}>📖 Lectura</button>
        <button className={moduloActivo === 'progreso'     ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('progreso')}>📊 Mi progreso</button>
        <button className={moduloActivo === 'cultura'      ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('cultura')}>🌍 Cultura</button>
        <button className={moduloActivo === 'ejercicios'   ? 'nav-btn active' : 'nav-btn'} onClick={() => setModuloActivo('ejercicios')}>🏋️ Ejercicios</button>
      </nav>

      <main>
        {moduloActivo === 'corrector'    && <Corrector />}
        {moduloActivo === 'conversacion' && <Chat />}
        {moduloActivo === 'frases'       && <Frases />}
        {moduloActivo === 'gramatica'    && <Gramatica />}
        {moduloActivo === 'diagnostico'  && <Diagnostico onNivelDeterminado={(nivel) => setNivelUsuario(nivel)} />}
        {moduloActivo === 'vocabulario'  && <Vocabulario nivelUsuario={nivelUsuario} />}
        {moduloActivo === 'situaciones'  && <Situaciones nivelUsuario={nivelUsuario} />}
        {moduloActivo === 'dictado'      && <Dictado nivelUsuario={nivelUsuario} />}
        {moduloActivo === 'lectura'      && <Lectura nivelUsuario={nivelUsuario} />}
        {moduloActivo === 'progreso'     && <Progreso />}
        {moduloActivo === 'cultura'      && <Cultura nivelUsuario={nivelUsuario} />}
        {moduloActivo === 'ejercicios'   && <Ejercicios nivelUsuario={nivelUsuario} />}
      </main>
    </div>
  );
}

export default App;