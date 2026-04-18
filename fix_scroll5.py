f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

old = """useEffect(() => {
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

new = """useEffect(() => {
  if (moduloActivo === 'conversacion' && mensajesChat.length > 0) {
    setTimeout(() => {
      const chatBox = document.getElementById('chat-box-leccion');
      if (chatBox) {
        const pageY = window.scrollY;
        chatBox.scrollTop = chatBox.scrollHeight;
        window.scrollTo(0, pageY);
      }
    }, 300);
  }
}, [mensajesChat]);"""

c = c.replace(old, new)

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')