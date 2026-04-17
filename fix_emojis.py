f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

c = c.replace("'⏹ Detener microfono'", "'Detener microfono'")
c = c.replace("'🎤 Hablar'", "'Hablar'")

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')