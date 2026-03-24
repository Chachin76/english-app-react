import { useState, useRef, useEffect } from 'react';
import { registrarActividad } from './Progreso';

function Chat() {
  const [mensajes, setMensajes]     = useState([
    { rol: 'tutor', texto: "Hello! I'm your English tutor. Let's practice! What would you like to talk about? 😊" }
  ]);
  const [input, setInput]           = useState('');
  const [cargando, setCargando]     = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const bottomRef                   = useRef(null);
  const recognitionRef              = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  // ── Inicializa el reconocimiento de voz ──────────────────
  function iniciarMicrofono() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz. Usá Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang          = 'en-US';
    recognition.interimResults = true;
   recognition.continuous     = true;
recognition.interimResults = true;

    recognition.onstart = () => setEscuchando(true);
    recognition.onend   = () => setEscuchando(false);

    recognition.onresult = (e) => {
  const transcripcion = Array.from(event.results)
    .map(r => r[0].transcript)
    .join('');
  setInput(transcripcion);
};

    recognition.onerror = (e) => {
      setEscuchando(false);
      if (e.error !== 'no-speech') {
        alert('Error de micrófono: ' + e.error);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  function detenerMicrofono() {
    recognitionRef.current?.stop();
    setEscuchando(false);
  }

  // ── Hablar con voz sintética ─────────────────────────────
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

  // ── Enviar mensaje ───────────────────────────────────────
  async function enviar() {
    const texto = input.trim();
    if (!texto || cargando) return;

    const nuevosMensajes = [...mensajes, { rol: 'usuario', texto }];
    setMensajes(nuevosMensajes);
    setInput('');
    setCargando(true);

    try {
      const historial = nuevosMensajes.map(m => ({
        role:    m.rol === 'usuario' ? 'user' : 'assistant',
        content: m.texto
      }));

      const resp = await fetch('http://127.0.0.1:8000/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ historial })
      });

      const datos  = await resp.json();
      const respIA = datos.respuesta;

      setMensajes(prev => [...prev, { rol: 'tutor', texto: respIA }]);
      registrarActividad('conversacion', 3);

      // El tutor responde en voz alta automáticamente
      hablar(respIA);

    } catch(e) {
      setMensajes(prev => [...prev, {
        rol: 'tutor',
        texto: 'Error de conexion. Verifica que el servidor backend este corriendo.'
      }]);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="card">
      <h2>💬 Conversación con tu tutor</h2>
      <p className="descripcion">
        Escribí o hablá en inglés. El tutor te responde en voz alta.
      </p>

      <div className="chat-box">
        {mensajes.map((m, i) => (
          <div key={i} className={`mensaje ${m.rol}`}>
            {m.texto}
            {m.rol === 'tutor' && (
              <button
                onClick={() => hablar(m.texto)}
                style={{ marginLeft:'8px', background:'transparent', border:'none', cursor:'pointer', fontSize:'1rem', padding:'0' }}
                title="Escuchar de nuevo"
              >
                🔊
              </button>
            )}
          </div>
        ))}
        {cargando && <div className="mensaje tutor escribiendo">Typing...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && enviar()}
          placeholder={escuchando ? '🎤 Escuchando...' : 'Write or speak in English...'}
          disabled={cargando}
          style={{ fontStyle: escuchando ? 'italic' : 'normal' }}
        />

        {/* Botón micrófono */}
        <button
          onClick={escuchando ? detenerMicrofono : iniciarMicrofono}
          disabled={cargando}
          style={{
            background:   escuchando ? '#e53935' : '#2c5f8a',
            color:        'white',
            border:       'none',
            padding:      '0 14px',
            borderRadius: '8px',
            cursor:       'pointer',
            fontSize:     '1.2rem',
            marginTop:    '0',
            animation:    escuchando ? 'pulso 1s infinite' : 'none'
          }}
          title={escuchando ? 'Detener' : 'Hablar'}
        >
          {escuchando ? '⏹' : '🎤'}
        </button>

        <button onClick={enviar} disabled={cargando}>Send ➤</button>
      </div>

      <button
        className="btn-secondary"
        onClick={() => {
          setMensajes([{ rol: 'tutor', texto: "Hello again! Ready for a new conversation? 😊" }]);
          window.speechSynthesis?.cancel();
        }}
      >
        🗑️ New conversation
      </button>
    </div>
  );
}

export default Chat;