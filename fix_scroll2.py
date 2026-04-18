f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

old = """useEffect(() => {
  if (moduloActivo === 'conversacion' && mensajesChat.length > 0) {
    setTimeout(() => {
      const chatBox = document.getElementById('chat-box-leccion');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);
  }
}, [mensajesChat]);"""

new = """useEffect(() => {
  if (moduloActivo === 'conversacion') {
    setTimeout(() => {
      const chatBox = document.getElementById('chat-box-leccion');
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
        chatBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 200);
  }
}, [mensajesChat, cargando]);"""

c = c.replace(old, new)

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')