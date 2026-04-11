import { useState } from 'react';

const HIRAGANA_VOCALES = [
  { char: 'あ', romaji: 'a', fonetica: 'a como en español', ejemplo: 'あめ', ejemplo_sig: 'ame = lluvia' },
  { char: 'い', romaji: 'i', fonetica: 'i como en español', ejemplo: 'いぬ', ejemplo_sig: 'inu = perro' },
  { char: 'う', romaji: 'u', fonetica: 'u suave, labios sin redondear', ejemplo: 'うみ', ejemplo_sig: 'umi = mar' },
  { char: 'え', romaji: 'e', fonetica: 'e como en español', ejemplo: 'えき', ejemplo_sig: 'eki = estacion' },
  { char: 'お', romaji: 'o', fonetica: 'o como en español', ejemplo: 'おかあさん', ejemplo_sig: 'okaasan = madre' },
];

const HIRAGANA_K = [
  { char: 'か', romaji: 'ka', fonetica: 'ka', ejemplo: 'かさ', ejemplo_sig: 'kasa = paraguas' },
  { char: 'き', romaji: 'ki', fonetica: 'ki', ejemplo: 'きって', ejemplo_sig: 'kitte = sello' },
  { char: 'く', romaji: 'ku', fonetica: 'ku', ejemplo: 'くも', ejemplo_sig: 'kumo = nube' },
  { char: 'け', romaji: 'ke', fonetica: 'ke', ejemplo: 'けむり', ejemplo_sig: 'kemuri = humo' },
  { char: 'こ', romaji: 'ko', fonetica: 'ko', ejemplo: 'こども', ejemplo_sig: 'kodomo = nino' },
];

const HIRAGANA_S = [
  { char: 'さ', romaji: 'sa', fonetica: 'sa', ejemplo: 'さかな', ejemplo_sig: 'sakana = pez' },
  { char: 'し', romaji: 'shi', fonetica: 'shi (no si)', ejemplo: 'しろ', ejemplo_sig: 'shiro = blanco' },
  { char: 'す', romaji: 'su', fonetica: 'su', ejemplo: 'すし', ejemplo_sig: 'sushi' },
  { char: 'せ', romaji: 'se', fonetica: 'se', ejemplo: 'せんせい', ejemplo_sig: 'sensei = profesor' },
  { char: 'そ', romaji: 'so', fonetica: 'so', ejemplo: 'そら', ejemplo_sig: 'sora = cielo' },
];

const HIRAGANA_T = [
  { char: 'た', romaji: 'ta', fonetica: 'ta', ejemplo: 'たまご', ejemplo_sig: 'tamago = huevo' },
  { char: 'ち', romaji: 'chi', fonetica: 'chi (no ti)', ejemplo: 'ちず', ejemplo_sig: 'chizu = mapa' },
  { char: 'つ', romaji: 'tsu', fonetica: 'tsu', ejemplo: 'つき', ejemplo_sig: 'tsuki = luna' },
  { char: 'て', romaji: 'te', fonetica: 'te', ejemplo: 'てがみ', ejemplo_sig: 'tegami = carta' },
  { char: 'と', romaji: 'to', fonetica: 'to', ejemplo: 'とり', ejemplo_sig: 'tori = pajaro' },
];

const HIRAGANA_N = [
  { char: 'な', romaji: 'na', fonetica: 'na', ejemplo: 'なまえ', ejemplo_sig: 'namae = nombre' },
  { char: 'に', romaji: 'ni', fonetica: 'ni', ejemplo: 'にく', ejemplo_sig: 'niku = carne' },
  { char: 'ぬ', romaji: 'nu', fonetica: 'nu', ejemplo: 'ぬの', ejemplo_sig: 'nuno = tela' },
  { char: 'ね', romaji: 'ne', fonetica: 'ne', ejemplo: 'ねこ', ejemplo_sig: 'neko = gato' },
  { char: 'の', romaji: 'no', fonetica: 'no', ejemplo: 'のり', ejemplo_sig: 'nori = alga' },
];

const HIRAGANA_H = [
  { char: 'は', romaji: 'ha', fonetica: 'ha', ejemplo: 'はな', ejemplo_sig: 'hana = flor' },
  { char: 'ひ', romaji: 'hi', fonetica: 'hi', ejemplo: 'ひと', ejemplo_sig: 'hito = persona' },
  { char: 'ふ', romaji: 'fu', fonetica: 'fu (no hu)', ejemplo: 'ふじ', ejemplo_sig: 'fuji = Monte Fuji' },
  { char: 'へ', romaji: 'he', fonetica: 'he', ejemplo: 'へや', ejemplo_sig: 'heya = habitacion' },
  { char: 'ほ', romaji: 'ho', fonetica: 'ho', ejemplo: 'ほん', ejemplo_sig: 'hon = libro' },
];

