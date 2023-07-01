// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Aluno from "App/Models/Aluno"

export default class AlunosController {

    async store({ request }) {
        const data = request.only(['nome', 'email', 'matricula', 'data_nascimento'])
        const aluno: Aluno | null = await Aluno.create(data)
        return aluno
    }

    async update({ params, request }) {
        const aluno: Aluno | null = await Aluno.find(params.id)
        const data = request.only(['nome', 'email', 'matricula', 'data_nascimento'])
        if (aluno) {
            aluno.merge(data)
            await aluno.save()

        }
        return aluno
    }

    async destroy({ params }) {
        const aluno: Aluno | null = await Aluno.find(params.id)
        if (aluno) {

            await aluno.delete()
        }
        return { message: 'Aluno excluído com sucesso' }
    }

    async show({ params }) {
        const aluno: Aluno | null = await Aluno.find(params.id)
        return aluno
    }


    //

}
