import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Feature extends BaseModel {
  @column({ isPrimary: true }) public feature_id: number
  @column() public feature_name: string
  @column() public feature_value: boolean
}
