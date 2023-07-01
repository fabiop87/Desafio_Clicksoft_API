import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Aluno from './Aluno'
import Sala from './Sala'

export default class SalaAluno extends BaseModel {

  public static table = 'aluno_sala'

  @column({ isPrimary: true })
  public aluno_id: number

  @column({ isPrimary: true })
  public sala_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relações com o model Aluno e Sala
  @belongsTo(() => Aluno, {
    foreignKey: 'aluno_id',
  })
  public aluno: BelongsTo<typeof Aluno>

  @belongsTo(() => Sala, {
    foreignKey: 'sala_id',
  })
  public sala: BelongsTo<typeof Sala>



}
