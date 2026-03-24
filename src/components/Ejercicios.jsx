import { useState } from 'react';
import { registrarActividad } from './Progreso';

const TIPOS = [
  { id:'completar',   emoji:'✏️', label:'Completar',   descripcion:'Completá el espacio en blanco' },
  { id:'transformar', emoji:'🔄', label:'Transformar',  descripcion:'Transformá la oración según la instrucción' },
  { id:'conjugar',    emoji:'⚡', label:'Conjugar',     descripcion:'Conjugá el verbo en el tiempo correcto' },
  { id:'ordenar',     emoji:'🔀', label:'Ordenar',      descripcion:'Ordená las palabras para formar una oración' },
];

function Ejercicios({ nivelUsuario }) {
  const [ejercicios, setEjercicios]   = useState([]);
  const [cargando, setCargando]       = useState(false);
  const [tipoActual, setTipo]         = useState('');
  const [indice, setIndice]           = useState(0);
  const [respuesta, setRespuesta]     = useState('');
  const [verificado, setVerificado]   = useState(false);
  const [correcto, setCorrecto]       = useState(false);
  const [mostrarPista, setMostrarPista] = useState(false);
  const [puntajes, setPuntajes]       = useState([]);
  const [sesionTerminada, setSesion]  = useState(false);
  const nivel = nivelUsuario || localStorage.getItem('nivel_ingles') || 'B1';

  async function cargar(tipo) {
    setCargando(true);
    setTipo(tipo);
    setEjercicios([]);
    setIndice(0);
    setRespuesta('');
    setVerificado(false);
    setCorrecto(false);
    setMostrarPista(false);
    setPuntajes([]);
    setSesion(false);

    try {
      const resp = await fetch('http://127.0.0.1:8000/ejercicios', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ tipo, nivel })
      });
      const datos = await resp.json();
      setEjercicios(datos.ejercicios);
    } catch(e) {
      console.error(e);
    } finally {
      setCargando(false);
    }
  }

  function verificar() {
    if (!respuesta.trim()) return;
    const ejercicio    = ejercicios[indice];
    const esCorrecta   = respuesta.trim().toLowerCase() === ejercicio.respuesta.toLowerCase();
    setCorrecto(esCorrecta);
    setVerificado(true);
    setPuntajes(prev => [...prev, esCorrecta ? 100 : 0]);
  }

  function siguiente() {
    if (indice < ejercicios.length - 1) {
      setIndice(indice + 1);
      setRespuesta('');
      setVerificado(false);
      setCorrecto(false);
      setMostrarPista(false);
    } else {
      registrarActividad('ejercicios', 5);
      setSesion(true);
    }
  }

  // Pantalla de selección
  if (!tipoActual) {
    return (
      <div className="card">
        <h2>🏋️ Ejercicios estructurados</h2>
        <p className="descripcion">
          Practicá gramática con ejercicios dirigidos adaptados a tu nivel.
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
          {TIPOS.map(t => (
            <button
              key={t.id}
              onClick={() => cargar(t.id)}
              style={{ background:'var(--color-background-secondary)', color:'var(--color-text-primary)', border:'0.5px solid var(--color-border-secondary)', padding:'16px', borderRadius:'12px', cursor:'pointer', textAlign:'left', marginTop:'0' }}
            >
              <div style={{ fontSize:'1.8rem', marginBottom:'6px' }}>{t.emoji}</div>
              <div style={{ fontWeight:'500', marginBottom:'3px' }}>{t.label}</div>
              <div style={{ fontSize:'0.82rem', color:'var(--color-text-secondary)' }}>{t.descripcion}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Cargando
  if (cargando) {
    return (
      <div className="card" style={{ textAlign:'center', padding:'40px' }}>
        <div style={{ fontSize:'2rem', marginBottom:'16px' }}>🏋️</div>
        <div style={{ color:'var(--color-text-secondary)' }}>Generando ejercicios nivel {nivel}...</div>
      </div>
    );
  }

  // Sesión terminada
  if (sesionTerminada) {
    const correctas = puntajes.filter(p => p === 100).length;
    const puntaje   = Math.round((correctas / puntajes.length) * 100);
    const color     = puntaje >= 80 ? '#e8f5e9' : puntaje >= 60 ? '#fff8e1' : '#fdecea';
    const colorT    = puntaje >= 80 ? '#1a6b3a' : puntaje >= 60 ? '#e65100' : '#c0392b';

    return (
      <div className="card">
        <h2>🏋️ Sesión completada</h2>

        <div style={{ textAlign:'center', padding:'24px', background: color, borderRadius:'12px', marginBottom:'20px' }}>
          <div style={{ fontSize:'3rem', fontWeight:'bold', color: colorT }}>{correctas}/{puntajes.length}</div>
          <div style={{ fontSize:'0.85rem', color: colorT }}>respuestas correctas</div>
          <div style={{ fontSize:'1rem', marginTop:'8px', color: colorT }}>
            {puntaje >= 80 ? '¡Excelente!' : puntaje >= 60 ? 'Buen trabajo' : 'Seguí practicando'}
          </div>
        </div>

        <div style={{ display:'flex', gap:'10px' }}>
          <button
            onClick={() => cargar(tipoActual)}
            style={{ flex:1, background:'#2c5f8a', color:'white', border:'none', padding:'10px', borderRadius:'8px', cursor:'pointer' }}
          >
            Repetir ↻
          </button>
          <button
            onClick={() => { setTipo(''); setEjercicios([]); setSesion(false); }}
            style={{ background:'transparent', color:'#888', border:'0.5px solid #ddd', padding:'10px 16px', borderRadius:'8px', cursor:'pointer', fontSize:'0.88rem' }}
          >
            Otro tipo
          </button>
        </div>
      </div>
    );
  }

  if (!ejercicios.length) return null;

  const ejercicio = ejercicios[indice];

  return (
    <div className="card">
      <h2>🏋️ {TIPOS.find(t => t.id === tipoActual)?.label} — Nivel {nivel}</h2>

      {/* Progreso */}
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
        <span style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)' }}>
          Ejercicio {indice + 1} de {ejercicios.length}
        </span>
        <span style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)' }}>
          ✅ {puntajes.filter(p => p === 100).length} correctas
        </span>
      </div>

      <div style={{ background:'var(--color-background-secondary)', borderRadius:'8px', height:'6px', marginBottom:'20px' }}>
        <div style={{ background:'#2c5f8a', borderRadius:'8px', height:'6px', width:`${(indice / ejercicios.length) * 100}%`, transition:'width 0.3s' }} />
      </div>

      {/* Instrucción */}
      <div style={{ background:'#e8f0fe', padding:'10px 14px', borderRadius:'8px', marginBottom:'14px', fontSize:'0.88rem', color:'#1a237e' }}>
        📋 {ejercicio.instruccion}
      </div>

      {/* Enunciado */}
      <div style={{ background:'var(--color-background-secondary)', padding:'18px', borderRadius:'10px', marginBottom:'16px', fontSize:'1.05rem', fontStyle:'italic', lineHeight:'1.6' }}>
        {ejercicio.enunciado}
      </div>

      {/* Campo de respuesta */}
      {!verificado ? (
        <div>
          <input
            value={respuesta}
            onChange={e => setRespuesta(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && verificar()}
            placeholder="Escribí tu respuesta..."
            style={{ width:'100%', padding:'12px', borderRadius:'8px', border:'0.5px solid var(--color-border-secondary)', fontSize:'1rem', boxSizing:'border-box', marginBottom:'10px' }}
          />

          <div style={{ display:'flex', gap:'8px' }}>
            <button
              onClick={verificar}
              disabled={!respuesta.trim()}
              style={{ flex:1, background: respuesta.trim() ? '#2c5f8a' : '#ccc', color:'white', border:'none', padding:'10px', borderRadius:'8px', cursor: respuesta.trim() ? 'pointer' : 'not-allowed', fontSize:'1rem' }}
            >
              Verificar ✓
            </button>
            <button
              onClick={() => setMostrarPista(!mostrarPista)}
              style={{ background:'transparent', color:'#888', border:'0.5px solid #ddd', padding:'10px 16px', borderRadius:'8px', cursor:'pointer', fontSize:'0.88rem' }}
            >
              💡 Pista
            </button>
          </div>

          {mostrarPista && (
            <div style={{ background:'#fff8e1', padding:'10px 14px', borderRadius:'8px', marginTop:'10px', fontSize:'0.88rem', color:'#e65100' }}>
              💡 {ejercicio.pista}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Resultado */}
          <div style={{ background: correcto ? '#e8f5e9' : '#fdecea', padding:'14px', borderRadius:'8px', marginBottom:'12px' }}>
            <div style={{ fontWeight:'500', color: correcto ? '#1a6b3a' : '#c0392b', marginBottom:'6px' }}>
              {correcto ? '✅ ¡Correcto!' : '❌ Incorrecto'}
            </div>
            {!correcto && (
              <div style={{ fontSize:'0.9rem', marginBottom:'6px' }}>
                Respuesta correcta: <strong>{ejercicio.respuesta}</strong>
              </div>
            )}
            <div style={{ fontSize:'0.85rem', color:'#555' }}>
              📖 {ejercicio.explicacion}
            </div>
          </div>

          <button
            onClick={siguiente}
            style={{ width:'100%', background:'#2c5f8a', color:'white', border:'none', padding:'10px', borderRadius:'8px', cursor:'pointer', fontSize:'1rem' }}
          >
            {indice < ejercicios.length - 1 ? 'Siguiente ejercicio →' : 'Ver resultado final ✓'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Ejercicios;