import { useState } from 'react';
import { registrarActividad } from './Progreso';

function Corrector() {
  const [texto, setTexto]         = useState('');
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando]   = useState(false);

  async function verificar() {
    if (!texto.trim()) return;

    


    setCargando(true);
    setResultado(null);

    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/corregir', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ texto })
      });
      const datos = await resp.json();
      setResultado(datos.respuesta);
      registrarActividad('corrector', 2);

    } catch(e) {
      setResultado('Error: no se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="card">
      <h2>✍️ Corrector de escritura</h2>
      <p className="descripcion">Escribí en inglés y la IA te corrige.</p>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Write something in English..."
      />

      <button onClick={verificar} disabled={cargando}>
        {cargando ? '⏳ Analizando...' : 'Check my writing ✓'}
      </button>

      {resultado && (
        <div className="resultado">
          <pre style={{ whiteSpace:'pre-wrap', fontFamily:'inherit' }}>
            {resultado}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Corrector;
