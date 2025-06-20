import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'especialista_horarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('especialista_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('especialistas')
        .onDelete('CASCADE')
      table
        .integer('dia_semana_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('dia_semanas')
        .onDelete('CASCADE')
      table.time('hora_inicio').notNullable()
      table.time('hora_fin').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
