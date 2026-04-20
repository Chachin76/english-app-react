f = open('src/components/Login.jsx', encoding='utf-8')
c = f.read()
f.close()

# Ver el area del problema alrededor de linea 98-105
idx = c.find(') : (')
print(repr(c[idx:idx+500]))