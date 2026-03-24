import { useState, useEffect } from 'react';

function Dictado({ nivelUsuario }) {
  const [frases, setFrases]             = useState([]);
  const [indice, setIndice]             = useState(0);
  const [escrito, setEscrito]           = useState('');
  const [resultado, setResultado]       = useState(null);
  const [cargando, setCargando]         = useState(false);
  const [cargandoFrases, setCargandoF]  = useState(false);
  const [sesionTerminada, setSesion]    = useState(false);
  const [puntajes, setPuntajes]         = useState([]);
  const [mostrarTraduccion, setMostrarTrad] = useState(false);
  const [fragmentos, setFragmentos]     = useState([]);
  const [fragActual, setFragActual]     = useState(0);
  const [modoFragmentos, setModoFrag]   = useState(false);
  const nivel = nivelUsuario || localStorage.getItem('nivel_ingles') || 'B1';

  useEffect(() => { cargarFrases(); }, []);

  async function cargarFrases() {
    setCargandoF(true);
    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/dictado/frases', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ nivel, cantidad: 5 })
      });
      const datos = await resp.json();
      setFrases(datos.frases);
      setIndice(0); setEscrito(''); setResultado(null);
      setSesion(false); setPuntajes([]);
      setFragmentos([]); setFragActual(0); setModoFrag(false);
    } catch(e) { console.error(e); }
    finally { setCargandoF(false); }
  }

  function hablar(texto, velocidad=1) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u     = new SpeechSynthesisUtterance(texto);
    u.lang      = 'en-US';
    u.rate      = velocidad;
    const voces = window.speechSynthesis.getVoices();
    const voz   = voces.find(v => v.lang === 'en-US') || voces[0];
    if (voz) u.voice = voz;
    window.speechSynthesis.speak(u);
  }

  // Divide la frase en grupos de 3 palabras
  function activarModoFragmentos() {
    const palabras = frases[indice].texto.split(' ');
    const grupos   = [];
    for (let i = 0; i < palabras.length; i += 3) {
      grupos.push(palabras.slice(i, i + 3).join(' '));
    }
    setFragmentos(grupos);
    setFragActual(0);
    setModoFrag(true);
    // Reproduce el primer fragmento automáticamente
    setTimeout(() => hablar(grupos[0], 0.85), 300);
  }

  function siguienteFragmento() {
    const sig = fragActual + 1;
    if (sig < fragmentos.length) {
      setFragActual(sig);
      hablar(fragmentos[sig], 0.85);
    }
  }

  function anteriorFragmento() {
    const ant = fragActual - 1;
    if (ant >= 0) {
      setFragActual(ant);
      hablar(fragmentos[ant], 0.85);
    }
  }

  async function verificar() {
    if (!escrito.trim()) return;
    setCargando(true); setResultado(null);
    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/dictado/corregir', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ original: frases[indice].texto, escrito: escrito.trim() })
      });
      const datos = await resp.json();
      setResultado(datos);
      setPuntajes(prev => [...prev, datos.puntaje]);
      registrarActividad('dictado', 3);
    } catch(e) { console.error(e); }
    finally { setCargando(false); }
  }

  function siguiente() {
    if (indice < frases.length - 1) {
      setIndice(indice + 1); setEscrito(''); setResultado(null);
      setMostrarTrad(false); setFragmentos([]); setFragActual(0); setModoFrag(false);
    } else { setSesion(true); }
  }

  if (cargandoFrases) return (
    <div className="card" style={{textAlign:'center',padding:'40px'}}>
      <div style={{fontSize:'2rem',marginBottom:'16px'}}>🎧</div>
      <div style={{color:'var(--color-text-secondary)'}}>Generando frases nivel {nivel}...</div>
    </div>
  );

  if (sesionTerminada) {
    const promedio = Math.round(puntajes.reduce((a,b)=>a+b,0)/puntajes.length);
    const color  = promedio>=80?'#e8f5e9':promedio>=60?'#fff8e1':'#fdecea';
    const colorT = promedio>=80?'#1a6b3a':promedio>=60?'#e65100':'#c0392b';
    return (
      <div className="card">
        <h2>🎧 Sesión completada</h2>
        <div style={{textAlign:'center',padding:'24px',background:color,borderRadius:'12px',marginBottom:'20px'}}>
          <div style={{fontSize:'3rem',fontWeight:'bold',color:colorT}}>{promedio}</div>
          <div style={{fontSize:'0.85rem',color:colorT}}>promedio sobre 100</div>
          <div style={{fontSize:'0.9rem',color:'#555',marginTop:'8px'}}>
            {promedio>=80?'¡Excelente comprensión auditiva!':promedio>=60?'Buen trabajo, seguí practicando':'Practicá más escuchando inglés a diario'}
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'8px',marginBottom:'20px'}}>
          {puntajes.map((p,i)=>(
            <div key={i} style={{background:p>=80?'#e8f5e9':p>=60?'#fff8e1':'#fdecea',padding:'10px',borderRadius:'8px',textAlign:'center'}}>
              <div style={{fontWeight:'bold',color:p>=80?'#1a6b3a':p>=60?'#e65100':'#c0392b'}}>{p}</div>
              <div style={{fontSize:'0.75rem',color:'#888'}}>Frase {i+1}</div>
            </div>
          ))}
        </div>
        <button onClick={cargarFrases} style={{width:'100%',background:'#2c5f8a',color:'white',border:'none',padding:'10px',borderRadius:'8px',cursor:'pointer'}}>
          Nueva sesión ↻
        </button>
      </div>
    );
  }

  if (!frases.length) return null;
  const frase = frases[indice];

  return (
    <div className="card">
      <h2>🎧 Dictado — Nivel {nivel}</h2>
      <p className="descripcion">Escuchá la frase y escribí lo que oíste. Podés escucharla de a partes.</p>

      {/* Progreso */}
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'12px'}}>
        <span style={{fontSize:'0.85rem',color:'var(--color-text-secondary)'}}>Frase {indice+1} de {frases.length}</span>
        {puntajes.length>0 && <span style={{fontSize:'0.85rem',color:'var(--color-text-secondary)'}}>Promedio: {Math.round(puntajes.reduce((a,b)=>a+b,0)/puntajes.length)}</span>}
      </div>
      <div style={{background:'var(--color-background-secondary)',borderRadius:'8px',height:'6px',marginBottom:'20px'}}>
        <div style={{background:'#2c5f8a',borderRadius:'8px',height:'6px',width:`${(indice/frases.length)*100}%`,transition:'width 0.3s'}}/>
      </div>

      {/* Panel de audio */}
      <div style={{background:'var(--color-background-secondary)',borderRadius:'12px',padding:'20px',marginBottom:'20px'}}>

        {!modoFragmentos ? (
          // Modo completo
          <div>
            <div style={{fontSize:'0.85rem',color:'var(--color-text-secondary)',marginBottom:'14px',textAlign:'center'}}>
              Elegí cómo escuchar la frase:
            </div>
            <div style={{display:'flex',justifyContent:'center',gap:'10px',flexWrap:'wrap',marginBottom:'12px'}}>
              <button onClick={()=>hablar(frase.texto,1)}
                style={{background:'#2c5f8a',color:'white',border:'none',padding:'10px 18px',borderRadius:'8px',cursor:'pointer'}}>
                ▶ Escuchar completa
              </button>
              <button onClick={()=>hablar(frase.texto,0.6)}
                style={{background:'transparent',color:'var(--color-text-secondary)',border:'0.5px solid var(--color-border-secondary)',padding:'10px 18px',borderRadius:'8px',cursor:'pointer'}}>
                🐢 Lento
              </button>
            </div>
            <div style={{textAlign:'center'}}>
              <button onClick={activarModoFragmentos}
                style={{background:'#e8f0fe',color:'#1a237e',border:'0.5px solid #9fa8da',padding:'8px 18px',borderRadius:'8px',cursor:'pointer',fontSize:'0.88rem'}}>
                ✂️ Escuchar de a partes (recomendado)
              </button>
            </div>
          </div>
        ) : (
          // Modo fragmentos
          <div>
            <div style={{fontSize:'0.85rem',color:'var(--color-text-secondary)',marginBottom:'10px',textAlign:'center'}}>
              Fragmento {fragActual+1} de {fragmentos.length} — apretá para avanzar o retroceder
            </div>

            {/* Indicadores de fragmentos */}
            <div style={{display:'flex',justifyContent:'center',gap:'6px',marginBottom:'14px',flexWrap:'wrap'}}>
              {fragmentos.map((f,i)=>(
                <button key={i} onClick={()=>{setFragActual(i);hablar(f,0.85);}}
                  style={{
                    background: i===fragActual?'#2c5f8a':i<fragActual?'#e8f5e9':'var(--color-background-primary)',
                    color:      i===fragActual?'white':i<fragActual?'#1a6b3a':'var(--color-text-secondary)',
                    border:     `0.5px solid ${i===fragActual?'#2c5f8a':i<fragActual?'#a5d6a7':'var(--color-border-secondary)'}`,
                    padding:'6px 12px',borderRadius:'20px',cursor:'pointer',fontSize:'0.85rem',marginTop:'0'
                  }}>
                  {i<fragActual?'✓':i+1}
                </button>
              ))}
            </div>

            {/* Frase actual resaltada */}
            {/* Oculta el texto mientras no se verificó */}
<div style={{textAlign:'center',fontSize:'1.5rem',padding:'10px',background:'var(--color-background-primary)',borderRadius:'8px',marginBottom:'14px',letterSpacing:'6px',color:'var(--color-text-tertiary)'}}>
  {'• • •'}
</div>

            {/* Controles */}
            <div style={{display:'flex',justifyContent:'center',gap:'10px',flexWrap:'wrap'}}>
              <button onClick={anteriorFragmento} disabled={fragActual===0}
                style={{background:'transparent',color:fragActual===0?'#ccc':'#2c5f8a',border:`0.5px solid ${fragActual===0?'#eee':'#2c5f8a'}`,padding:'8px 16px',borderRadius:'8px',cursor:fragActual===0?'not-allowed':'pointer',fontSize:'0.9rem',marginTop:'0'}}>
                ← Anterior
              </button>
              <button onClick={()=>hablar(fragmentos[fragActual],0.85)}
                style={{background:'#2c5f8a',color:'white',border:'none',padding:'8px 18px',borderRadius:'8px',cursor:'pointer',fontSize:'0.9rem',marginTop:'0'}}>
                🔊 Repetir
              </button>
              <button onClick={siguienteFragmento} disabled={fragActual===fragmentos.length-1}
                style={{background:fragActual===fragmentos.length-1?'#ccc':'#2c5f8a',color:'white',border:'none',padding:'8px 16px',borderRadius:'8px',cursor:fragActual===fragmentos.length-1?'not-allowed':'pointer',fontSize:'0.9rem',marginTop:'0'}}>
                Siguiente →
              </button>
            </div>

            <div style={{textAlign:'center',marginTop:'12px'}}>
              <button onClick={()=>hablar(frase.texto,0.85)}
                style={{background:'transparent',color:'var(--color-text-secondary)',border:'none',cursor:'pointer',fontSize:'0.82rem'}}>
                ▶ Escuchar frase completa
              </button>
              <span style={{color:'var(--color-border-secondary)',margin:'0 8px'}}>|</span>
              <button onClick={()=>setModoFrag(false)}
                style={{background:'transparent',color:'var(--color-text-secondary)',border:'none',cursor:'pointer',fontSize:'0.82rem'}}>
                Volver al modo normal
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Campo de escritura */}
      <textarea
        value={escrito}
        onChange={e=>setEscrito(e.target.value)}
        placeholder="Escribí aquí lo que escuchaste..."
        disabled={!!resultado}
        style={{marginBottom:'8px'}}
        onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();if(!resultado)verificar();}}}
      />

      {!resultado && (
        <button onClick={verificar} disabled={cargando||!escrito.trim()}
          style={{background:escrito.trim()?'#2c5f8a':'#ccc',color:'white',border:'none',padding:'10px 20px',borderRadius:'8px',cursor:escrito.trim()?'pointer':'not-allowed',fontSize:'1rem'}}>
          {cargando?'⏳ Corrigiendo...':'Verificar ✓'}
        </button>
      )}

      {/* Resultado */}
      {resultado && (
        <div style={{marginTop:'16px'}}>
          <div style={{textAlign:'center',padding:'12px',background:resultado.puntaje>=80?'#e8f5e9':resultado.puntaje>=60?'#fff8e1':'#fdecea',borderRadius:'8px',marginBottom:'14px'}}>
            <span style={{fontSize:'1.5rem',fontWeight:'bold',color:resultado.puntaje>=80?'#1a6b3a':resultado.puntaje>=60?'#e65100':'#c0392b'}}>
              {resultado.puntaje}/100
            </span>
          </div>

          <div style={{background:'var(--color-background-secondary)',padding:'14px',borderRadius:'8px',marginBottom:'12px'}}>
            <div style={{fontSize:'0.85rem',color:'var(--color-text-secondary)',marginBottom:'8px'}}>Comparación palabra por palabra:</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
              {resultado.palabras?.map((p,i)=>(
                <span key={i} title={p.estado==='incorrecta'?`Escribiste: "${p.escrita}"`:''}
                  style={{padding:'4px 10px',borderRadius:'6px',fontSize:'0.9rem',fontWeight:'500',
                    background:p.estado==='correcta'?'#e8f5e9':p.estado==='faltante'?'#e3f2fd':'#fdecea',
                    color:p.estado==='correcta'?'#1a6b3a':p.estado==='faltante'?'#0d47a1':'#c0392b',
                    textDecoration:p.estado==='incorrecta'?'line-through':'none'}}>
                  {p.palabra}
                </span>
              ))}
            </div>
            <div style={{display:'flex',gap:'12px',marginTop:'10px',fontSize:'0.78rem',color:'var(--color-text-secondary)'}}>
              <span style={{color:'#1a6b3a'}}>✅ Correcto</span>
              <span style={{color:'#c0392b'}}>❌ Incorrecto</span>
              <span style={{color:'#0d47a1'}}>⬜ Faltante</span>
            </div>
          </div>

          <div style={{background:'#e8f5e9',padding:'12px',borderRadius:'8px',marginBottom:'12px'}}>
            <div style={{fontSize:'0.82rem',color:'#2e7d32',marginBottom:'4px'}}>Frase correcta:</div>
            <div style={{fontWeight:'500',fontStyle:'italic'}}>{frase.texto}</div>
            <button onClick={()=>setMostrarTrad(!mostrarTraduccion)}
              style={{background:'transparent',border:'none',color:'#2e7d32',cursor:'pointer',fontSize:'0.82rem',padding:'4px 0',marginTop:'4px'}}>
              {mostrarTraduccion?'▲ Ocultar traducción':'▼ Ver traducción'}
            </button>
            {mostrarTraduccion && <div style={{fontSize:'0.88rem',color:'#555',marginTop:'4px'}}>{frase.traduccion}</div>}
          </div>

          {resultado.errores?.length>0 && (
            <div style={{background:'#fdecea',padding:'12px',borderRadius:'8px',marginBottom:'12px'}}>
              <div style={{fontWeight:'500',color:'#c0392b',marginBottom:'6px'}}>⚠️ Errores:</div>
              {resultado.errores.map((e,i)=><div key={i} style={{fontSize:'0.88rem',marginBottom:'3px'}}>• {e}</div>)}
            </div>
          )}

          {resultado.consejo && (
            <div style={{background:'#e8f0fe',padding:'12px',borderRadius:'8px',marginBottom:'16px'}}>
              <div style={{fontSize:'0.85rem'}}>💡 {resultado.consejo}</div>
            </div>
          )}

          <button onClick={siguiente}
            style={{width:'100%',background:'#2c5f8a',color:'white',border:'none',padding:'10px',borderRadius:'8px',cursor:'pointer',fontSize:'1rem'}}>
            {indice<frases.length-1?'Siguiente frase →':'Ver resumen final ✓'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Dictado;