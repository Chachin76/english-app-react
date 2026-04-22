f = open('src/components/Conversacion.jsx', encoding='utf-8')
c = f.read()
f.close()

# Fix 1: el saludo inicial debe estar en el lado del tutor correctamente
# Fix 2: limpiar historial duplicado - enviar solo desde el mensaje del usuario
old = """  async function enviarDirecto(texto) {
    if (!texto.trim()) return;
    const nuevos = [...mensajes, { rol: 'usuario', texto }];
    setMensajes(nuevos);
    setInput('');
    setCargando(true);
    try {
      const historial = nuevos.map(m => ({
        role: m.rol === 'usuario' ? 'user' : 'assistant',
        content: m.texto
      }));"""

new = """  async function enviarDirecto(texto) {
    if (!texto.trim()) return;
    const nuevos = [...mensajes, { rol: 'usuario', texto }];
    setMensajes(nuevos);
    setInput('');
    setCargando(true);
    try {
      const historial = nuevos
        .filter(m => !(m.rol === 'tutor' && nuevos.indexOf(m) === 0))
        .map(m => ({
          role: m.rol === 'usuario' ? 'user' : 'assistant',
          content: m.texto
        }));"""

c = c.replace(old, new)

f = open('src/components/Conversacion.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')