f = open('src/components/MiCamino.jsx', encoding='utf-8')
c = f.read()
f.close()

# Agregar import
c = c.replace(
    "import EscrituraLatina from './EscrituraLatina';",
    "import EscrituraLatina from './EscrituraLatina';\nimport EscrituraHangul from './EscrituraHangul';"
)

# Agregar componente para coreano
c = c.replace(
    "{['frances', 'aleman', 'portugues', 'italiano'].includes(idioma) && leccionData.leccion <= 3 && <EscrituraLatina idioma={idioma} />}",
    """{['frances', 'aleman', 'portugues', 'italiano'].includes(idioma) && leccionData.leccion <= 3 && <EscrituraLatina idioma={idioma} />}
{idioma === 'coreano' && leccionData.leccion <= 5 && <EscrituraHangul />}"""
)

f = open('src/components/MiCamino.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')