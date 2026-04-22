f = open('src/components/Conversacion.jsx', encoding='utf-8')
c = f.read()
f.close()

# Remover el useEffect duplicado
duplicado = """  useEffect(() => {
    if (iniciada) {
      const saludo = SALUDO_IDIOMA[idioma] || SALUDO_IDIOMA['ingles'];
      setMensajes([{ rol: 'tutor', texto: saludo }]);
    }
  }, [iniciada, idioma]);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensajes]);
  function hablar(texto) {
    if (!window.speechSynthesis) returnuseEffect(() => {
    if (iniciada) {
      const saludo = SALUDO_IDIOMA[idioma] || SALUDO_IDIOMA['ingles'];
      setMensajes([{ rol: 'tutor', texto: saludo }]);
    }
  }, [iniciada, idioma]);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensajes]);
  function hablar(texto) {
    if (!window.speechSynthesis) return"""

correcto = """  useEffect(() => {
    if (iniciada) {
      const saludo = SALUDO_IDIOMA[idioma] || SALUDO_IDIOMA['ingles'];
      setMensajes([{ rol: 'tutor', texto: saludo }]);
    }
  }, [iniciada, idioma]);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensajes]);
  function hablar(texto) {
    if (!window.speechSynthesis) return"""

c = c.replace(duplicado, correcto)

f = open('src/components/Conversacion.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')