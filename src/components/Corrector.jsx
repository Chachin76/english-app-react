import { useState } from 'react';
import { registrarActividad } from './Progreso';

const TEXTOS_IDIOMA = {
  ingles:    { titulo: 'Corrector de escritura', descripcion: 'Escribi en ingles y la IA te corrige.', placeholder: 'Write something in English...', boton: 'Check my writing' },
  frances:   { titulo: 'Correcteur ecriture', descripcion: 'Escribi en frances y la IA te corrige.', placeholder: 'Ecris quelque chose en francais...', boton: 'Verifier mon texte' },
  portugues: { titulo: 'Corretor de escrita', descripcion: 'Escribi en portugues y la IA te corrige.', placeholder: 'Escreva algo em portugues...', boton: 'Verificar meu texto' },
  italiano:  { titulo: 'Correttore di scrittura', descripcion: 'Escribi en italiano y la IA te corrige.', placeholder: 'Scrivi qualcosa in italiano...', boton: 'Controlla il mio testo' },
  aleman:    { titulo: 'Schreibkorrektor', descripcion: 'Escribi en aleman y la IA te corrige.', placeholder: 'Schreib etwas auf Deutsch...', boton: 'Text uberprufen' },
  espanol:   { titulo: 'Corrector de escritura', descripcion: 'Escribi en espanol y la IA te corrige.', placeholder: 'Escribi algo en espanol...', boton: 'Verificar mi texto' },
  chino:     { titulo: 'Corrector chino', descripcion: 'Escribi en chino y la IA te corrige.', placeholder: 'Escribe en chino...', boton: 'Verificar texto' },
  japones:   { titulo: 'Corrector japones', descripcion: 'Escribi en japones y la IA te corrige.', placeholder: 'Escribe en japones...', boton: 'Verificar texto' },
};

function Corrector({ idioma = 'ingles' }) {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);

  const t = TEXTOS_IDIOMA[idioma] || TEXTOS_IDIOMA['ingles'];

  async function verificar() {
    if (!texto.trim()) return;
    setCargando(true);
    setResultado(null);
    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/corregir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto, idioma })
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
      <h2>{t.titulo}</h2>
      <p className="descripcion">{t.descripcion}</p>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={t.placeholder}
      />
      <button onClick={verificar} disabled={cargando}>
        {cargando ? 'Analizando...' : t.boton}
      </button>
      {resultado && (
        <div className="resultado">
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {resultado}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Corrector;
