f = open('src/components/MiCamino.jsx', encoding='utf-8')
c = f.read()
f.close()

# Agregar import de Conversacion
c = c.replace(
    "import LeccionModulos from './LeccionModulos';",
    "import LeccionModulos from './LeccionModulos';\nimport Conversacion from './Conversacion';"
)

f = open('src/components/MiCamino.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')