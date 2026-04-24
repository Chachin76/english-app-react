import { useState } from "react";

const ALFABETOS = {
  frances: {
    nombre: "Frances",
    descripcion: "El frances usa el alfabeto latino con caracteres especiales llamados diacriticos. La pronunciacion difiere mucho del espanol.",
    letras: [
      { letra: "A a", fonetica: "a", ejemplo: "ami", trad: "amigo", nota: "Como en espanol" },
      { letra: "B b", fonetica: "be", ejemplo: "bateau", trad: "barco", nota: "Similar al espanol" },
      { letra: "C c", fonetica: "se", ejemplo: "cafe", trad: "cafe", nota: "Suena 's' ante e/i, 'k' ante a/o/u" },
      { letra: "D d", fonetica: "de", ejemplo: "deux", trad: "dos", nota: "Similar al espanol" },
      { letra: "E e", fonetica: "e/eu", ejemplo: "ecole", trad: "escuela", nota: "Puede sonar 'e' cerrada o abierta" },
      { letra: "F f", fonetica: "efe", ejemplo: "fille", trad: "nina", nota: "Como en espanol" },
      { letra: "G g", fonetica: "gue", ejemplo: "garcon", trad: "nino", nota: "Suena 'zh' ante e/i, 'g' ante a/o/u" },
      { letra: "H h", fonetica: "ash", ejemplo: "homme", trad: "hombre", nota: "Siempre muda en frances" },
      { letra: "I i", fonetica: "i", ejemplo: "ile", trad: "isla", nota: "Como en espanol" },
      { letra: "J j", fonetica: "zhi", ejemplo: "jour", trad: "dia", nota: "Suena como 'y' suave argentina" },
      { letra: "K k", fonetica: "ka", ejemplo: "kilo", trad: "kilo", nota: "Poco comun, solo en extranjerismos" },
      { letra: "L l", fonetica: "ele", ejemplo: "livre", trad: "libro", nota: "Similar al espanol" },
      { letra: "M m", fonetica: "eme", ejemplo: "mere", trad: "madre", nota: "Como en espanol" },
      { letra: "N n", fonetica: "ene", ejemplo: "nuit", trad: "noche", nota: "Como en espanol" },
      { letra: "O o", fonetica: "o", ejemplo: "oiseau", trad: "pajaro", nota: "Puede ser abierta o cerrada" },
      { letra: "P p", fonetica: "pe", ejemplo: "pain", trad: "pan", nota: "Sin aspiracion como en ingles" },
      { letra: "Q q", fonetica: "ku", ejemplo: "quatre", trad: "cuatro", nota: "Siempre va con u, suena 'k'" },
      { letra: "R r", fonetica: "erre gutural", ejemplo: "rue", trad: "calle", nota: "R gutural, vibra en la garganta" },
      { letra: "S s", fonetica: "ese", ejemplo: "soleil", trad: "sol", nota: "Entre vocales suena 'z'" },
      { letra: "T t", fonetica: "te", ejemplo: "table", trad: "mesa", nota: "Sin aspiracion" },
      { letra: "U u", fonetica: "u francesa", ejemplo: "lune", trad: "luna", nota: "Labios en 'u' pero lengua en 'i'" },
      { letra: "V v", fonetica: "ve", ejemplo: "ville", trad: "ciudad", nota: "Como en espanol" },
      { letra: "W w", fonetica: "doble ve", ejemplo: "wagon", trad: "vagon", nota: "Solo en extranjerismos" },
      { letra: "X x", fonetica: "iks", ejemplo: "exemple", trad: "ejemplo", nota: "Suena 'gz' o 'ks'" },
      { letra: "Y y", fonetica: "i griega", ejemplo: "yeux", trad: "ojos", nota: "Como vocal suena 'i'" },
      { letra: "Z z", fonetica: "zed", ejemplo: "zero", trad: "cero", nota: "Como en espanol" },
    ],
    especiales: [
      { letra: "A avec accent", fonetica: "a abierta", ejemplo: "a", trad: "tiene (verbo)", nota: "A con acento grave" },
      { letra: "E accent aigu", fonetica: "e cerrada", ejemplo: "ete", trad: "verano", nota: "E con acento agudo, sonido cerrado" },
      { letra: "E accent grave", fonetica: "e abierta", ejemplo: "pere", trad: "padre", nota: "E con acento grave, sonido abierto" },
      { letra: "E accent cir", fonetica: "e larga", ejemplo: "fete", trad: "fiesta", nota: "E con acento circunflejo" },
      { letra: "C cedille", fonetica: "s", ejemplo: "garcon", trad: "nino", nota: "C con cedilla, suena siempre 's'" },
      { letra: "OU", fonetica: "u espanol", ejemplo: "vous", trad: "ustedes", nota: "Combinacion que suena como u" },
      { letra: "AU/EAU", fonetica: "o", ejemplo: "eau", trad: "agua", nota: "Combinacion que suena 'o'" },
      { letra: "EU", fonetica: "eu", ejemplo: "feu", trad: "fuego", nota: "Sin equivalente en espanol, labios en o, lengua en e" },
      { letra: "AI/EI", fonetica: "e abierta", ejemplo: "maison", trad: "casa", nota: "Suena como e abierta" },
      { letra: "AN/EN/AM/EM", fonetica: "a nasal", ejemplo: "enfant", trad: "nino", nota: "Vocal nasal, no se pronuncia la n" },
      { letra: "IN/IM/AIN", fonetica: "e nasal", ejemplo: "vin", trad: "vino", nota: "Vocal nasal" },
      { letra: "ON/OM", fonetica: "o nasal", ejemplo: "bon", trad: "bueno", nota: "Vocal nasal" },
      { letra: "UN/UM", fonetica: "eu nasal", ejemplo: "un", trad: "uno", nota: "Vocal nasal" },
    ]
  },
  aleman: {
    nombre: "Aleman",
    descripcion: "El aleman usa el alfabeto latino mas 4 caracteres propios: ae, oe, ue y ss. La pronunciacion es muy regular y consistente.",
    letras: [
      { letra: "A a", fonetica: "a", ejemplo: "Apfel", trad: "manzana", nota: "Como en espanol" },
      { letra: "B b", fonetica: "be", ejemplo: "Buch", trad: "libro", nota: "Al final de silaba suena 'p'" },
      { letra: "C c", fonetica: "tse/ka", ejemplo: "Cent", trad: "centavo", nota: "Ante e/i suena 'ts', sino 'k'" },
      { letra: "D d", fonetica: "de", ejemplo: "Dank", trad: "gracias", nota: "Al final suena 't'" },
      { letra: "E e", fonetica: "e", ejemplo: "Essen", trad: "comer", nota: "Siempre se pronuncia, nunca muda" },
      { letra: "F f", fonetica: "ef", ejemplo: "Frau", trad: "mujer", nota: "Como en espanol" },
      { letra: "G g", fonetica: "gue", ejemplo: "gut", trad: "bueno", nota: "Al final suena 'k'" },
      { letra: "H h", fonetica: "ha", ejemplo: "Haus", trad: "casa", nota: "Se pronuncia siempre al inicio" },
      { letra: "I i", fonetica: "i", ejemplo: "ich", trad: "yo", nota: "Como en espanol" },
      { letra: "J j", fonetica: "yot", ejemplo: "Jahr", trad: "ano", nota: "Suena como 'y' en 'yo'" },
      { letra: "K k", fonetica: "ka", ejemplo: "Kind", trad: "nino", nota: "Como en espanol" },
      { letra: "L l", fonetica: "el", ejemplo: "Licht", trad: "luz", nota: "Como en espanol" },
      { letra: "M m", fonetica: "em", ejemplo: "Mutter", trad: "madre", nota: "Como en espanol" },
      { letra: "N n", fonetica: "en", ejemplo: "Nacht", trad: "noche", nota: "Como en espanol" },
      { letra: "O o", fonetica: "o", ejemplo: "Ort", trad: "lugar", nota: "Como en espanol" },
      { letra: "P p", fonetica: "pe", ejemplo: "Platz", trad: "plaza", nota: "Con leve aspiracion" },
      { letra: "Q q", fonetica: "ku", ejemplo: "Quelle", trad: "fuente", nota: "Siempre va con u" },
      { letra: "R r", fonetica: "er gutural", ejemplo: "Rot", trad: "rojo", nota: "R gutural como en frances" },
      { letra: "S s", fonetica: "es/z", ejemplo: "Sonne", trad: "sol", nota: "Al inicio suena 'z', entre vocales 'z'" },
      { letra: "T t", fonetica: "te", ejemplo: "Tisch", trad: "mesa", nota: "Con leve aspiracion" },
      { letra: "U u", fonetica: "u", ejemplo: "Uhr", trad: "reloj", nota: "Como en espanol" },
      { letra: "V v", fonetica: "fau", ejemplo: "Vater", trad: "padre", nota: "Suena como 'f'" },
      { letra: "W w", fonetica: "ve", ejemplo: "Wasser", trad: "agua", nota: "Suena como 'v' espanol" },
      { letra: "X x", fonetica: "iks", ejemplo: "Hexe", trad: "bruja", nota: "Suena 'ks'" },
      { letra: "Y y", fonetica: "ypsilon", ejemplo: "Yoga", trad: "yoga", nota: "Solo en extranjerismos" },
      { letra: "Z z", fonetica: "tset", ejemplo: "Zeit", trad: "tiempo", nota: "Suena siempre 'ts'" },
    ],
    especiales: [
      { letra: "AE", fonetica: "e abierta larga", ejemplo: "Maedchen", trad: "nina", nota: "Equivale a ae con dieresis, labios mas abiertos que e" },
      { letra: "OE", fonetica: "oe", ejemplo: "schoen", trad: "bonito", nota: "Labios en o, lengua en e, sin equivalente en espanol" },
      { letra: "UE", fonetica: "ue", ejemplo: "Tuere", trad: "puerta", nota: "Labios en u, lengua en i, como u francesa" },
      { letra: "SS", fonetica: "s larga", ejemplo: "Strasse", trad: "calle", nota: "S doble, suena como s larga" },
      { letra: "SCH", fonetica: "sh", ejemplo: "Schule", trad: "escuela", nota: "Como 'sh' en ingles" },
      { letra: "CH", fonetica: "j suave", ejemplo: "ich", trad: "yo", nota: "Ante e/i suena suave, ante a/o/u mas fuerte" },
      { letra: "ST/SP", fonetica: "sht/shp", ejemplo: "Stadt", trad: "ciudad", nota: "Al inicio de silaba suenan 'sht' y 'shp'" },
      { letra: "EI", fonetica: "ai", ejemplo: "Eis", trad: "hielo", nota: "Suena como 'ai' en baile" },
      { letra: "EU/AEU", fonetica: "oi", ejemplo: "heute", trad: "hoy", nota: "Suena como 'oi'" },
      { letra: "IE", fonetica: "i larga", ejemplo: "Liebe", trad: "amor", nota: "Suena 'i' larga" },
    ]
  },
  portugues: {
    nombre: "Portugues",
    descripcion: "El portugues tiene sonidos nasales unicos y algunas diferencias entre Brasil y Portugal. Es similar al espanol pero con pronunciacion distinta.",
    letras: [
      { letra: "A a", fonetica: "a/a nasal", ejemplo: "agua", trad: "agua", nota: "Puede ser oral o nasal" },
      { letra: "B b", fonetica: "be", ejemplo: "bom", trad: "bueno", nota: "Como en espanol" },
      { letra: "C c", fonetica: "se/ka", ejemplo: "casa", trad: "casa", nota: "Ante e/i suena 's', sino 'k'" },
      { letra: "D d", fonetica: "de/dyi", ejemplo: "dia", trad: "dia", nota: "En Brasil ante 'i' suena 'dyi'" },
      { letra: "E e", fonetica: "e/i", ejemplo: "verde", trad: "verde", nota: "En Brasil al final suena 'i'" },
      { letra: "F f", fonetica: "efe", ejemplo: "falar", trad: "hablar", nota: "Como en espanol" },
      { letra: "G g", fonetica: "gue/zhi", ejemplo: "gente", trad: "gente", nota: "Ante e/i suena 'zh'" },
      { letra: "H h", fonetica: "muda", ejemplo: "hoje", trad: "hoy", nota: "Siempre muda, como en espanol" },
      { letra: "I i", fonetica: "i", ejemplo: "ilha", trad: "isla", nota: "Como en espanol" },
      { letra: "J j", fonetica: "zh", ejemplo: "janela", trad: "ventana", nota: "Como 'y' suave argentina" },
      { letra: "K k", fonetica: "ka", ejemplo: "kilo", trad: "kilo", nota: "Solo en extranjerismos" },
      { letra: "L l", fonetica: "ele/u", ejemplo: "sal", trad: "sal", nota: "En Brasil al final suena 'u'" },
      { letra: "M m", fonetica: "eme", ejemplo: "mae", trad: "madre", nota: "Al final nasaliza la vocal anterior" },
      { letra: "N n", fonetica: "ene", ejemplo: "nao", trad: "no", nota: "Al final nasaliza la vocal anterior" },
      { letra: "O o", fonetica: "o/u", ejemplo: "bolo", trad: "torta", nota: "En Brasil al final suena 'u'" },
      { letra: "P p", fonetica: "pe", ejemplo: "pai", trad: "padre", nota: "Como en espanol" },
      { letra: "Q q", fonetica: "ke/ku", ejemplo: "quatro", trad: "cuatro", nota: "Con u generalmente muda" },
      { letra: "R r", fonetica: "erre/r suave", ejemplo: "rio", trad: "rio", nota: "Al inicio suena fuerte, entre vocales suave" },
      { letra: "S s", fonetica: "ese/z/sh", ejemplo: "sol", trad: "sol", nota: "Entre vocales suena 'z', al final 'sh' en Portugal" },
      { letra: "T t", fonetica: "te/tchi", ejemplo: "tarde", trad: "tarde", nota: "En Brasil ante 'i' suena 'tchi'" },
      { letra: "U u", fonetica: "u", ejemplo: "uva", trad: "uva", nota: "Como en espanol" },
      { letra: "V v", fonetica: "ve", ejemplo: "vinho", trad: "vino", nota: "Como en espanol" },
      { letra: "W w", fonetica: "ve doblo", ejemplo: "web", trad: "web", nota: "Solo en extranjerismos" },
      { letra: "X x", fonetica: "sh/ks/z/s", ejemplo: "caixa", trad: "caja", nota: "Puede sonar 'sh', 'ks', 'z' o 's' segun la palabra" },
      { letra: "Y y", fonetica: "i", ejemplo: "yoga", trad: "yoga", nota: "Solo en extranjerismos" },
      { letra: "Z z", fonetica: "ze/sh", ejemplo: "zero", trad: "cero", nota: "Al final en Portugal suena 'sh'" },
    ],
    especiales: [
      { letra: "A com til", fonetica: "a nasal", ejemplo: "mao", trad: "mano", nota: "A nasal, muy caracteristico del portugues" },
      { letra: "O com til", fonetica: "o nasal", ejemplo: "nao", trad: "no", nota: "O nasal" },
      { letra: "A com crase", fonetica: "a abierta", ejemplo: "la", trad: "alla", nota: "A abierta" },
      { letra: "C cedilha", fonetica: "s", ejemplo: "fraco", trad: "debil", nota: "C con cedilla, suena 's'" },
      { letra: "LH", fonetica: "ll espanol", ejemplo: "filho", trad: "hijo", nota: "Como 'll' en espanol rioplatense no" },
      { letra: "NH", fonetica: "n palatal", ejemplo: "vinho", trad: "vino", nota: "Como 'n' en 'nino'" },
      { letra: "SS", fonetica: "s larga", ejemplo: "passo", trad: "paso", nota: "S doble, siempre suena 's'" },
      { letra: "RR", fonetica: "r fuerte", ejemplo: "carro", trad: "carro", nota: "R doble, suena fuerte como jota" },
      { letra: "AO", fonetica: "ao nasal", ejemplo: "pao", trad: "pan", nota: "Combinacion muy comun, nasal" },
      { letra: "OE", fonetica: "oe nasal", ejemplo: "poes", trad: "poemas", nota: "O nasal seguida de e" },
    ]
  },
  italiano: {
    nombre: "Italiano",
    descripcion: "El italiano es el idioma mas similar al espanol. Su pronunciacion es muy regular y melodica. Casi todo se pronuncia como se escribe.",
    letras: [
      { letra: "A a", fonetica: "a", ejemplo: "amore", trad: "amor", nota: "Como en espanol, siempre clara" },
      { letra: "B b", fonetica: "bi", ejemplo: "bello", trad: "bonito", nota: "Como en espanol" },
      { letra: "C c", fonetica: "ci/ki", ejemplo: "ciao", trad: "hola", nota: "Ante e/i suena 'ch', ante a/o/u suena 'k'" },
      { letra: "D d", fonetica: "di", ejemplo: "donna", trad: "mujer", nota: "Como en espanol" },
      { letra: "E e", fonetica: "e", ejemplo: "estate", trad: "verano", nota: "Siempre pronunciada, puede ser abierta o cerrada" },
      { letra: "F f", fonetica: "effe", ejemplo: "fiore", trad: "flor", nota: "Como en espanol" },
      { letra: "G g", fonetica: "gi/ghi", ejemplo: "gelato", trad: "helado", nota: "Ante e/i suena 'y suave', ante a/o/u suena 'g'" },
      { letra: "H h", fonetica: "muda", ejemplo: "ho", trad: "tengo", nota: "Siempre muda, solo cambia pronunciacion de c y g" },
      { letra: "I i", fonetica: "i", ejemplo: "Italia", trad: "Italia", nota: "Como en espanol" },
      { letra: "L l", fonetica: "elle", ejemplo: "luna", trad: "luna", nota: "Como en espanol" },
      { letra: "M m", fonetica: "emme", ejemplo: "madre", trad: "madre", nota: "Como en espanol" },
      { letra: "N n", fonetica: "enne", ejemplo: "notte", trad: "noche", nota: "Como en espanol" },
      { letra: "O o", fonetica: "o", ejemplo: "oro", trad: "oro", nota: "Puede ser abierta o cerrada" },
      { letra: "P p", fonetica: "pi", ejemplo: "pasta", trad: "pasta", nota: "Como en espanol" },
      { letra: "Q q", fonetica: "qu", ejemplo: "quando", trad: "cuando", nota: "Siempre va con u, suena 'ku'" },
      { letra: "R r", fonetica: "erre vibrante", ejemplo: "Roma", trad: "Roma", nota: "R vibrante como en espanol rioplatense" },
      { letra: "S s", fonetica: "esse/z", ejemplo: "sole", trad: "sol", nota: "Entre vocales puede sonar 'z'" },
      { letra: "T t", fonetica: "ti", ejemplo: "tavolo", trad: "mesa", nota: "Como en espanol" },
      { letra: "U u", fonetica: "u", ejemplo: "uva", trad: "uva", nota: "Como en espanol" },
      { letra: "V v", fonetica: "vi", ejemplo: "vino", trad: "vino", nota: "Como en espanol" },
      { letra: "Z z", fonetica: "dz/ts", ejemplo: "pizza", trad: "pizza", nota: "Puede sonar 'dz' o 'ts' segun la palabra" },
    ],
    especiales: [
      { letra: "CI", fonetica: "ch", ejemplo: "ciao", trad: "hola", nota: "C ante i suena 'ch' como en 'chico'" },
      { letra: "CE", fonetica: "che", ejemplo: "cena", trad: "cena", nota: "C ante e suena 'ch'" },
      { letra: "CHI/CHE", fonetica: "ki/ke", ejemplo: "che", trad: "que", nota: "CH suena siempre 'k'" },
      { letra: "GI/GE", fonetica: "yi/ye", ejemplo: "gelato", trad: "helado", nota: "G ante i/e suena suave como 'y'" },
      { letra: "GHI/GHE", fonetica: "gi/ge", ejemplo: "ghiaccio", trad: "hielo", nota: "GH suena siempre 'g' fuerte" },
      { letra: "GLI", fonetica: "ll espanol", ejemplo: "figlio", trad: "hijo", nota: "Como 'll' en espanol antiguo" },
      { letra: "GN", fonetica: "n palatal", ejemplo: "gnocchi", trad: "nnoquis", nota: "Como 'n' en 'nino'" },
      { letra: "SC+e/i", fonetica: "sh", ejemplo: "scena", trad: "escena", nota: "SC ante e/i suena 'sh'" },
      { letra: "SCH", fonetica: "sk", ejemplo: "schema", trad: "esquema", nota: "SCH suena 'sk'" },
      { letra: "ZZ", fonetica: "ts/dz", ejemplo: "pizza", trad: "pizza", nota: "Doble z, pronunciacion intensa" },
    ]
  }
};

