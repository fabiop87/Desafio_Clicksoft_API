import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'

export default class Professor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome:string

  @column()
  public email:string

  @column()
  public matricula:string

  @column()
  data_nascimento:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Sala, {localKey:`id`})
  public sala: BelongsTo<typeof Sala>
}
