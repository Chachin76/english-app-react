import { useState } from "react";

const VOCALES_INGLES = [
  { sonido: "A corta", simbolo: "/ae/", ejemplo: "cat, hat, man", fonetica: "a muy abierta, boca bien abierta", palabras: ["cat", "hat", "man", "bad", "map"] },
  { sonido: "A larga", simbolo: "/ei/", ejemplo: "cake, name, day", fonetica: "como 'ei' en espanol", palabras: ["cake", "name", "day", "make", "late"] },
  { sonido: "E corta", simbolo: "/e/", ejemplo: "bed, red, ten", fonetica: "e abierta como en espanol", palabras: ["bed", "red", "ten", "get", "help"] },
  { sonido: "E larga", simbolo: "/i:/", ejemplo: "see, me, tree", fonetica: "i larga y cerrada", palabras: ["see", "me", "tree", "feel", "need"] },
  { sonido: "I corta", simbolo: "/I/", ejemplo: "sit, big, him", fonetica: "entre i y e, relajada", palabras: ["sit", "big", "him", "milk", "fish"] },
  { sonido: "I larga", simbolo: "/ai/", ejemplo: "time, my, night", fonetica: "como 'ai' en espanol", palabras: ["time", "my", "night", "like", "five"] },
  { sonido: "O corta", simbolo: "/D/", ejemplo: "hot, top, stop", fonetica: "o muy abierta", palabras: ["hot", "top", "stop", "box", "dog"] },
  { sonido: "O larga", simbolo: "/ou/", ejemplo: "go, home, note", fonetica: "como 'ou' en espanol", palabras: ["go", "home", "note", "cold", "open"] },
  { sonido: "U corta", simbolo: "/^/", ejemplo: "cup, bus, fun", fonetica: "vocal central relajada, sin equivalente exacto en espanol", palabras: ["cup", "bus", "fun", "run", "must"] },
  { sonido: "U larga", simbolo: "/u:/", ejemplo: "food, blue, moon", fonetica: "u larga y cerrada", palabras: ["food", "blue", "moon", "cool", "true"] },
  { sonido: "Schwa", simbolo: "/e/", ejemplo: "about, the, teacher", fonetica: "vocal reducida, muy comun en silabas sin acento, sin equivalente en espanol", palabras: ["about", "teacher", "the", "again", "family"] },
];

const CONSONANTES_ESPECIALES = [
  { sonido: "TH sonora", simbolo: "/d/", ejemplo: "this, that, the", fonetica: "lengua entre dientes vibrando, como d muy suave", palabras: ["this", "that", "the", "they", "there"] },
  { sonido: "TH sorda", simbolo: "/T/", ejemplo: "think, three, tooth", fonetica: "lengua entre dientes sin vibrar, como z espanola", palabras: ["think", "three", "tooth", "through", "math"] },
  { sonido: "W", simbolo: "/w/", ejemplo: "water, win, word", fonetica: "labios redondeados como para decir u, luego la vocal", palabras: ["water", "win", "word", "way", "week"] },
  { sonido: "V", simbolo: "/v/", ejemplo: "very, love, voice", fonetica: "dientes superiores en labio inferior vibrando, diferente a b", palabras: ["very", "love", "voice", "live", "visit"] },
  { sonido: "SH", simbolo: "/S/", ejemplo: "she, show, fish", fonetica: "como sh en espanol pero mas suave", palabras: ["she", "show", "fish", "share", "push"] },
  { sonido: "CH", simbolo: "/tS/", ejemplo: "chair, watch, cheese", fonetica: "como ch en espanol", palabras: ["chair", "watch", "cheese", "church", "teach"] },
  { sonido: "ZH", simbolo: "/Z/", ejemplo: "measure, vision, usual", fonetica: "como y rioplatense, muy suave", palabras: ["measure", "vision", "usual", "treasure", "pleasure"] },
  { sonido: "NG", simbolo: "/N/", ejemplo: "sing, ring, running", fonetica: "n que resuena en la nariz, al final de silabas", palabras: ["sing", "ring", "running", "song", "long"] },
  { sonido: "R americano", simbolo: "/r/", ejemplo: "red, car, bird", fonetica: "lengua hacia atras sin tocar el paladar, muy diferente a la r espanola", palabras: ["red", "car", "bird", "work", "world"] },
  { sonido: "H", simbolo: "/h/", ejemplo: "hot, hair, help", fonetica: "aspiracion suave, como j muy suave espanola", palabras: ["hot", "hair", "help", "here", "home"] },
];

const ACENTOS = [
  {
    nombre: "Americano general",
    region: "Estados Unidos central",
    caracteristicas: [
      "R pronunciada siempre, incluso al final de palabras",
      "La A en words como ask, bath, dance suena muy abierta",
      "La O en hot, top suena como a",
      "El acento cae en la primera silaba en sustantivos",
    ],
    ejemplos: [{ palabra: "car", pron: "kaar" }, { palabra: "water", pron: "waader" }, { palabra: "better", pron: "bedder" }]
  },
  {
    nombre: "Britanico RP",
    region: "Inglaterra, BBC",
    caracteristicas: [
      "R no se pronuncia al final de palabras o antes de consonante",
      "La A en ask, bath, dance suena larga como aa",
      "La O en hot es bien redonda",
      "Vocabulario diferente: lift vs elevator, flat vs apartment",
    ],
    ejemplos: [{ palabra: "car", pron: "kaa" }, { palabra: "water", pron: "wota" }, { palabra: "better", pron: "beta" }]
  },
  {
    nombre: "Australiano",
    region: "Australia",
    caracteristicas: [
      "Similar al britanico pero con vocales muy distintas",
      "La I suena como ai en muchos casos",
      "Muy musical y con entonacion ascendente al final",
      "Day suena como die, mate suena como moit",
    ],
    ejemplos: [{ palabra: "day", pron: "dai" }, { palabra: "face", pron: "fais" }, { palabra: "mate", pron: "mait" }]
  },
];

