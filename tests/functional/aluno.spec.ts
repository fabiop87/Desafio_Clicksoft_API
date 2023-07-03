import { test } from '@japa/runner'
import Aluno from 'App/Models/Aluno'
import AlunosController from 'App/Controllers/Http/AlunosController'


test.group('Alunos', (group) => {
group.tap((test) => test.tags(['@alunoeprofessor']))

  test('store - cria um novo aluno', async ({ assert }) => {
    const request = {
      only: () => ({
        nome: 'Maria',
        email: 'maria@example.com',
        matricula: '2021002',
        data_nascimento: '2001-01-01'
      })
    }

    const controller = new AlunosController()
    const result = await controller.store({ request })

    assert.instanceOf(result, Aluno)
    assert.equal(result.nome, 'Maria')
    assert.equal(result.email, 'maria@example.com')
    assert.equal(result.matricula, '2021002')
    assert.equal(result.data_nascimento, '2001-01-01')
  })

  test('update - atualiza um aluno existente', async ({ assert }) => {
    const aluno = await Aluno.create({
      nome: 'João',
      email: 'joao@example.com',
      matricula: '2021001',
      data_nascimento: '2000-01-01'
    })

    const params = { id: aluno.id }
    const request = {
      only: () => ({
        nome: 'José',
        email: 'jose@example.com',
        matricula: '2021001',
        data_nascimento: '2002-01-01'
      })
    }

    const controller = new AlunosController()
    const result = await controller.update({ params, request })

    assert.exists(result)
    assert.equal(result.nome, 'José')
    assert.equal(result.email, 'jose@example.com')
    assert.equal(result.matricula, '2021001')
    assert.equal(result.data_nascimento, '2002-01-01')

  })


  test('destroy - exclui um aluno existente', async ({ assert }) => {
    const aluno = await Aluno.create({
      nome: 'Jonson2',
      email: 'jonson2@example.com',
      matricula: '4256648',
      data_nascimento: '2000-01-01'
    });

    const params = { id: aluno.id };

    const controller = new AlunosController();
    const result = await controller.destroy({ params });

    assert.deepEqual(result, { message: 'Aluno excluído com sucesso' }, 'A mensagem de sucesso não é retornada corretamente');

    // Verificar se o aluno foi excluído
    const alunoExcluido = await Aluno.find(aluno.id);
    assert.isNull(alunoExcluido, 'O aluno não foi excluído corretamente');
  });



  test('show - retorna um aluno existente', async ({ assert }) => {
    const aluno = await Aluno.create({
      nome: 'awawawa',
      email: 'awawa@example.com',
      matricula: '20215222001',
      data_nascimento: '2000-01-01'
    })

    const params = { id: aluno.id }

    const controller = new AlunosController()
    const result = await controller.show({ params })

    assert.exists(result)
    assert.equal(result.id, aluno.id)
    assert.equal(result.nome, aluno.nome)
    assert.equal(result.email, aluno.email)
    assert.equal(result.matricula, aluno.matricula)
  })



  test('show - retorna null para aluno inexistente', async ({ assert }) => {
    const params = { id: 123456 };

    const controller = new AlunosController();
    const result = await controller.show({ params });

    assert.isNull(result, 'O resultado não deve ser null');
  });

})



