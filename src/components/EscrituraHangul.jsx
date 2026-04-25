import { useState } from "react";

const VOCALES = [
  { char: "가"[0], hangul: "ㅡㅣ"[0], romaji: "a", fonetica: "a como en espanol", ejemplo: "아버지", trad: "padre" },
  { char: "ㅣ", hangul: "ㅣ", romaji: "ya", fonetica: "ya", ejemplo: "Ya구", trad: "estadio" },
  { char: "ㅓ", hangul: "ㅓ", romaji: "eo", fonetica: "o abierta", ejemplo: "어머니", trad: "madre" },
  { char: "ㅕ", hangul: "ㅕ", romaji: "yeo", fonetica: "yeo", ejemplo: "Ye울", trad: "verano" },
  { char: "ㅗ", hangul: "ㅗ", romaji: "o", fonetica: "o cerrada", ejemplo: "오리", trad: "pato" },
  { char: "ㅙ", hangul: "ㅙ", romaji: "yo", fonetica: "yo", ejemplo: "요리", trad: "cocina" },
  { char: "ㅛ", hangul: "ㅛ", romaji: "u", fonetica: "u con labios hacia adelante", ejemplo: "우산", trad: "paraguas" },
  { char: "ㅜ", hangul: "ㅜ", romaji: "yu", fonetica: "yu", ejemplo: "유우", trad: "leche" },
  { char: "ㅡ", hangul: "ㅡ", romaji: "eu", fonetica: "e con labios sin redondear", ejemplo: "음악", trad: "musica" },
  { char: "ㅣ", hangul: "ㅣ", romaji: "i", fonetica: "i como en espanol", ejemplo: "이울", trad: "vecino" },
];

const CONSONANTES = [
  { char: "ㄱ", romaji: "g/k", fonetica: "g suave al inicio, k al final", ejemplo: "가방", trad: "bolso" },
  { char: "ㄴ", romaji: "n", fonetica: "n como en espanol", ejemplo: "나무", trad: "arbol" },
  { char: "ㄷ", romaji: "d/t", fonetica: "d suave al inicio, t al final", ejemplo: "도마뾸", trad: "tomate" },
  { char: "ㄹ", romaji: "r/l", fonetica: "r entre vocales, l al final", ejemplo: "라디오", trad: "radio" },
  { char: "ㅁ", romaji: "m", fonetica: "m como en espanol", ejemplo: "마음", trad: "corazon" },
  { char: "ㅂ", romaji: "b/p", fonetica: "b suave al inicio, p al final", ejemplo: "바나나", trad: "banana" },
  { char: "ㅅ", romaji: "s", fonetica: "s como en espanol", ejemplo: "사람", trad: "persona" },
  { char: "ㅇ", romaji: "ng/muda", fonetica: "muda al inicio, ng al final", ejemplo: "아버지", trad: "padre" },
  { char: "ㅈ", romaji: "j", fonetica: "ch suave", ejemplo: "자동차", trad: "auto" },
  { char: "ㅊ", romaji: "ch", fonetica: "ch aspirada", ejemplo: "차", trad: "te" },
  { char: "ㅋ", romaji: "k", fonetica: "k aspirada", ejemplo: "콵피", trad: "cafe" },
  { char: "ㅌ", romaji: "t", fonetica: "t aspirada", ejemplo: "태국", trad: "Corea" },
  { char: "ㅍ", romaji: "p", fonetica: "p aspirada", ejemplo: "포도", trad: "uva" },
  { char: "ㅎ", romaji: "h", fonetica: "h aspirada", ejemplo: "하늘", trad: "cielo" },
];

const COMBINACIONES = [
  { combo: "Bloque basico", ejemplo: "사람", estructura: "consonante + vocal", trad: "persona", nota: "La consonante va arriba/izquierda, la vocal a la derecha/abajo" },
  { combo: "Con consonante final", ejemplo: "한국", estructura: "consonante + vocal + consonante", trad: "Corea", nota: "La consonante final se llama recibidora y va abajo del bloque" },
  { combo: "Solo vocal", ejemplo: "아이", estructura: "ng muda + vocal", trad: "nino", nota: "Cuando la silaba empieza con vocal se usa ng muda como soporte" },
  { combo: "Vocal vertical", ejemplo: "가나다", estructura: "cons + vocal vertical", trad: "a-na-da (abecedario)", nota: "Las vocales a, ya, eo, yeo, e, ye van a la derecha" },
  { combo: "Vocal horizontal", ejemplo: "오빠", estructura: "cons + vocal horizontal", trad: "papa", nota: "Las vocales o, yo, u, yu, eu van abajo" },
  { combo: "Doble consonante", ejemplo: "따끔하다", estructura: "consonante doble", trad: "caliente", nota: "Algunas consonantes se doblan para sonido tenso" },
];

