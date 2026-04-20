f = open('src/components/Login.jsx', encoding='utf-8')
c = f.read()
f.close()

# Remover el boton mal ubicado dentro del ternario
old = """          </button>
<button onClick={() => setModoReset(!modoReset)}"""

new = """          </button>
        )}
        <button onClick={() => setModoReset(!modoReset)}"""

c = c.replace(old, new)

# Remover el cierre extra que quedo
c = c.replace(
    """        )}
      </div>
    </div>
  );
}
export default Login;""",
    """      </div>
    </div>
  );
}
export default Login;"""
)

f = open('src/components/Login.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')