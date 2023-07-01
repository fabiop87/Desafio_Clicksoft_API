import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'aluno_sala'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
     table.integer('aluno_id').unsigned().references('id').inTable('alunos').notNullable()
      table.integer('sala_id').unsigned().references('id').inTable('salas').notNullable()
      table.primary(['aluno_id', 'sala_id'])
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
