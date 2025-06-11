import Especialista from '#models/especialista'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const especialista = await Especialista.createMany([
      {
        nombre_completo: 'Dr. Juan Melo',
        especialidad: 'Cardiología',
        registro_profesional: 'CP123456',
        activo: true,
      },
      {
        nombre_completo: 'Dra. Diana Triana',
        especialidad: 'Pediatría',
        registro_profesional: 'PG654321',
        activo: true,
      },
      {
        nombre_completo: 'Dr. Luisa Sanchez',
        especialidad: 'Dermatología',
        registro_profesional: 'DM789012',
        activo: true,
      },
      {
        nombre_completo: 'Dra. Laura Morales',
        especialidad: 'Ginecología',
        registro_profesional: 'GF345678',
        activo: true,
      },
      {
        nombre_completo: 'Dra. Valentina Melo',
        especialidad: 'Neurología',
        registro_profesional: 'NL901234',
        activo: true,
      },
    ])
  }
}