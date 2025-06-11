import vine from '@vinejs/vine'

export const createEspecialistaValidator = vine.compile(
  vine.object({
    nombre_completo: vine.string().minLength(3),
    especialidad: vine.string(),
    registro_profesional: vine.string().unique(async (db, value) => {
      const exists = await db.from('especialistas').where('registro_profesional', value).first()
      return !exists
    }),
    horarios: vine.array(
      vine.object({
        dia_semana_id: vine.number(),
        hora_inicio: vine.string().regex(/^\d{2}:\d{2}$/), // Ej: 08:00
        hora_fin: vine.string().regex(/^\d{2}:\d{2}$/),
      })
    ),
  })
)

export const updateEspecialistaValidator = vine.compile(
  vine.object({
    nombre_completo: vine.string().minLength(3),
    especialidad: vine.string(),
    registro_profesional: vine.string(), // en update no se valida unicidad para el mismo registro
    horarios: vine
      .array(
        vine.object({
          dia_semana_id: vine.number(),
          hora_inicio: vine.string().regex(/^\d{2}:\d{2}$/),
          hora_fin: vine.string().regex(/^\d{2}:\d{2}$/),
        })
      )
      .optional(),
  })
)