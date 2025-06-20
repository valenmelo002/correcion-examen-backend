import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Especialista from '#models/especialista'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import DiaSemana from '#models/dia_semana'

export default class EspecialistaHorario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare especialista_id: number

  @column()
  declare dia_semana_id: number

  @column()
  declare hora_inicio: string // HH:mm:ss

  @column()
  declare hora_fin: string // HH:mm:ss

  @belongsTo(() => Especialista, {
    foreignKey: 'especialista_id',
  })
  declare especialista: BelongsTo<typeof Especialista>

  @belongsTo(() => DiaSemana, {
    foreignKey: 'dia_semana_id',
  })
  declare diaSemana: BelongsTo<typeof DiaSemana>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
