/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import DiaSemanasController from '#controllers/dia_semanas_controller'
import EspecialistasController from '#controllers/especialistas_controller'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.get('/', [EspecialistasController, 'list']) // listar activos
  router.get('/inactivos', [EspecialistasController, 'listInactivos']) // listar inactivos
  router.post('/', [EspecialistasController, 'create']) // crear
  router.get('/:id', [EspecialistasController, 'get']) // ver detalle
  router.patch('/:id', [EspecialistasController, 'update']) // actualizar
  router.delete('/:id', [EspecialistasController, 'destroy']) // soft delete
  router.post('/:id/restore', [EspecialistasController, 'restore']) // restaurar
  router.delete('/:id/force', [EspecialistasController, 'forceDelete']) // eliminar permanente
}).prefix('/especialistas')
router.get('/dia-semana', [DiaSemanasController, 'list'])

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
