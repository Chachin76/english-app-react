import { useState, useEffect } from 'react';

function Diagnostico({ onNivelDeterminado, idioma = 'ingles' }) {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [seleccion, setSeleccion] = useState('');
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [cargandoPreguntas, setCargandoPreguntas] = useState(true);

  useEffect(() => {
    cargarPreguntas();
  }, [idioma]);

  async function cargarPreguntas() {
    setCargandoPreguntas(true);
    setPreguntas([]);
    setPreguntaActual(0);
    setRespuestas([]);
    setSeleccion('');
    setResultado(null);
    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/diagnostico/preguntas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idioma })
      });
      const datos = await resp.json();
      console.log('Preguntas recibidas:', JSON.stringify(datos));
setPreguntas(datos.preguntas);
    } catch(e) {
      console.error(e);
    } finally {
      setCargandoPreguntas(false);
    }
  }

  function responder(opcion) {
    setSeleccion(opcion);
  }

  async function siguiente() {
    if (!seleccion) return;
    const nuevasRespuestas = [...respuestas, {
      pregunta: preguntas[preguntaActual].pregunta,
      respuesta: seleccion,
      correcta: preguntas[preguntaActual].correcta,
      esCorrecta: seleccion === preguntas[preguntaActual].correcta
    }];
    setRespuestas(nuevasRespuestas);
    setSeleccion('');
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setCargando(true);
      try {
        const resp = await fetch('https://english-app-backend-ifyj.onrender.com/diagnostico', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ respuestas: nuevasRespuestas, idioma })
        });
        const datos = await resp.json();
        setResultado(datos);
        onNivelDeterminado(datos.nivel);
        localStorage.setItem('nivel_ingles', datos.nivel);
      } catch(e) {
        console.error(e);
      } finally {
        setCargando(false);
      }
    }
  }

  function reiniciar() {
    cargarPreguntas();
  }

  if (cargandoPreguntas) return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>🎯 Mi nivel</h2>
      <p>⏳ Generando preguntas para tu idioma...</p>
    </div>
  );

  if (resultado) return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>🎯 Tu nivel</h2>
      <div style={{ fontSize: '3rem', margin: '16px 0' }}>{resultado.nivel}</div>
      <p>{resultado.descripcion}</p>
      <div style={{ textAlign: 'left', marginTop: '16px' }}>
        <p><strong>✅ Puntos fuertes:</strong></p>
        <ul>{resultado.puntos_fuertes?.map((p, i) => <li key={i}>{p}</li>)}</ul>
        <p><strong>📈 A mejorar:</strong></p>
        <ul>{resultado.puntos_debiles?.map((p, i) => <li key={i}>{p}</li>)}</ul>
        <p><strong>💡 Recomendación:</strong> {resultado.recomendacion}</p>
      </div>
      <button onClick={reiniciar} style={{ marginTop: '16px' }}>🔄 Repetir test</button>
    </div>
  );

  if (preguntas.length === 0) return (
    <div className="card" style={{ textAlign: 'center' }}>
      <p>❌ Error cargando preguntas. <button onClick={cargarPreguntas}>Reintentar</button></p>
    </div>
  );

  const pregunta = preguntas[preguntaActual];

  return (
    <div className="card">
      <h2>🎯 Test de nivel</h2>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Pregunta {preguntaActual + 1} de {preguntas.length}</p>
      <div style={{ background: '#f0f4ff', padding: '16px', borderRadius: '12px', margin: '16px 0' }}>
        <p style={{ fontWeight: '600' }}>{pregunta.pregunta}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {pregunta.opciones?.map((op, i) => (
          <button
            key={i}
            onClick={() => responder(op)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid',
              borderColor: seleccion === op ? '#4f46e5' : '#ddd',
              background: seleccion === op ? '#e8eaf6' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: seleccion === op ? '600' : '400'
            }}>
            {op}
          </button>
        ))}
      </div>
      <button
        onClick={siguiente}
        disabled={!seleccion || cargando}
        style={{ marginTop: '16px', width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
        {cargando ? '⏳ Analizando...' : preguntaActual < preguntas.length - 1 ? 'Siguiente →' : 'Ver resultado'}
      </button>
    </div>
  );
}

export default Diagnostico;