function FoneticaIngles() {
  const [seccion, setSeccion] = useState("vocales");
  const [acento, setAccento] = useState(0);

  function hablar(texto) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = acento === 1 ? "en-GB" : acento === 2 ? "en-AU" : "en-US";
    u.rate = 0.7;
    window.speechSynthesis.speak(u);
  }

  return (
    <div>
      <div style={{ background: "#f0f4ff", padding: "14px", borderRadius: "12px", marginBottom: "16px" }}>
        <p style={{ color: "#333", margin: 0, fontSize: "0.95rem" }}>
          El ingles tiene 44 sonidos pero solo 26 letras. Esto significa que la misma letra puede sonar diferente segun la palabra. Aprender los sonidos fonemicos es clave para pronunciar bien.
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {["vocales", "consonantes", "acentos"].map(function(s) {
          var labels = { vocales: "Vocales (11 sonidos)", consonantes: "Consonantes especiales", acentos: "Acentos regionales" };
          return (
            <button key={s} onClick={() => setSeccion(s)}
              style={{ padding: "10px 14px", borderRadius: "8px", border: "none", background: seccion === s ? "#4f46e5" : "#e8eaf6", color: seccion === s ? "white" : "#333", cursor: "pointer", fontWeight: "600", fontSize: "0.85rem" }}>
              {labels[s]}
            </button>
          );
        })}
      </div>

      {seccion !== "acentos" && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          {["Americano", "Britanico", "Australiano"].map(function(a, i) {
            return (
              <button key={i} onClick={() => setAccento(i)}
                style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", background: acento === i ? "#4f46e5" : "#e8eaf6", color: acento === i ? "white" : "#333", cursor: "pointer", fontWeight: "600", fontSize: "0.8rem" }}>
                {a}
              </button>
            );
          })}
        </div>
      )}

      {seccion === "vocales" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {VOCALES_INGLES.map(function(v, i) {
            return (
              <div key={i} style={{ background: "white", border: "1px solid #ddd", borderRadius: "10px", padding: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <div style={{ textAlign: "center", minWidth: "60px" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4f46e5" }}>{v.sonido}</div>
                    <div style={{ fontSize: "0.85rem", color: "#666" }}>{v.simbolo}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#333", fontSize: "0.9rem", marginBottom: "4px" }}>{v.fonetica}</div>
                    <div style={{ color: "#4f46e5", fontSize: "0.85rem" }}>{v.ejemplo}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {v.palabras.map(function(p, j) {
                    return (
                      <button key={j} onClick={() => hablar(p)}
                        style={{ padding: "4px 10px", background: "#e8f0fe", border: "none", borderRadius: "6px", cursor: "pointer", color: "#1a237e", fontSize: "0.82rem", fontWeight: "600" }}>
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {seccion === "consonantes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {CONSONANTES_ESPECIALES.map(function(c, i) {
            return (
              <div key={i} style={{ background: "white", border: "1px solid #ddd", borderRadius: "10px", padding: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <div style={{ textAlign: "center", minWidth: "60px" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4f46e5" }}>{c.sonido}</div>
                    <div style={{ fontSize: "0.85rem", color: "#666" }}>{c.simbolo}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#333", fontSize: "0.9rem" }}>{c.fonetica}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {c.palabras.map(function(p, j) {
                    return (
                      <button key={j} onClick={() => hablar(p)}
                        style={{ padding: "4px 10px", background: "#e8f0fe", border: "none", borderRadius: "6px", cursor: "pointer", color: "#1a237e", fontSize: "0.82rem", fontWeight: "600" }}>
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {seccion === "acentos" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {ACENTOS.map(function(a, i) {
            return (
              <div key={i} style={{ background: "white", border: "1px solid #ddd", borderRadius: "10px", padding: "14px" }}>
                <div style={{ fontWeight: "600", color: "#4f46e5", fontSize: "1rem", marginBottom: "4px" }}>{a.nombre}</div>
                <div style={{ color: "#666", fontSize: "0.85rem", marginBottom: "10px" }}>{a.region}</div>
                {a.caracteristicas.map(function(c, j) {
                  return <p key={j} style={{ color: "#333", fontSize: "0.85rem", margin: "4px 0" }}>- {c}</p>;
                })}
                <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
                  {a.ejemplos.map(function(e, j) {
                    return (
                      <div key={j} style={{ background: "#f0f4ff", borderRadius: "8px", padding: "8px 12px", textAlign: "center" }}>
                        <div style={{ fontWeight: "600", color: "#333" }}>{e.palabra}</div>
                        <div style={{ color: "#4f46e5", fontSize: "0.82rem" }}>{e.pron}</div>
                        <button onClick={() => { var u = new SpeechSynthesisUtterance(e.palabra); u.lang = i === 1 ? "en-GB" : i === 2 ? "en-AU" : "en-US"; u.rate = 0.7; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); }}
                          style={{ marginTop: "4px", background: "#e8f0fe", border: "none", borderRadius: "6px", padding: "3px 8px", cursor: "pointer", color: "#1a237e", fontSize: "0.75rem" }}>
                          Escuchar
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FoneticaIngles;
