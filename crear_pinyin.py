# -*- coding: utf-8 -*-
content = '''import { useState } from "react";

const TONOS = [
  { tono: "1er tono", marca: "macron (linea recta)", ejemplo: "\u5999", pinyin: "miao1", fonetica: "voz alta y plana, como cantar una nota larga", color: "#4f46e5" },
  { tono: "2do tono", marca: "acento agudo (sube)", ejemplo: "\u5999", pinyin: "miao2", fonetica: "sube como cuando preguntas algo", color: "#059669" },
  { tono: "3er tono", marca: "acento circunflejo (baja y sube)", ejemplo: "\u5999", pinyin: "miao3", fonetica: "baja y sube, como un suspiro", color: "#d97706" },
  { tono: "4to tono", marca: "acento grave (baja)", ejemplo: "\u5999", pinyin: "miao4", fonetica: "baja fuerte y rapido, como dar una orden", color: "#dc2626" },
  { tono: "Tono neutro", marca: "sin marca", ejemplo: "\u5999", pinyin: "miao", fonetica: "corto y sin enfasis, depende del contexto", color: "#6b7280" },
];

const INICIALES = [
  { char: "b", fonetica: "p sin aspiracion", ejemplo: "\u516B", pinyin: "ba", trad: "ocho" },
  { char: "p", fonetica: "p aspirada", ejemplo: "\u5992", pinyin: "pa", trad: "temer" },
  { char: "m", fonetica: "m como espanol", ejemplo: "\u5988", pinyin: "ma", trad: "mama" },
  { char: "f", fonetica: "f como espanol", ejemplo: "\u98EF", pinyin: "fan", trad: "arroz" },
  { char: "d", fonetica: "t sin aspiracion", ejemplo: "\u5927", pinyin: "da", trad: "grande" },
  { char: "t", fonetica: "t aspirada", ejemplo: "\u4ED6", pinyin: "ta", trad: "el" },
  { char: "n", fonetica: "n como espanol", ejemplo: "\u5976", pinyin: "nai", trad: "leche" },
  { char: "l", fonetica: "l como espanol", ejemplo: "\u6765", pinyin: "lai", trad: "venir" },
  { char: "g", fonetica: "k sin aspiracion", ejemplo: "\u6C34\u679C", pinyin: "guo", trad: "fruta" },
  { char: "k", fonetica: "k aspirada", ejemplo: "\u770B", pinyin: "kan", trad: "mirar" },
  { char: "h", fonetica: "j suave como espanol", ejemplo: "\u5403", pinyin: "he", trad: "beber" },
  { char: "j", fonetica: "similar a ch suave", ejemplo: "\u9B38", pinyin: "ji", trad: "pollo" },
  { char: "q", fonetica: "ch aspirada", ejemplo: "\u953E", pinyin: "qi", trad: "siete" },
  { char: "x", fonetica: "sh suave", ejemplo: "\u5C0F", pinyin: "xiao", trad: "pequeno" },
  { char: "zh", fonetica: "ch retrofleja", ejemplo: "\u8FD9", pinyin: "zhe", trad: "este" },
  { char: "ch", fonetica: "ch retrofleja aspirada", ejemplo: "\u5403", pinyin: "chi", trad: "comer" },
  { char: "sh", fonetica: "sh retrofleja", ejemplo: "\u662F", pinyin: "shi", trad: "ser/estar" },
  { char: "r", fonetica: "r retrofleja", ejemplo: "\u4EBA", pinyin: "ren", trad: "persona" },
  { char: "z", fonetica: "ts sin aspiracion", ejemplo: "\u5B57", pinyin: "zi", trad: "caracter" },
  { char: "c", fonetica: "ts aspirada", ejemplo: "\u8BCD", pinyin: "ci", trad: "palabra" },
  { char: "s", fonetica: "s como espanol", ejemplo: "\u56DB", pinyin: "si", trad: "cuatro" },
];

const CARACTERES_BASICOS = [
  { char: "\u4E00", pinyin: "yi1", trad: "uno", trazos: 1 },
  { char: "\u4E8C", pinyin: "er4", trad: "dos", trazos: 2 },
  { char: "\u4E09", pinyin: "san1", trad: "tres", trazos: 3 },
  { char: "\u56DB", pinyin: "si4", trad: "cuatro", trazos: 5 },
  { char: "\u4E94", pinyin: "wu3", trad: "cinco", trazos: 4 },
  { char: "\u5927", pinyin: "da4", trad: "grande", trazos: 3 },
  { char: "\u5C0F", pinyin: "xiao3", trad: "pequeno", trazos: 3 },
  { char: "\u4EBA", pinyin: "ren2", trad: "persona", trazos: 2 },
  { char: "\u5C71", pinyin: "shan1", trad: "montana", trazos: 3 },
  { char: "\u6C34", pinyin: "shui3", trad: "agua", trazos: 4 },
  { char: "\u706B", pinyin: "huo3", trad: "fuego", trazos: 4 },
  { char: "\u6728", pinyin: "mu4", trad: "madera", trazos: 4 },
  { char: "\u65E5", pinyin: "ri4", trad: "sol/dia", trazos: 4 },
  { char: "\u6708", pinyin: "yue4", trad: "luna/mes", trazos: 4 },
  { char: "\u5B50", pinyin: "zi3", trad: "hijo/nino", trazos: 3 },
  { char: "\u597D", pinyin: "hao3", trad: "bueno", trazos: 6 },
  { char: "\u4E0A", pinyin: "shang4", trad: "arriba", trazos: 3 },
  { char: "\u4E0B", pinyin: "xia4", trad: "abajo", trazos: 3 },
  { char: "\u4E2D", pinyin: "zhong1", trad: "centro/China", trazos: 4 },
  { char: "\u56FD", pinyin: "guo2", trad: "pais", trazos: 8 },
  { char: "\u4E0A\u6D77", pinyin: "shang4 hai3", trad: "Shanghai", trazos: 0 },
  { char: "\u5317\u4EAC", pinyin: "bei3 jing1", trad: "Beijing", trazos: 0 },
  { char: "\u4E2D\u6587", pinyin: "zhong1 wen2", trad: "idioma chino", trazos: 0 },
  { char: "\u8C22\u8C22", pinyin: "xie4 xie", trad: "gracias", trazos: 0 },
  { char: "\u4F60\u597D", pinyin: "ni3 hao3", trad: "hola", trazos: 0 },
];

function EscrituraPinyin() {
  const [seccion, setSeccion] = useState("tonos");

  function hablar(texto) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "zh-CN";
    u.rate = 0.6;
    window.speechSynthesis.speak(u);
  }

  return (
    <div>
      <div style={{ background: "#f0f4ff", padding: "14px", borderRadius: "12px", marginBottom: "16px" }}>
        <p style={{ color: "#333", margin: 0, fontSize: "0.95rem" }}>
          El chino mandarin usa el Pinyin como sistema de romanizacion. Tiene 4 tonos mas un tono neutro que cambian completamente el significado de cada palabra. Los caracteres chinos (Hanzi) son logogramas con miles de anos de historia.
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {["tonos", "iniciales", "caracteres"].map(function(s) {
          var labels = { tonos: "Los 4 Tonos", iniciales: "Consonantes (21)", caracteres: "Caracteres basicos" };
          return (
            <button key={s} onClick={() => setSeccion(s)}
              style={{ padding: "10px 14px", borderRadius: "8px", border: "none", background: seccion === s ? "#4f46e5" : "#e8eaf6", color: seccion === s ? "white" : "#333", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}>
              {labels[s]}
            </button>
          );
        })}
      </div>

      {seccion === "tonos" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 8px 0" }}>En chino el tono es parte de la pronunciacion. La misma silaba con diferente tono tiene diferente significado.</p>
          {TONOS.map(function(t, i) {
            return (
              <div key={i} style={{ background: "white", border: "2px solid", borderColor: t.color, borderRadius: "10px", padding: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: t.color, minWidth: "80px", textAlign: "center" }}>{t.tono}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "600", color: "#333", marginBottom: "4px" }}>{t.marca}</div>
                    <div style={{ color: "#666", fontSize: "0.85rem" }}>{t.fonetica}</div>
                  </div>
                  <button onClick={() => hablar(t.ejemplo)}
                    style={{ background: t.color, border: "none", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", color: "white", fontSize: "0.8rem", fontWeight: "600" }}>
                    Escuchar
                  </button>
                </div>
              </div>
            );
          })}
          <div style={{ background: "#fff8e1", padding: "14px", borderRadius: "12px", marginTop: "8px" }}>
            <p style={{ fontWeight: "600", color: "#333", margin: "0 0 8px 0" }}>Ejemplo con ma:</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div style={{ padding: "8px", background: "white", borderRadius: "6px", textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", color: "#4f46e5" }}>ma1</div>
                <div style={{ color: "#666", fontSize: "0.85rem" }}>mama</div>
              </div>
              <div style={{ padding: "8px", background: "white", borderRadius: "6px", textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", color: "#059669" }}>ma2</div>
                <div style={{ color: "#666", fontSize: "0.85rem" }}>canamo</div>
              </div>
              <div style={{ padding: "8px", background: "white", borderRadius: "6px", textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", color: "#d97706" }}>ma3</div>
                <div style={{ color: "#666", fontSize: "0.85rem" }}>caballo</div>
              </div>
              <div style={{ padding: "8px", background: "white", borderRadius: "6px", textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", color: "#dc2626" }}>ma4</div>
                <div style={{ color: "#666", fontSize: "0.85rem" }}>insultar</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {seccion === "iniciales" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 8px 0" }}>Las consonantes iniciales del Pinyin. Muchas suenan diferente al espanol.</p>
          {INICIALES.map(function(c, i) {
            return (
              <div key={i} style={{ background: "white", border: "1px solid #ddd", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#4f46e5", minWidth: "50px", textAlign: "center" }}>{c.char}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "600", color: "#333" }}>{c.fonetica}</div>
                  <div style={{ color: "#666", fontSize: "0.85rem" }}>{c.char + "..."} ej: {c.pinyin} = {c.trad}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <button onClick={() => hablar(c.ejemplo)}
                    style={{ background: "#e8f0fe", border: "none", borderRadius: "6px", padding: "5px 8px", cursor: "pointer", color: "#1a237e", fontSize: "0.75rem", fontWeight: "600" }}>
                    Escuchar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {seccion === "caracteres" && (
        <div>
          <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 12px 0" }}>Los caracteres chinos mas basicos. Cada uno tiene su Pinyin y significado.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "8px" }}>
            {CARACTERES_BASICOS.map(function(c, i) {
              return (
                <div key={i} style={{ background: "white", border: "1px solid #ddd", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", color: "#4f46e5", marginBottom: "4px" }}>{c.char}</div>
                  <div style={{ fontWeight: "600", color: "#333", fontSize: "0.9rem" }}>{c.pinyin}</div>
                  <div style={{ color: "#666", fontSize: "0.82rem", marginBottom: "8px" }}>{c.trad}</div>
                  <button onClick={() => hablar(c.char)}
                    style={{ width: "100%", background: "#e8f0fe", border: "none", borderRadius: "6px", padding: "5px", cursor: "pointer", color: "#1a237e", fontSize: "0.75rem", fontWeight: "600" }}>
                    Escuchar
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ background: "#fff8e1", padding: "14px", borderRadius: "12px", marginTop: "16px" }}>
        <p style={{ fontWeight: "600", color: "#333", margin: "0 0 8px 0" }}>Datos importantes del chino:</p>
        <p style={{ color: "#666", margin: "4px 0", fontSize: "0.85rem" }}>1. El chino mandarin tiene mas de 50.000 caracteres, pero con 3.000 se puede leer el 99% de los textos</p>
        <p style={{ color: "#666", margin: "4px 0", fontSize: "0.85rem" }}>2. No tiene conjugaciones verbales ni plural como en espanol</p>
        <p style={{ color: "#666", margin: "4px 0", fontSize: "0.85rem" }}>3. El tiempo verbal se indica con palabras de contexto</p>
        <p style={{ color: "#666", margin: "4px 0", fontSize: "0.85rem" }}>4. El Pinyin es solo una guia de pronunciacion, no se usa en textos normales</p>
        <p style={{ color: "#666", margin: "4px 0", fontSize: "0.85rem" }}>5. China usa caracteres simplificados, Taiwan usa los tradicionales</p>
      </div>
    </div>
  );
}

export default EscrituraPinyin;
'''

with open('src/components/EscrituraPinyin.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Archivo creado correctamente')