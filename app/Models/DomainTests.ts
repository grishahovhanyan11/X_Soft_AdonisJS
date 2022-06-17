import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Domain from 'App/Models/Domain'
import User from 'App/Models/User'

export default class DomainTests extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: number

  @column({ columnName: 'statusText' })
  public statusText: string

  @column({ columnName: 'userId' })
  public userId: number

  @hasOne(() => User, {
    localKey: 'userId',
    foreignKey: 'id',
  })
  public user: HasOne<typeof User>

  @column({ columnName: 'domainId' })
  public domainId: number

  @hasOne(() => Domain, {
    localKey: 'domainId',
    foreignKey: 'id',
  })
  public domain: HasOne<typeof Domain>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
