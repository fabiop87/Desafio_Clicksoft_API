import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import SalaAluno from './SalaAluno'


export default class Sala extends BaseModel {

  static get fillable() {
    return ['numero_sala', 'capacidade_alunos', 'disponibilidade', 'professor_id'];
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public numero_sala: string

  @column()
  public capacidade_alunos: string

  @column()
  public disponibilidade: string

  @column()
  public professor_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime



  @hasOne(() => SalaAluno, {foreignKey:`sala_id`})
  public sala: HasOne<typeof SalaAluno>



}




