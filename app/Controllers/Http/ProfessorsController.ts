// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Professor from "App/Models/Professor"

export default class ProfessorsController {

  async store({ request }) {
    const data = request.only(['nome', 'email', 'matricula', 'data_nascimento'])
    const professor = await Professor.create(data)
    return professor
  }

  async update({ params, request }) {
    const professor = await Professor.find(params.id)
    const data = request.only(['nome', 'email', 'matricula', 'data_nascimento'])
    if (professor) {
      professor.merge(data)
      await professor.save()
    }
    return professor
  }

  async destroy({ params }) {
    const professor = await Professor.find(params.id)
    if (professor) {
      await professor.delete()
    }
    return { message: 'Professor excluído com sucesso' }
  }

  async show({ params }) {
    const professor = await Professor.find(params.id)
    return professor
  }
}
