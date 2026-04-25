# -*- coding: utf-8 -*-
content = '''import { useState } from "react";

const SONIDOS_ESPECIALES = [
  { sonido: "RR", simbolo: "/r/", ejemplo: "perro, carro, tierra", fonetica: "vibrante multiple, lengua vibra varias veces contra el paladar", palabras: ["perro", "carro", "tierra", "arroz", "guerra"] },
  { sonido: "R simple", simbolo: "/r/", ejemplo: "pero, caro, hora", fonetica: "vibrante simple, un solo golpe de lengua", palabras: ["pero", "caro", "hora", "amor", "color"] },
  { sonido: "LL/Y", simbolo: "/j/", ejemplo: "llama, yo, yema", fonetica: "en Argentina suena sh/zh, en otros paises como y", palabras: ["llama", "yo", "yema", "lluvia", "calle"] },
  { sonido: "N palatal", simbolo: "/n/", ejemplo: "nino, manana, bano", fonetica: "n con lengua en el paladar, similar a ny en ingles", palabras: ["nino", "manana", "bano", "espanol", "otono"] },
  { sonido: "J/G fuerte", simbolo: "/x/", ejemplo: "jota, gente, hijo", fonetica: "fricativa velar, como h muy aspirada", palabras: ["jota", "gente", "hijo", "trabajo", "viaje"] },
  { sonido: "V/B", simbolo: "/b/", ejemplo: "vaca, boca, uva", fonetica: "en espanol v y b suenan igual, bilabial", palabras: ["vaca", "boca", "uva", "barco", "vivir"] },
  { sonido: "Z/C espanola", simbolo: "/T/", ejemplo: "zapato, centro, cielo", fonetica: "en Espana suena como th inglesa, en America como s", palabras: ["zapato", "centro", "cielo", "zona", "cinco"] },
  { sonido: "CH", simbolo: "/tS/", ejemplo: "chico, mucho, noche", fonetica: "como ch en ingles chair", palabras: ["chico", "mucho", "noche", "chocolate", "leche"] },
  { sonido: "H muda", simbolo: "muda", ejemplo: "hola, hora, hacer", fonetica: "la h en espanol siempre es muda, nunca se pronuncia", palabras: ["hola", "hora", "hacer", "hablar", "hijo"] },
  { sonido: "QU", simbolo: "/k/", ejemplo: "queso, quiero, que", fonetica: "qu siempre suena k, la u es muda", palabras: ["queso", "quiero", "que", "quien", "aqui"] },
];

const VOCALES = [
  { vocal: "A", tipos: [{ tipo: "Siempre abierta", ejemplo: "casa, padre, mar", fonetica: "igual en todas las posiciones, nunca cambia" }] },
  { vocal: "E", tipos: [
    { tipo: "E abierta", ejemplo: "perro, leche, bien", fonetica: "boca mas abierta, antes de dos consonantes" },
    { tipo: "E cerrada", ejemplo: "mesa, pelo, tres", fonetica: "boca menos abierta, en silabas abiertas" },
  ]},
  { vocal: "I", tipos: [{ tipo: "Siempre cerrada", ejemplo: "fino, isla, vi", fonetica: "igual en todas las posiciones" }] },
  { vocal: "O", tipos: [
    { tipo: "O abierta", ejemplo: "sol, norte, hombre", fonetica: "boca mas abierta" },
    { tipo: "O cerrada", ejemplo: "todo, poco, amor", fonetica: "boca menos abierta, mas redonda" },
  ]},
  { vocal: "U", tipos: [{ tipo: "Siempre cerrada", ejemplo: "luna, uva, tu", fonetica: "labios muy redondeados" }] },
];

const ACENTOS = [
  {
    nombre: "Rioplatense (Argentina/Uruguay)",
    caracteristicas: [
      "LL e Y suenan como SH o ZH (rehilamiento)",
      "Uso de VOS en lugar de TU",
      "Entonacion musical, sube al final de frases",
      "Aspiracion de S al final de silaba en Uruguay",
    ],
    ejemplos: [
      { palabra: "yo", pron: "sho/zho" },
      { palabra: "calle", pron: "cashe/cazhe" },
      { palabra: "vos sabs", pron: "vos sabes" },
    ]
  },
  {
    nombre: "Espanol peninsular (Espana)",
    caracteristicas: [
      "Z y C ante e/i suenan como TH inglesa (distincion)",
      "LL suena diferente a Y (en algunas regiones)",
      "Uso de VOSOTROS para plural informal",
      "S muy clara y precisa",
    ],
    ejemplos: [
      { palabra: "zapato", pron: "thapato" },
      { palabra: "gracias", pron: "grathias" },
      { palabra: "vosotros", pron: "vosotros" },
    ]
  },
  {
    nombre: "Mexicano",
    caracteristicas: [
      "Todas las vocales muy claras y precisas",
      "S siempre se pronuncia, nunca aspirada",
      "Entonacion particular, sube en algunas silabas",
      "Influencia de lenguas indigenas en vocabulario",
    ],
    ejemplos: [
      { palabra: "zapato", pron: "sapato" },
      { palabra: "Mexico", pron: "Mehico" },
      { palabra: "orale", pron: "orale (de acuerdo)" },
    ]
  },
  {
    nombre: "Caribeno (Cuba, PR, Rep. Dom.)",
    caracteristicas: [
      "S al final de silaba se aspira o se pierde",
      "R al final puede sonar como L",
      "Ritmo rapido y musical",
      "Algunos sonidos se debilitan o desaparecen",
    ],
    ejemplos: [
      { palabra: "estos", pron: "ehtoh" },
      { palabra: "verdad", pron: "veddad" },
      { palabra: "comer", pron: "comel" },
    ]
  },
];

function FoneticaEspanol() {
  const [seccion, setSeccion] = useState("sonidos");

  function hablar(texto) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-AR";
    u.rate = 0.7;
    window.speechSynthesis.speak(u);
  }

  return (
    <div>
      <div style={{ background: "#f0f4ff", padding: "14px", borderRadius: "12px", marginBottom: "16px" }}>
        <p style={{ color: "#333", margin: 0, fontSize: "0.95rem" }}>
          El espanol tiene 5 vocales puras y varias consonantes especiales. A diferencia del ingles, las vocales siempre suenan igual. Los acentos regionales son muy variados y ricos.
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {["sonidos", "vocales", "acentos"].map(function(s) {
          var labels = { sonidos: "Sonidos especiales", vocales: "Las 5 vocales", acentos: "Acentos regionales" };
          return (
            <button key={s} onClick={() => setSeccion(s)}
              style={{ padding: "10px 14px", borderRadius: "8px", border: "none", background: seccion === s ? "#4f46e5" : "#e8eaf6", color: seccion === s ? "white" : "#333", cursor: "pointer", fontWeight: "600", fontSize: "0.85rem" }}>
              {labels[s]}
            </button>
          );
        })}
      </div>

      {seccion === "sonidos" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {SONIDOS_ESPECIALES.map(function(c, i) {
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

      {seccion === "vocales" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 8px 0" }}>El espanol tiene 5 vocales puras que siempre suenan igual, a diferencia del ingles.</p>
          {VOCALES.map(function(v, i) {
            return (
              <div key={i} style={{ background: "white", border: "1px solid #ddd", borderRadius: "10px", padding: "12px" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4f46e5", marginBottom: "8px" }}>{v.vocal}</div>
                {v.tipos.map(function(t, j) {
                  return (
                    <div key={j} style={{ marginBottom: "8px" }}>
                      <div style={{ fontWeight: "600", color: "#333", fontSize: "0.9rem" }}>{t.tipo}</div>
                      <div style={{ color: "#666", fontSize: "0.85rem" }}>{t.fonetica}</div>
                      <div style={{ color: "#4f46e5", fontSize: "0.85rem", marginTop: "4px" }}>{t.ejemplo}</div>
                      <button onClick={() => hablar(t.ejemplo.split(",")[0])}
                        style={{ marginTop: "6px", background: "#e8f0fe", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", color: "#1a237e", fontSize: "0.8rem", fontWeight: "600" }}>
                        Escuchar
                      </button>
                    </div>
                  );
                })}
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
                <div style={{ fontWeight: "600", color: "#4f46e5", fontSize: "1rem", marginBottom: "8px" }}>{a.nombre}</div>
                {a.caracteristicas.map(function(c, j) {
                  return <p key={j} style={{ color: "#333", fontSize: "0.85rem", margin: "4px 0" }}>- {c}</p>;
                })}
                <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
                  {a.ejemplos.map(function(e, j) {
                    return (
                      <div key={j} style={{ background: "#f0f4ff", borderRadius: "8px", padding: "8px 12px", textAlign: "center" }}>
                        <div style={{ fontWeight: "600", color: "#333" }}>{e.palabra}</div>
                        <div style={{ color: "#4f46e5", fontSize: "0.82rem" }}>{e.pron}</div>
                        <button onClick={() => hablar(e.palabra)}
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

export default FoneticaEspanol;
'''

with open('src/components/FoneticaEspanol.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Archivo creado correctamente')