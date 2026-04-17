f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

# Fix emojis parlante en frases
c = c.replace(">🔊</button>", ">Escuchar</button>")

# Fix scroll - solo scrollear en conversacion y solo hacia abajo
old = """useEffect(() => {
  if (bottomRef.current && moduloActivo === 'conversacion') {
    bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}, [mensajesChat]);"""

new = """useEffect(() => {
  if (bottomRef.current && moduloActivo === 'conversacion' && mensajesChat.length > 0) {
    const el = bottomRef.current;
    el.parentElement.scrollTop = el.parentElement.scrollHeight;
  }
}, [mensajesChat]);"""

c = c.replace(old, new)

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')