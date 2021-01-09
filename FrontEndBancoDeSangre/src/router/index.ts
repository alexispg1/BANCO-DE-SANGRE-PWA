import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import login from '../views/Login.vue';
import register from  '../views/Register.vue';
import registert from  '../views/RegisterT.vue';
import forgotPassword from '../views/forgotPassword.vue';
import resetPassword from '../views/resetPassword.vue';
import panel from '../views/panel/Panel.vue';
import master from '../views/master/master.vue'
import cuestionario from '../views/donador/cuestionario.vue';
import citas from '../views/donador/citas.vue';
import p from '../views/panel/prueva.vue';
import historialCitas from '../views/donador/historialCitas.vue';
import perfil from '../views/donador/perfil.vue';
import dosPasos from '../views/master/dosPasos.vue';
import logs from '../views/master/logs.vue';
import ultimaCita from  '../views/donador/ultimaCita.vue';
import publicacion from '../views/publicacion.vue';
import pacientes from '../views/recepcionista/listaPacientes.vue';

Vue.use(VueRouter);

const routes = [
   {path: '/',name: 'home',component: Home,}
  ,{path:'/login',name:'login',component:login}
  ,{path:'/register',name:'register',component:register}
  ,{path:'/registert',name:'registert',component:registert}
  ,{path:'/forgotpassword',name:'forgotpassword',component:forgotPassword}
  ,{path:'/resetpassword/:id',name:'resetpasswordpassword',component:resetPassword}
  ,{path:'/panel',name:'panel',component:panel}
  ,{path:'/panel/master',name:'master',component:master}
  ,{path:'/panel/cuestionario',name:'cuestionario',component:cuestionario}
  ,{path:'/panel/citas',name:'citas',component:citas}
  ,{path:'/panel/prueva',name:'prueva',component:p}
  ,{path:'/panel/historialcitas',name:'historialcitas',component:historialCitas}
  ,{path:'/panel/perfil',name:'perfil',component:perfil}
  ,{path:'/login/dospasos',name:'dosPasos',component:dosPasos}
  ,{path:'/panel/logs',name:'logs',component:logs}
  ,{path:'/panel/ultimacita',name:'ultimacita',component:ultimaCita}
  ,{path:'/panel/publicacion',name:'publicacion',component:publicacion}
  ,{path:'/panel/listapacientes',name:'pacientes',component:pacientes}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
