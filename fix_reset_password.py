f = open('src/components/ResetPassword.jsx', encoding='utf-8')
c = f.read()
f.close()

# Agregar estado para mostrar contraseña
c = c.replace(
    "const [listo, setListo] = useState(false);",
    "const [listo, setListo] = useState(false);\n  const [verPassword, setVerPassword] = useState(false);"
)

# Cambiar inputs de password para que tengan boton de ver
c = c.replace(
    """        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '12px', fontSize: '1rem', boxSizing: 'border-box', color: '#333' }}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmar}
          onChange={e => setConfirmar(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '12px', fontSize: '1rem', boxSizing: 'border-box', color: '#333' }}
        />""",
    """        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <input
            type={verPassword ? 'text' : 'password'}
            placeholder="Nueva contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', paddingRight: '100px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box', color: '#333' }}
          />
          <button onClick={() => setVerPassword(!verPassword)} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#4f46e5', fontSize: '0.85rem', fontWeight: '600' }}>
            {verPassword ? 'Ocultar' : 'Ver'}
          </button>
        </div>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <input
            type={verPassword ? 'text' : 'password'}
            placeholder="Confirmar contraseña"
            value={confirmar}
            onChange={e => setConfirmar(e.target.value)}
            style={{ width: '100%', padding: '12px', paddingRight: '100px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box', color: '#333' }}
          />
        </div>"""
)

f = open('src/components/ResetPassword.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')