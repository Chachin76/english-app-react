import { useState } from 'react';

const HIRAGANA_VOCALES = [
  { char: 'ã‚', romaji: 'a', fonetica: 'a como en espaÃ±ol', ejemplo: 'ã‚ã‚', ejemplo_sig: 'ame = lluvia' },
  { char: 'ã„', romaji: 'i', fonetica: 'i como en espaÃ±ol', ejemplo: 'ã„ã¬', ejemplo_sig: 'inu = perro' },
  { char: 'ã†', romaji: 'u', fonetica: 'u suave, labios sin redondear', ejemplo: 'ã†ã¿', ejemplo_sig: 'umi = mar' },
  { char: 'ãˆ', romaji: 'e', fonetica: 'e como en espaÃ±ol', ejemplo: 'ãˆã', ejemplo_sig: 'eki = estacion' },
  { char: 'ãŠ', romaji: 'o', fonetica: 'o como en espaÃ±ol', ejemplo: 'ãŠã‹ã‚ã•ã‚“', ejemplo_sig: 'okaasan = madre' },
];

const HIRAGANA_K = [
  { char: 'ã‹', romaji: 'ka', fonetica: 'ka', ejemplo: 'ã‹ã•', ejemplo_sig: 'kasa = paraguas' },
  { char: 'ã', romaji: 'ki', fonetica: 'ki', ejemplo: 'ãã£ã¦', ejemplo_sig: 'kitte = sello' },
  { char: 'ã', romaji: 'ku', fonetica: 'ku', ejemplo: 'ãã‚‚', ejemplo_sig: 'kumo = nube' },
  { char: 'ã‘', romaji: 'ke', fonetica: 'ke', ejemplo: 'ã‘ã‚€ã‚Š', ejemplo_sig: 'kemuri = humo' },
  { char: 'ã“', romaji: 'ko', fonetica: 'ko', ejemplo: 'ã“ã©ã‚‚', ejemplo_sig: 'kodomo = nino' },
];

const HIRAGANA_S = [
  { char: 'ã•', romaji: 'sa', fonetica: 'sa', ejemplo: 'ã•ã‹ãª', ejemplo_sig: 'sakana = pez' },
  { char: 'ã—', romaji: 'shi', fonetica: 'shi (no si)', ejemplo: 'ã—ã‚', ejemplo_sig: 'shiro = blanco' },
  { char: 'ã™', romaji: 'su', fonetica: 'su', ejemplo: 'ã™ã—', ejemplo_sig: 'sushi' },
  { char: 'ã›', romaji: 'se', fonetica: 'se', ejemplo: 'ã›ã‚“ã›ã„', ejemplo_sig: 'sensei = profesor' },
  { char: 'ã', romaji: 'so', fonetica: 'so', ejemplo: 'ãã‚‰', ejemplo_sig: 'sora = cielo' },
];

const HIRAGANA_T = [
  { char: 'ãŸ', romaji: 'ta', fonetica: 'ta', ejemplo: 'ãŸã¾ã”', ejemplo_sig: 'tamago = huevo' },
  { char: 'ã¡', romaji: 'chi', fonetica: 'chi (no ti)', ejemplo: 'ã¡ãš', ejemplo_sig: 'chizu = mapa' },
  { char: 'ã¤', romaji: 'tsu', fonetica: 'tsu', ejemplo: 'ã¤ã', ejemplo_sig: 'tsuki = luna' },
  { char: 'ã¦', romaji: 'te', fonetica: 'te', ejemplo: 'ã¦ãŒã¿', ejemplo_sig: 'tegami = carta' },
  { char: 'ã¨', romaji: 'to', fonetica: 'to', ejemplo: 'ã¨ã‚Š', ejemplo_sig: 'tori = pajaro' },
];

const HIRAGANA_N = [
  { char: 'ãª', romaji: 'na', fonetica: 'na', ejemplo: 'ãªã¾ãˆ', ejemplo_sig: 'namae = nombre' },
  { char: 'ã«', romaji: 'ni', fonetica: 'ni', ejemplo: 'ã«ã', ejemplo_sig: 'niku = carne' },
  { char: 'ã¬', romaji: 'nu', fonetica: 'nu', ejemplo: 'ã¬ã®', ejemplo_sig: 'nuno = tela' },
  { char: 'ã­', romaji: 'ne', fonetica: 'ne', ejemplo: 'ã­ã“', ejemplo_sig: 'neko = gato' },
  { char: 'ã®', romaji: 'no', fonetica: 'no', ejemplo: 'ã®ã‚Š', ejemplo_sig: 'nori = alga' },
];

