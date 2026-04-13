f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

# Reemplazar MODULOS sin emojis
old = """const MODULOS = [
    { id: 'corrector', nombre: 'Corrector', emoji: 'Corrector' },
    { id: 'conversacion', nombre: 'Conversacion', emoji: 'Chat' },
    { id: 'frases', nombre: 'Frases', emoji: 'Frases' },
    { id: 'vocabulario', nombre: 'Vocabulario', emoji: 'Vocab' },
    { id: 'situacion', nombre: 'Situaciones', emoji: 'Situac' },
    { id: 'dictado', nombre: 'Dictado', emoji: 'Dictado' },
    { id: 'lectura', nombre: 'Lectura', emoji: 'Lectura' },
    { id: 'cultura', nombre: 'Cultura', emoji: 'Cultura' },
  ];"""

new = """const MODULOS = [
    { id: 'corrector', nombre: 'Corrector' },
    { id: 'conversacion', nombre: 'Conversacion' },
    { id: 'frases', nombre: 'Frases' },
    { id: 'vocabulario', nombre: 'Vocabulario' },
    { id: 'situacion', nombre: 'Situaciones' },
    { id: 'dictado', nombre: 'Dictado' },
    { id: 'lectura', nombre: 'Lectura' },
    { id: 'cultura', nombre: 'Cultura' },
  ];"""

c = c.replace(old, new)

# Fix scroll
old2 = """useEffect(() => {
  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}, [mensajesChat, cargando]);"""

new2 = """useEffect(() => {
  if (bottomRef.current && moduloActivo === 'conversacion') {
    bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}, [mensajesChat]);"""

c = c.replace(old2, new2)

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')