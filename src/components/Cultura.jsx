import { useState } from 'react';
import { registrarActividad } from './Progreso';

const CATEGORIAS = [
  { id:'expresiones',   emoji:'💬', label:'Expresiones idiomáticas', descripcion:'Frases cuyo significado no es literal' },
  { id:'phrasal_verbs', emoji:'⚡', label:'Phrasal verbs',           descripcion:'Verbos con partícula que cambian su significado' },
  { id:'slang',         emoji:'😎', label:'Slang americano',         descripcion:'Vocabulario informal y coloquial' },
  { id:'diferencias',   emoji:'🇺🇸🇬🇧', label:'US vs UK',           descripcion:'Diferencias entre inglés americano y británico' },
  { id:'referencias',   emoji:'🎬', label:'Referencias culturales',  descripcion:'Alusiones a cultura, historia y medios' },
  { id:'trabajo',       emoji:'💼', label:'Inglés de negocios',      descripcion:'Expresiones formales del mundo laboral' },
];

function Cultura({ nivelUsuario, idioma = 'ingles' }) {
  const [items, setItems]             = useState([]);
  const [cargando, setCargando]       = useState(false);
  const [categoriaActual, setCategoria] = useState('');
  const [expandido, setExpandido]     = useState(null);
  const nivel = nivelUsuario || localStorage.getItem('nivel_ingles') || 'B1';

  async function cargar(categoria) {
    setCargando(true);
    setCategoria(categoria);
    setItems([]);
    setExpandido(null);

    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/cultura', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ categoria, nivel, idioma })
      });
      const datos = await resp.json();
      setItems(datos.items);
      registrarActividad('cultura', 3);
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

  const colorDificultad = {
    'facil':   { bg:'#e8f5e9', color:'#1a6b3a' },
    'medio':   { bg:'#fff8e1', color:'#e65100' },
    'dificil': { bg:'#fdecea', color:'#c0392b' },
  };

  const colorTipo = {
    'modismo':            '#e8f0fe',
    'phrasal verb':       '#e8f5e9',
    'slang':              '#fff8e1',
    'diferencia cultural':'#fce4ec',
    'referencia':         '#f3e5f5',
  };

  return (
    <div className="card">
      <h2>🌍 Cultura e idiomáticas</h2>
      <p className="descripcion">
        Aprendé expresiones, modismos y diferencias culturales del inglés real.
      </p>

      {/* Selector de categorías */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'20px' }}>
        {CATEGORIAS.map(cat => (
          <button
            key={cat.id}
            onClick={() => cargar(cat.id)}
            style={{
              background:   categoriaActual === cat.id ? '#2c5f8a' : 'var(--color-background-secondary)',
              color:        categoriaActual === cat.id ? 'white'   : 'var(--color-text-primary)',
              border:       '0.5px solid var(--color-border-secondary)',
              padding:      '12px',
              borderRadius: '10px',
              cursor:       'pointer',
              textAlign:    'left',
              marginTop:    '0'
            }}
          >
            <div style={{ fontSize:'1.2rem', marginBottom:'4px' }}>{cat.emoji}</div>
            <div style={{ fontWeight:'500', fontSize:'0.88rem', marginBottom:'2px' }}>{cat.label}</div>
            <div style={{ fontSize:'0.76rem', opacity:'0.75' }}>{cat.descripcion}</div>
          </button>
        ))}
      </div>

      {/* Cargando */}
      {cargando && (
        <div style={{ textAlign:'center', padding:'32px', color:'var(--color-text-secondary)' }}>
          <div style={{ fontSize:'2rem', marginBottom:'12px' }}>🌍</div>
          Cargando contenido cultural...
        </div>
      )}

      {/* Lista de items */}
      {!cargando && items.length > 0 && (
        <div>
          <div style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)', marginBottom:'12px' }}>
            {items.length} expresiones — hacé clic en una para ver más detalles
          </div>

          {items.map((item, i) => (
            <div
              key={i}
              style={{
                background:   'var(--color-background-secondary)',
                borderRadius: '10px',
                marginBottom: '10px',
                overflow:     'hidden',
                border:       '0.5px solid var(--color-border-tertiary)',
                cursor:       'pointer'
              }}
              onClick={() => setExpandido(expandido === i ? null : i)}
            >
              {/* Encabezado */}
              <div style={{ padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px', flexWrap:'wrap' }}>
                    <span style={{ fontSize:'1rem', fontWeight:'bold', fontStyle:'italic' }}>
                      "{item.expresion}"
                    </span>
                    <span style={{
                      background: colorTipo[item.tipo] || '#f5f5f5',
                      fontSize:   '0.72rem',
                      padding:    '2px 8px',
                      borderRadius:'10px',
                      color:      'var(--color-text-secondary)'
                    }}>
                      {item.tipo}
                    </span>
                    <span style={{
                      background: colorDificultad[item.nivel_dificultad]?.bg || '#f5f5f5',
                      color:      colorDificultad[item.nivel_dificultad]?.color || '#555',
                      fontSize:   '0.72rem',
                      padding:    '2px 8px',
                      borderRadius:'10px'
                    }}>
                      {item.nivel_dificultad}
                    </span>
                  </div>
                  <div style={{ fontSize:'0.88rem', color:'var(--color-text-secondary)' }}>
                    {item.significado}
                  </div>
                </div>
                <div style={{ display:'flex', gap:'6px', alignItems:'center', marginLeft:'10px' }}>
                  <button
                    onClick={e => { e.stopPropagation(); hablar(item.expresion); }}
                    style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:'1rem', padding:'4px' }}
                  >
                    🔊
                  </button>
                  <span style={{ color:'var(--color-text-tertiary)', fontSize:'0.9rem' }}>
                    {expandido === i ? '▲' : '▼'}
                  </span>
                </div>
              </div>

              {/* Detalle expandido */}
              {expandido === i && (
                <div style={{ padding:'0 16px 16px', borderTop:'0.5px solid var(--color-border-tertiary)' }}>

                  {item.origen && (
                    <div style={{ background:'#fff8e1', padding:'10px 12px', borderRadius:'8px', marginTop:'12px', marginBottom:'10px' }}>
                      <div style={{ fontSize:'0.78rem', color:'#888', marginBottom:'3px' }}>📜 Origen</div>
                      <div style={{ fontSize:'0.88rem', color:'#333' }}>{item.origen}</div>
                    </div>
                  )}

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'10px' }}>
                    <div style={{ background:'var(--color-background-primary)', padding:'10px 12px', borderRadius:'8px' }}>
                      <div style={{ fontSize:'0.78rem', color:'#888', marginBottom:'3px' }}>🇺🇸 Inglés americano</div>
                      <div style={{ fontSize:'0.88rem', fontStyle:'italic' }}>"{item.ejemplo_us}"</div>
                      <button
                        onClick={() => hablar(item.ejemplo_us)}
                        style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:'0.82rem', color:'#2c5f8a', padding:'4px 0', marginTop:'2px' }}
                      >
                        🔊 Escuchar
                      </button>
                    </div>
                    <div style={{ background:'var(--color-background-primary)', padding:'10px 12px', borderRadius:'8px' }}>
                      <div style={{ fontSize:'0.78rem', color:'#888', marginBottom:'3px' }}>🇬🇧 Inglés británico</div>
                      <div style={{ fontSize:'0.88rem', fontStyle:'italic' }}>"{item.ejemplo_uk}"</div>
                      <button
                        onClick={() => hablar(item.ejemplo_uk)}
                        style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:'0.82rem', color:'#2c5f8a', padding:'4px 0', marginTop:'2px' }}
                      >
                        🔊 Escuchar
                      </button>
                    </div>
                  </div>

                  <div style={{ background:'#e8f5e9', padding:'10px 12px', borderRadius:'8px' }}>
                    <div style={{ fontSize:'0.78rem', color:'#2e7d32', marginBottom:'3px' }}>🇦🇷 En español</div>
                    <div style={{ fontSize:'0.88rem', color:'#333' }}>{item.ejemplo_español}</div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => cargar(categoriaActual)}
            style={{ width:'100%', background:'transparent', color:'#2c5f8a', border:'0.5px solid #2c5f8a', padding:'10px', borderRadius:'8px', cursor:'pointer', fontSize:'0.9rem', marginTop:'8px' }}
          >
            Cargar 5 más ↻
          </button>
        </div>
      )}
    </div>
  );
}

export default Cultura;