import { useState } from 'react';

const KATAKANA_VOCALES = [
  { char: 'ア', romaji: 'a', fonetica: 'a como en español', hiragana: 'あ', ejemplo: 'アイス', ejemplo_sig: 'aisu = helado' },
  { char: 'イ', romaji: 'i', fonetica: 'i como en español', hiragana: 'い', ejemplo: 'イタリア', ejemplo_sig: 'itaria = Italia' },
  { char: 'ウ', romaji: 'u', fonetica: 'u suave', hiragana: 'う', ejemplo: 'ウイルス', ejemplo_sig: 'uirusu = virus' },
  { char: 'エ', romaji: 'e', fonetica: 'e como en español', hiragana: 'え', ejemplo: 'エアコン', ejemplo_sig: 'eakon = aire acondicionado' },
  { char: 'オ', romaji: 'o', fonetica: 'o como en español', hiragana: 'お', ejemplo: 'オレンジ', ejemplo_sig: 'orenji = naranja' },
];

const KATAKANA_K = [
  { char: 'カ', romaji: 'ka', fonetica: 'ka', hiragana: 'か', ejemplo: 'カメラ', ejemplo_sig: 'kamera = camara' },
  { char: 'キ', romaji: 'ki', fonetica: 'ki', hiragana: 'き', ejemplo: 'キロ', ejemplo_sig: 'kiro = kilo' },
  { char: 'ク', romaji: 'ku', fonetica: 'ku', hiragana: 'く', ejemplo: 'クラス', ejemplo_sig: 'kurasu = clase' },
  { char: 'ケ', romaji: 'ke', fonetica: 'ke', hiragana: 'け', ejemplo: 'ケーキ', ejemplo_sig: 'keeki = torta' },
  { char: 'コ', romaji: 'ko', fonetica: 'ko', hiragana: 'こ', ejemplo: 'コーヒー', ejemplo_sig: 'koohii = cafe' },
];

const KATAKANA_S = [
  { char: 'サ', romaji: 'sa', fonetica: 'sa', hiragana: 'さ', ejemplo: 'サッカー', ejemplo_sig: 'sakkaa = futbol' },
  { char: 'シ', romaji: 'shi', fonetica: 'shi', hiragana: 'し', ejemplo: 'シャツ', ejemplo_sig: 'shatsu = remera' },
  { char: 'ス', romaji: 'su', fonetica: 'su', hiragana: 'す', ejemplo: 'スポーツ', ejemplo_sig: 'supootsu = deporte' },
  { char: 'セ', romaji: 'se', fonetica: 'se', hiragana: 'せ', ejemplo: 'セーター', ejemplo_sig: 'seetaa = sueter' },
  { char: 'ソ', romaji: 'so', fonetica: 'so', hiragana: 'そ', ejemplo: 'ソファ', ejemplo_sig: 'sofa = sofa' },
];

const KATAKANA_T = [
  { char: 'タ', romaji: 'ta', fonetica: 'ta', hiragana: 'た', ejemplo: 'タクシー', ejemplo_sig: 'takushii = taxi' },
  { char: 'チ', romaji: 'chi', fonetica: 'chi', hiragana: 'ち', ejemplo: 'チーズ', ejemplo_sig: 'chiizu = queso' },
  { char: 'ツ', romaji: 'tsu', fonetica: 'tsu', hiragana: 'つ', ejemplo: 'ツアー', ejemplo_sig: 'tsuaa = tour' },
  { char: 'テ', romaji: 'te', fonetica: 'te', hiragana: 'て', ejemplo: 'テレビ', ejemplo_sig: 'terebi = television' },
  { char: 'ト', romaji: 'to', fonetica: 'to', hiragana: 'と', ejemplo: 'トマト', ejemplo_sig: 'tomato = tomate' },
];

const KATAKANA_N = [
  { char: 'ナ', romaji: 'na', fonetica: 'na', hiragana: 'な', ejemplo: 'ナイフ', ejemplo_sig: 'naifu = cuchillo' },
  { char: 'ニ', romaji: 'ni', fonetica: 'ni', hiragana: 'に', ejemplo: 'ニュース', ejemplo_sig: 'nyuusu = noticias' },
  { char: 'ヌ', romaji: 'nu', fonetica: 'nu', hiragana: 'ぬ', ejemplo: 'ヌードル', ejemplo_sig: 'nuudoru = fideos' },
  { char: 'ネ', romaji: 'ne', fonetica: 'ne', hiragana: 'ね', ejemplo: 'ネクタイ', ejemplo_sig: 'nekutai = corbata' },
  { char: 'ノ', romaji: 'no', fonetica: 'no', hiragana: 'の', ejemplo: 'ノート', ejemplo_sig: 'nooto = cuaderno' },
];

const KATAKANA_H = [
  { char: 'ハ', romaji: 'ha', fonetica: 'ha', hiragana: 'は', ejemplo: 'ハンバーガー', ejemplo_sig: 'hanbaagaa = hamburguesa' },
  { char: 'ヒ', romaji: 'hi', fonetica: 'hi', hiragana: 'ひ', ejemplo: 'ヒーター', ejemplo_sig: 'hiitaa = calefactor' },
  { char: 'フ', romaji: 'fu', fonetica: 'fu', hiragana: 'ふ', ejemplo: 'フランス', ejemplo_sig: 'furansu = Francia' },
  { char: 'ヘ', romaji: 'he', fonetica: 'he', hiragana: 'へ', ejemplo: 'ヘルメット', ejemplo_sig: 'herumetto = casco' },
  { char: 'ホ', romaji: 'ho', fonetica: 'ho', hiragana: 'ほ', ejemplo: 'ホテル', ejemplo_sig: 'hoteru = hotel' },
];

