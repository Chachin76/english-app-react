f = open('src/components/Login.jsx', encoding='utf-8')
c = f.read()
f.close()

# Buscar y ver el area del problema
idx = c.find('modoReset')
print(c[idx-200:idx+400])