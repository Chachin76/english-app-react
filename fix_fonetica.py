f = open('src/components/MiCamino.jsx', encoding='utf-8')
c = f.read()
f.close()

# Agregar imports
c = c.replace(
    "import EscrituraPinyin from './EscrituraPinyin';",
    "import EscrituraPinyin from './EscrituraPinyin';\nimport FoneticaIngles from './FoneticaIngles';\nimport FoneticaEspanol from './FoneticaEspanol';"
)

# Agregar componentes para ingles y espanol
c = c.replace(
    "{idioma === 'chino' && leccionData.leccion <= 5 && <EscrituraPinyin />}",
    """{idioma === 'chino' && leccionData.leccion <= 5 && <EscrituraPinyin />}
{idioma === 'ingles' && leccionData.leccion <= 3 && <FoneticaIngles />}
{idioma === 'espanol' && leccionData.leccion <= 3 && <FoneticaEspanol />}"""
)

f = open('src/components/MiCamino.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')