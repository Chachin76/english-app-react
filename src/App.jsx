import { useState } from 'react';
import { registrarActividad } from './Progreso';

const TEXTOS_IDIOMA = {
  ingles:    { titulo: '✅ Corrector de escritura', descripcion: 'Escribí en inglés y la IA te corrige.', placeholder: 'Write something in English...', boton: 'Check my writing ✔' },
  frances:   { titulo: '✅ Correcteur d\'écriture', descripcion: 'Escribí en francés y la IA te corrige.', placeholder: 'Écris quelque chose en français...', boton: 'Vérifier mon texte ✔' },
  portugues: { titulo: '✅ Corretor de escrita', descripcion: 'Escribí en portugués y la IA te corrige.', placeholder: 'Escreva algo em português...', boton: 'Verificar meu texto ✔' },
  italiano:  { titulo: '✅ Correttore di scrittura', descripcion: 'Escribí en italiano y la IA te corrige.', placeholder: 'Scrivi qualcosa in italiano...', boton: 'Controlla il mio testo ✔' },
  aleman:    { titulo: '✅ Schreibkorrektor', descripcion: 'Escribí en alemán y la IA te corrige.', placeholder: 'Schreib etwas auf Deutsch...', boton: 'Text überprüfen ✔' },
  espanol:   { titulo: '✅ Corrector de escritura', descripcion: 'Escribí en español y la IA te corrige.', placeholder: 'Escribí algo en español...', boton: 'Verificar mi texto ✔' },
  chino:     { titulo: '✅ 写作纠正器', descripcion: 'Escribí en chino y la IA te corrige.', placeholder: '用中文写点什么...', boton: '检查我的写作 ✔' },
  japones:   { titulo: '✅ 作文添削', descripcion: 'Escribí en japonés y la IA te corrige.', placeholder: '日本語で何か書いてください...', boton: '文章を確認する ✔' },
};

function Corrector({ idioma = 'ingles' }) {
  const [texto, setTexto]         = useState('');
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando]   = useState(false);

  const t = TEXTOS_IDIOMA[idioma] || TEXTOS_IDIOMA['ingles'];

  async function verificar() {
    if (!texto.trim()) return;
    setCargando(true);
    setResultado(null);
    try {
      const resp = await fetch('https://english-app-backend-ifyj.onrender.com/corregir', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ texto, idioma })
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
        {cargando ? '⏳ Analizando...' : t.boton}
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