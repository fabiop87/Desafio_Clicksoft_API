import { test } from '@japa/runner'
import Sala from 'App/Models/Sala'
import SalasController from 'App/Controllers/Http/SalasController'

test.group('Salas', (group) => {
  
  group.tap((test) => test.tags(['@salas']))

  test('listarTodasSalas - retorna todas as salas', async ({ assert }) => {
    const sala1 = await Sala.create({
      numero_sala: 'E501',
      capacidade_alunos: 10,
      disponibilidade: true,
      professor_id: 1
    })

    const sala2 = await Sala.create({
      numero_sala: 'E502',
      capacidade_alunos: 20,
      disponibilidade: true,
      professor_id: 1
    })

    const controller = new SalasController()
    const response = {
      json: (data) => data
    }
    const result = await controller.listarTodasSalas({ response })

    assert.deepEqual(result, { salas: [sala1, sala2] })
  })

  test('listarTodasSalas - retorna erro ao listar as salas', async ({ assert }) => {
    const controller = new SalasController()
    const response = {
      status: (status) => ({
        json: (data) => ({ status, data })
      })
    }

    const error = new Error('Não foi possível listar as salas')
    const result = await controller.listarTodasSalas({ response })

    assert.deepEqual(result, {
      status: 400,
      data: { message: 'Não foi possível listar as salas' + error }
    })
  })
  //

  test('store - cria uma nova sala', async ({ assert }) => {
    const request = {
      only: () => ({
        numero_sala: 'A101',
        capacidade_alunos: 30,
        disponibilidade: true,
        professor_id: 1
      })
    }

    const controller = new SalasController()
    const result = await controller.store({ request })

    assert.instanceOf(result, Sala)
    assert.equal(result.numero_sala, 'A101')
    assert.equal(result.capacidade_alunos, 30)
    assert.isTrue(result.disponibilidade)
    assert.equal(result.professor_id, 1)
  })

  test('update - atualiza uma sala existente', async ({ assert }) => {
    const sala = await Sala.create({
      numero_sala: 'B201',
      capacidade_alunos: 25,
      disponibilidade: true,
      professor_id: 1
    })

    const params = { id: sala.id }
    const request = {
      only: () => ({
        numero_sala: 'B202',
        capacidade_alunos: 35,
        disponibilidade: false,
        professor_id: 1
      })
    }

    const controller = new SalasController()
    const result = await controller.update({ params, request })

    assert.exists(result)
    assert.equal(result.numero_sala, 'B202')
    assert.equal(result.capacidade_alunos, 35)
    assert.isFalse(result.disponibilidade)
    assert.equal(result.professor_id, 1)
  })

  test('destroy - exclui uma sala existente', async ({ assert }) => {
    const sala = await Sala.create({
      numero_sala: 'C301',
      capacidade_alunos: 20,
      disponibilidade: true,
      professor_id: 1
    })

    const params = { id: sala.id }

    const controller = new SalasController()
    const result = await controller.destroy({ params })

    assert.deepEqual(result, { message: 'Sala excluída com sucesso' }, 'A mensagem de sucesso não é retornada corretamente')

    // Verificar se a sala foi excluída
    const salaExcluida = await Sala.find(sala.id)
    assert.isNull(salaExcluida, 'A sala não foi excluída corretamente')
  })

  test('show - retorna uma sala existente', async ({ assert }) => {
    const sala = await Sala.create({
      numero_sala: 'D401',
      capacidade_alunos: 15,
      disponibilidade: true,
      professor_id: 1
    })

    const params = { id: sala.id }

    const controller = new SalasController()
    const result = await controller.show({ params })

    assert.exists(result)
    assert.equal(result.id, sala.id)
    assert.equal(result.numero_sala, sala.numero_sala)
    assert.equal(result.capacidade_alunos, sala.capacidade_alunos)
    assert.equal(result.disponibilidade, sala.disponibilidade)
    assert.equal(result.professor_id, sala.professor_id)
  })

  test('show - retorna null para sala inexistente', async ({ assert }) => {
    const params = { id: 123456 }

    const controller = new SalasController()
    const result = await controller.show({ params })

    assert.isNull(result, 'O resultado não deve ser null')
  })

  
})
