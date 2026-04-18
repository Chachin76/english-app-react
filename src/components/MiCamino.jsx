import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import EscrituraJapones from './EscrituraJapones';
import EscrituraKatakana from './EscrituraKatakana';
import LeccionModulos from './LeccionModulos';

const NIVELES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const TEMAS = {
  A1: ['Saludos y presentaciones','Numeros del 1 al 20','Colores basicos','Dias de la semana','Meses del anio','La familia','Partes del cuerpo','Comidas y bebidas','Objetos del hogar','Ropa basica','Animales comunes','Medios de transporte','El clima','Profesiones basicas','Lugares de la ciudad','Los numeros 20 al 100','Preguntas basicas','Verbos de accion basicos','Adjetivos basicos','Mi rutina diaria'],
  A2: ['Rutinas diarias','Compras en el mercado','Pedir comida','Hablar del pasado','Planes futuros','Describir personas','Describir lugares','Dar direcciones','Tiempo libre','La salud','Viajes y vacaciones','El trabajo','Las emociones','La casa','Hacer comparaciones','El dinero','La tecnologia basica','Deportes','La naturaleza','Las fiestas y celebraciones'],
  B1: ['Expresar opiniones','Experiencias pasadas','Hacer hipotesis','Describir procesos','Habitos pasados','Acuerdo y desacuerdo','Dar consejos','Planes y predicciones','Contar historias','Causa y efecto','Cultura y tradiciones','Medios de comunicacion','El medio ambiente','Tecnologia','Relaciones personales','Politica basica','Arte y musica','Ciencia basica','Educacion','El mundo laboral'],
  B2: ['Argumentar y debatir','Lenguaje formal e informal','Expresiones idiomaticas','Literatura basica','Economia basica','Sociedad y cultura','Noticias y prensa','Ciencia y tecnologia avanzada','Historia','Filosofia basica','Psicologia basica','Negocios internacionales','Derecho basico','Medicina basica','Arte contemporaneo','Cine y teatro','Musica y literatura','Viajes avanzados','Politica internacional','El futuro del planeta'],
  C1: ['Retorica y persuasion','Matices del lenguaje','Humor e ironia','Lenguaje academico','Investigacion y analisis','Debate avanzado','Literatura avanzada','Filosofia del lenguaje','Economia avanzada','Politica avanzada','Ciencia avanzada','Arte avanzado','Historia del lenguaje','Linguistica basica','Traduccion e interpretacion','Escritura creativa','Critica literaria','Comunicacion intercultural','Etica y moral','El lenguaje en los medios'],
  C2: ['Dominio total del lenguaje','Expresion poetica','Lenguaje juridico','Lenguaje medico','Lenguaje cientifico','Lenguaje diplomatico','Escritura academica avanzada','Oratoria','Interpretacion simultanea','Linguistica avanzada','Historia de la literatura','Critica cultural','Lenguaje filosofico','Traduccion literaria','Comunicacion de alto nivel','Creatividad linguistica','Innovacion en el lenguaje','Lenguaje del futuro','Maestria expresiva','Excelencia comunicativa'],
};

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

  useEffect(() => { cargarProgreso(); }, [idioma]);

  async function cargarProgreso() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from('lecciones_progreso').select('*').eq('user_id', user.id).eq('idioma', idioma);
    if (data) {
      const mapa = {};
      data.forEach(l => { mapa[l.nivel + '-' + l.leccion_numero] = l; });
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
      user_id: user.id, idioma, nivel: nivelActivo, leccion_numero: leccionActiva,
      completada: true, puntaje, fecha_completada: new Date().toISOString()
    }, { onConflict: 'user_id,idioma,nivel,leccion_numero' });
    setLeccionCompletada(true);
    cargarProgreso();
  }

  function verificarRespuesta() {
    if (!respuestaSeleccionada) return;
    setMostrarResultado(true);
  }

  function siguienteEjercicio() {
    if (!leccionData) return;
    if (ejercicioActual < leccionData.ejercicios.length - 1) {
      setEjercicioActual(ejercicioActual + 1);
      setRespuestaSeleccionada('');
      setMostrarResultado(false);
    } else {
      completarLeccion(100);
    }
  }

  const estaCompletada = (nivel, numero) => progreso[nivel + '-' + numero] && progreso[nivel + '-' + numero].completada;

  if (cargando) return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>Mi Camino</h2>
      <p>Generando tu leccion...</p>
    </div>
  );

  if (leccionData && !cargando) return (
    <div className="card">
      <button onClick={() => { setLeccionData(null); setLeccionActiva(null); }} style={{ marginBottom: '16px', background: '#e8eaf6', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
        Volver
      </button>
      <h3>Leccion {leccionData.leccion}: {leccionData.tema}</h3>
      <div style={{ background: '#f0f4ff', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
        <p style={{ color: '#333', lineHeight: '1.6' }}>{leccionData.explicacion}</p>
      </div>
{idioma === 'japones' && leccionData.leccion <= 5 && <EscrituraJapones />}
{idioma === 'japones' && leccionData.leccion >= 6 && leccionData.leccion <= 10 && <EscrituraKatakana />}
      <h4>Vocabulario clave:</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {leccionData.vocabulario && leccionData.vocabulario.map(function(v, i) {
          return (
            <div key={i} style={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#4f46e5' }}>{v.palabra}</strong> - {v.traduccion}
                <br /><small style={{ color: '#666' }}>{v.ejemplo} ({v.ejemplo_traduccion})</small>
              </div>
              <button onClick={() => hablar(v.palabra)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🔊</button>
            </div>
          );
        })}
      </div>
      {!leccionCompletada && (
  <LeccionModulos
    idioma={idioma}
    nivel={nivelActivo}
    tema={leccionData.tema}
    onVolver={() => {}}
  />
)}
      {!leccionCompletada && leccionData.ejercicios && (
        <div>
          <h4>Ejercicio {ejercicioActual + 1} de {leccionData.ejercicios.length}:</h4>
          <div style={{ background: '#fff8e1', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
            <p style={{ fontWeight: '600', color: '#333' }}>{leccionData.ejercicios[ejercicioActual].consigna}</p>
            <p style={{ color: '#333' }}>{leccionData.ejercicios[ejercicioActual].pregunta}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {leccionData.ejercicios[ejercicioActual].opciones && leccionData.ejercicios[ejercicioActual].opciones.map(function(op, i) {
              var esCorrecta = op === leccionData.ejercicios[ejercicioActual].respuesta;
              var esSeleccionada = op === respuestaSeleccionada;
              return (
                <div key={i} onClick={() => !mostrarResultado && setRespuestaSeleccionada(op)}
                  style={{ padding: '12px', borderRadius: '8px', border: '2px solid', borderColor: mostrarResultado ? (esCorrecta ? '#22c55e' : esSeleccionada ? '#ef4444' : '#ddd') : (esSeleccionada ? '#4f46e5' : '#ddd'), background: mostrarResultado ? (esCorrecta ? '#f0fdf4' : esSeleccionada ? '#fef2f2' : 'white') : (esSeleccionada ? '#e8eaf6' : 'white'), cursor: mostrarResultado ? 'default' : 'pointer', color: '#333' }}>
                  {op}
                </div>
              );
            })}
          </div>
          {mostrarResultado && (
            <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
              <p style={{ color: '#166534' }}>{leccionData.ejercicios[ejercicioActual].explicacion}</p>
            </div>
          )}
          {!mostrarResultado
            ? <button onClick={verificarRespuesta} disabled={!respuestaSeleccionada} style={{ width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Verificar</button>
            : <button onClick={siguienteEjercicio} style={{ width: '100%', padding: '12px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>{ejercicioActual < leccionData.ejercicios.length - 1 ? 'Siguiente ejercicio' : 'Completar leccion'}</button>
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
  );

  return (
    <div className="card">
      <h2>🗺️ Mi Camino</h2>
      <p className="descripcion">Aprende paso a paso, leccion por leccion.</p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {NIVELES.map(function(n) {
          return (
            <button key={n} onClick={() => setNivelActivo(n)}
              style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: nivelActivo === n ? '#4f46e5' : '#e8eaf6', color: nivelActivo === n ? 'white' : '#333', cursor: 'pointer', fontWeight: '600' }}>
              {n}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
        {Array.from({ length: 20 }, function(_, i) { return i + 1; }).map(function(num) {
          var completada = estaCompletada(nivelActivo, num);
          return (
            <button key={num} onClick={() => cargarLeccion(nivelActivo, num)}
              style={{ padding: '12px', borderRadius: '8px', border: '2px solid', borderColor: completada ? '#22c55e' : '#ddd', background: completada ? '#f0fdf4' : 'white', cursor: 'pointer', fontWeight: '600', color: '#333' }}>
              {completada ? '✅' : num}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MiCamino;