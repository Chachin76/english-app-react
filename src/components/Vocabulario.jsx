import { useState, useEffect } from 'react';

const INTERVALOS = {
  'dificil': 1,
  'normal':  3,
  'facil':   7,
};

function Vocabulario({ nivelUsuario, idioma = 'ingles' }) {
  const [palabras, setPalabras]       = useState([]);
  const [indice, setIndice]           = useState(0);
  const [mostrarRespuesta, setMostrar] = useState(false);
  const [cargando, setCargando]       = useState(false);
  const [estadisticas, setEstadisticas] = useState({ facil:0, normal:0, dificil:0 });
  const [sesionTerminada, setSesion]  = useState(false);
  const [palabrasVistas, setPalabrasVistas] = useState(() => {
    const guardadas = localStorage.getItem('vocabulario_vistas');
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const nivel = nivelUsuario || localStorage.getItem('nivel_ingles') || 'B1';

  useEffect(() => {
    cargarPalabras();
  }, []);

  async function cargarPalabras() {
    setCargando(true);
    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/vocabulario', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
       body:    JSON.stringify({ nivel: nivelUsuario, palabras_vistas: palabrasVistas.slice(-50), idioma })
      });
      const datos = await resp.json();
      setPalabras(datos.palabras);
      setIndice(0);
      setMostrar(false);
      setSesion(false);
    } catch(e) {
      console.error(e);
    } finally {
      setCargando(false);
    }
  }

  function hablar(texto) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u     = new SpeechSynthesisUtterance(texto);
    u.lang      = 'en-US';
    u.rate      = 0.9;
    const voces = window.speechSynthesis.getVoices();
    const voz   = voces.find(v => v.lang === 'en-US') || voces[0];
    if (voz) u.voice = voz;
    window.speechSynthesis.speak(u);
  }

  function calificar(dificultad) {
    const palabra = palabras[indice];

    // Actualiza estadísticas
    setEstadisticas(prev => ({ ...prev, [dificultad]: prev[dificultad] + 1 }));

    // Guarda la palabra como vista
    const nuevasVistas = [...palabrasVistas, palabra.ingles];
    setPalabrasVistas(nuevasVistas);
    localStorage.setItem('vocabulario_vistas', JSON.stringify(nuevasVistas));

    // Avanza a la siguiente
    registrarActividad('vocabulario', 1);
    if (indice < palabras.length - 1) {
      setIndice(indice + 1);
      setMostrar(false);
    } else {
      setSesion(true);
    }
  }

  const colorCategoria = {
    'sustantivo': '#e3f2fd',
    'verbo':      '#e8f5e9',
    'adjetivo':   '#fff8e1',
    'adverbio':   '#fce4ec',
  };

  // Pantalla de carga
  if (cargando) {
    return (
      <div className="card" style={{ textAlign:'center', padding:'40px' }}>
        <div style={{ fontSize:'2rem', marginBottom:'16px' }}>📚</div>
        <div style={{ color:'var(--color-text-secondary)' }}>
          Generando vocabulario nivel {nivel}...
        </div>
      </div>
    );
  }

  // Sesión terminada
  if (sesionTerminada) {
    const total = estadisticas.facil + estadisticas.normal + estadisticas.dificil;
    return (
      <div className="card">
        <h2>📚 Sesión completada</h2>

        <div style={{ textAlign:'center', padding:'24px', background:'#e8f5e9', borderRadius:'12px', marginBottom:'20px' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'8px' }}>🎉</div>
          <div style={{ fontSize:'1.1rem', fontWeight:'500', color:'#1a6b3a' }}>
            ¡Estudiaste {total} palabras!
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px', marginBottom:'20px' }}>
          <div style={{ background:'#e8f5e9', padding:'12px', borderRadius:'8px', textAlign:'center' }}>
            <div style={{ fontSize:'1.5rem', fontWeight:'bold', color:'#1a6b3a' }}>{estadisticas.facil}</div>
            <div style={{ fontSize:'0.82rem', color:'#555' }}>Fácil</div>
            <div style={{ fontSize:'0.75rem', color:'#888' }}>Ver en 7 días</div>
          </div>
          <div style={{ background:'#fff8e1', padding:'12px', borderRadius:'8px', textAlign:'center' }}>
            <div style={{ fontSize:'1.5rem', fontWeight:'bold', color:'#e65100' }}>{estadisticas.normal}</div>
            <div style={{ fontSize:'0.82rem', color:'#555' }}>Normal</div>
            <div style={{ fontSize:'0.75rem', color:'#888' }}>Ver en 3 días</div>
          </div>
          <div style={{ background:'#fdecea', padding:'12px', borderRadius:'8px', textAlign:'center' }}>
            <div style={{ fontSize:'1.5rem', fontWeight:'bold', color:'#c0392b' }}>{estadisticas.dificil}</div>
            <div style={{ fontSize:'0.82rem', color:'#555' }}>Difícil</div>
            <div style={{ fontSize:'0.75rem', color:'#888' }}>Ver mañana</div>
          </div>
        </div>

        <div style={{ display:'flex', gap:'10px' }}>
          <button
            onClick={cargarPalabras}
            style={{ flex:1, background:'#2c5f8a', color:'white', border:'none', padding:'10px', borderRadius:'8px', cursor:'pointer' }}
          >
            Nueva sesión ↻
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('vocabulario_vistas');
              setPalabrasVistas([]);
              cargarPalabras();
            }}
            style={{ background:'transparent', color:'#888', border:'0.5px solid #ddd', padding:'10px 16px', borderRadius:'8px', cursor:'pointer', fontSize:'0.85rem' }}
          >
            Reiniciar progreso
          </button>
        </div>
      </div>
    );
  }

  if (!palabras.length) return null;

  const palabra = palabras[indice];
  const bg      = colorCategoria[palabra.categoria] || '#f5f5f5';

  return (
    <div className="card">
      <h2>📚 Vocabulario — Nivel {nivel}</h2>

      {/* Progreso */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
        <span style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)' }}>
          {indice + 1} / {palabras.length}
        </span>
        <div style={{ display:'flex', gap:'6px' }}>
          <span style={{ background:'#e8f5e9', color:'#1a6b3a', fontSize:'0.78rem', padding:'2px 8px', borderRadius:'10px' }}>
            ✅ {estadisticas.facil}
          </span>
          <span style={{ background:'#fff8e1', color:'#e65100', fontSize:'0.78rem', padding:'2px 8px', borderRadius:'10px' }}>
            👍 {estadisticas.normal}
          </span>
          <span style={{ background:'#fdecea', color:'#c0392b', fontSize:'0.78rem', padding:'2px 8px', borderRadius:'10px' }}>
            💪 {estadisticas.dificil}
          </span>
        </div>
      </div>

      {/* Barra de progreso */}
      <div style={{ background:'var(--color-background-secondary)', borderRadius:'8px', height:'6px', marginBottom:'20px' }}>
        <div style={{
          background:'#2c5f8a', borderRadius:'8px', height:'6px',
          width:`${((indice) / palabras.length) * 100}%`, transition:'width 0.3s'
        }} />
      </div>

      {/* Tarjeta de la palabra */}
      <div style={{ background: bg, borderRadius:'12px', padding:'32px', textAlign:'center', marginBottom:'20px', minHeight:'200px', display:'flex', flexDirection:'column', justifyContent:'center' }}>

        <div style={{ fontSize:'0.78rem', color:'#666', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'1px' }}>
          {palabra.categoria}
        </div>

        <div style={{ fontSize:'2rem', fontWeight:'bold', color:'#1a1a2e', marginBottom:'12px' }}>
          {palabra.ingles}
        </div>

        <button
          onClick={() => hablar(palabra.ingles)}
          style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:'1.5rem', marginBottom:'12px' }}
        >
          🔊
        </button>

        {!mostrarRespuesta ? (
          <button
            onClick={() => {
              setMostrar(true);
              hablar(palabra.ingles);
            }}
            style={{ background:'white', color:'#2c5f8a', border:'0.5px solid #2c5f8a', padding:'8px 20px', borderRadius:'8px', cursor:'pointer', fontSize:'0.9rem', marginTop:'8px' }}
          >
            Ver traducción
          </button>
        ) : (
          <div>
            <div style={{ fontSize:'1.4rem', color:'#2c5f8a', fontWeight:'500', marginBottom:'8px' }}>
              {palabra.español}
            </div>
            <div style={{ fontSize:'0.88rem', color:'#555', fontStyle:'italic', marginBottom:'4px' }}>
              "{palabra.ejemplo}"
            </div>
            <div style={{ fontSize:'0.82rem', color:'#888' }}>
              {palabra.ejemplo_español}
            </div>
          </div>
        )}
      </div>

      {/* Botones de calificación */}
      {mostrarRespuesta && (
        <div>
          <div style={{ textAlign:'center', fontSize:'0.85rem', color:'var(--color-text-secondary)', marginBottom:'10px' }}>
            ¿Qué tan fácil fue recordarla?
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px' }}>
            <button
              onClick={() => calificar('dificil')}
              style={{ background:'#fdecea', color:'#c0392b', border:'0.5px solid #f5c6c6', padding:'12px', borderRadius:'8px', cursor:'pointer', fontSize:'0.88rem', marginTop:'0' }}
            >
              💪 Difícil<br/>
              <span style={{ fontSize:'0.75rem' }}>Ver mañana</span>
            </button>
            <button
              onClick={() => calificar('normal')}
              style={{ background:'#fff8e1', color:'#e65100', border:'0.5px solid #ffe0a0', padding:'12px', borderRadius:'8px', cursor:'pointer', fontSize:'0.88rem', marginTop:'0' }}
            >
              👍 Normal<br/>
              <span style={{ fontSize:'0.75rem' }}>Ver en 3 días</span>
            </button>
            <button
              onClick={() => calificar('facil')}
              style={{ background:'#e8f5e9', color:'#1a6b3a', border:'0.5px solid #a5d6a7', padding:'12px', borderRadius:'8px', cursor:'pointer', fontSize:'0.88rem', marginTop:'0' }}
            >
              ✅ Fácil<br/>
              <span style={{ fontSize:'0.75rem' }}>Ver en 7 días</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vocabulario;