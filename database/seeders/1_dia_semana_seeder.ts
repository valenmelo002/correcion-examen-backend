import DiaSemana from '#models/dia_semana'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const dias_semana = await DiaSemana.createMany([
      { nombre: 'Lunes' },
      { nombre: 'Martes' },
      { nombre: 'Miércoles' },
      { nombre: 'Jueves' },
      { nombre: 'Viernes' },
      { nombre: 'Sábado' },
      { nombre: 'Domingo' },
    ])
  }
}
