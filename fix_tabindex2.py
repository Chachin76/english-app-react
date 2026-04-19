f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

c = c.replace(
    "tabIndex='-1' style={{ background: '#f5f5f5', outline: 'none',, borderRadius: '8px', padding: '12px', minHeight: '200px', marginBottom: '8px', maxHeight: '300px', overflowY: 'auto' }}",
    "style={{ background: '#f5f5f5', borderRadius: '8px', padding: '12px', minHeight: '200px', marginBottom: '8px', maxHeight: '300px', overflowY: 'auto' }}"
)

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')