function EscrituraHangul() {
  const [seccion, setSeccion] = useState("vocales");

  function hablar(texto) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "ko-KR";
    u.rate = 0.6;
    window.speechSynthesis.speak(u);
  }

  return (
    <div>
      <div style={{ background: "#f0f4ff", padding: "14px", borderRadius: "12px", marginBottom: "16px" }}>
        <p style={{ color: "#333", margin: 0, fontSize: "0.95rem" }}>
          El Hangul es el alfabeto coreano creado en 1443. Tiene 21 vocales y 19 consonantes que se combinan en bloques silabicos. Es considerado uno de los alfabetos mas logicos del mundo.
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {["vocales", "consonantes", "combinaciones"].map(function(s) {
          return (
            <button key={s} onClick={() => setSeccion(s)}
              style={{ padding: "10px 16px", borderRadius: "8px", border: "none", background: seccion === s ? "#4f46e5" : "#e8eaf6", color: seccion === s ? "white" : "#333", cursor: "pointer", fontWeight: "600" }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          );
        })}
      </div>

      {seccion === "vocales" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 8px 0" }}>Las vocales del Hangul se escriben a la derecha o abajo de la consonante inicial.</p>
          {VOCALES.map(function(v, i) {
            return (
              <div key={i} style={{ background: "white", border: "1px solid #ddd", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "2rem", fontWeight: "bold", color: "#4f46e5", minWidth: "50px", textAlign: "center" }}>{v.hangul}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "600", color: "#333" }}>{v.romaji} — {v.fonetica}</div>
                  <div style={{ color: "#666", fontSize: "0.85rem" }}>{v.ejemplo} = {v.trad}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <button onClick={() => hablar(v.hangul)} style={{ background: "#e8f0fe", border: "none", borderRadius: "6px", padding: "5px 8px", cursor: "pointer", color: "#1a237e", fontSize: "0.75rem", fontWeight: "600" }}>Vocal</button>
                  <button onClick={() => hablar(v.ejemplo)} style={{ background: "#f0fdf4", border: "none", borderRadius: "6px", padding: "5px 8px", cursor: "pointer", color: "#166534", fontSize: "0.75rem", fontWeight: "600" }}>Ejemplo</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {seccion === "consonantes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 8px 0" }}>Las consonantes tienen diferente sonido segun su posicion en el bloque silabico.</p>
          {CONSONANTES.map(function(c, i) {
            return (
              <div key={i} style={{ background: "white", border: "1px solid #ddd", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "2rem", fontWeight: "bold", color: "#4f46e5", minWidth: "50px", textAlign: "center" }}>{c.char}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "600", color: "#333" }}>{c.romaji} — {c.fonetica}</div>
                  <div style={{ color: "#666", fontSize: "0.85rem" }}>{c.ejemplo} = {c.trad}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <button onClick={() => hablar(c.char)} style={{ background: "#e8f0fe", border: "none", borderRadius: "6px", padding: "5px 8px", cursor: "pointer", color: "#1a237e", fontSize: "0.75rem", fontWeight: "600" }}>Cons</button>
                  <button onClick={() => hablar(c.ejemplo)} style={{ background: "#f0fdf4", border: "none", borderRadius: "6px", padding: "5px 8px", cursor: "pointer", color: "#166534", fontSize: "0.75rem", fontWeight: "600" }}>Ejemplo</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {seccion === "combinaciones" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 8px 0" }}>El Hangul se escribe en bloques silabicos cuadrados. Cada bloque contiene una silaba completa.</p>
          {COMBINACIONES.map(function(c, i) {
            return (
              <div key={i} style={{ background: "white", border: "1px solid #ddd", borderRadius: "10px", padding: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#4f46e5", minWidth: "60px", textAlign: "center" }}>{c.ejemplo}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "600", color: "#333" }}>{c.combo}</div>
                    <div style={{ color: "#4f46e5", fontSize: "0.85rem" }}>{c.estructura}</div>
                  </div>
                  <button onClick={() => hablar(c.ejemplo)} style={{ background: "#e8f0fe", border: "none", borderRadius: "6px", padding: "6px 10px", cursor: "pointer", color: "#1a237e", fontSize: "0.8rem", fontWeight: "600" }}>Escuchar</button>
                </div>
                <div style={{ background: "#f8f9ff", padding: "8px", borderRadius: "6px" }}>
                  <span style={{ color: "#666", fontSize: "0.85rem" }}>{c.nota} — {c.trad}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ background: "#fff8e1", padding: "14px", borderRadius: "12px", marginTop: "16px" }}>
        <p style={{ fontWeight: "600", color: "#333", margin: "0 0 8px 0" }}>Reglas clave del Hangul:</p>
        <p style={{ color: "#666", margin: "4px 0", fontSize: "0.85rem" }}>1. Cada bloque representa una silaba completa</p>
        <p style={{ color: "#666", margin: "4px 0", fontSize: "0.85rem" }}>2. Siempre comienza con consonante (o ng muda si empieza con vocal)</p>
        <p style={{ color: "#666", margin: "4px 0", fontSize: "0.85rem" }}>3. La vocal va a la derecha si es vertical, abajo si es horizontal</p>
        <p style={{ color: "#666", margin: "4px 0", fontSize: "0.85rem" }}>4. Puede terminar con consonante final llamada recibidora</p>
        <p style={{ color: "#666", margin: "4px 0", fontSize: "0.85rem" }}>5. Se lee de izquierda a derecha y de arriba hacia abajo</p>
      </div>
    </div>
  );
}

export default EscrituraHangul;
