import Especialista from '#models/especialista'
import EspecialistaHorario from '#models/especialista_horario'
import { createEspecialistaValidator, updateEspecialistaValidator } from '#validators/especialista'
import type { HttpContext } from '@adonisjs/core/http'

export default class EspecialistasController {
  async list({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const nombre = request.input('nombre_completo')
    const especialidad = request.input('especialidad')

    const query = Especialista.query()
      .where('activo', true)
      .preload('horarios', (horarioQuery) => {
        horarioQuery.preload('diaSemana')
      })

    if (nombre) {
      query.whereILike('nombre_completo', `%${nombre}%`)
    }

    if (especialidad) {
      query.whereILike('especialidad', `%${especialidad}%`)
    }

    query.orderBy('created_at', 'desc')

    const paginator = await query.paginate(page, limit)

    return response.ok({
      data: paginator.all(),
      total: paginator.getMeta().total,
    })
  }

  async get({ params, response }: HttpContext) {
    const especialista = await Especialista.query()
      .where('id', params.id)
      .preload('horarios', (q) => q.preload('diaSemana'))
      .firstOrFail()

    return response.ok(especialista)
  }

  async create({ request, response }: HttpContext) {
    const datosValidados = await request.validateUsing(createEspecialistaValidator)

    const horariosPorDia: Record<number, { inicio: string; fin: string }[]> = {}

    for (const horario of datosValidados.horarios) {
      const { dia_semana_id, hora_inicio, hora_fin } = horario

      if (!horariosPorDia[dia_semana_id]) {
        horariosPorDia[dia_semana_id] = []
      }

      const seTraslapa = horariosPorDia[dia_semana_id].some((intervaloExistente) => {
        return !(hora_fin <= intervaloExistente.inicio || hora_inicio >= intervaloExistente.fin)
      })

      if (seTraslapa) {
        return response.badRequest({
          error: `Hay un traslape en el día ${dia_semana_id} entre ${hora_inicio} y ${hora_fin}`,
        })
      }

      horariosPorDia[dia_semana_id].push({ inicio: hora_inicio, fin: hora_fin })
    }

    const nuevoEspecialista = await Especialista.create({
      nombre_completo: datosValidados.nombre_completo,
      especialidad: datosValidados.especialidad,
      registro_profesional: datosValidados.registro_profesional,
      activo: datosValidados.activo ?? true,
    })

    await nuevoEspecialista.related('horarios').createMany(datosValidados.horarios)

    return response.created(nuevoEspecialista)
  }

  async update({ params, request, response }: HttpContext) {
    const especialistaEncontrado = await Especialista.find(params.id)
    if (!especialistaEncontrado) {
      return response.notFound({ message: 'Especialista no encontrado' })
    }

    const datosValidados = await request.validateUsing(updateEspecialistaValidator)

    especialistaEncontrado.merge({
      nombre_completo: datosValidados.nombre_completo,
      especialidad: datosValidados.especialidad,
      registro_profesional: datosValidados.registro_profesional,
      activo: datosValidados.activo ?? especialistaEncontrado.activo, // ✅ Se añade actualización de "activo"
    })

    await especialistaEncontrado.save()

    if (datosValidados.horarios) {
      await EspecialistaHorario.query().where('especialista_id', especialistaEncontrado.id).delete()

      const horariosPorDia: Record<number, { inicio: string; fin: string }[]> = {}

      for (const horario of datosValidados.horarios) {
        const { dia_semana_id, hora_inicio, hora_fin } = horario

        if (!horariosPorDia[dia_semana_id]) {
          horariosPorDia[dia_semana_id] = []
        }

        const seTraslapa = horariosPorDia[dia_semana_id].some((intervaloExistente) => {
          return !(hora_fin <= intervaloExistente.inicio || hora_inicio >= intervaloExistente.fin)
        })

        if (seTraslapa) {
          return response.badRequest({
            error: `Hay un traslape en el día ${dia_semana_id} entre ${hora_inicio} y ${hora_fin}`,
          })
        }

        horariosPorDia[dia_semana_id].push({ inicio: hora_inicio, fin: hora_fin })
      }

      await especialistaEncontrado.related('horarios').createMany(datosValidados.horarios)
    }

    return response.ok(especialistaEncontrado)
  }

  async destroy({ params, response }: HttpContext) {
    const especialista = await Especialista.find(params.id)
    if (!especialista) return response.notFound({ message: 'Especialista no encontrado' })

    especialista.activo = false
    await especialista.save()

    return response.ok({ message: 'Especialista inactivado correctamente' })
  }

  async restore({ params, response }: HttpContext) {
    const especialista = await Especialista.find(params.id)
    if (!especialista) return response.notFound({ message: 'Especialista no encontrado' })

    especialista.activo = true
    await especialista.save()

    return response.ok({ message: 'Especialista restaurado correctamente' })
  }

  async forceDelete({ params, response }: HttpContext) {
    const especialista = await Especialista.find(params.id)
    if (!especialista) return response.notFound({ message: 'Especialista no encontrado' })

    await especialista.delete()
    return response.ok({ message: 'Especialista eliminado permanentemente' })
  }

  async listInactivos({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const paginator = await Especialista.query()
      .where('activo', false)
      .orderBy('updated_at', 'desc')
      .preload('horarios', (q) => q.preload('diaSemana'))
      .paginate(page, limit)

    return response.ok({
      data: paginator.all(),
      total: paginator.getMeta().total,
    })
  }
}
