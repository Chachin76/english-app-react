# -*- coding: utf-8 -*-
content = '''import { useState } from "react";

const VOCALES = [
  { char: "\uAC00"[0], hangul: "\u3161\u3163"[0], romaji: "a", fonetica: "a como en espanol", ejemplo: "\uC544\uBC84\uC9C0", trad: "padre" },
  { char: "\u3163", hangul: "\u3163", romaji: "ya", fonetica: "ya", ejemplo: "\u0059\u0061\uAD6C", trad: "estadio" },
  { char: "\u3153", hangul: "\u3153", romaji: "eo", fonetica: "o abierta", ejemplo: "\uC5B4\uBA38\uB2C8", trad: "madre" },
  { char: "\u3155", hangul: "\u3155", romaji: "yeo", fonetica: "yeo", ejemplo: "\u0059\u0065\uC6B8", trad: "verano" },
  { char: "\u3157", hangul: "\u3157", romaji: "o", fonetica: "o cerrada", ejemplo: "\uC624\uB9AC", trad: "pato" },
  { char: "\u3159", hangul: "\u3159", romaji: "yo", fonetica: "yo", ejemplo: "\uC694\uB9AC", trad: "cocina" },
  { char: "\u315B", hangul: "\u315B", romaji: "u", fonetica: "u con labios hacia adelante", ejemplo: "\uC6B0\uC0B0", trad: "paraguas" },
  { char: "\u315C", hangul: "\u315C", romaji: "yu", fonetica: "yu", ejemplo: "\uC720\uC6B0", trad: "leche" },
  { char: "\u3161", hangul: "\u3161", romaji: "eu", fonetica: "e con labios sin redondear", ejemplo: "\uC74C\uC545", trad: "musica" },
  { char: "\u3163", hangul: "\u3163", romaji: "i", fonetica: "i como en espanol", ejemplo: "\uC774\uC6B8", trad: "vecino" },
];

const CONSONANTES = [
  { char: "\u3131", romaji: "g/k", fonetica: "g suave al inicio, k al final", ejemplo: "\uAC00\uBC29", trad: "bolso" },
  { char: "\u3134", romaji: "n", fonetica: "n como en espanol", ejemplo: "\uB098\uBB34", trad: "arbol" },
  { char: "\u3137", romaji: "d/t", fonetica: "d suave al inicio, t al final", ejemplo: "\uB3C4\uB9C8\uBFB8", trad: "tomate" },
  { char: "\u3139", romaji: "r/l", fonetica: "r entre vocales, l al final", ejemplo: "\uB77C\uB514\uC624", trad: "radio" },
  { char: "\u3141", romaji: "m", fonetica: "m como en espanol", ejemplo: "\uB9C8\uC74C", trad: "corazon" },
  { char: "\u3142", romaji: "b/p", fonetica: "b suave al inicio, p al final", ejemplo: "\uBC14\uB098\uB098", trad: "banana" },
  { char: "\u3145", romaji: "s", fonetica: "s como en espanol", ejemplo: "\uC0AC\uB78C", trad: "persona" },
  { char: "\u3147", romaji: "ng/muda", fonetica: "muda al inicio, ng al final", ejemplo: "\uC544\uBC84\uC9C0", trad: "padre" },
  { char: "\u3148", romaji: "j", fonetica: "ch suave", ejemplo: "\uC790\uB3D9\uCC28", trad: "auto" },
  { char: "\u314A", romaji: "ch", fonetica: "ch aspirada", ejemplo: "\uCC28", trad: "te" },
  { char: "\u314B", romaji: "k", fonetica: "k aspirada", ejemplo: "\uCF75\uD53C", trad: "cafe" },
  { char: "\u314C", romaji: "t", fonetica: "t aspirada", ejemplo: "\uD0DC\uAD6D", trad: "Corea" },
  { char: "\u314D", romaji: "p", fonetica: "p aspirada", ejemplo: "\uD3EC\uB3C4", trad: "uva" },
  { char: "\u314E", romaji: "h", fonetica: "h aspirada", ejemplo: "\uD558\uB298", trad: "cielo" },
];

const COMBINACIONES = [
  { combo: "Bloque basico", ejemplo: "\uC0AC\uB78C", estructura: "consonante + vocal", trad: "persona", nota: "La consonante va arriba/izquierda, la vocal a la derecha/abajo" },
  { combo: "Con consonante final", ejemplo: "\uD55C\uAD6D", estructura: "consonante + vocal + consonante", trad: "Corea", nota: "La consonante final se llama recibidora y va abajo del bloque" },
  { combo: "Solo vocal", ejemplo: "\uC544\uC774", estructura: "ng muda + vocal", trad: "nino", nota: "Cuando la silaba empieza con vocal se usa ng muda como soporte" },
  { combo: "Vocal vertical", ejemplo: "\uAC00\uB098\uB2E4", estructura: "cons + vocal vertical", trad: "a-na-da (abecedario)", nota: "Las vocales a, ya, eo, yeo, e, ye van a la derecha" },
  { combo: "Vocal horizontal", ejemplo: "\uC624\uBE60", estructura: "cons + vocal horizontal", trad: "papa", nota: "Las vocales o, yo, u, yu, eu van abajo" },
  { combo: "Doble consonante", ejemplo: "\uB530\uB054\uD558\uB2E4", estructura: "consonante doble", trad: "caliente", nota: "Algunas consonantes se doblan para sonido tenso" },
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
'''

with open('src/components/EscrituraHangul.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Archivo creado correctamente')