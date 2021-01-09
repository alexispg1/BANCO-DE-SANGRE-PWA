'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  
 // users
  Route.post('user/register','UserController.store');
  Route.post('user/login','UserController.login');
  //cambiar de contraseña
  Route.post('user/changePassword','UserController.changePassword');
  //olvida su contraseña se le manda correo
  Route.post('user/forgotPassword','UserController.forgotPassword');
  //restablcer contraseña
  Route.post('user/resetpassword','UserController.resetPassword');
  
  

  //[Master]
  // ver todo los donadores 
  Route.get('user/all','AdministratorController.indexDoners');
  // editar el rol de un donador en especifico
  Route.put('user/edit/:id','AdministratorController.updateDoners');
  //eliminar a un donador en epecifico //pendiente
  Route.delete('user/delete/:id','AdministratorController.destroy');
  // dos pasos insertar 
  Route.post('user/dospasos','TwoStepController.create');
  // dos pasos actualizar numero de verificacion
  Route.put('user/dospasos','TwoStepController.update');
  // validar numero de verificacion
  Route.post('user/numberverification','TwoStepController.verificationCodigo');

  //[donador encuesta]
  //insertar el porcentaje obtenido en la encuesta por donador
  Route.post('user/score','ScoreQuizController.store');
  //obtener el historial de  porcetajes de encuesta realizada por cada donador // no esta en el front
  Route.get('user/score/all','ScoreQuizController.index');

  //[donador citas]
  //generar cita
  Route.post('user/appointment','MedicalAppointMentController.store');
  //borrar cita    //pendiente
  Route.delete('user/appointment/delete/:id','MedicalAppointMentController.destroy');
  //actualizar cita  //pendiente
  Route.put('user/appointment/update/:id','MedicalAppointMentController.update');
  //ver todas las citas del determinado usuario
  Route.get('user/appointment/all','MedicalAppointMentController.index');
 //ver la ultimacita generada  //pendiente
  Route.get('user/appointment/last','MedicalAppointMentController.theLast');

  //[promotor]
  //generar  promociones
  Route.post('user/promoter','PromoterController.create');
  // ver todad las publicacion  de la fecha actual    //pendiente
  Route.get('user/promoter','PromoterController.index')
  // eliminar publicacion    //pendiente
  Route.delete('user/promoter/:id','PromoterController.destroy');
  // update publicacion     //pendiente
  Route.put('user/promoter/:id','PromoterController.update');

  //{Archivos Logs] 
  Route.post('user/logs','LogController.create');
  Route.get('user/all/logs','LogController.index')  

  //[recepcionista]
  //obtener todo las citas 
  Route.get('recepcionista/vercitas','MedicalAppointMentController.AllAppointMent')
  Route.put('recepcionista/deletecitas/:id','MedicalAppointMentController.DeleteAppointMent')

}).prefix('api/v1/');
