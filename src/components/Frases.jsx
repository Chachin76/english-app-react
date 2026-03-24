import { useState } from 'react';

const frases = [
  { ingles: "The early bird catches the worm.",    español: "El que madruga, Dios lo ayuda." },
  { ingles: "Practice makes perfect.",             español: "La práctica hace al maestro." },
  { ingles: "Every cloud has a silver lining.",    español: "No hay mal que por bien no venga." },
  { ingles: "Actions speak louder than words.",    español: "Las acciones valen más que las palabras." },
  { ingles: "Better late than never.",             español: "Más vale tarde que nunca." },
  { ingles: "Where there's a will, there's a way.", español: "Querer es poder." },
  { ingles: "Don't judge a book by its cover.",    español: "No juzgues por las apariencias." },
];

function Frases() {
  const [indice, setIndice] = useState(0);

  function siguiente() {
    setIndice((indice + 1) % frases.length);
  }

  return (
    <div className="card">
      <h2>📖 Frase del día</h2>
      <p className="frase-ingles">{frases[indice].ingles}</p>
      <p className="frase-español">{frases[indice].español}</p>
      <button onClick={siguiente}>Nueva frase ↻</button>
    </div>
  );
}

export default Frases;