const KATAKANA_M = [
  { char: 'マ', romaji: 'ma', fonetica: 'ma', hiragana: 'ま', ejemplo: 'マップ', ejemplo_sig: 'mappu = mapa' },
  { char: 'ミ', romaji: 'mi', fonetica: 'mi', hiragana: 'み', ejemplo: 'ミルク', ejemplo_sig: 'miruku = leche' },
  { char: 'ム', romaji: 'mu', fonetica: 'mu', hiragana: 'む', ejemplo: 'ムービー', ejemplo_sig: 'muubii = pelicula' },
  { char: 'メ', romaji: 'me', fonetica: 'me', hiragana: 'め', ejemplo: 'メール', ejemplo_sig: 'meeru = email' },
  { char: 'モ', romaji: 'mo', fonetica: 'mo', hiragana: 'も', ejemplo: 'モデル', ejemplo_sig: 'moderu = modelo' },
];

const KATAKANA_Y = [
  { char: 'ヤ', romaji: 'ya', fonetica: 'ya', hiragana: 'や', ejemplo: 'ヤード', ejemplo_sig: 'yaado = yarda' },
  { char: 'ユ', romaji: 'yu', fonetica: 'yu', hiragana: 'ゆ', ejemplo: 'ユーモア', ejemplo_sig: 'yuumoa = humor' },
  { char: 'ヨ', romaji: 'yo', fonetica: 'yo', hiragana: 'よ', ejemplo: 'ヨーグルト', ejemplo_sig: 'yooguruto = yogur' },
];

const KATAKANA_R = [
  { char: 'ラ', romaji: 'ra', fonetica: 'ra suave', hiragana: 'ら', ejemplo: 'ラジオ', ejemplo_sig: 'rajio = radio' },
  { char: 'リ', romaji: 'ri', fonetica: 'ri', hiragana: 'り', ejemplo: 'リモコン', ejemplo_sig: 'rimokon = control remoto' },
  { char: 'ル', romaji: 'ru', fonetica: 'ru', hiragana: 'る', ejemplo: 'ルール', ejemplo_sig: 'ruuru = regla' },
  { char: 'レ', romaji: 're', fonetica: 're', hiragana: 'れ', ejemplo: 'レストラン', ejemplo_sig: 'resutoran = restaurante' },
  { char: 'ロ', romaji: 'ro', fonetica: 'ro', hiragana: 'ろ', ejemplo: 'ロボット', ejemplo_sig: 'robotto = robot' },
];

const KATAKANA_W = [
  { char: 'ワ', romaji: 'wa', fonetica: 'wa', hiragana: 'わ', ejemplo: 'ワイン', ejemplo_sig: 'wain = vino' },
  { char: 'ヲ', romaji: 'wo', fonetica: 'o', hiragana: 'を', ejemplo: 'usado como particula', ejemplo_sig: 'particula de objeto directo' },
  { char: 'ン', romaji: 'n', fonetica: 'n nasal', hiragana: 'ん', ejemplo: 'パン', ejemplo_sig: 'pan = pan' },
];

const GRUPOS = [
  { nombre: 'Vocales', chars: KATAKANA_VOCALES },
  { nombre: 'Serie K', chars: KATAKANA_K },
  { nombre: 'Serie S', chars: KATAKANA_S },
  { nombre: 'Serie T', chars: KATAKANA_T },
  { nombre: 'Serie N', chars: KATAKANA_N },
  { nombre: 'Serie H', chars: KATAKANA_H },
  { nombre: 'Serie M', chars: KATAKANA_M },
  { nombre: 'Serie Y', chars: KATAKANA_Y },
  { nombre: 'Serie R', chars: KATAKANA_R },
  { nombre: 'Serie W y N', chars: KATAKANA_W },
];

function EscrituraKatakana() {
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
          El Katakana se usa principalmente para palabras extranjeras y prestamos del ingles. Tiene los mismos sonidos que el Hiragana pero con formas diferentes. Es esencial para leer marcas y palabras modernas en japones.
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
                <div style={{ textAlign: 'center', minWidth: '60px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4f46e5', display: 'block' }}>{c.char}</span>
                  <span style={{ fontSize: '0.8rem', color: '#999' }}>Hiragana: {c.hiragana}</span>
                </div>
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
        <p style={{ fontWeight: '600', color: '#333', margin: '0 0 8px 0' }}>Diferencias con el Hiragana:</p>
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>1. El Katakana tiene formas mas angulares y rectas</p>
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>2. Se usa para palabras extranjeras: televisión = テレビ</p>
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>3. Se usa para nombres de paises y ciudades extranjeras</p>
        <p style={{ color: '#666', margin: '4px 0', fontSize: '0.9rem' }}>4. Los sonidos son identicos al Hiragana</p>
      </div>
    </div>
  );
}

export default EscrituraKatakana;