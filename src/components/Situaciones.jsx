import { useState, useRef, useEffect } from 'react';

const SITUACIONES = [
  { id:'restaurante', emoji:'🍽️', titulo:'En el restaurante', descripcion:'Pedí tu comida y la cuenta', rol:'Sos el mozo de un restaurante americano', inicio:"Good evening! Welcome to The Golden Fork. I'm James, your server. Can I start you off with something to drink?" },
  { id:'aeropuerto', emoji:'✈️', titulo:'En el aeropuerto', descripcion:'Check-in y preguntas sobre el vuelo', rol:'Sos el agente de check-in de una aerolinea', inicio:"Good morning! Welcome to Delta Airlines. May I see your passport please?" },
  { id:'entrevista', emoji:'💼', titulo:'Entrevista de trabajo', descripcion:'Respondé sobre tu experiencia', rol:'Sos el entrevistador de RRHH de una empresa tech', inicio:"Good morning! Please have a seat. Can you tell me a little about yourself?" },
  { id:'hotel', emoji:'🏨', titulo:'En el hotel', descripcion:'Check-in y consultas', rol:'Sos el recepcionista de un hotel de 4 estrellas', inicio:"Good afternoon! Welcome to The Grand Hotel. Do you have a reservation?" },
  { id:'medico', emoji:'🏥', titulo:'En el médico', descripcion:'Describí síntomas y entendé el diagnóstico', rol:'Sos un medico de cabecera en una clinica americana', inicio:"Good morning! I'm Dr. Smith. What brings you in today?" },
  { id:'tienda', emoji:'🛒', titulo:'En la tienda', descripcion:'Pedí ayuda y comprá algo', rol:'Sos un vendedor de una tienda de ropa americana', inicio:"Hi! Welcome to StyleHub. Are you looking for something specific?" },
  { id:'banco', emoji:'🏦', titulo:'En el banco', descripcion:'Abrí una cuenta o consultá servicios', rol:'Sos un asesor bancario americano', inicio:"Good morning! Welcome to First National Bank. How can I help you today?" },
  { id:'farmacia', emoji:'💊', titulo:'En la farmacia', descripcion:'Pedí medicamentos y consultá dosis', rol:'Sos el farmaceutico de una farmacia americana', inicio:"Hi! How can I help you? Do you have a prescription?" },
  { id:'taxi', emoji:'🚕', titulo:'En el taxi / Uber', descripcion:'Indicá destino y chateá con el conductor', rol:'Sos un conductor de Uber en Nueva York', inicio:"Hey! I see you're heading downtown. Hop in! Have you been to New York before?" },
  { id:'vecino', emoji:'👋', titulo:'Charla con un vecino', descripcion:'Conversación casual del día a día', rol:'Sos un vecino americano amigable recien mudado', inicio:"Oh hi! You must be my neighbor! I'm Mike, nice to meet you!" },
  { id:'llamada', emoji:'📞', titulo:'Llamada telefónica', descripcion:'Reserva o soporte por teléfono', rol:'Sos el operador de servicio al cliente de una empresa americana', inicio:"Thank you for calling TechSupport Plus. My name is Sarah. How can I help?" },
  { id:'universidad', emoji:'🎓', titulo:'En la universidad', descripcion:'Hablá con un consejero académico', rol:'Sos un consejero academico de una universidad americana', inicio:"Hello! I'm Professor Johnson, the academic advisor. What brings you in today?" },
];

function Situaciones({ nivelUsuario }) {
  const [situacionElegida, setSituacion]    = useState(null);
  const [situacionCustom, setSituacionCustom] = useState('');
  const [mensajes, setMensajes]             = useState([]);
  const [input, setInput]                   = useState('');
  const [cargando, setCargando]             = useState(false);
  const [escuchando, setEscuchando]         = useState(false);
  const [resumen, setResumen]               = useState(null);
  const [cargandoResumen, setCargandoRes]   = useState(false);
  const bottomRef                           = useRef(null);
  const recognitionRef                      = useRef(null);
  const nivel = nivelUsuario || localStorage.getItem('nivel_ingles') || 'B1';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

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

  function elegirSituacion(sit) {
    setSituacion(sit);
    setMensajes([{ role: 'assistant', content: sit.inicio }]);
    setResumen(null);
    hablar(sit.inicio);
  }

  async function elegirSituacionCustom() {
    if (!situacionCustom.trim()) return;
    const sit = {
      id: 'custom',
      emoji: '🎯',
      titulo: situacionCustom,
      descripcion: 'Situación personalizada',
      rol: `Interpretá el rol correspondiente en esta situacion: ${situacionCustom}. Usa ingles apropiado para nivel ${nivel}.`,
      inicio: null
    };
    setSituacion(sit);
    setResumen(null);
    setCargando(true);
    try {
      const resp = await fetch('http://127.0.0.1:8000/situacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          situacion: sit.rol,
          historial: [{ role: 'user', content: 'Start the scene with a greeting. One or two sentences maximum.' }],
          nivel
        })
      });
      const datos = await resp.json();
      setMensajes([{ role: 'assistant', content: datos.respuesta }]);
      hablar(datos.respuesta);
    } catch(e) {
      setMensajes([{ role: 'assistant', content: "Hello! Let's practice this situation together." }]);
    } finally {
      setCargando(false);
    }
  }

  function iniciarMicrofono() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Usá Chrome'); return; }
    const recognition      = new SR();
    recognition.lang       = 'en-US';
    recognition.continuous     = true;
