import { useState } from 'react';

const PREGUNTAS = [
  {
    id: 1,
    nivel: 'A1',
    pregunta: 'Complete: "My name ___ John."',
    opciones: ['am', 'is', 'are', 'be'],
    correcta: 'is'
  },
  {
    id: 2,
    nivel: 'A1',
    pregunta: 'What is the plural of "child"?',
    opciones: ['childs', 'childes', 'children', 'childrens'],
    correcta: 'children'
  },
  {
    id: 3,
    nivel: 'A2',
    pregunta: 'Complete: "She ___ to school every day."',
    opciones: ['go', 'goes', 'going', 'gone'],
    correcta: 'goes'
  },
  {
    id: 4,
    nivel: 'A2',
    pregunta: 'Which sentence is correct?',
    opciones: [
      'I have seen him yesterday.',
      'I saw him yesterday.',
      'I did see him yesterday.',
      'I was see him yesterday.'
    ],
    correcta: 'I saw him yesterday.'
  },
  {
    id: 5,
    nivel: 'B1',
    pregunta: 'Complete: "If I ___ more time, I would travel more."',
    opciones: ['have', 'had', 'would have', 'has'],
    correcta: 'had'
  },
  {
    id: 6,
    nivel: 'B1',
    pregunta: 'Choose the correct passive voice: "Someone stole my car."',
    opciones: [
      'My car was stolen.',
      'My car is stolen.',
      'My car has stolen.',
      'My car were stolen.'
    ],
    correcta: 'My car was stolen.'
  },
  {
    id: 7,
    nivel: 'B2',
    pregunta: 'Complete: "By the time she arrived, we ___ waiting for two hours."',
    opciones: ['had been', 'were', 'have been', 'was'],
    correcta: 'had been'
  },
  {
    id: 8,
    nivel: 'B2',
    pregunta: 'What does "to beat around the bush" mean?',
    opciones: [
      'To hit something repeatedly',
      'To avoid the main topic',
      'To work in a garden',
      'To speak very loudly'
    ],
    correcta: 'To avoid the main topic'
  },
  {
    id: 9,
    nivel: 'C1',
    pregunta: 'Complete: "Had I known about the problem, I ___ you immediately."',
    opciones: [
      'would tell',
      'would have told',
      'will tell',
      'had told'
    ],
    correcta: 'would have told'
  },
  {
    id: 10,
    nivel: 'C1',
    pregunta: 'Which word best completes: "The politician\'s speech was deliberately ___."',
    opciones: ['ambiguous', 'ambiguity', 'ambiguously', 'ambiguate'],
    correcta: 'ambiguous'
  }
];

