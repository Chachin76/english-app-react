f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

c = c.replace(
    "<div id='chat-box-leccion' tabIndex='-1' style={{ background: '#f5f5f5', outline: 'none',, borderRadius: '8px', padding: '12px', height: '350px', marginBottom: '8px', overflowY: 'auto' }}",
    "<div id='chat-box-leccion' style={{ background: '#f5f5f5', borderRadius: '8px', padding: '12px', height: '350px', marginBottom: '8px', overflowY: 'auto' }}"
)

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')