function EscrituraLatina({ idioma = "frances" }) {
  const [seccion, setSeccion] = useState("letras");
  const [busqueda, setBusqueda] = useState("");

  const datos = ALFABETOS[idioma];
  if (!datos) return null;

  function hablar(texto) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const VOCES = { frances: "fr-FR", aleman: "de-DE", portugues: "pt-BR", italiano: "it-IT" };
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = VOCES[idioma] || "fr-FR";
    u.rate = 0.7;
    window.speechSynthesis.speak(u);
  }

  const lista = seccion === "letras" ? datos.letras : datos.especiales;
  const filtrada = busqueda
    ? lista.filter(l => l.letra.toLowerCase().includes(busqueda.toLowerCase()) || l.ejemplo.toLowerCase().includes(busqueda.toLowerCase()))
    : lista;

  return (
    <div>
      <div style={{ background: "#f0f4ff", padding: "14px", borderRadius: "12px", marginBottom: "16px" }}>
        <p style={{ color: "#333", margin: 0, fontSize: "0.95rem" }}>{datos.descripcion}</p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <button onClick={() => setSeccion("letras")}
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: seccion === "letras" ? "#4f46e5" : "#e8eaf6", color: seccion === "letras" ? "white" : "#333", cursor: "pointer", fontWeight: "600" }}>
          Alfabeto ({datos.letras.length} letras)
        </button>
        <button onClick={() => setSeccion("especiales")}
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: seccion === "especiales" ? "#4f46e5" : "#e8eaf6", color: seccion === "especiales" ? "white" : "#333", cursor: "pointer", fontWeight: "600" }}>
          Combinaciones ({datos.especiales.length})
        </button>
      </div>

      <input
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        placeholder="Buscar letra o ejemplo..."
        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "12px", boxSizing: "border-box", color: "#333" }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {filtrada.map(function(l, i) {
          return (
            <div key={i} style={{ background: "white", border: "1px solid #ddd", borderRadius: "10px", padding: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#4f46e5", minWidth: "60px", textAlign: "center" }}>{l.letra}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontWeight: "600", color: "#333" }}>{l.fonetica}</span>
                    <span style={{ color: "#4f46e5", fontSize: "0.9rem" }}>{l.ejemplo}</span>
                    <span style={{ color: "#666", fontSize: "0.85rem" }}>= {l.trad}</span>
                  </div>
                  <div style={{ color: "#888", fontSize: "0.82rem" }}>{l.nota}</div>
                </div>
                <button onClick={() => hablar(l.ejemplo)}
                  style={{ background: "#e8f0fe", border: "none", borderRadius: "8px", padding: "8px 10px", cursor: "pointer", color: "#1a237e", fontSize: "0.8rem", fontWeight: "600" }}>
                  Escuchar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EscrituraLatina;
