import DiaSemana from '#models/dia_semana'
import type { HttpContext } from '@adonisjs/core/http'

export default class DiaSemanasController {
  public async list({ response }: HttpContext) {
    const dia_semana = await DiaSemana.all()
    return response.ok(dia_semana)
  }
}