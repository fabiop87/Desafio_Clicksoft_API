import { test } from '@japa/runner'
import Professor from 'App/Models/Professor'
import ProfessorsController from 'App/Controllers/Http/ProfessorsController'

test.group('Professores', (group) => {
  group.tap((test) => test.tags(['@alunoeprofessor']))
  
  test('store - cria um novo professor', async ({ assert }) => {
    const request = {
      only: () => ({
        nome: 'Mateus',
        email: 'mateus@example.com',
        matricula: '2757',
        data_nascimento: '2000-01-01'
      })
    }

    const controller = new ProfessorsController()
    const result = await controller.store({ request })

    assert.instanceOf(result, Professor)
    assert.equal(result.nome, 'Mateus')
    assert.equal(result.email, 'mateus@example.com')
    assert.equal(result.matricula, '2757')
    assert.equal(result.data_nascimento, '2000-01-01')
  })

  test('update - atualiza um professor existente', async ({ assert }) => {
    const professor = await Professor.create({
      nome: 'Josney',
      email: 'josney@example.com',
      matricula: '255',
      data_nascimento: '2000-01-01'
    })

    const params = { id: professor.id }
    const request = {
      only: () => ({
        nome: 'Josney2',
        email: 'josney@example.com',
        matricula: '255',
        data_nascimento: '2001-01-01'
      })
    }

    const controller = new ProfessorsController()
    const result = await controller.update({ params, request })

    assert.exists(result)
    assert.equal(result.nome, 'Josney2')
    assert.equal(result.email, 'josney@example.com')
    assert.equal(result.matricula, '255')
    assert.equal(result.data_nascimento, '2001-01-01')
  })

  test('destroy - exclui um professor existente', async ({ assert }) => {
    const professor = await Professor.create({
      nome: 'Jonson',
      email: 'jonson@example.com',
      matricula: '2425',
      data_nascimento: '2000-01-01'
    });

    const params = { id: professor.id };

    const controller = new ProfessorsController();
    const result = await controller.destroy({ params });

    assert.deepEqual(result, { message: 'Professor excluído com sucesso' }, 'A mensagem de sucesso não é retornada corretamente');

    // Verificar se o professor foi excluído
    const professorExcluido = await Professor.find(professor.id);
    assert.isNull(professorExcluido, 'O professor não foi excluído corretamente');
  });

  test('show - retorna um professor existente', async ({ assert }) => {
    const professor = await Professor.create({
      nome: 'awawawa',
      email: 'awawa@example.com',
      matricula: '2000',
      data_nascimento: '2000-01-01'
    })

    const params = { id: professor.id }

    const controller = new ProfessorsController()
    const result = await controller.show({ params })

    assert.exists(result)
    assert.equal(result.id, professor.id)
    assert.equal(result.nome, professor.nome)
    assert.equal(result.email, professor.email)
    assert.equal(result.matricula, professor.matricula)
  })

  test('show - retorna null para professor inexistente', async ({ assert }) => {
    const params = { id: 123456 };

    const controller = new ProfessorsController();
    const result = await controller.show({ params });

    assert.isNull(result, 'O resultado não deve ser null');
  });
})
