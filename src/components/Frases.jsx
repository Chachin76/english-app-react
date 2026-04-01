import { useState, useEffect } from 'react';

function Frases({ idioma = 'ingles' }) {
  const [frases, setFrases] = useState([]);
  const [indice, setIndice] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    cargarFrases();
  }, [idioma]);

  async function cargarFrases() {
    setCargando(true);
    setError(false);
    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/frases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idioma })
      });
      const datos = await resp.json();
      setFrases(datos.frases || []);
      setIndice(0);
    } catch(e) {
      console.error(e);
      setError(true);
    } finally {
      setCargando(false);
    }
  }

  function siguiente() {
    setIndice((indice + 1) % frases.length);
  }

  if (cargando) return <div className="card"><p>⏳ Cargando frases...</p></div>;
  if (error) return <div className="card"><p>❌ Error al cargar. <button onClick={cargarFrases}>Reintentar</button></p></div>;
  if (frases.length === 0) return <div className="card"><p>No hay frases disponibles. <button onClick={cargarFrases}>Reintentar</button></p></div>;

  const frase = frases[indice];

  return (
    <div className="card">
      <h2>📚 Frase del día</h2>
      <p className="frase-ingles">{frase.idioma}</p>
      <p>{frase.español || frase.espanol || frase['español']}</p>
      <button onClick={siguiente}>Nueva frase ➡</button>
      <button onClick={cargarFrases} style={{ marginLeft: '8px', background: '#e8eaf6' }}>🔄 Recargar</button>
    </div>
  );
}

export default Frases;