f = open('src/components/MiCamino.jsx', encoding='utf-8')
c = f.read()
f.close()

# Agregar import
c = c.replace(
    "import EscrituraHangul from './EscrituraHangul';",
    "import EscrituraHangul from './EscrituraHangul';\nimport EscrituraPinyin from './EscrituraPinyin';"
)

# Agregar componente para chino
c = c.replace(
    "{idioma === 'coreano' && leccionData.leccion <= 5 && <EscrituraHangul />}",
    """{idioma === 'coreano' && leccionData.leccion <= 5 && <EscrituraHangul />}
{idioma === 'chino' && leccionData.leccion <= 5 && <EscrituraPinyin />}"""
)

f = open('src/components/MiCamino.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')