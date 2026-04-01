import { useState, useRef } from 'react';

const ESTRUCTURAS_POR_IDIOMA = {
  ingles:    ["Do you have...?", "I would like to...", "Have you ever...?", "How long have you...?", "I used to...", "What do you think about...?", "I agree / I disagree with...", "Can you help me with...?", "I'm looking forward to...", "It depends on..."],
  frances:   ["Est-ce que tu as...?", "Je voudrais...", "As-tu déjà...?", "Depuis combien de temps...?", "J'avais l'habitude de...", "Qu'est-ce que tu penses de...?", "Je suis d'accord / pas d'accord", "Tu peux m'aider avec...?", "J'ai hâte de...", "Ça dépend de..."],
  portugues: ["Você tem...?", "Eu gostaria de...", "Você já...?", "Há quanto tempo...?", "Eu costumava...", "O que você acha de...?", "Eu concordo / discordo", "Você pode me ajudar com...?", "Estou ansioso para...", "Depende de..."],
  italiano:  ["Hai...?", "Vorrei...", "Hai mai...?", "Da quanto tempo...?", "Ero solito...", "Cosa pensi di...?", "Sono d'accordo / non sono d'accordo", "Puoi aiutarmi con...?", "Non vedo l'ora di...", "Dipende da..."],
  aleman:    ["Hast du...?", "Ich möchte...", "Hast du jemals...?", "Wie lange...?", "Ich pflegte...", "Was denkst du über...?", "Ich stimme zu / nicht zu", "Kannst du mir helfen mit...?", "Ich freue mich auf...", "Es hängt ab von..."],
  espanol:   ["¿Tienes...?", "Me gustaría...", "¿Alguna vez has...?", "¿Desde hace cuánto...?", "Solía...", "¿Qué piensas sobre...?", "Estoy de acuerdo / en desacuerdo", "¿Puedes ayudarme con...?", "Tengo ganas de...", "Depende de..."],
  chino:     ["你有...吗?", "我想要...", "你曾经...吗?", "你...多久了?", "我以前...", "你觉得...怎么样?", "我同意/不同意", "你能帮我...吗?", "我期待...", "这取决于..."],
  japones:   ["〜がありますか?", "〜したいです", "〜したことがありますか?", "どのくらい〜していますか?", "以前は〜していました", "〜についてどう思いますか?", "賛成/反対です", "〜を手伝ってもらえますか?", "〜を楽しみにしています", "〜によります"],
};

function Gramatica({ idioma = 'ingles' }) {
  const ESTRUCTURAS = ESTRUCTURAS_POR_IDIOMA[idioma] || ESTRUCTURAS_POR_IDIOMA['ingles'];
  const [estructuraSeleccionada, setEstructuraSeleccionada] = useState('');
  const [estructuraCustom, setEstructuraCustom]             = useState('');
  const [mostrarCustom, setMostrarCustom]                   = useState(false);
  const [datos, setDatos]                                   = useState(null);
  const [cargando, setCargando]                             = useState(false);
  const [error, setError]                                   = useState('');
  const [velocidad, setVelocidad]                           = useState(1);
  const [acento, setAcento]                                 = useState('en-US');
  const [escuchando, setEscuchando]                         = useState(null);
  const [feedback, setFeedback]                             = useState({});
  const recognitionRef                                      = useRef(null);

  async function generar(estructura) {
    if (!estructura.trim()) return;
    setCargando(true);
    setError('');
    setDatos(null);
    setFeedback({});

    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/gramatica', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
body:    JSON.stringify({ estructura, idioma })      });
      const resultado = await resp.json();
      setDatos(resultado);
    } catch(e) {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  }

  function seleccionar(estructura) {
    setEstructuraSeleccionada(estructura);
    setMostrarCustom(false);
    generar(estructura);
  }
