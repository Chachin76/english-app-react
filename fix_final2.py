f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

# Fix emoji parlante en lectura
c = c.replace(">🔊 Escuchar</button>", ">Escuchar</button>")

# Fix color boton Escuchar para que se vea mejor
c = c.replace(
    "<button onClick={() => hablar(v.palabra)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>Escuchar</button>",
    "<button onClick={() => hablar(v.palabra)} style={{ background: '#e8f0fe', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#1a237e', fontSize: '0.8rem', fontWeight: '600' }}>Escuchar</button>"
)

# Fix scroll usando ref directamente
old = """useEffect(() => {
  if (bottomRef.current && moduloActivo === 'conversacion' && mensajesChat.length > 0) {
    const el = bottomRef.current;
    el.parentElement.scrollTop = el.parentElement.scrollHeight;
  }
}, [mensajesChat]);"""

new = """useEffect(() => {
  if (moduloActivo === 'conversacion' && mensajesChat.length > 0) {
    const chatBox = document.getElementById('chat-box-leccion');
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }
}, [mensajesChat]);"""

c = c.replace(old, new)

# Agregar id al chat box
c = c.replace(
    "style={{ background: '#f5f5f5', borderRadius: '8px', padding: '12px', minHeight: '200px', marginBottom: '8px', maxHeight: '300px', overflowY: 'auto' }}",
    "id='chat-box-leccion' style={{ background: '#f5f5f5', borderRadius: '8px', padding: '12px', minHeight: '200px', marginBottom: '8px', maxHeight: '300px', overflowY: 'auto' }}"
)

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')