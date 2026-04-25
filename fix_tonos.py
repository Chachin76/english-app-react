f = open('src/components/EscrituraPinyin.jsx', encoding='utf-8')
c = f.read()
f.close()

old = '''const TONOS = [
  { tono: "1er tono", marca: "macron (linea recta)", ejemplo: "\\u5999", pinyin: "miao1", fonetica: "voz alta y plana, como cantar una nota larga", color: "#4f46e5" },
  { tono: "2do tono", marca: "acento agudo (sube)", ejemplo: "\\u5999", pinyin: "miao2", fonetica: "sube como cuando preguntas algo", color: "#059669" },
  { tono: "3er tono", marca: "acento circunflejo (baja y sube)", ejemplo: "\\u5999", pinyin: "miao3", fonetica: "baja y sube, como un suspiro", color: "#d97706" },
  { tono: "4to tono", marca: "acento grave (baja)", ejemplo: "\\u5999", pinyin: "miao4", fonetica: "baja fuerte y rapido, como dar una orden", color: "#dc2626" },
  { tono: "Tono neutro", marca: "sin marca", ejemplo: "\\u5999", pinyin: "miao", fonetica: "corto y sin enfasis, depende del contexto", color: "#6b7280" },
];'''

new = '''const TONOS = [
  { tono: "1er tono", marca: "macron (linea recta)", ejemplo: "\\u5988\\u5988", pinyin: "ma1 ma", fonetica: "voz alta y plana, como cantar una nota larga", color: "#4f46e5" },
  { tono: "2do tono", marca: "acento agudo (sube)", ejemplo: "\\u6765", pinyin: "lai2", fonetica: "sube como cuando preguntas algo", color: "#059669" },
  { tono: "3er tono", marca: "acento circunflejo (baja y sube)", ejemplo: "\\u4F60\\u597D", pinyin: "ni3 hao3", fonetica: "baja y sube, como un suspiro", color: "#d97706" },
  { tono: "4to tono", marca: "acento grave (baja)", ejemplo: "\\u662F", pinyin: "shi4", fonetica: "baja fuerte y rapido, como dar una orden", color: "#dc2626" },
  { tono: "Tono neutro", marca: "sin marca", ejemplo: "\\u5417", pinyin: "ma", fonetica: "corto y sin enfasis, particula de pregunta", color: "#6b7280" },
];'''

c = c.replace(old, new)

f = open('src/components/EscrituraPinyin.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')