f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

# Remover conversacion de la lista de modulos
c = c.replace(
    "{ id: 'conversacion', nombre: 'Conversacion' },\n  { id: 'frases'",
    "{ id: 'frases'"
)

# Agregar import de Conversacion al inicio
c = c.replace(
    "import { useState, useRef, useEffect } from 'react';",
    "import { useState, useRef, useEffect } from 'react';\nimport Conversacion from './Conversacion';"
)

# Agregar estado para mostrar conversacion
c = c.replace(
    "const [lecturaResultado, setLecturaResultado] = useState(null);",
    "const [lecturaResultado, setLecturaResultado] = useState(null);\n  const [mostrarConversacion, setMostrarConversacion] = useState(false);"
)

# Agregar boton de conversacion en la lista de modulos y el componente
c = c.replace(
    "<button onClick={onVolver} style={{ marginTop: '12px', width: '100%', padding: '10px', background: '#e8eaf6', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#333' }}>\n          Volver a la leccion\n        </button>",
    """<button onClick={onVolver} style={{ marginTop: '12px', width: '100%', padding: '10px', background: '#e8eaf6', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#333' }}>
          Volver a la leccion
        </button>
        <button onClick={() => setMostrarConversacion(true)} style={{ marginTop: '8px', width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          Practicar Conversacion
        </button>
        {mostrarConversacion && <Conversacion idioma={idioma} nivel={nivel} tema={tema} onCerrar={() => setMostrarConversacion(false)} />}"""
)

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')