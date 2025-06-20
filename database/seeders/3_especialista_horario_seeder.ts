import EspecialistaHorario from '#models/especialista_horario'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await EspecialistaHorario.createMany([
      {
        especialista_id: 1,
        dia_semana_id: 1, // Lunes
        hora_inicio: '08:00',
        hora_fin: '12:00',
      },
      {
        especialista_id: 2,
        dia_semana_id: 3, // Miércoles
        hora_inicio: '14:00',
        hora_fin: '18:00',
      },
      {
        especialista_id: 1,
        dia_semana_id: 2, // Martes
        hora_inicio: '09:00',
        hora_fin: '13:00',
      },
      {
        especialista_id: 3,
        dia_semana_id: 4, // Jueves
        hora_inicio: '15:00',
        hora_fin: '19:00',
      },
      {
        especialista_id: 4,
        dia_semana_id: 5, // Viernes
        hora_inicio: '10:00',
        hora_fin: '12:00',
      },
      {
        especialista_id: 2,
        dia_semana_id: 1, // Lunes
        hora_inicio: '08:00',
        hora_fin: '11:00',
      },
      {
        especialista_id: 3,
        dia_semana_id: 3, // Miércoles
        hora_inicio: '13:00',
        hora_fin: '16:00',
      },
    ])
  }
}
