import { useState, useEffect } from 'react';

const LOGROS = [
  { id:'primer_dia',    emoji:'🌱', titulo:'Primer paso',      descripcion:'Usaste la app por primera vez',           condicion: (p) => p.diasTotales >= 1 },
  { id:'racha_3',       emoji:'🔥', titulo:'3 días seguidos',  descripcion:'Mantuviste una racha de 3 días',           condicion: (p) => p.rachaMáxima >= 3 },
  { id:'racha_7',       emoji:'⚡', titulo:'Una semana',        descripcion:'7 días consecutivos de práctica',          condicion: (p) => p.rachaMáxima >= 7 },
  { id:'racha_30',      emoji:'👑', titulo:'Un mes',            descripcion:'30 días consecutivos — ¡increíble!',       condicion: (p) => p.rachaMáxima >= 30 },
  { id:'100_minutos',   emoji:'⏱️', titulo:'100 minutos',       descripcion:'Acumulaste 100 minutos de estudio',        condicion: (p) => p.minutosTotales >= 100 },
  { id:'corrector_10',  emoji:'✍️', titulo:'Escritor',          descripcion:'Usaste el corrector 10 veces',             condicion: (p) => (p.modulos?.corrector || 0) >= 10 },
  { id:'chat_10',       emoji:'💬', titulo:'Conversador',       descripcion:'Tuviste 10 conversaciones con el tutor',   condicion: (p) => (p.modulos?.conversacion || 0) >= 10 },
  { id:'vocabulario_50',emoji:'📚', titulo:'50 palabras',       descripcion:'Estudiaste 50 palabras de vocabulario',    condicion: (p) => (p.modulos?.vocabulario || 0) >= 50 },
  { id:'situaciones_5', emoji:'🎭', titulo:'Actor',             descripcion:'Completaste 5 situaciones',                condicion: (p) => (p.modulos?.situaciones || 0) >= 5 },
  { id:'dictado_10',    emoji:'🎧', titulo:'Buen oído',         descripcion:'Completaste 10 ejercicios de dictado',     condicion: (p) => (p.modulos?.dictado || 0) >= 10 },
  { id:'lectura_5',     emoji:'📖', titulo:'Lector',            descripcion:'Leíste 5 textos completos',                condicion: (p) => (p.modulos?.lectura || 0) >= 5 },
  { id:'todos_modulos', emoji:'🌟', titulo:'Explorador',        descripcion:'Usaste todos los módulos al menos una vez', condicion: (p) => Object.keys(p.modulos || {}).length >= 7 },
];

function obtenerProgreso() {
  const guardado = localStorage.getItem('progreso_app');
  if (guardado) return JSON.parse(guardado);
  return {
    diasTotales:    0,
    rachActual:     0,
    rachaMáxima:    0,
    minutosTotales: 0,
    ultimoUso:      null,
    diasEstudio:    [],
    modulos:        {},
    logrosObtenidos: []
  };
}

function guardarProgreso(progreso) {
  localStorage.setItem('progreso_app', JSON.stringify(progreso));
}

export function registrarActividad(modulo, minutos = 1) {
  const progreso  = obtenerProgreso();
  const hoy       = new Date().toISOString().split('T')[0];
  const ayer      = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Actualiza días
  if (!progreso.diasEstudio.includes(hoy)) {
    progreso.diasEstudio.push(hoy);
    progreso.diasTotales += 1;

    // Actualiza racha
    if (progreso.ultimoUso === ayer) {
      progreso.rachActual += 1;
    } else if (progreso.ultimoUso !== hoy) {
      progreso.rachActual = 1;
    }

    if (progreso.rachActual > progreso.rachaMáxima) {
      progreso.rachaMáxima = progreso.rachActual;
    }
  }

  progreso.ultimoUso      = hoy;
  progreso.minutosTotales += minutos;
  progreso.modulos[modulo] = (progreso.modulos[modulo] || 0) + 1;

  guardarProgreso(progreso);
  return progreso;
}