recognition.interimResults = true;
    recognition.onstart    = () => setEscuchando(true);
    recognition.onend      = () => setEscuchando(false);
    recognition.onresult   = (e) => setInput(e.results[0][0].transcript);
    recognition.onerror    = () => setEscuchando(false);
    recognitionRef.current = recognition;
    recognition.start();
  }

  async function enviar() {
    const texto = input.trim();
    if (!texto || cargando) return;
    const nuevosMensajes = [...mensajes, { role: 'user', content: texto }];
    setMensajes(nuevosMensajes);
    setInput('');
    setCargando(true);
    try {
      const resp = await fetch('http://127.0.0.1:8000/situacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situacion: situacionElegida.rol, historial: nuevosMensajes, nivel })
      });
      const datos  = await resp.json();
      const nuevos = [...nuevosMensajes, { role: 'assistant', content: datos.respuesta }];
      setMensajes(nuevos);
      hablar(datos.respuesta);
    } catch(e) {
      setMensajes(prev => [...prev, { role: 'assistant', content: 'Sorry, connection problem.' }]);
    } finally {
      setCargando(false);
    }
  }

  async function terminarYVerResumen() {
    setCargandoRes(true);
    try {
      const resp = await fetch('http://127.0.0.1:8000/resumen-situacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situacion: situacionElegida.titulo, historial: mensajes, nivel })
      });
      const datos = await resp.json();
      setResumen(datos);
      registrarActividad('situaciones', 5);
      window.speechSynthesis?.cancel();
    } catch(e) {
      console.error(e);
    } finally {
      setCargandoRes(false);
    }
  }

  // Pantalla de selección
  if (!situacionElegida) {
    return (
      <div className="card">
        <h2>🎭 Simulador de situaciones</h2>
        <p className="descripcion">Elegí una situación o creá la tuya. La IA actúa el otro rol.</p>

        <div style={{ background:'var(--color-background-secondary)', borderRadius:'12px', padding:'16px', marginBottom:'20px', border:'0.5px solid var(--color-border-secondary)' }}>
          <div style={{ fontWeight:'500', marginBottom:'6px' }}>✏️ Creá tu propia situación</div>
          <div style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)', marginBottom:'10px' }}>Escribí cualquier situación que quieras practicar</div>
          <input
            value={situacionCustom}
            onChange={e => setSituacionCustom(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && elegirSituacionCustom()}
            placeholder="Ej: Negociar el precio de un auto usado..."
            style={{ width:'100%', padding:'10px', borderRadius:'8px', border:'0.5px solid var(--color-border-secondary)', fontSize:'0.9rem', boxSizing:'border-box', marginBottom:'8px' }}
          />
          <button
            onClick={elegirSituacionCustom}
            disabled={!situacionCustom.trim()}
            style={{ background: situacionCustom.trim() ? '#2c5f8a' : '#ccc', color:'white', border:'none', padding:'8px 20px', borderRadius:'8px', cursor: situacionCustom.trim() ? 'pointer' : 'not-allowed', fontSize:'0.9rem' }}
          >
            Empezar esta situación →
          </button>
        </div>

        <div style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)', marginBottom:'10px' }}>O elegí una situación predefinida:</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
          {SITUACIONES.map(sit => (
            <button key={sit.id} onClick={() => elegirSituacion(sit)}
              style={{ background:'var(--color-background-secondary)', color:'var(--color-text-primary)', border:'0.5px solid var(--color-border-secondary)', padding:'14px', borderRadius:'12px', cursor:'pointer', textAlign:'left', marginTop:'0' }}>
              <div style={{ fontSize:'1.5rem', marginBottom:'4px' }}>{sit.emoji}</div>
              <div style={{ fontWeight:'500', fontSize:'0.9rem', marginBottom:'2px' }}>{sit.titulo}</div>
              <div style={{ fontSize:'0.78rem', color:'var(--color-text-secondary)' }}>{sit.descripcion}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Pantalla de resumen
  if (resumen) {
    const colorP = resumen.puntaje >= 80 ? '#e8f5e9' : resumen.puntaje >= 60 ? '#fff8e1' : '#fdecea';
    const colorT = resumen.puntaje >= 80 ? '#1a6b3a' : resumen.puntaje >= 60 ? '#e65100' : '#c0392b';
    return (
      <div className="card">
        <h2>📊 Resumen de tu práctica</h2>
        <div style={{ fontSize:'0.9rem', color:'var(--color-text-secondary)', marginBottom:'16px' }}>{situacionElegida.emoji} {situacionElegida.titulo}</div>
        <div style={{ textAlign:'center', padding:'20px', background: colorP, borderRadius:'12px', marginBottom:'16px' }}>
          <div style={{ fontSize:'3rem', fontWeight:'bold', color: colorT }}>{resumen.puntaje}</div>
          <div style={{ fontSize:'0.85rem', color: colorT }}>puntos sobre 100</div>
          <div style={{ fontSize:'0.9rem', color:'#555', marginTop:'8px' }}>{resumen.resumen}</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'16px' }}>
          <div style={{ background:'#fdecea', padding:'14px', borderRadius:'8px' }}>
            <div style={{ fontWeight:'500', color:'#c0392b', marginBottom:'8px' }}>⚠️ Errores frecuentes</div>
            {resumen.errores_frecuentes?.map((e,i) => <div key={i} style={{ fontSize:'0.85rem', marginBottom:'4px' }}>• {e}</div>)}
          </div>
          <div style={{ background:'#e8f5e9', padding:'14px', borderRadius:'8px' }}>
            <div style={{ fontWeight:'500', color:'#1a6b3a', marginBottom:'8px' }}>💡 Frases útiles</div>
            {resumen.frases_utiles?.map((f,i) => <div key={i} style={{ fontSize:'0.85rem', marginBottom:'4px' }}>• {f}</div>)}
          </div>
        </div>
        <div style={{ background:'#e8f0fe', padding:'14px', borderRadius:'8px', marginBottom:'20px' }}>
          <div style={{ fontWeight:'500', color:'#1a237e', marginBottom:'6px' }}>🎯 Consejo</div>
          <div style={{ fontSize:'0.9rem' }}>{resumen.consejo}</div>
        </div>
        <div style={{ display:'flex', gap:'10px' }}>
          <button onClick={() => elegirSituacion(situacionElegida)} style={{ flex:1, background:'#2c5f8a', color:'white', border:'none', padding:'10px', borderRadius:'8px', cursor:'pointer' }}>Repetir ↻</button>
          <button onClick={() => { setSituacion(null); setResumen(null); }} style={{ background:'transparent', color:'#888', border:'0.5px solid #ddd', padding:'10px 16px', borderRadius:'8px', cursor:'pointer', fontSize:'0.88rem' }}>Otra situación</button>
        </div>
      </div>
    );
  }

  // Pantalla del chat
  return (
    <div className="card">
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
        <span style={{ fontSize:'1.5rem' }}>{situacionElegida.emoji}</span>
        <div>
          <div style={{ fontWeight:'500' }}>{situacionElegida.titulo}</div>
          <div style={{ fontSize:'0.82rem', color:'var(--color-text-secondary)' }}>{situacionElegida.descripcion}</div>
        </div>
        <button onClick={() => setSituacion(null)} style={{ marginLeft:'auto', background:'transparent', color:'#888', border:'none', cursor:'pointer', fontSize:'1.2rem' }}>✕</button>
      </div>

      <div style={{ height:'340px', overflowY:'auto', border:'0.5px solid var(--color-border-tertiary)', borderRadius:'8px', padding:'16px', marginBottom:'12px', background:'var(--color-background-secondary)', display:'flex', flexDirection:'column', gap:'10px' }}>
        {mensajes.map((m, i) => (
          <div key={i} className={`mensaje ${m.role === 'user' ? 'usuario' : 'tutor'}`}>
            {m.content}
            {m.role === 'assistant' && (
              <button onClick={() => hablar(m.content)} style={{ marginLeft:'8px', background:'transparent', border:'none', cursor:'pointer', fontSize:'0.9rem', padding:'0' }}>🔊</button>
            )}
          </div>
        ))}
        {cargando && <div className="mensaje tutor escribiendo">...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input" style={{ marginBottom:'8px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && enviar()}
          placeholder={escuchando ? '🎤 Escuchando...' : 'Respond in English...'}
          disabled={cargando}
        />
        <button onClick={escuchando ? () => recognitionRef.current?.stop() : iniciarMicrofono} disabled={cargando}
          style={{ background: escuchando ? '#e53935' : '#2c5f8a', color:'white', border:'none', padding:'0 14px', borderRadius:'8px', cursor:'pointer', fontSize:'1.1rem', marginTop:'0', animation: escuchando ? 'pulso 1s infinite' : 'none' }}>
          {escuchando ? '⏹' : '🎤'}
        </button>
        <button onClick={enviar} disabled={cargando}>Send ➤</button>
      </div>

      <button onClick={terminarYVerResumen} disabled={cargandoResumen || mensajes.length < 4}
        style={{ background:'transparent', color: mensajes.length < 4 ? '#ccc' : '#2c5f8a', border:`0.5px solid ${mensajes.length < 4 ? '#eee' : '#2c5f8a'}`, padding:'8px 16px', borderRadius:'8px', cursor: mensajes.length < 4 ? 'not-allowed' : 'pointer', fontSize:'0.88rem', width:'100%' }}>
        {cargandoResumen ? '⏳ Analizando...' : '📊 Terminar y ver mi puntaje'}
      </button>
    </div>
  );
}

export default Situaciones;