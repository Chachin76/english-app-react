f = open('src/components/MiCamino.jsx', encoding='utf-8')
c = f.read()
f.close()

# Agregar import
c = c.replace(
    "import EscrituraKatakana from './EscrituraKatakana';",
    "import EscrituraKatakana from './EscrituraKatakana';\nimport EscrituraLatina from './EscrituraLatina';"
)

# Agregar componente en las lecciones 1-5 para idiomas latinos
c = c.replace(
    "{idioma === 'japones' && leccionData.leccion <= 5 && <EscrituraJapones />}",
    """{idioma === 'japones' && leccionData.leccion <= 5 && <EscrituraJapones />}
{['frances', 'aleman', 'portugues', 'italiano'].includes(idioma) && leccionData.leccion <= 3 && <EscrituraLatina idioma={idioma} />}"""
)

f = open('src/components/MiCamino.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')