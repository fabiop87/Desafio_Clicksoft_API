import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'salas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('numero_sala').notNullable()
      table.integer('capacidade_alunos').notNullable()
      table.boolean('disponibilidade').notNullable().defaultTo(true)
      table.integer('professor_id').unsigned().references('id').inTable('professors').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