const HIRAGANA_H = [
  { char: 'ã¯', romaji: 'ha', fonetica: 'ha', ejemplo: 'ã¯ãª', ejemplo_sig: 'hana = flor' },
  { char: 'ã²', romaji: 'hi', fonetica: 'hi', ejemplo: 'ã²ã¨', ejemplo_sig: 'hito = persona' },
  { char: 'ãµ', romaji: 'fu', fonetica: 'fu (no hu)', ejemplo: 'ãµã˜', ejemplo_sig: 'fuji = Monte Fuji' },
  { char: 'ã¸', romaji: 'he', fonetica: 'he', ejemplo: 'ã¸ã‚„', ejemplo_sig: 'heya = habitacion' },
  { char: 'ã»', romaji: 'ho', fonetica: 'ho', ejemplo: 'ã»ã‚“', ejemplo_sig: 'hon = libro' },
];

const HIRAGANA_M = [
  { char: 'ã¾', romaji: 'ma', fonetica: 'ma', ejemplo: 'ã¾ã¡', ejemplo_sig: 'machi = ciudad' },
  { char: 'ã¿', romaji: 'mi', fonetica: 'mi', ejemplo: 'ã¿ãš', ejemplo_sig: 'mizu = agua' },
  { char: 'ã‚€', romaji: 'mu', fonetica: 'mu', ejemplo: 'ã‚€ã—', ejemplo_sig: 'mushi = insecto' },
  { char: 'ã‚', romaji: 'me', fonetica: 'me', ejemplo: 'ã‚ãŒã­', ejemplo_sig: 'megane = anteojos' },
  { char: 'ã‚‚', romaji: 'mo', fonetica: 'mo', ejemplo: 'ã‚‚ã‚Š', ejemplo_sig: 'mori = bosque' },
];

const HIRAGANA_Y = [
  { char: 'ã‚„', romaji: 'ya', fonetica: 'ya', ejemplo: 'ã‚„ã¾', ejemplo_sig: 'yama = montana' },
  { char: 'ã‚†', romaji: 'yu', fonetica: 'yu', ejemplo: 'ã‚†ã', ejemplo_sig: 'yuki = nieve' },
  { char: 'ã‚ˆ', romaji: 'yo', fonetica: 'yo', ejemplo: 'ã‚ˆã‚‹', ejemplo_sig: 'yoru = noche' },
];

const HIRAGANA_R = [
  { char: 'ã‚‰', romaji: 'ra', fonetica: 'ra suave entre r y l', ejemplo: 'ã‚‰ã˜ãŠ', ejemplo_sig: 'rajio = radio' },
  { char: 'ã‚Š', romaji: 'ri', fonetica: 'ri', ejemplo: 'ã‚Šã‚“ã”', ejemplo_sig: 'ringo = manzana' },
  { char: 'ã‚‹', romaji: 'ru', fonetica: 'ru', ejemplo: 'ã‚‹ã™', ejemplo_sig: 'rusu = ausente' },
  { char: 'ã‚Œ', romaji: 're', fonetica: 're', ejemplo: 'ã‚Œã‚“ã‚ã„', ejemplo_sig: 'renai = amor' },
  { char: 'ã‚', romaji: 'ro', fonetica: 'ro', ejemplo: 'ã‚ã†ã‹', ejemplo_sig: 'rouka = pasillo' },
];

const HIRAGANA_W = [
  { char: 'ã‚', romaji: 'wa', fonetica: 'wa', ejemplo: 'ã‚ãŸã—', ejemplo_sig: 'watashi = yo' },
  { char: 'ã‚’', romaji: 'wo', fonetica: 'o (particula de objeto)', ejemplo: 'ã»ã‚“ã‚’ã‚ˆã‚€', ejemplo_sig: 'hon wo yomu = leer un libro' },
  { char: 'ã‚“', romaji: 'n', fonetica: 'n nasal al final de silaba', ejemplo: 'ã«ã»ã‚“', ejemplo_sig: 'nihon = Japon' },
];

