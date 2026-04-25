f = open('src/components/EscrituraKatakana.jsx', encoding='utf-8')
c = f.read()
f.close()

# Agregar palabras para practica
palabras = """
const PALABRAS_PRACTICA = [
  { espanol: 'helado', chars: ['ア', 'イ', 'ス'], incorrectos: ['カ', 'ノ', 'テ', 'ハ'] },
  { espanol: 'cafe', chars: ['コ', 'ー', 'ヒ', 'ー'], incorrectos: ['ア', 'イ', 'サ', 'リ'] },
  { espanol: 'taxi', chars: ['タ', 'ク', 'シ', 'ー'], incorrectos: ['カ', 'ノ', 'テ', 'ハ'] },
  { espanol: 'hotel', chars: ['ホ', 'テ', 'ル'], incorrectos: ['ア', 'イ', 'サ', 'リ'] },
  { espanol: 'radio', chars: ['ラ', 'ジ', 'オ'], incorrectos: ['カ', 'ノ', 'テ', 'ハ'] },
  { espanol: 'tomate', chars: ['ト', 'マ', 'ト'], incorrectos: ['ア', 'イ', 'サ', 'リ'] },
  { espanol: 'robot', chars: ['ロ', 'ボ', 'ッ', 'ト'], incorrectos: ['カ', 'ノ', 'テ', 'ハ'] },
  { espanol: 'sofa', chars: ['ソ', 'フ', 'ァ'], incorrectos: ['ア', 'イ', 'サ', 'リ'] },
];
"""

# Agregar estados para practica
estados = """
  const [modoPractica, setModoPractica] = useState(false);
  const [palabraActual, setPalabraActual] = useState(0);
  const [seleccionados, setSeleccionados] = useState([]);
  const [resultado, setResultado] = useState(null);
  const [opciones, setOpciones] = useState([]);
"""

# Agregar funciones de practica
funciones = """
  function iniciarPractica() {
    const palabra = PALABRAS_PRACTICA[0];
    const todas = [...palabra.chars, ...palabra.incorrectos];
    const mezcladas = todas.sort(() => Math.random() - 0.5).slice(0, 6);
    setOpciones(mezcladas);
    setModoPractica(true);
    setPalabraActual(0);
    setSeleccionados([]);
    setResultado(null);
  }

  function seleccionarChar(char) {
    if (resultado) return;
    const nuevos = [...seleccionados, char];
    setSeleccionados(nuevos);
    const palabra = PALABRAS_PRACTICA[palabraActual];
    if (nuevos.length === palabra.chars.length) {
      const correcto = nuevos.join('') === palabra.chars.join('');
      setResultado(correcto ? 'correcto' : 'incorrecto');
    }
  }

  function siguientePalabra() {
    const siguiente = palabraActual + 1;
    if (siguiente < PALABRAS_PRACTICA.length) {
      const palabra = PALABRAS_PRACTICA[siguiente];
      const todas = [...palabra.chars, ...palabra.incorrectos];
      const mezcladas = todas.sort(() => Math.random() - 0.5).slice(0, 6);
      setOpciones(mezcladas);
      setPalabraActual(siguiente);
      setSeleccionados([]);
      setResultado(null);
    } else {
      setModoPractica(false);
      setPalabraActual(0);
      setSeleccionados([]);
      setResultado(null);
    }
  }

  function borrarUltimo() {
    setSeleccionados(prev => prev.slice(0, -1));
    setResultado(null);
  }
"""

# Agregar JSX del modo practica
jsx_practica = """
  if (modoPractica) {
    const palabra = PALABRAS_PRACTICA[palabraActual];
    return (
      <div>
        <button onClick={() => setModoPractica(false)} style={{ marginBottom: '16px', background: '#e8eaf6', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
          Volver al alfabeto
        </button>
        <h4 style={{ color: '#4f46e5' }}>Practica Katakana {palabraActual + 1}/{PALABRAS_PRACTICA.length}</h4>
        <div style={{ background: '#f0f4ff', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '16px' }}>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 8px 0' }}>Escribi en Katakana:</p>
          <p style={{ fontSize: '2rem', fontWeight: '600', color: '#333', margin: 0 }}>{palabra.espanol}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px', minHeight: '60px', background: '#fff', border: '2px solid', borderColor: resultado === 'correcto' ? '#22c55e' : resultado === 'incorrecto' ? '#ef4444' : '#ddd', borderRadius: '12px', padding: '8px', alignItems: 'center' }}>
          {seleccionados.length === 0
            ? <span style={{ color: '#999' }}>Selecciona los caracteres...</span>
            : seleccionados.map(function(c, i) { return <span key={i} style={{ fontSize: '2rem', color: '#4f46e5' }}>{c}</span>; })
          }
        </div>
        {resultado && (
          <div style={{ textAlign: 'center', marginBottom: '16px', padding: '12px', background: resultado === 'correcto' ? '#f0fdf4' : '#fef2f2', borderRadius: '12px' }}>
            <p style={{ color: resultado === 'correcto' ? '#166534' : '#991b1b', fontWeight: '600', margin: 0 }}>
              {resultado === 'correcto' ? 'Correcto! ' + palabra.chars.join('') + ' = ' + palabra.espanol : 'Incorrecto. Era: ' + palabra.chars.join('')}
            </p>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
          {opciones.map(function(op, i) {
            var yaSeleccionado = seleccionados.includes(op);
            return (
              <button key={i} onClick={() => seleccionarChar(op)} disabled={yaSeleccionado || resultado}
                style={{ padding: '16px', fontSize: '1.8rem', borderRadius: '8px', border: '2px solid', borderColor: yaSeleccionado ? '#4f46e5' : '#ddd', background: yaSeleccionado ? '#e8eaf6' : 'white', cursor: yaSeleccionado || resultado ? 'default' : 'pointer', color: '#333' }}>
                {op}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={borrarUltimo} disabled={seleccionados.length === 0 || resultado} style={{ flex: 1, padding: '12px', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
            Borrar ultimo
          </button>
          {resultado && (
            <button onClick={siguientePalabra} style={{ flex: 1, padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              {palabraActual < PALABRAS_PRACTICA.length - 1 ? 'Siguiente palabra' : 'Terminar practica'}
            </button>
          )}
        </div>
      </div>
    );
  }
"""

# Insertar palabras antes de function EscrituraKatakana
c = c.replace(
    "function EscrituraKatakana()",
    palabras + "function EscrituraKatakana()"
)

# Insertar estados despues del primer useState
c = c.replace(
    "  const [mostrarEjemplo, setMostrarEjemplo] = useState({});",
    "  const [mostrarEjemplo, setMostrarEjemplo] = useState({});" + estados
)

# Insertar funciones antes del if modoPractica o del return
c = c.replace(
    "  const grupo = GRUPOS[grupoActivo];",
    funciones + "  const grupo = GRUPOS[grupoActivo];"
)

# Insertar JSX practica antes del return principal
c = c.replace(
    "  return (\n    <div>\n      <div style={{ background: '#f0f4ff'",
    jsx_practica + "\n  return (\n    <div>\n      <div style={{ background: '#f0f4ff'"
)

# Agregar boton de practica
c = c.replace(
    "      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>",
    """      <button onClick={iniciarPractica} style={{ width: '100%', padding: '12px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginBottom: '16px' }}>
        Practicar escritura Katakana
      </button>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>"""
)

f = open('src/components/EscrituraKatakana.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')