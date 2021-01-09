<template>
<div class="row">
  <div class="col-sm-2 admin-sidebar">
    <div class="nav flex-column nav-pills text-center text-uppercase admin-nav" id="sidebar-admin" role="tablist" aria-orientation="vertical">
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel" role="tab" aria-controls="admin-requests" aria-selected="false">ver publicaciones</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/listapacientes" v-if="rol=='4'" role="tab" aria-controls="admin-sessions" aria-selected="false">ver citas</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/perfil" role="tab" aria-controls="admin-sessions" aria-selected="false">perfil</a>   
    </div>
</div>

<div class="container" v-if="rol=='4'">
    <div class="row col-md-12 col-md-offset-0 custyle">
        <div class="panel panel-primary">
            <input class="form-control" type="text" placeholder="buscar paciente" aria-label="Search">
            <table class="table table-striped custab">
                <thead>
                    <tr>
                     <th>ID</th>
                     <th>nombre</th>
                     <th>movil</th>
                     <th class="text-center">tipo de sangre</th>
                     <th class="text-center">hora</th>
                     <th class="text-center">fecha</th>
                     <th class="text-center">status</th>
                      <th class="text-center">atender</th>
                     </tr>
                </thead>
                <tr v-for="(cita,index) in Citas" v-bind:key="index">
                    <td v-if="rol=='4'">{{cita.id}}</td>
                    <td v-if="rol=='4'">{{cita.userName}}{{" "+cita.userFirtsName}}{{" "+cita.userLastName}}</td>
                    <td v-if="rol=='4'">{{cita.movilPhone}}</td>
                    <td v-if="rol=='4'" class="text-center">{{cita.bloodType}}</td>
                    <td v-if="rol=='4'" class="text-center"><span class="label label-default">{{cita.time}}</span></td>
                    <td v-if="rol=='4'" class="text-center"><span  class="badge badge-success">{{cita.date.substring(0,10)}}</span></td>
                    <td v-if="rol=='4'" class="text-center">
                        <span  class="badge badge-success" v-if="cita.status=='falso'">en espera</span>
                    </td>
                    <td v-if="rol!=2" class="text-center"><a class='btn btn-warning btn-xs' id="show-btn" @click="deletePacient(cita)" ><span class="glyphicon glyphicon-edit"></span>atender</a></td>
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
            userDataLogin:[],
            id:'',
            token:'',
            rol:'',
            email:'',
            Citas:[],
            url:'http://127.0.0.1:3333/api/v1/',
        }
    },
    mounted(){
        this.start();
    },
    methods:{
        start:function() {
            this.userDataLogin=JSON.parse(localStorage.getItem('userDataLogin'));
            this.id=this.userDataLogin[0].id;
            this.token=this.userDataLogin[0].token;
            this.rol=this.userDataLogin[0].rol;
            console.log("rol "+this.rol);
            this.email=this.userDataLogin[0].email;
            localStorage.setItem('datas',JSON.stringify(this.datas));
            this.getAllAppointMents();
        },
        getAllAppointMents:function(){
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token,
                }
            }
            axios.get(this.url+"recepcionista/vercitas",this.header)
            .then(response=>{
                this.Citas=response.data.citas;
            })
            .catch(error=>{
            })
           
        },
        deletePacient:function(cita){
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token,
                }
            }
            var data={
                status:'verdadero',
            }
            axios.put(this.url+"recepcionista/deletecitas/"+cita.id,data,this.header)
            .then(response=>{
                this.getAllAppointMents();
                this.fileLogsSucess();
            })
            .catch(error=>{
                this.fileLogsError();
            })
        },
        fileLogsSucess:function(){
            var log={
                user:'recepcionista',
                movimiento:'delete appointMent',
                status:'OK 200 authorized ',
            }
            axios.post(this.url+"user/logs",log)
            .then(response=>{
            })
            .catch(error=>{
            });
        },
        fileLogsError:function() {
            var log={
                user:'admin',
                movimiento:'delete appointment',
                status:'401 error not found',
            }
            axios.post(this.url+"user/logs",log)
            .then(response=>{
            })
            .catch(error=>{
            });
            
        }
    
    }
}
</script>