// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Sala from "App/Models/Sala"


export default class SalasController {
    async store({ request }) {
        const data = request.only(['numero_sala', 'capacidade_alunos', 'disponibilidade', 'professor_id'])
        const sala = await Sala.create(data)
        return sala
    }

    async update({ params, request }) {
        const sala = await Sala.find(params.id)
        const data = request.only(['numero_sala', 'capacidade_alunos', 'disponibilidade', 'professor_id'])
        if (sala) {
            sala.merge(data)
            await sala.save()
        }
        return sala
    }

    async destroy({ params }) {
        const sala = await Sala.find(params.id)
        if (sala) {
            await sala.delete()

        }
        return { message: 'Sala excluída com sucesso' }
    }

    async show({ params }) {
        const sala = await Sala.find(params.id)
        return sala
    }

    public async listarTodasSalas({ response }) {
        try {
            const salas = await Sala.all()
            return response.json({ salas })
        } catch (error) {
            return response.status(400).json({ message: 'Não foi possível listar as salas' + error })
        }
    }



}





