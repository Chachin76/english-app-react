f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

# Remover el useEffect del scroll completamente
old = """useEffect(() => {
  if (moduloActivo === 'conversacion' && mensajesChat.length > 0) {
    const pageY = window.scrollY;
    const chatBox = document.getElementById('chat-box-leccion');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
    requestAnimationFrame(() => {
      window.scrollTo({ top: pageY, behavior: 'instant' });
    });
  }
}, [mensajesChat]);"""

new = ""

c = c.replace(old, new)

# Hacer el chat mas alto para que no necesite scroll externo
c = c.replace(
    "id='chat-box-leccion' tabIndex='-1' style={{ background: '#f5f5f5', outline: 'none', borderRadius: '8px', padding: '12px', minHeight: '200px', marginBottom: '8px', maxHeight: '300px', overflowY: 'auto' }}",
    "id='chat-box-leccion' style={{ background: '#f5f5f5', borderRadius: '8px', padding: '12px', height: '350px', marginBottom: '8px', overflowY: 'auto' }}"
)

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')