const VOCES_IDIOMA = {
  ingles:    'en-US',
  frances:   'fr-FR',
  portugues: 'pt-BR',
  italiano:  'it-IT',
  aleman:    'de-DE',
  espanol:   'es-ES',
  chino:     'zh-CN',
  japones:   'ja-JP',
};
  function hablar(texto, rate) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u     = new SpeechSynthesisUtterance(texto);
  u.lang      = VOCES_IDIOMA[idioma] || acento;  
    u.rate      = rate || velocidad;
    const voces = window.speechSynthesis.getVoices();
    const voz   = voces.find(v => v.lang === acento) || voces[0];
    if (voz) u.voice = voz;
    window.speechSynthesis.speak(u);
  }

  // ── Práctica de pronunciación con micrófono ──────────────
  function practicarPronunciacion(fraseOriginal, indice) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz. Usá Chrome.');
      return;
    }

    // Si ya está escuchando este ejemplo, lo detiene
    if (escuchando === indice) {
      recognitionRef.current?.stop();
      setEscuchando(null);
      return;
    }

    const recognition      = new SpeechRecognition();
    recognition.lang       = VOCES_IDIOMA[idioma] || 'en-US';
    recognition.continuous = false;

    recognition.onstart = () => setEscuchando(indice);
    recognition.onend   = () => setEscuchando(null);

    recognition.onresult = async (event) => {
      const loQueDijiste = event.results[0][0].transcript;
      const confianza    = Math.round(event.results[0][0].confidence * 100);

      // Compara lo que dijiste con la frase original
      const original  = fraseOriginal.toLowerCase().replace(/[^a-z\s]/g, '');
      const dicho     = loQueDijiste.toLowerCase().replace(/[^a-z\s]/g, '');
      const palabrasO = original.split(' ');
      const palabrasD = dicho.split(' ');

      const correctas = palabrasO.filter(p => palabrasD.includes(p)).length;
      const puntaje   = Math.round((correctas / palabrasO.length) * 100);

      let mensaje = '';
      let color   = '';

      if (puntaje >= 90) {
        mensaje = `✅ ¡Excelente pronunciación! Dijiste: "${loQueDijiste}"`;
        color   = '#e8f5e9';
      } else if (puntaje >= 60) {
        mensaje = `👍 Bien! Dijiste: "${loQueDijiste}". Original: "${fraseOriginal}". Seguí practicando.`;
        color   = '#fff8e1';
      } else {
        mensaje = `💪 Seguí intentando. Dijiste: "${loQueDijiste}". Escuchá la frase lento y repetí.`;
        color   = '#fdecea';
      }

      setFeedback(prev => ({ ...prev, [indice]: { mensaje, color, confianza } }));
    };

    recognition.onerror = (e) => {
      setEscuchando(null);
      if (e.error !== 'no-speech') {
        setFeedback(prev => ({ ...prev, [indice]: {
          mensaje: 'No se escuchó nada. Intentá de nuevo.',
          color: '#fdecea',
          confianza: 0
        }}));
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  return (
    <div className="card">
      <h2>📚 Gramática con pronunciación</h2>
      <p className="descripcion">
        Elegí una estructura, escuchá ejemplos y practicá tu pronunciación.
      </p>

      {/* Selector de estructuras */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'16px' }}>
        {ESTRUCTURAS.map(e => (
          <button
            key={e}
            onClick={() => seleccionar(e)}
            style={{
              background: estructuraSeleccionada === e ? '#2c5f8a' : 'var(--color-background-secondary)',
              color:      estructuraSeleccionada === e ? 'white'   : 'var(--color-text-primary)',
              border:     estructuraSeleccionada === e ? 'none'    : '0.5px solid var(--color-border-secondary)',
              padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.88rem'
            }}
          >
            {e}
          </button>
        ))}
        <button
          onClick={() => { setMostrarCustom(true); setEstructuraSeleccionada(''); }}
          style={{
            background: mostrarCustom ? '#2c5f8a' : 'var(--color-background-secondary)',
            color:      mostrarCustom ? 'white'   : 'var(--color-text-primary)',
            border: '0.5px solid var(--color-border-secondary)',
            padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.88rem'
          }}
        >
          + Nueva estructura
        </button>
      </div>

      {/* Campo personalizado */}
      {mostrarCustom && (
        <div style={{ display:'flex', gap:'8px', marginBottom:'16px' }}>
          <input
            value={estructuraCustom}
            onChange={e => setEstructuraCustom(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generar(estructuraCustom)}
            placeholder="Ej: I wish I could..."
            style={{ flex:1, padding:'8px 12px', borderRadius:'8px', border:'0.5px solid var(--color-border-secondary)', fontSize:'0.95rem' }}
          />
          <button
            onClick={() => generar(estructuraCustom)}
            style={{ background:'#2c5f8a', color:'white', border:'none', padding:'8px 16px', borderRadius:'8px', cursor:'pointer' }}
          >
            Generar
          </button>
        </div>
      )}

      {/* Controles de voz */}
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px', flexWrap:'wrap', fontSize:'0.85rem', color:'var(--color-text-secondary)' }}>
        <span>Acento:</span>
        {[['en-US','🇺🇸 Americano'],['en-GB','🇬🇧 Británico']].map(([lang, label]) => (
          <button
            key={lang}
            onClick={() => setAcento(lang)}
            style={{
              background: acento===lang ? '#e8f0fe' : 'var(--color-background-secondary)',
              color:      acento===lang ? '#1a237e' : 'var(--color-text-secondary)',
              border: '0.5px solid var(--color-border-secondary)',
              padding: '4px 12px', borderRadius: '12px', cursor: 'pointer', fontSize: '0.82rem'
            }}
          >
            {label}
          </button>
        ))}
        <span style={{ marginLeft:'auto' }}>Velocidad:</span>
        <input
          type="range" min="0.5" max="1.5" step="0.1"
          value={velocidad}
          onChange={e => setVelocidad(parseFloat(e.target.value))}
          style={{ width:'80px' }}
        />
        <span>{velocidad < 0.8 ? 'Lento' : velocidad > 1.2 ? 'Rápido' : 'Normal'}</span>
      </div>

      {cargando && (
        <div style={{ textAlign:'center', padding:'24px', color:'var(--color-text-secondary)' }}>
          ⏳ Generando ejemplos con IA...
        </div>
      )}

      {error && (
        <div style={{ background:'var(--color-background-danger)', color:'var(--color-text-danger)', padding:'12px', borderRadius:'8px' }}>
          ❌ {error}
        </div>
      )}

      {datos && (
        <div>
          <div style={{ background:'var(--color-background-info)', color:'var(--color-text-info)', padding:'10px 14px', borderRadius:'8px', marginBottom:'16px', fontSize:'0.9rem' }}>
            <strong>¿Cuándo se usa?</strong> {datos.significado}
          </div>

          {datos.ejemplos?.map((ej, i) => (
            <div key={i} style={{ background:'var(--color-background-secondary)', borderRadius:'8px', padding:'14px 16px', marginBottom:'12px', borderLeft:'3px solid #2c5f8a' }}>

              <div style={{ fontSize:'1rem', fontWeight:'500', fontStyle:'italic', marginBottom:'4px' }}>
                {ej.ingles}
              </div>
              <div style={{ fontSize:'0.88rem', color:'var(--color-text-secondary)', marginBottom:'4px' }}>
                {ej.español}
              </div>
              <div style={{ fontSize:'0.82rem', color:'var(--color-text-tertiary)', fontFamily:'monospace', marginBottom:'8px' }}>
                [ {ej.fonetica} ]
              </div>
              <div style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)', marginBottom:'12px', padding:'8px 10px', background:'var(--color-background-primary)', borderRadius:'6px' }}>
                📖 {ej.explicacion}
              </div>

              {/* Botones de audio */}
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'10px' }}>
                <button
                  onClick={() => hablar(ej.ingles, velocidad)}
                  style={{ background:'#2c5f8a', color:'white', border:'none', padding:'6px 14px', borderRadius:'8px', cursor:'pointer', fontSize:'0.85rem' }}
                >
                  ▶ Escuchar
                </button>
                <button
                  onClick={() => hablar(ej.ingles, 0.6)}
                  style={{ background:'transparent', color:'var(--color-text-secondary)', border:'0.5px solid var(--color-border-secondary)', padding:'6px 14px', borderRadius:'8px', cursor:'pointer', fontSize:'0.85rem' }}
                >
                  🐢 Lento
                </button>
                <button
                  onClick={() => hablar(ej.ingles, velocidad)}
                  style={{ background:'transparent', color:'#2c5f8a', border:'0.5px solid #2c5f8a', padding:'6px 14px', borderRadius:'8px', cursor:'pointer', fontSize:'0.85rem' }}
                >
                  ↻ Repetir
                </button>
              </div>

              {/* Botón de práctica de pronunciación */}
              <div style={{ borderTop:'0.5px solid var(--color-border-tertiary)', paddingTop:'10px' }}>
                <button
                  onClick={() => practicarPronunciacion(ej.ingles, i)}
                  style={{
                    background:   escuchando === i ? '#e53935' : '#e8f5e9',
                    color:        escuchando === i ? 'white'   : '#1a6b3a',
                    border:       '0.5px solid',
                    borderColor:  escuchando === i ? '#e53935' : '#a5d6a7',
                    padding:      '6px 14px',
                    borderRadius: '8px',
                    cursor:       'pointer',
                    fontSize:     '0.85rem',
                    animation:    escuchando === i ? 'pulso 1s infinite' : 'none'
                  }}
                >
                  {escuchando === i ? '⏹ Detener' : '🎤 Practicar pronunciación'}
                </button>

                {/* Feedback de pronunciación */}
                {feedback[i] && (
                  <div style={{ marginTop:'8px', padding:'10px 12px', background: feedback[i].color, borderRadius:'8px', fontSize:'0.88rem' }}>
                    {feedback[i].mensaje}
                    {feedback[i].confianza > 0 && (
                      <span style={{ marginLeft:'8px', fontSize:'0.8rem', color:'var(--color-text-tertiary)' }}>
                        (confianza del micrófono: {feedback[i].confianza}%)
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={() => generar(estructuraSeleccionada || estructuraCustom)}
            style={{ background:'#2c5f8a', color:'white', border:'none', padding:'10px 20px', borderRadius:'8px', cursor:'pointer', fontSize:'0.95rem', marginTop:'8px' }}
          >
            Generar más ejemplos ↻
          </button>
        </div>
      )}
    </div>
  );
}

export default Gramatica;