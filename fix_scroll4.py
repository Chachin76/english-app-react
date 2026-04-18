f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

old = """useEffect(() => {
  if (moduloActivo === 'conversacion' && mensajesChat.length > 0) {
    setTimeout(() => {
      const chatBox = document.getElementById('chat-box-leccion');
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    }, 200);
  }
}, [mensajesChat]);"""

new = """useEffect(() => {
  if (moduloActivo === 'conversacion' && mensajesChat.length > 0) {
    setTimeout(() => {
      const chatBox = document.getElementById('chat-box-leccion');
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
        chatBox.focus();
      }
    }, 300);
  }
}, [mensajesChat]);"""

c = c.replace(old, new)

# Agregar tabIndex al chat box para evitar scroll de pagina
c = c.replace(
    "id='chat-box-leccion' style={{ background: '#f5f5f5'",
    "id='chat-box-leccion' tabIndex='-1' style={{ background: '#f5f5f5', outline: 'none',"
)

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')