// import type { Http } from '@ioc:Adonis/Core/HttpContext'

import Aluno from "App/Models/Aluno";
import Professor from "App/Models/Professor";
import Sala from "App/Models/Sala";
import SalaAluno from "App/Models/SalaAluno";



export default class SalaAlunosController {
    public async alocarAluno({ request, response }) {
        const { aluno_id, sala_id } = request.all();

        try {
            const aluno = await Aluno.findOrFail(aluno_id);
            const sala = await Sala.findOrFail(sala_id);

            // RN03: Verificar se o aluno já está alocado na sala
            const alunoAlocado = await SalaAluno.query().where('aluno_id', aluno.id).where('sala_id', sala.id).first();
            if (alunoAlocado) {
                return response.status(400).json({ message: 'O aluno já está alocado nesta sala' });
            }

            // RN04: Verificar capacidade da sala
            const countAlunosSala = await SalaAluno.query().where('sala_id', sala.id).count('* as total');
            const totalAlunosSala = countAlunosSala[0]['total'];
            const capacidadeSala = sala.capacidade_alunos;
            if (totalAlunosSala >= capacidadeSala) {
                return response.status(400).json({ message: 'A sala atingiu sua capacidade máxima de alunos' });
            }



            // RN05: Verificar se o professor é o responsável pela sala
            const professor = await Professor.findOrFail(sala.professor_id);
            if (professor.id !== sala.professor_id) {
                return response.status(403).json({ message: 'O professor não tem permissão para alocar o aluno nesta sala' });
            }

            const salaAluno = new SalaAluno();
            salaAluno.aluno_id = aluno.id;
            salaAluno.sala_id = sala.id;

            await salaAluno.save();

            return response.status(201).json({ message: 'Aluno alocado com sucesso' });
        } catch (error) {
            return response.status(400).json({ message: 'Não foi possível alocar o aluno: ' + error });
        }
    }

    public async removerAluno({ params, response }) {
        const { alunoId, salaId } = params;

        try {
            const salaAluno = await SalaAluno.query().where('aluno_id', alunoId).where('sala_id', salaId).firstOrFail();
            await salaAluno.delete();

            return response.json({ message: 'Aluno removido da sala com sucesso' });
        } catch (error) {
            return response.status(400).json({ message: 'Não foi possível remover o aluno da sala: ' + error });
        }
    }

    public async listarAlunos({ params, response }) {
        const { salaId } = params;

        try {
            const alunos = await SalaAluno.query().where('sala_id', salaId).preload('aluno');

            return response.json(alunos);
        } catch (error) {
            return response.status(400).json({ message: 'Não foi possível listar os alunos da sala' + error });
        }
    }




    public async listarSalasAluno({ params, response }) {
        const { alunoId } = params;

        try {
            const salas = await SalaAluno.query().where('aluno_id', alunoId).preload('sala');

            return response.json({ salas });
        } catch (error) {
            return response.status(400).json({ message: 'Não foi possível listar as salas do aluno: ' + error });
        }
    }

}
