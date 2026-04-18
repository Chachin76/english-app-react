f = open('src/App.jsx', encoding='utf-8')
c = f.read()
f.close()

# Reemplazar boton conversacion
c = c.replace(
    '<button className={moduloActivo === "conversacion" ? "nav-btn active" : "nav-btn"} onClick={() => setModuloActivo("conversacion")}>Conversacion</button>',
    '<button className="nav-btn" onClick={() => setMostrarConversacion(true)}>Conversacion</button>'
)

# Reemplazar modulo conversacion en main
c = c.replace(
    '{moduloActivo === "conversacion" && <Chat idioma={idioma} />}',
    ''
)

# Agregar componente Conversacion antes del cierre de ProtectedRoute
c = c.replace(
    '</ProtectedRoute>',
    '{mostrarConversacion && <Conversacion idioma={idioma} onCerrar={() => setMostrarConversacion(false)} />}\n    </ProtectedRoute>'
)

f = open('src/App.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')