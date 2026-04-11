# -*- coding: utf-8 -*-
content = '''import { useState } from 'react';

const PALABRAS_PRACTICA = [
  { espanol: 'agua', chars: ['\u307f', '\u305a'], incorrectos: ['\u304b', '\u306e', '\u3066', '\u306f'] },
  { espanol: 'gato', chars: ['\u306d', '\u3053'], incorrectos: ['\u3044', '\u306c', '\u3055', '\u308a'] },
  { espanol: 'sol', chars: ['\u305f', '\u3044', '\u3088', '\u3046'], incorrectos: ['\u304b', '\u306e', '\u3066', '\u306f'] },
  { espanol: 'libro', chars: ['\u307b', '\u3093'], incorrectos: ['\u307f', '\u305a', '\u306d', '\u3053'] },
  { espanol: 'flores', chars: ['\u306f', '\u306a'], incorrectos: ['\u3044', '\u306c', '\u3055', '\u308a'] },
  { espanol: 'luna', chars: ['\u3064', '\u304d'], incorrectos: ['\u304b', '\u306e', '\u3066', '\u306f'] },
  { espanol: 'montana', chars: ['\u3084', '\u307e'], incorrectos: ['\u307f', '\u305a', '\u306d', '\u3053'] },
  { espanol: 'cielo', chars: ['\u305d', '\u3089'], incorrectos: ['\u3044', '\u306c', '\u3055', '\u308a'] },
];

const HIRAGANA_VOCALES = [
  { char: '\u3042', romaji: 'a', fonetica: 'a como en espanol', ejemplo: '\u3042\u3081', ejemplo_sig: 'ame = lluvia' },
  { char: '\u3044', romaji: 'i', fonetica: 'i como en espanol', ejemplo: '\u3044\u306c', ejemplo_sig: 'inu = perro' },
  { char: '\u3046', romaji: 'u', fonetica: 'u suave', ejemplo: '\u3046\u307f', ejemplo_sig: 'umi = mar' },
  { char: '\u3048', romaji: 'e', fonetica: 'e como en espanol', ejemplo: '\u3048\u304d', ejemplo_sig: 'eki = estacion' },
  { char: '\u304a', romaji: 'o', fonetica: 'o como en espanol', ejemplo: '\u304a\u304b\u3042\u3055\u3093', ejemplo_sig: 'okaasan = madre' },
];

const HIRAGANA_K = [
  { char: '\u304b', romaji: 'ka', fonetica: 'ka', ejemplo: '\u304b\u3055', ejemplo_sig: 'kasa = paraguas' },
  { char: '\u304d', romaji: 'ki', fonetica: 'ki', ejemplo: '\u304d\u3063\u3066', ejemplo_sig: 'kitte = sello' },
  { char: '\u304f', romaji: 'ku', fonetica: 'ku', ejemplo: '\u304f\u3082', ejemplo_sig: 'kumo = nube' },
  { char: '\u3051', romaji: 'ke', fonetica: 'ke', ejemplo: '\u3051\u3080\u308a', ejemplo_sig: 'kemuri = humo' },
  { char: '\u3053', romaji: 'ko', fonetica: 'ko', ejemplo: '\u3053\u3069\u3082', ejemplo_sig: 'kodomo = nino' },
];

const HIRAGANA_S = [
  { char: '\u3055', romaji: 'sa', fonetica: 'sa', ejemplo: '\u3055\u304b\u306a', ejemplo_sig: 'sakana = pez' },
  { char: '\u3057', romaji: 'shi', fonetica: 'shi no si', ejemplo: '\u3057\u308d', ejemplo_sig: 'shiro = blanco' },
  { char: '\u3059', romaji: 'su', fonetica: 'su', ejemplo: '\u3059\u3057', ejemplo_sig: 'sushi' },
  { char: '\u305b', romaji: 'se', fonetica: 'se', ejemplo: '\u305b\u3093\u305b\u3044', ejemplo_sig: 'sensei = profesor' },
  { char: '\u305d', romaji: 'so', fonetica: 'so', ejemplo: '\u305d\u3089', ejemplo_sig: 'sora = cielo' },
];

const HIRAGANA_T = [
  { char: '\u305f', romaji: 'ta', fonetica: 'ta', ejemplo: '\u305f\u307e\u3054', ejemplo_sig: 'tamago = huevo' },
  { char: '\u3061', romaji: 'chi', fonetica: 'chi no ti', ejemplo: '\u3061\u305a', ejemplo_sig: 'chizu = mapa' },
  { char: '\u3064', romaji: 'tsu', fonetica: 'tsu', ejemplo: '\u3064\u304d', ejemplo_sig: 'tsuki = luna' },
  { char: '\u3066', romaji: 'te', fonetica: 'te', ejemplo: '\u3066\u304c\u307f', ejemplo_sig: 'tegami = carta' },
  { char: '\u3068', romaji: 'to', fonetica: 'to', ejemplo: '\u3068\u308a', ejemplo_sig: 'tori = pajaro' },
];

const HIRAGANA_N = [
  { char: '\u306a', romaji: 'na', fonetica: 'na', ejemplo: '\u306a\u307e\u3048', ejemplo_sig: 'namae = nombre' },
  { char: '\u306b', romaji: 'ni', fonetica: 'ni', ejemplo: '\u306b\u304f', ejemplo_sig: 'niku = carne' },
  { char: '\u306c', romaji: 'nu', fonetica: 'nu', ejemplo: '\u306c\u306e', ejemplo_sig: 'nuno = tela' },
  { char: '\u306d', romaji: 'ne', fonetica: 'ne', ejemplo: '\u306d\u3053', ejemplo_sig: 'neko = gato' },
  { char: '\u306e', romaji: 'no', fonetica: 'no', ejemplo: '\u306e\u308a', ejemplo_sig: 'nori = alga' },
];

const HIRAGANA_H = [
  { char: '\u306f', romaji: 'ha', fonetica: 'ha', ejemplo: '\u306f\u306a', ejemplo_sig: 'hana = flor' },
  { char: '\u3072', romaji: 'hi', fonetica: 'hi', ejemplo: '\u3072\u3068', ejemplo_sig: 'hito = persona' },
  { char: '\u3075', romaji: 'fu', fonetica: 'fu no hu', ejemplo: '\u3075\u3058', ejemplo_sig: 'fuji = Monte Fuji' },
  { char: '\u3078', romaji: 'he', fonetica: 'he', ejemplo: '\u3078\u3084', ejemplo_sig: 'heya = habitacion' },
  { char: '\u307b', romaji: 'ho', fonetica: 'ho', ejemplo: '\u307b\u3093', ejemplo_sig: 'hon = libro' },
];

const HIRAGANA_M = [
  { char: '\u307e', romaji: 'ma', fonetica: 'ma', ejemplo: '\u307e\u3061', ejemplo_sig: 'machi = ciudad' },
  { char: '\u307f', romaji: 'mi', fonetica: 'mi', ejemplo: '\u307f\u305a', ejemplo_sig: 'mizu = agua' },
  { char: '\u3080', romaji: 'mu', fonetica: 'mu', ejemplo: '\u3080\u3057', ejemplo_sig: 'mushi = insecto' },
  { char: '\u3081', romaji: 'me', fonetica: 'me', ejemplo: '\u3081\u304c\u306d', ejemplo_sig: 'megane = anteojos' },
  { char: '\u3082', romaji: 'mo', fonetica: 'mo', ejemplo: '\u3082\u308a', ejemplo_sig: 'mori = bosque' },
];

const HIRAGANA_Y = [
  { char: '\u3084', romaji: 'ya', fonetica: 'ya', ejemplo: '\u3084\u307e', ejemplo_sig: 'yama = montana' },
  { char: '\u3086', romaji: 'yu', fonetica: 'yu', ejemplo: '\u3086\u304d', ejemplo_sig: 'yuki = nieve' },
  { char: '\u3088', romaji: 'yo', fonetica: 'yo', ejemplo: '\u3088\u308b', ejemplo_sig: 'yoru = noche' },
];

const HIRAGANA_R = [
  { char: '\u3089', romaji: 'ra', fonetica: 'ra suave entre r y l', ejemplo: '\u3089\u3058\u304a', ejemplo_sig: 'rajio = radio' },
  { char: '\u308a', romaji: 'ri', fonetica: 'ri', ejemplo: '\u308a\u3093\u3054', ejemplo_sig: 'ringo = manzana' },
  { char: '\u308b', romaji: 'ru', fonetica: 'ru', ejemplo: '\u308b\u3059', ejemplo_sig: 'rusu = ausente' },
  { char: '\u308c', romaji: 're', fonetica: 're', ejemplo: '\u308c\u3093\u3042\u3044', ejemplo_sig: 'renai = amor' },
  { char: '\u308d', romaji: 'ro', fonetica: 'ro', ejemplo: '\u308d\u3046\u304b', ejemplo_sig: 'rouka = pasillo' },
];

const HIRAGANA_W = [
  { char: '\u308f', romaji: 'wa', fonetica: 'wa', ejemplo: '\u308f\u305f\u3057', ejemplo_sig: 'watashi = yo' },
  { char: '\u3092', romaji: 'wo', fonetica: 'o particula de objeto', ejemplo: '\u307b\u3093\u3092\u3088\u3080', ejemplo_sig: 'hon wo yomu = leer un libro' },
  { char: '\u3093', romaji: 'n', fonetica: 'n nasal al final de silaba', ejemplo: '\u306b\u307b\u3093', ejemplo_sig: 'nihon = Japon' },
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
              {resultado === 'correcto' ? 'Correcto! ' + palabra.chars.join('') + ' = ' + palabra.espanol : 'Incorrecto. La respuesta es: ' + palabra.chars.join('')}
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
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>1. Cada caracter representa una silaba no una letra individual</p>
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>2. El japones se lee de izquierda a derecha en textos modernos</p>
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>3. No hay espacios entre palabras en japones</p>
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>4. Para formar una frase: sujeto + objeto + verbo diferente al espanol</p>
      </div>
    </div>
  );
}

export default EscrituraJapones;
'''

with open('src/components/EscrituraJapones.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Archivo creado correctamente')