const HIRAGANA_M = [
  { char: 'ま', romaji: 'ma', fonetica: 'ma', ejemplo: 'まち', ejemplo_sig: 'machi = ciudad' },
  { char: 'み', romaji: 'mi', fonetica: 'mi', ejemplo: 'みず', ejemplo_sig: 'mizu = agua' },
  { char: 'む', romaji: 'mu', fonetica: 'mu', ejemplo: 'むし', ejemplo_sig: 'mushi = insecto' },
  { char: 'め', romaji: 'me', fonetica: 'me', ejemplo: 'めがね', ejemplo_sig: 'megane = anteojos' },
  { char: 'も', romaji: 'mo', fonetica: 'mo', ejemplo: 'もり', ejemplo_sig: 'mori = bosque' },
];

const HIRAGANA_Y = [
  { char: 'や', romaji: 'ya', fonetica: 'ya', ejemplo: 'やま', ejemplo_sig: 'yama = montana' },
  { char: 'ゆ', romaji: 'yu', fonetica: 'yu', ejemplo: 'ゆき', ejemplo_sig: 'yuki = nieve' },
  { char: 'よ', romaji: 'yo', fonetica: 'yo', ejemplo: 'よる', ejemplo_sig: 'yoru = noche' },
];

const HIRAGANA_R = [
  { char: 'ら', romaji: 'ra', fonetica: 'ra suave entre r y l', ejemplo: 'らじお', ejemplo_sig: 'rajio = radio' },
  { char: 'り', romaji: 'ri', fonetica: 'ri', ejemplo: 'りんご', ejemplo_sig: 'ringo = manzana' },
  { char: 'る', romaji: 'ru', fonetica: 'ru', ejemplo: 'るす', ejemplo_sig: 'rusu = ausente' },
  { char: 'れ', romaji: 're', fonetica: 're', ejemplo: 'れんあい', ejemplo_sig: 'renai = amor' },
  { char: 'ろ', romaji: 'ro', fonetica: 'ro', ejemplo: 'ろうか', ejemplo_sig: 'rouka = pasillo' },
];

const HIRAGANA_W = [
  { char: 'わ', romaji: 'wa', fonetica: 'wa', ejemplo: 'わたし', ejemplo_sig: 'watashi = yo' },
  { char: 'を', romaji: 'wo', fonetica: 'o (particula de objeto)', ejemplo: 'ほんをよむ', ejemplo_sig: 'hon wo yomu = leer un libro' },
  { char: 'ん', romaji: 'n', fonetica: 'n nasal al final de silaba', ejemplo: 'にほん', ejemplo_sig: 'nihon = Japon' },
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
  { español: 'agua', chars: ['み', 'ず'], incorrectos: ['か', 'の', 'て', 'は'] },
  { español: 'gato', chars: ['ね', 'こ'], incorrectos: ['い', 'ぬ', 'さ', 'り'] },
  { español: 'sol', chars: ['た', 'い', 'よ', 'う'], incorrectos: ['か', 'の', 'て', 'は'] },
  { español: 'libro', chars: ['ほ', 'ん'], incorrectos: ['み', 'ず', 'ね', 'こ'] },
  { español: 'flores', chars: ['は', 'な'], incorrectos: ['い', 'ぬ', 'さ', 'り'] },
  { español: 'luna', chars: ['つ', 'き'], incorrectos: ['か', 'の', 'て', 'は'] },
  { español: 'montaña', chars: ['や', 'ま'], incorrectos: ['み', 'ず', 'ね', 'こ'] },
  { español: 'cielo', chars: ['そ', 'ら'], incorrectos: ['い', 'ぬ', 'さ', 'り'] },
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
        <p style={{ fontSize: '2rem', fontWeight: '600', color: '#333', margin: 0 }}>{palabra.español}</p>
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
            {resultado === 'correcto' ? '✅ Correcto! ' + palabra.chars.join('') + ' = ' + palabra.español : '❌ Incorrecto. La respuesta es: ' + palabra.chars.join('')}
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
                  <button onClick={() => hablar(c.char)} style={{ background: '#e8f0fe', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', fontSize: '1rem' }}>🔊</button>
                  <button onClick={() => toggleEjemplo(i)} style={{ background: '#fff8e1', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}>
                    {mostrarEjemplo[i] ? 'Ocultar' : 'Ejemplo'}
                  </button>
                </div>
              </div>
              {mostrarEjemplo[i] && (
                <div style={{ marginTop: '8px', padding: '8px', background: '#f0f4ff', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.3rem' }}>{c.ejemplo}</span>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>= {c.ejemplo_sig}</span>
                  <button onClick={() => hablar(c.ejemplo)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>🔊</button>
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
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>4. Para formar una frase: sujeto + objeto + verbo (diferente al español)</p>
      </div>
    </div>
  );
}

export default EscrituraJapones;