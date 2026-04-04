import { useState, useRef, useEffect } from 'react';
import { registrarActividad } from './Progreso';

const VOCES_IDIOMA = {
  ingles: 'en-US', frances: 'fr-FR', portugues: 'pt-BR', italiano: 'it-IT',
  aleman: 'de-DE', espanol: 'es-ES', chino: 'zh-CN', japones: 'ja-JP', coreano: 'ko-KR'
};

const SALUDO_IDIOMA = {
  ingles: 'Hello! I am your tutor. What would you like to talk about?',
  frances: 'Bonjour! Je suis ton tuteur. De quoi veux-tu parler?',
  portugues: 'Ola! Sou seu tutor. Sobre o que voce quer falar?',
  italiano: 'Ciao! Sono il tuo tutor. Di cosa vuoi parlare?',
  aleman: 'Hallo! Ich bin dein Lehrer. Worüber möchtest du sprechen?',
  espanol: 'Hola! Soy tu tutor. De que quieres hablar?',
  chino: 'Hola! Soy tu tutor de chino. De que quieres hablar?',
  japones: 'Hola! Soy tu tutor de japones. De que quieres hablar?',
  coreano: 'Hola! Soy tu tutor de coreano. De que quieres hablar?',
};

function Chat({ idioma = 'ingles' }) {
  const [mensajes, setMensajes] = useState([{ rol: 'tutor', texto: SALUDO_IDIOMA['ingles'] }]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [mensajes]);
  useEffect(() => { setMensajes([{ rol: 'tutor', texto: SALUDO_IDIOMA[idioma] || SALUDO_IDIOMA['ingles'] }]); }, [idioma]);

  function hablar(texto) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = VOCES_IDIOMA[idioma] || 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function iniciarMicrofono() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Usa Chrome para el microfono.'); return; }
    const r = new SR();
    r.lang = VOCES_IDIOMA[idioma] || 'en-US';
    r.interimResults = true;
    r.continuous = true;
    r.onstart = () => setEscuchando(true);
    r.onend = () => setEscuchando(false);
    r.onresult = (e) => { setInput(Array.from(e.results).map(x => x[0].transcript).join('')); };
    r.onerror = () => { setEscuchando(false); };
    recognitionRef.current = r;
    r.start();
  }

  function detenerMicrofono() { recognitionRef.current?.stop(); setEscuchando(false); }

  async function enviar() {
    const texto = input.trim();
    if (!texto || cargando) return;
    const nuevosMensajes = [...mensajes, { rol: 'usuario', texto }];
    setMensajes(nuevosMensajes);
    setInput('');
    setCargando(true);
    try {
      const historial = nuevosMensajes.map(m => ({ role: m.rol === 'usuario' ? 'user' : 'assistant', content: m.texto }));
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ historial, idioma })
      });
      const datos = await resp.json();
      setMensajes(prev => [...prev, { rol: 'tutor', texto: datos.respuesta }]);
      registrarActividad('conversacion', 3);
      hablar(datos.respuesta);
    } catch(e) {
      setMensajes(prev => [...prev, { rol: 'tutor', texto: 'Error de conexion.' }]);
    } finally { setCargando(false); }
  }

  return (
    <div className="card">
      <h2>Conversacion con tu tutor</h2>
      <p className="descripcion">Escribi o habla en el idioma seleccionado.</p>
      <div className="chat-box">
        {mensajes.map((m, i) => (
          <div key={i} className={'mensaje ' + m.rol}>
            {m.texto}
            {m.rol === 'tutor' && <button onClick={() => hablar(m.texto)} style={{ marginLeft: '8px', background: 'transparent', border: 'none', cursor: 'pointer' }}>🔊</button>}
          </div>
        ))}
        {cargando && <div className="mensaje tutor">...</div>}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && enviar()} placeholder="Escribi tu mensaje..." style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
        <button onClick={escuchando ? detenerMicrofono : iniciarMicrofono} style={{ padding: '10px', borderRadius: '8px', background: escuchando ? '#fee2e2' : '#e8f0fe', border: 'none', cursor: 'pointer' }}>{escuchando ? '⏹' : '🎤'}</button>
        <button onClick={enviar} disabled={cargando} style={{ padding: '10px 16px', borderRadius: '8px', background: '#4f46e5', color: 'white', border: 'none', cursor: 'pointer' }}>Enviar</button>
      </div>
    </div>
  );
}

export default Chat;