import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import EspecialistaHorario from '#models/especialista_horario'

export default class Especialista extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre_completo: string

  @column()
  declare especialidad: string

  @column()
  declare registro_profesional: string

  @hasMany(() => EspecialistaHorario, {
    foreignKey: 'especialista_id',
  })
  declare horarios: HasMany<typeof EspecialistaHorario>


  @column()
  declare activo: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
