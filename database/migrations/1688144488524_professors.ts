import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'professors'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.string('email').notNullable().unique()
      table.string('matricula').notNullable().unique()
      table.date('data_nascimento').notNullable()
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
