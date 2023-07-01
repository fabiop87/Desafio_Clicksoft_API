/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Os comentários são óbvios mas fui fazendo assim para não me perder na hora de testar :), está com os mesmos nomes no insomnia

Route.get('/', async () => {
  return { hello: 'world' }
})

//alunos
Route.post('/alunos', 'AlunosController.store')// POST aluno
Route.put('/alunos/:id', 'AlunosController.update')//PUT aluno
Route.delete('/alunos/:id', 'AlunosController.destroy')// Delete aluno
Route.get('/alunos/:id', 'AlunosController.show')//GET aluno

//professores
Route.post('/professores', 'ProfessorsController.store')//POST professor
Route.put('/professores/:id', 'ProfessorsController.update')// PUT professor
Route.delete('/professores/:id', 'ProfessorsController.destroy')// Delete professor
Route.get('/professores/:id', 'ProfessorsController.show')//GET professor

//salas
Route.post('/salas', 'SalasController.store')//POST sala
Route.put('/salas/:id', 'SalasController.update')// PUT sala
Route.delete('/salas/:id', 'SalasController.destroy')// Delete sala
Route.get('/salas/:id', 'SalasController.show')//GET sala
Route.get('/todasAsSalas/', 'SalasController.listarTodasSalas')// GET todas as salas



//salas-aluno
Route.post('/sala-aluno', 'SalaAlunosController.alocarAluno')//alocar aluno
Route.delete('/sala-aluno/:alunoId/:salaId', 'SalaAlunosController.removerAluno')//Delete aluno da sala
Route.get('/sala-aluno/sala/:salaId', 'SalaAlunosController.listarAlunos')// listar alunos de uma determinada sala
Route.get('/sala-aluno/aluno/:alunoId', 'SalaAlunosController.listarSalasAluno') //listar salas aluno