const GRUPOS = [
  { nombre: 'Vocales', chars: HIRAGANA_VOCALES },
  { nombre: 'Serie K', chars: HIRAGANA_K },
  { nombre: 'Serie S', chars: HIRAGANA_S },
  { nombre: 'Serie T', chars: HIRAGANA_T },
  { nombre: 'Serie N', chars: HIRAGANA_N },
  { nombre: 'Serie H', chars: HIRAGANA_H },
  { nombre: 'Serie M', chars: HIRAGANA_M },
  { nombre: 'Serie Y', chars: HIRAGANA_Y },
  { nombre: 'Serie R', chars: HIRAGANA_R },
  { nombre: 'Serie W y N', chars: HIRAGANA_W },
];

const PALABRAS_PRACTICA = [
  { espaÃ±ol: 'agua', chars: ['ã¿', 'ãš'], incorrectos: ['ã‹', 'ã®', 'ã¦', 'ã¯'] },
  { espaÃ±ol: 'gato', chars: ['ã­', 'ã“'], incorrectos: ['ã„', 'ã¬', 'ã•', 'ã‚Š'] },
  { espaÃ±ol: 'sol', chars: ['ãŸ', 'ã„', 'ã‚ˆ', 'ã†'], incorrectos: ['ã‹', 'ã®', 'ã¦', 'ã¯'] },
  { espaÃ±ol: 'libro', chars: ['ã»', 'ã‚“'], incorrectos: ['ã¿', 'ãš', 'ã­', 'ã“'] },
  { espaÃ±ol: 'flores', chars: ['ã¯', 'ãª'], incorrectos: ['ã„', 'ã¬', 'ã•', 'ã‚Š'] },
  { espaÃ±ol: 'luna', chars: ['ã¤', 'ã'], incorrectos: ['ã‹', 'ã®', 'ã¦', 'ã¯'] },
  { espaÃ±ol: 'montaÃ±a', chars: ['ã‚„', 'ã¾'], incorrectos: ['ã¿', 'ãš', 'ã­', 'ã“'] },
  { espaÃ±ol: 'cielo', chars: ['ã', 'ã‚‰'], incorrectos: ['ã„', 'ã¬', 'ã•', 'ã‚Š'] },
];
function EscrituraJapones() {
  const [grupoActivo, setGrupoActivo] = useState(0);
  const [mostrarEjemplo, setMostrarEjemplo] = useState({});
const [modoPractica, setModoPractica] = useState(false);
const [palabraActual, setPalabraActual] = useState(0);
const [seleccionados, setSeleccionados] = useState([]);
const [resultado, setResultado] = useState(null);
const [opciones, setOpciones] = useState([]);

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

function generarOpciones(indice) {
  const palabra = PALABRAS_PRACTICA[indice];
  const todas = [...palabra.chars, ...palabra.incorrectos];
  const mezcladas = todas.sort(() => Math.random() - 0.5).slice(0, 6);
  setOpciones(mezcladas);
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
  function hablar(texto) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = 'ja-JP';
    u.rate = 0.7;
    window.speechSynthesis.speak(u);
  }

  function toggleEjemplo(i) {
    setMostrarEjemplo(prev => ({ ...prev, [i]: !prev[i] }));
  }

  const grupo = GRUPOS[grupoActivo];

if (modoPractica) {
  const palabra = PALABRAS_PRACTICA[palabraActual];
  return (
    <div>
      <button onClick={() => setModoPractica(false)} style={{ marginBottom: '16px', background: '#e8eaf6', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
        Volver al alfabeto
      </button>
      <h4 style={{ color: '#4f46e5' }}>Practica de escritura {palabraActual + 1}/{PALABRAS_PRACTICA.length}</h4>
      <div style={{ background: '#f0f4ff', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 8px 0' }}>Escribi en Hiragana:</p>
        <p style={{ fontSize: '2rem', fontWeight: '600', color: '#333', margin: 0 }}>{palabra.espaÃ±ol}</p>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px', minHeight: '60px', background: '#fff', border: '2px solid', borderColor: resultado === 'correcto' ? '#22c55e' : resultado === 'incorrecto' ? '#ef4444' : '#ddd', borderRadius: '12px', padding: '8px', alignItems: 'center' }}>
        {seleccionados.length === 0 
          ? <span style={{ color: '#999' }}>Selecciona los caracteres...</span>
          : seleccionados.map(function(c, i) {
              return <span key={i} style={{ fontSize: '2rem', color: '#4f46e5' }}>{c}</span>;
            })
        }
      </div>
      {resultado && (
        <div style={{ textAlign: 'center', marginBottom: '16px', padding: '12px', background: resultado === 'correcto' ? '#f0fdf4' : '#fef2f2', borderRadius: '12px' }}>
          <p style={{ color: resultado === 'correcto' ? '#166534' : '#991b1b', fontWeight: '600', margin: 0 }}>
            {resultado === 'correcto' ? 'âœ… Correcto! ' + palabra.chars.join('') + ' = ' + palabra.espaÃ±ol : 'âŒ Incorrecto. La respuesta es: ' + palabra.chars.join('')}
          </p>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
        {opciones.map(function(op, i) {
          var yaSeleccionado = seleccionados.includes(op);
          return (
            <button key={i} onClick={() => seleccionarChar(op)} disabled={yaSeleccionado || resultado}
              style={{ padding: '16px', fontSize: '1.8rem', borderRadius: '8px', border: '2px solid', borderColor: yaSeleccionado ? '#4f46e5' : '#ddd', background: yaSeleccionado ? '#e8eaf6' : 'white', cursor: yaSeleccionado || resultado ? 'default' : 'pointer', opacity: yaSeleccionado ? 0.5 : 1 }}>
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
  return (
    <div>
      <div style={{ background: '#f0f4ff', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
        <p style={{ color: '#333', margin: 0 }}>
          El Hiragana es uno de los tres sistemas de escritura del japones. Tiene 46 caracteres basicos que representan silabas. Es el primer sistema que debes aprender.
        </p>
      </div>

<button onClick={iniciarPractica} style={{ width: '100%', padding: '12px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginBottom: '16px' }}>
  Practicar escritura
</button>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {GRUPOS.map(function(g, i) {
          return (
            <button key={i} onClick={() => setGrupoActivo(i)}
              style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: grupoActivo === i ? '#4f46e5' : '#e8eaf6', color: grupoActivo === i ? 'white' : '#333', cursor: 'pointer', fontWeight: '600' }}>
              {g.nombre}
            </button>
          );
        })}
      </div>

      <h4 style={{ color: '#4f46e5', marginBottom: '12px' }}>{grupo.nombre}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {grupo.chars.map(function(c, i) {
          return (
            <div key={i} style={{ background: 'white', border: '1px solid #ddd', borderRadius: '12px', padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4f46e5', minWidth: '60px', textAlign: 'center' }}>{c.char}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#333' }}>{c.romaji}</div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>Pronunciacion: {c.fonetica}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => hablar(c.char)} style={{ background: '#e8f0fe', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', fontSize: '1rem' }}>ðŸ”Š</button>
                  <button onClick={() => toggleEjemplo(i)} style={{ background: '#fff8e1', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}>
                    {mostrarEjemplo[i] ? 'Ocultar' : 'Ejemplo'}
                  </button>
                </div>
              </div>
              {mostrarEjemplo[i] && (
                <div style={{ marginTop: '8px', padding: '8px', background: '#f0f4ff', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.3rem' }}>{c.ejemplo}</span>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>= {c.ejemplo_sig}</span>
                  <button onClick={() => hablar(c.ejemplo)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>ðŸ”Š</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ background: '#fff8e1', padding: '16px', borderRadius: '12px', marginTop: '16px' }}>
        <p style={{ fontWeight: '600', color: '#333', margin: '0 0 8px 0' }}>Reglas importantes:</p>
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>1. Cada caracter representa una silaba, no una letra individual</p>
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>2. El japones se lee de izquierda a derecha en textos modernos</p>
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>3. No hay espacios entre palabras en japones</p>
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>4. Para formar una frase: sujeto + objeto + verbo (diferente al espaÃ±ol)</p>
      </div>
    </div>
  );
}

export default EscrituraJapones;


