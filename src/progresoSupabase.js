import { supabase } from './supabase';

// Obtener o crear el progreso del usuario
export async function obtenerProgreso() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('progreso_usuarios')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error && error.code === 'PGRST116') {
    // No existe, lo creamos
    const { data: nuevo } = await supabase
      .from('progreso_usuarios')
      .insert({ user_id: user.id })
      .select()
      .single();
    return nuevo;
  }

  return data;
}

// Guardar idioma y nivel
export async function guardarIdiomaYNivel(idioma, nivel) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from('progreso_usuarios')
    .upsert({
      user_id: user.id,
      idioma,
      nivel,
      ultima_conexion: new Date().toISOString()
    }, { onConflict: 'user_id' });
}

// Registrar actividad en un módulo
export async function registrarActividadSupabase(modulo) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const progreso = await obtenerProgreso();
  if (!progreso) return;

  const actualizado = {
    user_id: user.id,
    [modulo]: (progreso[modulo] || 0) + 1,
    ultima_conexion: new Date().toISOString()
  };

  await supabase
    .from('progreso_usuarios')
    .upsert(actualizado, { onConflict: 'user_id' });
}

// Resetear nivel
export async function resetearNivel() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from('progreso_usuarios')
    .upsert({
      user_id: user.id,
      nivel: '',
      ultima_conexion: new Date().toISOString()
    }, { onConflict: 'user_id' });
}