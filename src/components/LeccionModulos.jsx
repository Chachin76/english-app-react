import { useState, useRef, useEffect } from 'react';

function LeccionModulos({ idioma, nivel, tema, onVolver }) {
  const [moduloActivo, setModuloActivo] = useState(null);
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [inputCorrector, setInputCorrector] = useState('');
  const [resultadoCorrector, setResultadoCorrector] = useState(null);
  const [inputChat, setInputChat] = useState('');
  const [mensajesChat, setMensajesChat] = useState([]);
  const [inputDictado, setInputDictado] = useState('');
  const [dictadoIndice, setDictadoIndice] = useState(0);
  const [resultadoDictado, setResultadoDictado] = useState(null);
  const [lecturaRespuestas, setLecturaRespuestas] = useState({});
  const [lecturaResultado, setLecturaResultado] = useState(null);
  const [escuchando, setEscuchando] = useState(false);
  const recognitionRef = useState(null);
  const bottomRef = useRef(null);
useEffect(() => {
  if (moduloActivo === 'conversacion' && mensajesChat.length > 0) {
    setTimeout(() => {
      const chatBox = document.getElementById('chat-box-leccion');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);
  }
}, [mensajesChat]);

  const BACKEND = 'https://english-app-backend-ifyj.onrender.com';

  const MODULOS = [
  { id: 'corrector', nombre: 'Corrector' },
  { id: 'conversacion', nombre: 'Conversacion' },
  { id: 'frases', nombre: 'Frases' },
  { id: 'vocabulario', nombre: 'Vocabulario' },
  { id: 'situacion', nombre: 'Situaciones' },
  { id: 'dictado', nombre: 'Dictado' },
  { id: 'lectura', nombre: 'Lectura' },
  { id: 'cultura', nombre: 'Cultura' },
];

  async function cargarModulo(modulo) {
    setModuloActivo(modulo);
    setDatos(null);
    setCargando(true);
    setResultadoCorrector(null);
    setMensajesChat([]);
    setInputDictado('');
    setDictadoIndice(0);
    setResultadoDictado(null);
    setLecturaRespuestas({});
    setLecturaResultado(null);

    try {
      const endpoint = modulo === 'conversacion' ? 'situacion' : modulo;
      const resp = await fetch(BACKEND + '/leccion/' + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idioma, nivel, tema })
      });
      const d = await resp.json();
      setDatos(d);
      if (modulo === 'conversacion' && d.inicio) {
        setMensajesChat([{ rol: 'tutor', texto: d.inicio }]);
      }
    } catch(e) {
      console.error(e);
    } finally {
      setCargando(false);
    }
  }
function hablar(texto) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  setTimeout(() => {
    const VOCES = { ingles: 'en-US', frances: 'fr-FR', portugues: 'pt-BR', italiano: 'it-IT', aleman: 'de-DE', espanol: 'es-ES', chino: 'zh-CN', japones: 'ja-JP', coreano: 'ko-KR' };
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = VOCES[idioma] || 'en-US';
    u.rate = 0.9;
    const voces = window.speechSynthesis.getVoices();
    const voz = voces.find(v => v.lang === (VOCES[idioma] || 'en-US')) || voces[0];
    if (voz) u.voice = voz;
    window.speechSynthesis.speak(u);
  }, 300);
}
  

function iniciarMicrofono() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { alert('Usa Chrome para el microfono.'); return; }
  const VOCES = { ingles: 'en-US', frances: 'fr-FR', portugues: 'pt-BR', italiano: 'it-IT', aleman: 'de-DE', espanol: 'es-ES', chino: 'zh-CN', japones: 'ja-JP', coreano: 'ko-KR' };
  const r = new SR();
  r.lang = VOCES[idioma] || 'en-US';
  r.interimResults = false;
  r.continuous = false;
  r.onstart = () => setEscuchando(true);
  r.onend = () => {
    setEscuchando(false);
  };
  r.onresult = (e) => {
    const texto = Array.from(e.results).map(x => x[0].transcript).join('');
    setInputChat(texto);
    setTimeout(() => {
      setInputChat(prev => {
        if (prev.trim()) {
          enviarChatDirecto(prev);
        }
        return '';
      });
    }, 100);
  };
  r.onerror = () => setEscuchando(false);
  recognitionRef[0] = r;
  r.start();
}

