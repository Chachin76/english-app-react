f = open('src/components/MiCamino.jsx', encoding='utf-8')
c = f.read()
f.close()

old = """{!leccionCompletada && (
  <LeccionModulos
    idioma={idioma}
    nivel={nivelActivo}
    tema={leccionData.tema}
    onVolver={() => {}}
  />
)}"""

new = """{!leccionCompletada && (
  <LeccionModulos
    idioma={idioma}
    nivel={nivelActivo}
    tema={leccionData.tema}
    onVolver={() => {}}
  />
)}
"""

# Mover LeccionModulos ANTES de los ejercicios
# Primero buscar donde estan los ejercicios
ejercicios_marker = """{!leccionCompletada && leccionData.ejercicios && (
        <div>
          <h4>Ejercicio"""

new_orden = """{!leccionCompletada && (
  <LeccionModulos
    idioma={idioma}
    nivel={nivelActivo}
    tema={leccionData.tema}
    onVolver={() => {}}
  />
)}
      {!leccionCompletada && leccionData.ejercicios && (
        <div>
          <h4>Ejercicio"""

# Remover LeccionModulos de donde esta
c = c.replace("""{!leccionCompletada && (
  <LeccionModulos
    idioma={idioma}
    nivel={nivelActivo}
    tema={leccionData.tema}
    onVolver={() => {}}
  />
)}
      {leccionCompletada &&""", """{leccionCompletada &&""")

# Agregar LeccionModulos antes de ejercicios
c = c.replace(
    """{!leccionCompletada && leccionData.ejercicios && (
        <div>
          <h4>Ejercicio""",
    new_orden
)

f = open('src/components/MiCamino.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')