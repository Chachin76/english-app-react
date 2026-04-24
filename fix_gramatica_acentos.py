f = open('src/components/Gramatica.jsx', encoding='utf-8')
c = f.read()
f.close()

# Definir acentos por idioma
acentos_map = """
const ACENTOS_POR_IDIOMA = {
  ingles:    [['en-US', 'Americano'], ['en-GB', 'Britanico']],
  frances:   [['fr-FR', 'Francia'], ['fr-CA', 'Quebec']],
  portugues: [['pt-BR', 'Brasil'], ['pt-PT', 'Portugal']],
  italiano:  [['it-IT', 'Estandar'], ['it-IT', 'Regional']],
  aleman:    [['de-DE', 'Alemania'], ['de-AT', 'Austria']],
  espanol:   [['es-ES', 'Espana'], ['es-AR', 'Argentina']],
  chino:     [['zh-CN', 'Mandarin'], ['zh-TW', 'Taiwan']],
  japones:   [['ja-JP', 'Estandar'], ['ja-JP', 'Formal']],
  coreano:   [['ko-KR', 'Estandar'], ['ko-KR', 'Formal']],
};
"""

# Agregar el mapa antes de function Gramatica
c = c.replace(
    'function Gramatica(',
    acentos_map + 'function Gramatica('
)

# Reemplazar los botones de acento fijos por dinamicos
old = """        {[['en-US','🇺🇸 Americano'],['en-GB','🇬🇧 Británico']].map(([lang, label]) => (
          <button
            key={lang}
            onClick={() => setAcento(lang)}
            style={{
              background: acento===lang ? '#e8f0fe' : 'var(--color-background-secondary)',
              color:      acento===lang ?"""

new = """        {(ACENTOS_POR_IDIOMA[idioma] || ACENTOS_POR_IDIOMA['ingles']).map(([lang, label]) => (
          <button
            key={lang + label}
            onClick={() => setAcento(lang)}
            style={{
              background: acento===lang ? '#e8f0fe' : 'var(--color-background-secondary)',
              color:      acento===lang ?"""

c = c.replace(old, new)

# Fix acento inicial segun idioma
c = c.replace(
    "const [acento, setAcento]                                 = useState('en-US');",
    "const [acento, setAcento] = useState((ACENTOS_POR_IDIOMA[idioma] || ACENTOS_POR_IDIOMA['ingles'])[0][0]);"
)

f = open('src/components/Gramatica.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')