f = open('src/components/EscrituraLatina.jsx', encoding='utf-8')
c = f.read()
f.close()

c = c.replace(
    """                <button onClick={() => hablar(l.ejemplo)}
                  style={{ background: "#e8f0fe", border: "none", borderRadius: "8px", padding: "8px 10px", cursor: "pointer", color: "#1a237e", fontSize: "0.8rem", fontWeight: "600" }}>
                  Escuchar
                </button>""",
    """                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <button onClick={() => hablar(l.letra.split(" ")[0])}
                    style={{ background: "#e8f0fe", border: "none", borderRadius: "8px", padding: "6px 10px", cursor: "pointer", color: "#1a237e", fontSize: "0.8rem", fontWeight: "600" }}>
                    Letra
                  </button>
                  <button onClick={() => hablar(l.ejemplo)}
                    style={{ background: "#f0fdf4", border: "none", borderRadius: "8px", padding: "6px 10px", cursor: "pointer", color: "#166534", fontSize: "0.8rem", fontWeight: "600" }}>
                    Ejemplo
                  </button>
                </div>"""
)

f = open('src/components/EscrituraLatina.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')