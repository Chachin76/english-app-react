# -*- coding: utf-8 -*-
f = open('src/components/LeccionModulos.jsx', encoding='utf-8')
c = f.read()
f.close()

# Bug 1: Fix botones sin emojis
c = c.replace("{ id: 'corrector', nombre: 'Corrector', emoji: 'Corrector' }", "{ id: 'corrector', nombre: 'Corrector' }")
c = c.replace("{ id: 'conversacion', nombre: 'Conversacion', emoji: 'Chat' }", "{ id: 'conversacion', nombre: 'Conversacion' }")
c = c.replace("{ id: 'frases', nombre: 'Frases', emoji: 'Frases' }", "{ id: 'frases', nombre: 'Frases' }")
c = c.replace("{ id: 'vocabulario', nombre: 'Vocabulario', emoji: 'Vocab' }", "{ id: 'vocabulario', nombre: 'Vocabulario' }")
c = c.replace("{ id: 'situacion', nombre: 'Situaciones', emoji: 'Situac' }", "{ id: 'situacion', nombre: 'Situaciones' }")
c = c.replace("{ id: 'dictado', nombre: 'Dictado', emoji: 'Dictado' }", "{ id: 'dictado', nombre: 'Dictado' }")
c = c.replace("{ id: 'lectura', nombre: 'Lectura', emoji: 'Lectura' }", "{ id: 'lectura', nombre: 'Lectura' }")
c = c.replace("{ id: 'cultura', nombre: 'Cultura', emoji: 'Cultura' }", "{ id: 'cultura', nombre: 'Cultura' }")

# Bug 2: Fix scroll - no scrollear mientras carga
c = c.replace(
    "}, [mensajesChat, cargando]);",
    "}, [mensajesChat]);"
)
c = c.replace(
    "}, [mensajesChat]);",
    "}, [mensajesChat]);"
)

# Bug 3: Fix boton terminar conversacion - cortar voz
c = c.replace(
    "onClick={() => { setModuloActivo(null); setMensajesChat([]); }}",
    "onClick={() => { window.speechSynthesis.cancel(); setModuloActivo(null); setMensajesChat([]); }}"
)

f = open('src/components/LeccionModulos.jsx', 'w', encoding='utf-8')
f.write(c)
f.close()
print('Listo')