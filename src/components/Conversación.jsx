import { useState, useEffect, useRef } from 'react';

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

function Conversacion({ idioma = 'ingles', nivel = '', tema = '', onCerrar }) {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    const saludo = SALUDO_IDIOMA[idioma] || SALUDO_IDIOMA['ingles'];
    setMensajes([{ rol: 'tutor', texto: saludo }]);
  }, [idioma]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensajes]);

  function hablar(texto) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setTimeout(() => {
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = VOCES_IDIOMA[idioma] || 'en-US';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }, 300);
  }

  function iniciarMicrofono() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Usa Chrome para el microfono.'); return; }
    const r = new SR();
    r.lang = VOCES_IDIOMA[idioma] || 'en-US';
    r.interimResults = false;
    r.continuous = false;
    r.onstart = () => setEscuchando(true);
    r.onend = () => setEscuchando(false);
    r.onresult = (e) => {
      const texto = Array.from(e.results).map(x => x[0].transcript).join('');
      enviarDirecto(texto);
    };
    r.onerror = () => setEscuchando(false);
    recognitionRef.current = r;
    r.start();
  }

  function detenerMicrofono() {
    if (recognitionRef.current) recognitionRef.current.stop();
    setEscuchando(false);
  }

  async function enviar() {
    if (!input.trim()) return;
    await enviarDirecto(input);
    setInput('');
  }

  async function enviarDirecto(texto) {
    if (!texto.trim()) return;
    const nuevos = [...mensajes, { rol: 'usuario', texto }];
    setMensajes(nuevos);
    setInput('');
    setCargando(true);
    try {
      const historial = nuevos.map(m => ({
        role: m.rol === 'usuario' ? 'user' : 'assistant',
        content: m.texto
      }));
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ historial, idioma })
      });
      const datos = await resp.json();
      setMensajes(prev => [...prev, { rol: 'tutor', texto: datos.respuesta }]);
      hablar(datos.respuesta);
    } catch(e) {
      setMensajes(prev => [...prev, { rol: 'tutor', texto: 'Error de conexion.' }]);
    } finally {
      setCargando(false);
    }
  }

  function cerrar() {
    window.speechSynthesis.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();
    if (onCerrar) onCerrar();
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'white', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#4f46e5', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>Conversacion</div>
          {tema && <div style={{ color: '#c7d2fe', fontSize: '0.85rem' }}>{tema}</div>}
        </div>
        <button onClick={cerrar} style={{ background: 'transparent', border: '1px solid white', borderRadius: '8px', color: 'white', padding: '6px 14px', cursor: 'pointer', fontWeight: '600' }}>
          Cerrar
        </button>
      </div>

      <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {mensajes.map(function(m, i) {
          return (
            <div key={i} style={{ display: 'flex', justifyContent: m.rol === 'usuario' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: '12px', background: m.rol === 'usuario' ? '#4f46e5' : '#f0f4ff', color: m.rol === 'usuario' ? 'white' : '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {m.texto}
                {m.rol === 'tutor' && (
                  <button onClick={() => hablar(m.texto)} style={{ display: 'block', marginTop: '6px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#4f46e5', fontSize: '0.8rem', padding: 0 }}>
                    Escuchar
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {cargando && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '10px 14px', borderRadius: '12px', background: '#f0f4ff', color: '#666' }}>...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: '12px 16px', borderTop: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && enviar()}
            placeholder="Escribi tu mensaje..."
            style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', color: '#333' }}
          />
          <button onClick={enviar} disabled={cargando || !input.trim()} style={{ padding: '10px 16px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
            Enviar
          </button>
        </div>
        <button
          onClick={escuchando ? detenerMicrofono : iniciarMicrofono}
          style={{ width: '100%', padding: '12px', background: escuchando ? '#fee2e2' : '#e8f0fe', border: '2px solid', borderColor: escuchando ? '#ef4444' : '#4f46e5', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: escuchando ? '#991b1b' : '#1a237e', fontSize: '1rem' }}>
          {escuchando ? 'Detener microfono' : 'Hablar'}
        </button>
      </div>
    </div>
  );
}

export default Conversacion;