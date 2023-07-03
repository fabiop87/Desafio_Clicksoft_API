import { test } from '@japa/runner'
import SalaAlunosController from 'App/Controllers/Http/SalaAlunosController'
import Aluno from 'App/Models/Aluno'
import Sala from 'App/Models/Sala'

test.group('SalaAlunos', (group) => {
  group.tap((test) => test.tags(['@salaaluno']))

  test('alocarAluno - aloca um aluno em uma sala', async ({ assert }) => {
    const aluno = await Aluno.create({
      nome: 'Jonão',
      matricula: '1234556',
      data_nascimento: '2005-01-01'
    })

    const sala = await Sala.create({
      numero_sala: 'A102',
      capacidade_alunos: 30,
      disponibilidade: true,
      professor_id: 1
    })

    const request = {
      all: () => ({
        aluno_id: aluno.id,
        sala_id: sala.id
      })
    }

    const response = {
      status: (status) => ({
        json: (data) => ({ status, data })
      })
    }

    const controller = new SalaAlunosController()
    const result = await controller.alocarAluno({ request, response })

    assert.deepEqual(result, { status: 201, data: { message: 'Aluno alocado com sucesso' } })
  })

  test('removerAluno - remove um aluno de uma sala', async ({ assert }) => {
    const alunoId = 1;
    const salaId = 1;
  
    const response = {
      json: (data) => data,
      status: (status) => ({
        json: (data) => ({ status, data })
      })
    };
  
    const controller = new SalaAlunosController();
    const result = await controller.removerAluno({ params: { alunoId, salaId }, response });
  
    assert.deepEqual(result, { message: 'Aluno removido da sala com sucesso' });
  });
  
  test('listarAlunos - lista os alunos de uma sala', async ({ assert }) => {
    const salaId = 1;
  
    const response = {
      json: (data) => data,
      status: (status) => ({
        json: (data) => ({ status, data })
      })
    };
  
    const controller = new SalaAlunosController();
    const result = await controller.listarAlunos({ params: { salaId }, response });
  
    // Verifique se o resultado possui a estrutura esperada
    assert.isArray(result);
    assert.isNotEmpty(result);
  });
  
  test('listarSalasAluno - lista as salas de um aluno', async ({ assert }) => {
    const alunoId = 1;
  
    const response = {
      json: (data) => data,
      status: (status) => ({
        json: (data) => ({ status, data })
      })
    };
  
    const controller = new SalaAlunosController();
    const result = await controller.listarSalasAluno({ params: { alunoId }, response });
  
    // Verifique se o resultado possui a estrutura esperada
    assert.isObject(result);
    assert.property(result, 'resultado');
  });
  

})