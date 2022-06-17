import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'domain_tests'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('date')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
