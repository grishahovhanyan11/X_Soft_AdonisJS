import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'domain_tests'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('status')
      table.string('statusText')
      table.dateTime('date').defaultTo(this.now())
      table.integer('userId').unsigned().references('id').inTable('users')
      table.integer('domainId').unsigned().references('id').inTable('domains')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
