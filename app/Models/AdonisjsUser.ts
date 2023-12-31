import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AdonisjsUser extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() public role: string
  @column() public username: string
  @column() public email: string
  @column({ serializeAs: null }) public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: AdonisjsUser) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
