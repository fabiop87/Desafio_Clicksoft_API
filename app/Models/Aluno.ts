import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne} from '@ioc:Adonis/Lucid/Orm'

import SalaAluno from './SalaAluno'

export default class Aluno extends BaseModel {
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

  //relação com o model SalaAluno

  @hasOne(() => SalaAluno, {foreignKey:`aluno_id`})
  public sala: HasOne<typeof SalaAluno>




}
