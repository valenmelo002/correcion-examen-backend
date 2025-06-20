import Especialista from '#models/especialista'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const especialista = await Especialista.createMany([
      {
        nombre_completo: 'Dr. Simón Valdés',
        especialidad: 'Reumatología',
        registro_profesional: 'RV102938',
        activo: true,
      },
      {
        nombre_completo: 'Dra. Emilia Quintero',
        especialidad: 'Endocrinología',
        registro_profesional: 'EQ849201',
        activo: true,
      },
      {
        nombre_completo: 'Dr. Tomás Rivera',
        especialidad: 'Otorrinolaringología',
        registro_profesional: 'TR564738',
        activo: true,
      },
      {
        nombre_completo: 'Dra. Zoe Martínez',
        especialidad: 'Oftalmología',
        registro_profesional: 'ZM112233',
        activo: true,
      },
      {
        nombre_completo: 'Dr. Elías Franco',
        especialidad: 'Urología',
        registro_profesional: 'EF998877',
        activo: true,
      },
    ])
  }
}
