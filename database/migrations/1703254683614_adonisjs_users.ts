import BaseSchema from '@ioc:Adonis/Lucid/Schema'

import { UserRoles } from 'App/Enums/UserRoles'

export default class extends BaseSchema {
  protected tableName = 'adonisjs_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('role').references('role_id').inTable('user_roles').defaultTo(UserRoles.USER)
      table.string('username').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
