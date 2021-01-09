<template>
  <div class="row">
  <div class="col-sm-2 admin-sidebar">
    <div class="nav flex-column nav-pills text-center text-uppercase admin-nav" id="sidebar-admin" role="tablist" aria-orientation="vertical">
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel" role="tab" aria-controls="admin-requests" aria-selected="false">ver publicaciones</a>
        <a class="nav-link admin-nav-item admin-sidebar-item"  data-toggle="pill" href="http://localhost:8080/panel/master" v-if="rol=='2'" role="tab" aria-controls="admin-userss" aria-selected="false">donadores</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/cuestionario" v-if="rol=='1' " role="tab" aria-controls="admin-analytics" aria-selected="false">generar una cita</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/historialcitas" v-if="rol=='1'" role="tab" aria-controls="admin-messages" aria-selected="false">historial de citas</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill" href="http://localhost:8080/panel/ultimacita"  v-if="rol=='1'" role="tab" aria-controls="admin-sessions" aria-selected="false">ultima cita</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/perfil" role="tab" aria-controls="admin-sessions" aria-selected="false">perfil</a>
    </div>
</div>

<div class="container" v-if="rol=='1'">
    <div class="row col-md-12 col-md-offset-0 custyle">
        <div class="panel panel-primary">
            <input class="form-control" type="text" placeholder="buscar cita especifica" aria-label="Search">
            <table class="table table-striped custab">
                <thead>
                    <tr>
                     <th>ID</th>
                     <th>nombre</th>
                     <th>movil</th>
                     <th class="text-center">tipo de sangre</th>
                     <th class="text-center">sexo</th>
                     <th class="text-center">hora</th>
                     <th class="text-center">fecha</th>
                     </tr>
                </thead>
                <tr v-for="(user,index) in listaCitas" v-bind:key="index">
                    <td v-if="rol=='1'">{{user.id}}</td>
                    <td v-if="rol=='1'">{{user.userName}}{{" "+user.UserFirtsName}}</td>
                    <td v-if="rol=='1'">{{user.movilPhone}}</td>
                    <td v-if="rol=='1'" class="text-center">{{user.bloodType}}</td>
                    <td v-if="rol=='1'" class="text-center"><span class="label label-default">{{user.sex}}</span></td>
                    <td v-if="rol=='1'" class="text-center"><span  class="badge badge-success">{{user.time}}</span></td>
                    <td v-if="rol=='1'" class="text-center"><span  class="badge badge-success">{{user.date.substring(0,10)}}</span></td>
                </tr>
            </table>
        </div>
    </div>
    <nav aria-label="pagination">
            <ul class="pagination">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item active" aria-current="page">
                  <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
            </ul>
     </nav>
</div>
</div>  
</template>


<script>
import axios from 'axios';
export default {

    data(){
        return{
            listaCitas:[],
            userDataLogin:[],
            token:'',
            rol:'',
            url:'http://127.0.0.1:3333/api/v1/',

        }   
    },
    mounted(){
        this.listaCitasGeneradas();
    },
    methods:{
        listaCitasGeneradas:function() {
            this.userDataLogin=JSON.parse(localStorage.getItem('userDataLogin'));
            this.token=this.userDataLogin[0].token;
            this.rol=this.userDataLogin[0].rol;
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token
                }
            }
            axios.get(this.url+"user/appointment/all",this.header)
            .then(response=>{
                //console.log(response.data.user_all)
                this.listaCitas=response.data.medicalAppointMent;
            })
            .catch(error =>{
                alert("error algo salio mal");
            }) 
        }

        
    }
}
</script>