function detenerMicrofono() {
  if (recognitionRef[0]) recognitionRef[0].stop();
  setEscuchando(false);
}
  async function enviarCorrector() {
    if (!inputCorrector.trim()) return;
    setCargando(true);
    try {
      const resp = await fetch(BACKEND + '/corregir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: inputCorrector, idioma })
      });
      const d = await resp.json();
      setResultadoCorrector(d.respuesta);
    } catch(e) { console.error(e); }
    finally { setCargando(false); }
  }

  async function enviarChat() {
    if (!inputChat.trim()) return;
    const nuevos = [...mensajesChat, { rol: 'usuario', texto: inputChat }];
    setMensajesChat(nuevos);
    setInputChat('');
    setCargando(true);
    try {
      const historial = nuevos.map(m => ({ role: m.rol === 'usuario' ? 'user' : 'assistant', content: m.texto }));
      const resp = await fetch(BACKEND + '/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ historial, idioma })
      });
      const d = await resp.json();
      setMensajesChat(prev => [...prev, { rol: 'tutor', texto: d.respuesta }]);
      hablar(d.respuesta);
    } catch(e) { console.error(e); }
    finally { setCargando(false); }
  }
async function enviarChatDirecto(texto) {
  if (!texto.trim()) return;
  const nuevos = [...mensajesChat, { rol: 'usuario', texto }];
  setMensajesChat(nuevos);
  setInputChat('');
  setCargando(true);
  try {
    const historial = nuevos.map(m => ({ role: m.rol === 'usuario' ? 'user' : 'assistant', content: m.texto }));
    const resp = await fetch(BACKEND + '/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ historial, idioma })
    });
    const d = await resp.json();
    setMensajesChat(prev => [...prev, { rol: 'tutor', texto: d.respuesta }]);
    hablar(d.respuesta);
  } catch(e) { console.error(e); }
  finally { setCargando(false); }
}

  function verificarDictado() {
    if (!datos || !datos.frases) return;
    const original = datos.frases[dictadoIndice].texto;
    const correcto = inputDictado.trim().toLowerCase() === original.toLowerCase();
    setResultadoDictado({ correcto, original });
  }

  function siguienteDictado() {
    if (dictadoIndice < datos.frases.length - 1) {
      setDictadoIndice(dictadoIndice + 1);
      setInputDictado('');
      setResultadoDictado(null);
    }
  }

  function verificarLectura() {
    if (!datos || !datos.preguntas) return;
    let correctas = 0;
    datos.preguntas.forEach(function(p, i) {
      if (lecturaRespuestas[i] === p.correcta) correctas++;
    });
    setLecturaResultado(correctas);
  }

  if (!moduloActivo) {
    return (
      <div style={{ marginTop: '16px' }}>
        <h4 style={{ color: '#4f46e5', marginBottom: '12px' }}>Practicar: {tema}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {MODULOS.map(function(m) {
            return (
              <button key={m.id} onClick={() => cargarModulo(m.id)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontWeight: '600', color: '#333', textAlign: 'center' }}>
                {m.nombre}
              </button>
            );
          })}
        </div>
        <button onClick={onVolver} style={{ marginTop: '12px', width: '100%', padding: '10px', background: '#e8eaf6', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#333' }}>
          Volver a la leccion
        </button>
      </div>
    );
  }

  if (cargando) return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p>Cargando {moduloActivo}...</p>
      <button onClick={() => setModuloActivo(null)} style={{ marginTop: '8px', padding: '8px 16px', background: '#e8eaf6', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Volver</button>
    </div>
  );

  return (
    <div style={{ marginTop: '16px' }}>
      <button onClick={() => setModuloActivo(null)} style={{ marginBottom: '12px', background: '#e8eaf6', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
        Volver a modulos
      </button>

      {moduloActivo === 'corrector' && datos && (
        <div>
          <h4 style={{ color: '#4f46e5' }}>Corrector - {tema}</h4>
          <p style={{ color: '#666' }}>{datos.consigna}</p>
          {datos.oraciones && datos.oraciones.map(function(o, i) {
            return (
              <div key={i} style={{ background: '#f0f4ff', padding: '10px', borderRadius: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#333' }}>{o.traduccion}</span>
                <button onClick={() => hablar(o.oracion)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Escuchar</button>
              </div>
            );
          })}
          <textarea value={inputCorrector} onChange={e => setInputCorrector(e.target.value)} placeholder="Escribi tu respuesta aqui..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '8px', boxSizing: 'border-box', minHeight: '80px' }} />
          <button onClick={enviarCorrector} style={{ width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '8px', fontWeight: '600' }}>
            Corregir
          </button>
          {resultadoCorrector && (
            <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '8px', marginTop: '8px' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#333' }}>{resultadoCorrector}</pre>
            </div>
          )}
        </div>
      )}

      {moduloActivo === 'frases' && datos && datos.frases && (
        <div>
          <h4 style={{ color: '#4f46e5' }}>Frases - {tema}</h4>
          {datos.frases.map(function(f, i) {
            return (
              <div key={i} style={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#4f46e5' }}>{f.frase}</strong>
                  <button onClick={() => hablar(f.frase)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Escuchar</button>
                </div>
                <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>{f.traduccion}</p>
                <p style={{ color: '#999', margin: 0, fontSize: '0.8rem' }}>{f.uso}</p>
              </div>
            );
          })}
        </div>
      )}

      {moduloActivo === 'vocabulario' && datos && datos.palabras && (
        <div>
          <h4 style={{ color: '#4f46e5' }}>Vocabulario - {tema}</h4>
          {datos.palabras.map(function(v, i) {
            return (
              <div key={i} style={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#4f46e5' }}>{v.palabra}</strong> - {v.traduccion}
                  <br /><small style={{ color: '#666' }}>{v.ejemplo} ({v.ejemplo_traduccion})</small>
                </div>
                <button onClick={() => hablar(v.palabra)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Escuchar</button>
              </div>
            );
          })}
        </div>
      )}

      {moduloActivo === 'conversacion' && (
  <div>
    <h4 style={{ color: '#4f46e5' }}>Conversacion - {tema}</h4>
    {datos && datos.frases_utiles && (
      <div style={{ background: '#fff8e1', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
        <p style={{ fontWeight: '600', color: '#333', margin: '0 0 8px 0' }}>Frases utiles:</p>
        {datos.frases_utiles.map(function(f, i) {
          return <p key={i} style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>{f.frase} = {f.traduccion}</p>;
        })}
      </div>
    )}
    <div id='chat-box-leccion' style={{ background: '#f5f5f5', borderRadius: '8px', padding: '12px', minHeight: '200px', marginBottom: '8px', maxHeight: '300px', overflowY: 'auto' }}>
      {mensajesChat.map(function(m, i) {
        return (
          <div key={i} style={{ marginBottom: '8px', textAlign: m.rol === 'usuario' ? 'right' : 'left' }}>
            <span style={{ background: m.rol === 'usuario' ? '#4f46e5' : 'white', color: m.rol === 'usuario' ? 'white' : '#333', padding: '8px 12px', borderRadius: '8px', display: 'inline-block', maxWidth: '80%', fontSize: '0.95rem' }}>
              {m.texto}
            </span>
            {m.rol === 'tutor' && (
              <button onClick={() => hablar(m.texto)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginLeft: '4px' }}>Escuchar</button>
            )}
          </div>
        );
      })}
      {cargando && <p style={{ color: '#999', fontSize: '0.9rem' }}>...</p>}
    <div ref={bottomRef} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input value={inputChat} onChange={e => setInputChat(e.target.value)} onKeyDown={e => e.key === 'Enter' && enviarChat()} placeholder="Escribi o usa el microfono..." style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', color: '#333' }} />
        <button onClick={enviarChat} disabled={cargando || !inputChat.trim()} style={{ padding: '10px 16px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          Enviar
        </button>
      </div>
      <button
        onClick={escuchando ? detenerMicrofono : iniciarMicrofono}
        style={{ width: '100%', padding: '14px', background: escuchando ? '#fee2e2' : '#e8f0fe', border: '2px solid', borderColor: escuchando ? '#ef4444' : '#4f46e5', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: escuchando ? '#991b1b' : '#1a237e', fontSize: '1rem' }}>
        {escuchando ? 'Detener microfono' : 'Hablar'}
      </button>
      <button onClick={() => { window.speechSynthesis.cancel(); setModuloActivo(null); setMensajesChat([]); }} style={{ width: '100%', padding: '10px', background: '#f0fdf4', border: '1px solid #22c55e', borderRadius: '8px', cursor: 'pointer', color: '#166534', fontWeight: '600' }}>
        Terminar conversacion
      </button>
    </div>
  </div>
)}

      {moduloActivo === 'situacion' && datos && (
        <div>
          <h4 style={{ color: '#4f46e5' }}>Situacion - {tema}</h4>
          <div style={{ background: '#f0f4ff', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
            <p style={{ color: '#333', margin: 0 }}>{datos.situacion}</p>
          </div>
          {datos.frases_utiles && (
            <div style={{ background: '#fff8e1', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
              <p style={{ fontWeight: '600', color: '#333', margin: '0 0 8px 0' }}>Frases utiles:</p>
              {datos.frases_utiles.map(function(f, i) {
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ color: '#666', fontSize: '0.9rem' }}>{f.frase} = {f.traduccion}</span>
                    <button onClick={() => hablar(f.frase)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Escuchar</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {moduloActivo === 'dictado' && datos && datos.frases && (
        <div>
          <h4 style={{ color: '#4f46e5' }}>Dictado - {tema} ({dictadoIndice + 1}/{datos.frases.length})</h4>
          <button onClick={() => hablar(datos.frases[dictadoIndice].texto)} style={{ width: '100%', padding: '16px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', marginBottom: '12px' }}>
            Escuchar frase
          </button>
          <input value={inputDictado} onChange={e => setInputDictado(e.target.value)} placeholder="Escribi lo que escuchaste..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', marginBottom: '8px' }} />
          {resultadoDictado ? (
            <div>
              <div style={{ background: resultadoDictado.correcto ? '#f0fdf4' : '#fef2f2', padding: '12px', borderRadius: '8px', marginBottom: '8px' }}>
                <p style={{ color: resultadoDictado.correcto ? '#166534' : '#991b1b', margin: 0 }}>
                  {resultadoDictado.correcto ? 'Correcto!' : 'Incorrecto. Era: ' + resultadoDictado.original}
                </p>
              </div>
              {dictadoIndice < datos.frases.length - 1 && (
                <button onClick={siguienteDictado} style={{ width: '100%', padding: '12px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  Siguiente frase
                </button>
              )}
            </div>
          ) : (
            <button onClick={verificarDictado} style={{ width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Verificar
            </button>
          )}
        </div>
      )}

      {moduloActivo === 'lectura' && datos && (
        <div>
          <h4 style={{ color: '#4f46e5' }}>{datos.titulo}</h4>
          <div style={{ background: '#f0f4ff', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
            <p style={{ color: '#333', lineHeight: '1.6' }}>{datos.texto}</p>
            <button onClick={() => hablar(datos.texto)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Escuchar</button>
          </div>
          {datos.preguntas && !lecturaResultado && datos.preguntas.map(function(p, i) {
            return (
              <div key={i} style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: '600', color: '#333' }}>{p.pregunta}</p>
                {p.opciones.map(function(op, j) {
                  return (
                    <div key={j} onClick={() => setLecturaRespuestas(prev => ({ ...prev, [i]: op }))}
                      style={{ padding: '10px', borderRadius: '8px', border: '2px solid', borderColor: lecturaRespuestas[i] === op ? '#4f46e5' : '#ddd', background: lecturaRespuestas[i] === op ? '#e8eaf6' : 'white', cursor: 'pointer', marginBottom: '4px', color: '#333' }}>
                      {op}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {!lecturaResultado && datos.preguntas && (
            <button onClick={verificarLectura} style={{ width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Ver resultado
            </button>
          )}
          {lecturaResultado !== null && (
            <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#166534' }}>{lecturaResultado}/{datos.preguntas.length} correctas</p>
            </div>
          )}
        </div>
      )}

      {moduloActivo === 'cultura' && datos && datos.datos && (
        <div>
          <h4 style={{ color: '#4f46e5' }}>Cultura - {tema}</h4>
          {datos.datos.map(function(d, i) {
            return (
              <div key={i} style={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '8px' }}>
                <p style={{ fontWeight: '600', color: '#4f46e5', margin: '0 0 4px 0' }}>{d.titulo}</p>
                <p style={{ color: '#333', margin: '0 0 4px 0', fontSize: '0.9rem' }}>{d.descripcion}</p>
                <p style={{ color: '#666', margin: 0, fontSize: '0.85rem', fontStyle: 'italic' }}>{d.curiosidad}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LeccionModulos;