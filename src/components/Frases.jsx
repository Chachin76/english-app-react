import { useState, useEffect } from 'react';

function Frases({ idioma = 'ingles' }) {
  const [frases, setFrases] = useState([]);
  const [indice, setIndice] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarFrases();
  }, [idioma]);

  async function cargarFrases() {
    setCargando(true);
    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/frases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idioma })
      });
      const datos = await resp.json();
      setFrases(datos.frases);
      setIndice(0);
    } catch(e) {
      console.error(e);
    } finally {
      setCargando(false);
    }
  }

  function siguiente() {
    setIndice((indice + 1) % frases.length);
  }

  if (cargando) return <div className="card"><p>Cargando frases...</p></div>;

  return (
    <div className="card">
      <h2>📚 Frase del día</h2>
      {frases.length > 0 && (
        <>
          <p className="frase-ingles">{frases[indice].idioma}</p>
          <p className="frase-español">{frases[indice].español}</p>
          <button onClick={siguiente}>Nueva frase ➡</button>
        </>
      )}
    </div>
  );
}

export default Frases;