function Diagnostico({ onNivelDeterminado }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas]         = useState([]);
  const [seleccion, setSeleccion]           = useState('');
  const [resultado, setResultado]           = useState(null);
  const [cargando, setCargando]             = useState(false);

  function responder(opcion) {
    setSeleccion(opcion);
  }

  async function siguiente() {
    if (!seleccion) return;

    const nuevasRespuestas = [...respuestas, {
      pregunta: PREGUNTAS[preguntaActual].pregunta,
      respuesta: seleccion,
      correcta:  PREGUNTAS[preguntaActual].correcta,
      esCorrecta: seleccion === PREGUNTAS[preguntaActual].correcta
    }];

    setRespuestas(nuevasRespuestas);
    setSeleccion('');

    if (preguntaActual < PREGUNTAS.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      // Terminó el test — analizar con IA
      setCargando(true);
      try {
        const resp = await fetch('http://127.0.0.1:8000/diagnostico', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ respuestas: nuevasRespuestas })
        });
        const datos = await resp.json();
        setResultado(datos);
        // Guarda el nivel en localStorage
        localStorage.setItem('nivel_ingles', datos.nivel);
        onNivelDeterminado(datos.nivel);
      } catch(e) {
        setResultado({ nivel: 'B1', descripcion: 'No se pudo conectar con el servidor.', puntos_fuertes: [], puntos_debiles: [], recomendacion: '' });
      } finally {
        setCargando(false);
      }
    }
  }

  const progreso = Math.round((preguntaActual / PREGUNTAS.length) * 100);

  // Pantalla de resultado
  if (resultado) {
    const colores = {
      A1: '#e3f2fd', A2: '#e8f5e9', B1: '#fff8e1', B2: '#fce4ec', C1: '#f3e5f5'
    };
    const colorNivel = colores[resultado.nivel] || '#f5f5f5';

    return (
      <div className="card">
        <h2>📊 Tu diagnóstico de inglés</h2>

        <div style={{ textAlign:'center', padding:'24px', background: colorNivel, borderRadius:'12px', marginBottom:'20px' }}>
          <div style={{ fontSize:'3rem', fontWeight:'bold', color:'#2c5f8a' }}>
            {resultado.nivel}
          </div>
          <div style={{ fontSize:'1rem', color:'#555', marginTop:'8px' }}>
            {resultado.descripcion}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'16px' }}>
          <div style={{ background:'#e8f5e9', padding:'14px', borderRadius:'8px' }}>
            <div style={{ fontWeight:'500', color:'#1a6b3a', marginBottom:'8px' }}>✅ Puntos fuertes</div>
            {resultado.puntos_fuertes?.map((p, i) => (
              <div key={i} style={{ fontSize:'0.88rem', color:'#333', marginBottom:'4px' }}>• {p}</div>
            ))}
          </div>
          <div style={{ background:'#fff3e0', padding:'14px', borderRadius:'8px' }}>
            <div style={{ fontWeight:'500', color:'#e65100', marginBottom:'8px' }}>📈 A mejorar</div>
            {resultado.puntos_debiles?.map((p, i) => (
              <div key={i} style={{ fontSize:'0.88rem', color:'#333', marginBottom:'4px' }}>• {p}</div>
            ))}
          </div>
        </div>

        <div style={{ background:'#e8f0fe', padding:'14px', borderRadius:'8px', marginBottom:'20px' }}>
          <div style={{ fontWeight:'500', color:'#1a237e', marginBottom:'6px' }}>💡 Recomendación</div>
          <div style={{ fontSize:'0.9rem', color:'#333' }}>{resultado.recomendacion}</div>
        </div>

        <button
          onClick={() => {
            setPreguntaActual(0);
            setRespuestas([]);
            setSeleccion('');
            setResultado(null);
          }}
          style={{ background:'transparent', color:'#888', border:'0.5px solid #ddd', padding:'8px 16px', borderRadius:'8px', cursor:'pointer', fontSize:'0.88rem' }}
        >
          🔄 Repetir el test
        </button>
      </div>
    );
  }

  // Pantalla de carga
  if (cargando) {
    return (
      <div className="card" style={{ textAlign:'center', padding:'40px' }}>
        <div style={{ fontSize:'2rem', marginBottom:'16px' }}>🧠</div>
        <div style={{ fontSize:'1rem', color:'var(--color-text-secondary)' }}>
          Analizando tus respuestas...
        </div>
      </div>
    );
  }

  const pregunta = PREGUNTAS[preguntaActual];

  return (
    <div className="card">
      <h2>🎯 Test de nivel</h2>
      <p className="descripcion">
        10 preguntas para determinar tu nivel de inglés (A1 → C1)
      </p>

      {/* Barra de progreso */}
      <div style={{ background:'var(--color-background-secondary)', borderRadius:'8px', height:'8px', marginBottom:'20px' }}>
        <div style={{
          background:'#2c5f8a', borderRadius:'8px', height:'8px',
          width: `${progreso}%`, transition:'width 0.3s'
        }} />
      </div>

      <div style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)', marginBottom:'16px' }}>
        Pregunta {preguntaActual + 1} de {PREGUNTAS.length} — Nivel {pregunta.nivel}
      </div>

      {/* Pregunta */}
      <div style={{ fontSize:'1.05rem', fontWeight:'500', marginBottom:'20px', padding:'16px', background:'var(--color-background-secondary)', borderRadius:'8px' }}>
        {pregunta.pregunta}
      </div>

      {/* Opciones */}
      <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'20px' }}>
        {pregunta.opciones.map((op, i) => (
          <button
            key={i}
            onClick={() => responder(op)}
            style={{
              background:   seleccion === op ? '#2c5f8a' : 'var(--color-background-secondary)',
              color:        seleccion === op ? 'white'   : 'var(--color-text-primary)',
              border:       seleccion === op ? 'none'    : '0.5px solid var(--color-border-secondary)',
              padding:      '12px 16px',
              borderRadius: '8px',
              cursor:       'pointer',
              textAlign:    'left',
              fontSize:     '0.95rem',
              transition:   'all 0.15s',
              marginTop:    '0'
            }}
          >
            {op}
          </button>
        ))}
      </div>

      <button
        onClick={siguiente}
        disabled={!seleccion}
        style={{
          background:   seleccion ? '#2c5f8a' : '#ccc',
          color:        'white',
          border:       'none',
          padding:      '10px 24px',
          borderRadius: '8px',
          cursor:       seleccion ? 'pointer' : 'not-allowed',
          fontSize:     '1rem'
        }}
      >
        {preguntaActual < PREGUNTAS.length - 1 ? 'Siguiente →' : 'Ver mi nivel ✓'}
      </button>
    </div>
  );
}

export default Diagnostico;