function Progreso() {
  const [progreso, setProgreso] = useState(obtenerProgreso());
  const [tab, setTab]           = useState('resumen');

  useEffect(() => {
    registrarActividad('progreso', 0);
    setProgreso(obtenerProgreso());
  }, []);

  const logrosObtenidos  = LOGROS.filter(l => l.condicion(progreso));
  const logrosPendientes = LOGROS.filter(l => !l.condicion(progreso));

  // Genera calendario de los últimos 30 días
  function generarCalendario() {
    const dias = [];
    for (let i = 29; i >= 0; i--) {
      const fecha = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
      dias.push({ fecha, activo: progreso.diasEstudio.includes(fecha) });
    }
    return dias;
  }

  const calendario = generarCalendario();

  return (
    <div className="card">
      <h2>📊 Mi progreso</h2>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'8px', marginBottom:'20px' }}>
        {[['resumen','📈 Resumen'],['logros','🏆 Logros'],['calendario','📅 Calendario']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ background: tab===id ? '#2c5f8a' : 'var(--color-background-secondary)', color: tab===id ? 'white' : 'var(--color-text-primary)', border:'0.5px solid var(--color-border-secondary)', padding:'6px 14px', borderRadius:'20px', cursor:'pointer', fontSize:'0.85rem', marginTop:'0' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Tab Resumen */}
      {tab === 'resumen' && (
        <div>
          {/* Métricas principales */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'20px' }}>
            <div style={{ background:'#fff8e1', padding:'16px', borderRadius:'12px', textAlign:'center' }}>
              <div style={{ fontSize:'2.5rem' }}>🔥</div>
              <div style={{ fontSize:'2rem', fontWeight:'bold', color:'#e65100' }}>{progreso.rachActual}</div>
              <div style={{ fontSize:'0.82rem', color:'#888' }}>días de racha</div>
            </div>
            <div style={{ background:'#e8f5e9', padding:'16px', borderRadius:'12px', textAlign:'center' }}>
              <div style={{ fontSize:'2.5rem' }}>📅</div>
              <div style={{ fontSize:'2rem', fontWeight:'bold', color:'#1a6b3a' }}>{progreso.diasTotales}</div>
              <div style={{ fontSize:'0.82rem', color:'#888' }}>días totales</div>
            </div>
            <div style={{ background:'#e8f0fe', padding:'16px', borderRadius:'12px', textAlign:'center' }}>
              <div style={{ fontSize:'2.5rem' }}>⏱️</div>
              <div style={{ fontSize:'2rem', fontWeight:'bold', color:'#1a237e' }}>{progreso.minutosTotales}</div>
              <div style={{ fontSize:'0.82rem', color:'#888' }}>minutos estudiados</div>
            </div>
            <div style={{ background:'#fce4ec', padding:'16px', borderRadius:'12px', textAlign:'center' }}>
              <div style={{ fontSize:'2.5rem' }}>🏆</div>
              <div style={{ fontSize:'2rem', fontWeight:'bold', color:'#880e4f' }}>{logrosObtenidos.length}</div>
              <div style={{ fontSize:'0.82rem', color:'#888' }}>logros obtenidos</div>
            </div>
          </div>

          {/* Racha máxima */}
          {progreso.rachaMáxima > 0 && (
            <div style={{ background:'var(--color-background-secondary)', padding:'12px 16px', borderRadius:'8px', marginBottom:'16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:'0.9rem', color:'var(--color-text-secondary)' }}>Racha máxima</span>
              <span style={{ fontWeight:'bold', color:'#e65100' }}>⚡ {progreso.rachaMáxima} días</span>
            </div>
          )}

          {/* Actividad por módulo */}
          <div style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)', marginBottom:'10px' }}>
            Actividad por módulo:
          </div>
          {Object.entries(progreso.modulos).length === 0 ? (
            <div style={{ color:'var(--color-text-tertiary)', fontSize:'0.88rem', textAlign:'center', padding:'20px' }}>
              Todavía no hay actividad registrada. ¡Empezá a usar los módulos!
            </div>
          ) : (
            Object.entries(progreso.modulos)
              .sort((a, b) => b[1] - a[1])
              .map(([modulo, cantidad]) => {
                const emojis = { corrector:'✍️', conversacion:'💬', frases:'📖', gramatica:'📚', vocabulario:'🗂️', situaciones:'🎭', dictado:'🎧', lectura:'📖', diagnostico:'🎯' };
                const max    = Math.max(...Object.values(progreso.modulos));
                return (
                  <div key={modulo} style={{ marginBottom:'8px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px', fontSize:'0.85rem' }}>
                      <span>{emojis[modulo] || '📌'} {modulo}</span>
                      <span style={{ color:'var(--color-text-secondary)' }}>{cantidad}x</span>
                    </div>
                    <div style={{ background:'var(--color-background-secondary)', borderRadius:'4px', height:'6px' }}>
                      <div style={{ background:'#2c5f8a', borderRadius:'4px', height:'6px', width:`${(cantidad/max)*100}%`, transition:'width 0.5s' }} />
                    </div>
                  </div>
                );
              })
          )}

          <button
            onClick={() => {
              if (window.confirm('¿Seguro que querés reiniciar todo el progreso?')) {
                localStorage.removeItem('progreso_app');
                setProgreso(obtenerProgreso());
              }
            }}
            style={{ marginTop:'20px', background:'transparent', color:'#ccc', border:'0.5px solid #eee', padding:'6px 14px', borderRadius:'8px', cursor:'pointer', fontSize:'0.82rem', width:'100%' }}
          >
            🗑️ Reiniciar progreso
          </button>
        </div>
      )}

      {/* Tab Logros */}
      {tab === 'logros' && (
        <div>
          {logrosObtenidos.length > 0 && (
            <div style={{ marginBottom:'20px' }}>
              <div style={{ fontSize:'0.85rem', fontWeight:'500', color:'var(--color-text-secondary)', marginBottom:'10px' }}>
                ✅ Logros obtenidos ({logrosObtenidos.length})
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                {logrosObtenidos.map(l => (
                  <div key={l.id} style={{ background:'#e8f5e9', border:'1px solid #a5d6a7', padding:'12px', borderRadius:'10px', textAlign:'center' }}>
                    <div style={{ fontSize:'1.8rem', marginBottom:'4px' }}>{l.emoji}</div>
                    <div style={{ fontWeight:'500', fontSize:'0.88rem', color:'#1a6b3a', marginBottom:'2px' }}>{l.titulo}</div>
                    <div style={{ fontSize:'0.78rem', color:'#555' }}>{l.descripcion}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {logrosPendientes.length > 0 && (
            <div>
              <div style={{ fontSize:'0.85rem', fontWeight:'500', color:'var(--color-text-secondary)', marginBottom:'10px' }}>
                🔒 Logros pendientes ({logrosPendientes.length})
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                {logrosPendientes.map(l => (
                  <div key={l.id} style={{ background:'var(--color-background-secondary)', border:'0.5px solid var(--color-border-secondary)', padding:'12px', borderRadius:'10px', textAlign:'center', opacity:'0.6' }}>
                    <div style={{ fontSize:'1.8rem', marginBottom:'4px', filter:'grayscale(1)' }}>{l.emoji}</div>
                    <div style={{ fontWeight:'500', fontSize:'0.88rem', marginBottom:'2px' }}>{l.titulo}</div>
                    <div style={{ fontSize:'0.78rem', color:'var(--color-text-secondary)' }}>{l.descripcion}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Calendario */}
      {tab === 'calendario' && (
        <div>
          <div style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)', marginBottom:'12px' }}>
            Últimos 30 días de actividad:
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:'6px', marginBottom:'16px' }}>
            {['D','L','M','X','J','V','S'].map((d,i) => (
              <div key={i} style={{ textAlign:'center', fontSize:'0.75rem', color:'var(--color-text-tertiary)', paddingBottom:'4px' }}>{d}</div>
            ))}
            {calendario.map((dia, i) => (
              <div key={i} title={dia.fecha}
                style={{ aspectRatio:'1', borderRadius:'4px', background: dia.activo ? '#2c5f8a' : 'var(--color-background-secondary)', border:`0.5px solid ${dia.activo ? '#1a3f5f' : 'var(--color-border-tertiary)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem', color: dia.activo ? 'white' : 'var(--color-text-tertiary)' }}>
                {dia.activo ? '✓' : ''}
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'12px', fontSize:'0.82rem', color:'var(--color-text-secondary)' }}>
            <span>
              <span style={{ display:'inline-block', width:'12px', height:'12px', background:'#2c5f8a', borderRadius:'2px', marginRight:'4px', verticalAlign:'middle' }}/>
              Día con actividad
            </span>
            <span>
              <span style={{ display:'inline-block', width:'12px', height:'12px', background:'var(--color-background-secondary)', border:'0.5px solid var(--color-border-tertiary)', borderRadius:'2px', marginRight:'4px', verticalAlign:'middle' }}/>
              Sin actividad
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Progreso;