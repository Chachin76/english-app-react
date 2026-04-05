import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const NIVELES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function MiCamino({ idioma = 'ingles' }) {
  const [nivelActivo, setNivelActivo] = useState('A1');
  const [leccionActiva, setLeccionActiva] = useState(null);
  const [leccionData, setLeccionData] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [progreso, setProgreso] = useState({});
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [leccionCompletada, setLeccionCompletada] = useState(false);

  useEffect(() => {
    cargarProgreso();
  }, [idioma]);

  async function cargarProgreso() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from('lecciones_progreso')
      .select('*')
      .eq('user_id', user.id)
      .eq('idioma', idioma);
    if (data) {
      const mapa = {};
      data.forEach(l => { mapa[`${l.nivel}-${l.leccion_numero}`] = l; });
      setProgreso(mapa);
    }
  }

  async function cargarLeccion(nivel, numero) {
    setLeccionActiva(numero);
    setLeccionData(null);
    setCargando(true);
    setEjercicioActual(0);
    setRespuestaSeleccionada('');
    setMostrarResultado(false);
    setLeccionCompletada(false);
    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/leccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idioma, nivel, leccion_numero: numero })
      });
      const datos = await resp.json();
      setLeccionData(datos);
    } catch(e) {
      console.error(e);
    } finally {
      setCargando(false);
    }
  }

  function hablar(texto) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    const VOCES = { ingles: 'en-US', frances: 'fr-FR', portugues: 'pt-BR', italiano: 'it-IT', aleman: 'de-DE', espanol: 'es-ES', chino: 'zh-CN', japones: 'ja-JP', coreano: 'ko-KR' };
    u.lang = VOCES[idioma] || 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  async function completarLeccion(puntaje) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('lecciones_progreso').upsert({
      user_id: user.id,
      idioma,
      nivel: nivelActivo,
      leccion_numero: leccionActiva,
      completada: true,
      puntaje,
      fecha_completada: new Date().toISOString()
    }, { onConflict: 'user_id,idioma,nivel,leccion_numero' });
    setLeccionCompletada(true);
    cargarProgreso();
  }

  function verificarRespuesta() {
    if (!respuestaSeleccionada) return;
    setMostrarResultado(true);
  }

  function siguienteEjercicio() {
    if (ejercicioActual < leccionData.ejercicios.length - 1) {
      setEjercicioActual(ejercicioActual + 1);
      setRespuestaSeleccionada('');
      setMostrarResultado(false);
    } else {
      const correctas = leccionData.ejercicios.filter((_, i) => i === ejercicioActual).length;
      const puntaje = Math.round((correctas / leccionData.ejercicios.length) * 100);
      completarLeccion(puntaje);
    }
  }

  const estaCompletada = (nivel, numero) => progreso[`${nivel}-${numero}`]?.completada;

  return (
    <div className="card">
      <h2>🗺️ Mi Camino</h2>
      <p className="descripcion">Aprendé paso a paso, lección por lección.</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {NIVELES.map(n => (
          <button key={n} onClick={() => { setNivelActivo(n); setLeccionActiva(null); setLeccionData(null); }}
            style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: nivelActivo === n ? '#4f46e5' : '#e8eaf6', color: nivelActivo === n ? 'white' : '#333', cursor: 'pointer', fontWeight: '600' }}>
            {n}
          </button>
        ))}
      </div>

      {!leccionData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
          {Array.from({ length: 15 }, (_, i) => i + 1).map(num => (
            <button key={num} onClick={() => cargarLeccion(nivelActivo, num)}
              style={{ padding: '12px', borderRadius: '8px', border: '2px solid', borderColor: estaCompletada(nivelActivo, num) ? '#22c55e' : '#ddd', background: estaCompletada(nivelActivo, num) ? '#f0fdf4' : 'white', cursor: 'pointer', fontWeight: '600', color: '#333' }}>
              {estaCompletada(nivelActivo, num) ? '✅' : num}
            </button>
          ))}
        </div>
      )}

      {cargando && <p style={{ textAlign: 'center', marginTop: '20px' }}>⏳ Generando tu lección...</p>}

      {leccionData && !cargando && (
        <div>
          <button onClick={() => { setLeccionData(null); setLeccionActiva(null); }}
            style={{ marginBottom: '16px', background: '#e8eaf6', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
            ← Volver
          </button>

          <h3>Lección {leccionData.leccion}: {leccionData.tema}</h3>

          <div style={{ background: '#f0f4ff', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
            <p style={{ color: '#333', lineHeight: '1.6' }}>{leccionData.explicacion}</p>
          </div>

          <h4>📚 Vocabulario clave:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {leccionData.vocabulario?.map((v, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#4f46e5' }}>{v.palabra}</strong> — {v.traduccion}
                  <br /><small style={{ color: '#666' }}>{v.ejemplo} ({v.ejemplo_traduccion})</small>
                </div>
                <button onClick={() => hablar(v.palabra)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🔊</button>
              </div>
            ))}
          </div>

          {!leccionCompletada && leccionData.ejercicios && (
            <div>
              <h4>✏️ Ejercicio {ejercicioActual + 1} de {leccionData.ejercicios.length}:</h4>
              <div style={{ background: '#fff8e1', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                <p style={{ fontWeight: '600', color: '#333' }}>{leccionData.ejercicios[ejercicioActual]?.consigna}</p>
                <p style={{ color: '#333' }}>{leccionData.ejercicios[ejercicioActual]?.pregunta}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                {leccionData.ejercicios[ejercicioActual]?.opciones?.map((op, i) => (
                  <div key={i} onClick={() => !mostrarResultado && setRespuestaSeleccionada(op)}
                    style={{ padding: '12px', borderRadius: '8px', border: '2px solid', borderColor: mostrarResultado ? (op === leccionData.ejercicios[ejercicioActual].respuesta ? '#22c55e' : op === respuestaSeleccionada ? '#ef4444' : '#ddd') : (respuestaSeleccionada === op ? '#4f46e5' : '#ddd'), background: mostrarResultado ? (op === leccionData.ejercicios[ejercicioActual].respuesta ? '#f0fdf4' : op === respuestaSeleccionada ? '#fef2f2' : 'white') : (respuestaSeleccionada === op ? '#e8eaf6' : 'white'), cursor: mostrarResultado ? 'default' : 'pointer', color: '#333' }}>
                    {op}
                  </div>
                ))}
              </div>
              {mostrarResultado && (
                <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                  <p style={{ color: '#166534' }}>{leccionData.ejercicios[ejercicioActual]?.explicacion}</p>
                </div>
              )}
              {!mostrarResultado
                ? <button onClick={verificarRespuesta} disabled={!respuestaSeleccionada} style={{ width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Verificar</button>
                : <button onClick={siguienteEjercicio} style={{ width: '100%', padding: '12px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>{ejercicioActual < leccionData.ejercicios.length - 1 ? 'Siguiente ejercicio →' : 'Completar lección ✅'}</button>
              }
            </div>
          )}

          {leccionCompletada && (
            <div style={{ textAlign: 'center', padding: '24px', background: '#f0fdf4', borderRadius: '12px' }}>
              <div style={{ fontSize: '3rem' }}>🎉</div>
              <h3 style={{ color: '#166534' }}>Leccion completada!</h3>
              <div style={{ background: '#fff8e1', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
                <p style={{ fontWeight: '600' }}>Frase del dia:</p>
                <p style={{ color: '#4f46e5', fontStyle: 'italic' }}>{leccionData.frase_del_dia}</p>
                <p style={{ color: '#666' }}>{leccionData.frase_traduccion}</p>
                <button onClick={() => hablar(leccionData.frase_del_dia)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🔊</button>
              </div>
              <button onClick={() => { setLeccionData(null); setLeccionActiva(null); }} style={{ marginTop: '16px', padding: '12px 24px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                Volver a mis lecciones
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MiCamino;