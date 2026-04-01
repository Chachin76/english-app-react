import { useState } from 'react';

const TEMAS = [
  { emoji:'🌍', tema:'travel and tourism', label:'Viajes' },
  { emoji:'🍕', tema:'food and cooking', label:'Comida' },
  { emoji:'💻', tema:'technology and innovation', label:'Tecnología' },
  { emoji:'🎬', tema:'movies and entertainment', label:'Entretenimiento' },
  { emoji:'⚽', tema:'sports', label:'Deportes' },
  { emoji:'🌿', tema:'environment and nature', label:'Naturaleza' },
  { emoji:'💼', tema:'work and career', label:'Trabajo' },
  { emoji:'🏥', tema:'health and wellness', label:'Salud' },
  { emoji:'📚', tema:'education and learning', label:'Educación' },
  { emoji:'🎵', tema:'music and arts', label:'Música' },
];

function Lectura({ nivelUsuario, idioma = 'ingles' }) {
  const [lectura, setLectura]           = useState(null);
  const [cargando, setCargando]         = useState(false);
  const [temaCustom, setTemaCustom]     = useState('');
  const [fase, setFase]                 = useState('seleccion');
  const [respuestas, setRespuestas]     = useState({});
  const [resultado, setResultado]       = useState(null);
  const [preguntaActual, setPregunta]   = useState(0);
  const [textoVisible, setTextoVisible] = useState(true);
  const [leyendo, setLeyendo]           = useState(false);
  const nivel = nivelUsuario || localStorage.getItem('nivel_ingles') || 'B1';

  async function generarLectura(tema) {
    // Detener audio si hay algo sonando
    window.speechSynthesis?.cancel();
    setLeyendo(false);
    setCargando(true);
    setLectura(null);
    setRespuestas({});
    setResultado(null);
    setPregunta(0);
    setFase('seleccion');

    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/lectura/generar', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ nivel, tema, idioma })  
      });
      const datos = await resp.json();
      setLectura(datos);
      setFase('leyendo');
    } catch(e) {
      setFase('seleccion');
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
    u.onstart = () => setLeyendo(true);
    u.onend   = () => setLeyendo(false);
    u.onerror = () => setLeyendo(false);
    window.speechSynthesis.speak(u);
  }

  function detener() {
    window.speechSynthesis?.cancel();
    setLeyendo(false);
  }

  function responder(opcion) {
    setRespuestas(prev => ({ ...prev, [preguntaActual]: opcion }));
  }

  function siguiente() {
    if (preguntaActual < lectura.preguntas.length - 1) {
      setPregunta(preguntaActual + 1);
    } else {
      calcularResultado();
    }
  }

  function calcularResultado() {
    const correctas = lectura.preguntas.filter(
      (p, i) => respuestas[i] === p.correcta
    ).length;
    const puntaje = Math.round((correctas / lectura.preguntas.length) * 100);
    registrarActividad('lectura', 5);
    setResultado({ correctas, total: lectura.preguntas.length, puntaje });
    setFase('resultado');
  }

  // Pantalla de selección
  if (fase === 'seleccion') {
    return (
      <div className="card">
        <h2>📖 Lectura graduada</h2>
        <p className="descripcion">
          Elegí un tema, leé el texto en inglés y respondé preguntas de comprensión.
        </p>

        <div style={{ background:'var(--color-background-secondary)', borderRadius:'12px', padding:'16px', marginBottom:'20px', border:'0.5px solid var(--color-border-secondary)' }}>
          <div style={{ fontWeight:'500', marginBottom:'6px' }}>✏️ Elegí tu propio tema</div>
          <input
            value={temaCustom}
            onChange={e => setTemaCustom(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && temaCustom.trim() && generarLectura(temaCustom)}
            placeholder="Ej: history of Argentina, climate change..."
            style={{ width:'100%', padding:'10px', borderRadius:'8px', border:'0.5px solid var(--color-border-secondary)', fontSize:'0.9rem', boxSizing:'border-box', marginBottom:'8px' }}
          />
          <button
            onClick={() => generarLectura(temaCustom)}
            disabled={!temaCustom.trim()}
            style={{ background: temaCustom.trim() ? '#2c5f8a' : '#ccc', color:'white', border:'none', padding:'8px 20px', borderRadius:'8px', cursor: temaCustom.trim() ? 'pointer' : 'not-allowed', fontSize:'0.9rem' }}
          >
            Generar texto →
          </button>
        </div>

        <div style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)', marginBottom:'10px' }}>
          O elegí un tema predefinido:
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {TEMAS.map(t => (
            <button
              key={t.tema}
              onClick={() => generarLectura(t.tema)}
              style={{ background:'var(--color-background-secondary)', color:'var(--color-text-primary)', border:'0.5px solid var(--color-border-secondary)', padding:'12px', borderRadius:'10px', cursor:'pointer', textAlign:'left', marginTop:'0' }}
            >
              <span style={{ fontSize:'1.3rem', marginRight:'8px' }}>{t.emoji}</span>
              <span style={{ fontSize:'0.9rem', fontWeight:'500' }}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Pantalla de carga
  if (cargando) {
    return (
      <div className="card" style={{ textAlign:'center', padding:'40px' }}>
        <div style={{ fontSize:'2rem', marginBottom:'16px' }}>📖</div>
        <div style={{ color:'var(--color-text-secondary)' }}>
          Generando texto nivel {nivel}...
        </div>
      </div>
    );
  }

  if (!lectura) return null;

  // Pantalla de lectura
  if (fase === 'leyendo') {
    return (
      <div className="card">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
          <div>
            <h2 style={{ margin:'0 0 4px' }}>📖 {lectura.titulo}</h2>
            <span style={{ background:'#e8f0fe', color:'#1a237e', fontSize:'0.78rem', padding:'2px 10px', borderRadius:'10px' }}>
              Nivel {nivel}
            </span>
          </div>

          {/* Botones de audio */}
          <div style={{ display:'flex', gap:'8px' }}>
            {!leyendo ? (
              <button
                onClick={() => hablar(lectura.texto)}
                style={{ background:'#2c5f8a', color:'white', border:'none', padding:'8px 14px', borderRadius:'8px', cursor:'pointer', fontSize:'0.85rem' }}
              >
                🔊 Escuchar
              </button>
            ) : (
              <button
                onClick={detener}
                style={{ background:'#e53935', color:'white', border:'none', padding:'8px 14px', borderRadius:'8px', cursor:'pointer', fontSize:'0.85rem' }}
              >
                ⏹ Detener
              </button>
            )}
          </div>
        </div>

        {/* Texto */}
        <div style={{ background:'var(--color-background-secondary)', borderRadius:'12px', padding:'20px', marginBottom:'16px', lineHeight:'1.8', fontSize:'1rem' }}>
          {lectura.texto}
        </div>

        {/* Palabras clave */}
        {lectura.palabras_clave?.length > 0 && (
          <div style={{ marginBottom:'16px' }}>
            <div style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)', marginBottom:'8px' }}>
              📌 Palabras clave:
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
              {lectura.palabras_clave.map((p, i) => (
                <button
                  key={i}
                  onClick={() => hablar(p)}
                  style={{ background:'#e8f0fe', color:'#1a237e', border:'none', padding:'4px 12px', borderRadius:'12px', cursor:'pointer', fontSize:'0.85rem' }}
                >
                  🔊 {p}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => { setFase('preguntas'); detener(); }}
          style={{ width:'100%', background:'#2c5f8a', color:'white', border:'none', padding:'12px', borderRadius:'8px', cursor:'pointer', fontSize:'1rem' }}
        >
          Responder preguntas →
        </button>

        <button
          onClick={() => { setFase('seleccion'); detener(); }}
          style={{ width:'100%', background:'transparent', color:'#888', border:'none', padding:'8px', cursor:'pointer', fontSize:'0.85rem', marginTop:'4px' }}
        >
          Elegir otro texto
        </button>
      </div>
    );
  }

  // Pantalla de preguntas
  if (fase === 'preguntas') {
    const pregunta   = lectura.preguntas[preguntaActual];
    const respondida = respuestas[preguntaActual];

    return (
      <div className="card">
        <h2>📖 Preguntas de comprensión</h2>

        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
          <span style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)' }}>
            Pregunta {preguntaActual + 1} de {lectura.preguntas.length}
          </span>
          <button
            onClick={() => setTextoVisible(!textoVisible)}
            style={{ background:'transparent', color:'#2c5f8a', border:'none', cursor:'pointer', fontSize:'0.82rem' }}
          >
            {textoVisible ? '📖 Ocultar texto' : '📖 Ver texto'}
          </button>
        </div>

        <div style={{ background:'var(--color-background-secondary)', borderRadius:'8px', height:'6px', marginBottom:'16px' }}>
          <div style={{ background:'#2c5f8a', borderRadius:'8px', height:'6px', width:`${(preguntaActual / lectura.preguntas.length) * 100}%`, transition:'width 0.3s' }} />
        </div>

        {/* Texto colapsable */}
        {textoVisible && (
          <div style={{ background:'var(--color-background-secondary)', borderRadius:'8px', padding:'12px', marginBottom:'16px', fontSize:'0.88rem', lineHeight:'1.7', maxHeight:'150px', overflowY:'auto' }}>
            {lectura.texto}
          </div>
        )}

        {/* Pregunta */}
        <div style={{ fontSize:'1rem', fontWeight:'500', marginBottom:'16px', padding:'14px', background:'var(--color-background-secondary)', borderRadius:'8px' }}>
          {pregunta.pregunta}
        </div>

        {/* Opciones */}
        <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'16px' }}>
          {pregunta.opciones.map((op, i) => {
            let bg     = 'var(--color-background-secondary)';
            let color  = 'var(--color-text-primary)';
            let border = '0.5px solid var(--color-border-secondary)';
            let prefix = '';

            if (respondida) {
              if (op === pregunta.correcta) {
                bg = '#e8f5e9'; color = '#1a6b3a'; border = '1px solid #a5d6a7'; prefix = '✅ ';
              } else if (op === respondida) {
                bg = '#fdecea'; color = '#c0392b'; border = '1px solid #f5c6c6'; prefix = '❌ ';
              }
            }

            return (
              <button key={i} onClick={() => !respondida && responder(op)}
                style={{ background:bg, color, border, padding:'12px 16px', borderRadius:'8px', cursor: respondida ? 'default' : 'pointer', textAlign:'left', fontSize:'0.92rem', marginTop:'0' }}>
                {prefix}{op}
              </button>
            );
          })}
        </div>

        {/* Explicación */}
        {respondida && (
          <div style={{ background:'#e8f0fe', padding:'12px', borderRadius:'8px', marginBottom:'16px', fontSize:'0.88rem' }}>
            📖 {pregunta.explicacion}
          </div>
        )}

        <button onClick={siguiente} disabled={!respondida}
          style={{ width:'100%', background: respondida ? '#2c5f8a' : '#ccc', color:'white', border:'none', padding:'10px', borderRadius:'8px', cursor: respondida ? 'pointer' : 'not-allowed', fontSize:'1rem' }}>
          {preguntaActual < lectura.preguntas.length - 1 ? 'Siguiente pregunta →' : 'Ver resultado ✓'}
        </button>
      </div>
    );
  }

  // Pantalla de resultado
  if (fase === 'resultado') {
    const color  = resultado.puntaje >= 75 ? '#e8f5e9' : resultado.puntaje >= 50 ? '#fff8e1' : '#fdecea';
    const colorT = resultado.puntaje >= 75 ? '#1a6b3a' : resultado.puntaje >= 50 ? '#e65100' : '#c0392b';

    return (
      <div className="card">
        <h2>📖 Resultado de comprensión</h2>
        <div style={{ fontSize:'0.9rem', color:'var(--color-text-secondary)', marginBottom:'16px' }}>
          {lectura.titulo}
        </div>

        <div style={{ textAlign:'center', padding:'24px', background: color, borderRadius:'12px', marginBottom:'20px' }}>
          <div style={{ fontSize:'3rem', fontWeight:'bold', color: colorT }}>
            {resultado.correctas}/{resultado.total}
          </div>
          <div style={{ fontSize:'0.85rem', color: colorT }}>respuestas correctas</div>
          <div style={{ fontSize:'1.1rem', fontWeight:'500', color: colorT, marginTop:'8px' }}>
            {resultado.puntaje}%
          </div>
          <div style={{ fontSize:'0.9rem', color:'#555', marginTop:'6px' }}>
            {resultado.puntaje >= 75 ? '¡Excelente comprensión lectora!' : resultado.puntaje >= 50 ? 'Buen trabajo, seguí practicando' : 'Volvé a leer el texto con más atención'}
          </div>
        </div>

        {/* Repaso */}
        <div style={{ marginBottom:'20px' }}>
          {lectura.preguntas.map((p, i) => (
            <div key={i} style={{ padding:'10px 14px', borderRadius:'8px', marginBottom:'8px', background: respuestas[i] === p.correcta ? '#e8f5e9' : '#fdecea', borderLeft:`3px solid ${respuestas[i] === p.correcta ? '#1a6b3a' : '#c0392b'}` }}>
              <div style={{ fontSize:'0.85rem', fontWeight:'500', marginBottom:'4px' }}>
                {respuestas[i] === p.correcta ? '✅' : '❌'} {p.pregunta}
              </div>
              {respuestas[i] !== p.correcta && (
                <div style={{ fontSize:'0.82rem', color:'#555' }}>
                  Correcta: {p.correcta}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:'10px' }}>
          <button onClick={() => { setFase('seleccion'); setLectura(null); }}
            style={{ flex:1, background:'#2c5f8a', color:'white', border:'none', padding:'10px', borderRadius:'8px', cursor:'pointer' }}>
            Nuevo texto ↻
          </button>
          <button onClick={() => { setFase('leyendo'); setPregunta(0); setRespuestas({}); setResultado(null); }}
            style={{ background:'transparent', color:'#888', border:'0.5px solid #ddd', padding:'10px 16px', borderRadius:'8px', cursor:'pointer', fontSize:'0.88rem' }}>
            Releer texto
          </button>
        </div>
      </div>
    );
  }
}

export default Lectura;