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

const GRUPOS = [
  { nombre: 'Vocales', chars: HIRAGANA_VOCALES },
  { nombre: 'Serie K', chars: HIRAGANA_K },
  { nombre: 'Serie S', chars: HIRAGANA_S },
  { nombre: 'Serie T', chars: HIRAGANA_T },
  { nombre: 'Serie N', chars: HIRAGANA_N },
];

function EscrituraJapones() {
  const [grupoActivo, setGrupoActivo] = useState(0);
  const [mostrarEjemplo, setMostrarEjemplo] = useState({});

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

  return (
    <div>
      <div style={{ background: '#f0f4ff', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
        <p style={{ color: '#333', margin: 0 }}>
          El Hiragana es uno de los tres sistemas de escritura del japones. Tiene 46 caracteres basicos que representan silabas. Es el primer sistema que debes aprender.
        </p>
      </div>

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