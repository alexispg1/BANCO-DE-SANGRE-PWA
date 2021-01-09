<template>

  <div class="row">
    <div class="col-sm-2 admin-sidebar">
        <div class="nav flex-column nav-pills text-center text-uppercase admin-nav" id="sidebar-admin" role="tablist" aria-orientation="vertical">
            <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel" role="tab" aria-controls="admin-requests" aria-selected="false">ver publicaciones</a>
            <a class="nav-link admin-nav-item admin-sidebar-item"  data-toggle="pill" href="http://localhost:8080/panel/master" v-if="rol=='2'" role="tab" aria-controls="admin-userss" aria-selected="false">donadores</a>
            <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/logs" v-if="rol=='2'" role="tab" aria-controls="admin-userss" aria-selected="false">logs</a>
            <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/perfil" role="tab" aria-controls="admin-sessions" aria-selected="false">perfil</a>
        </div>
    </div>



<div class="container">
    <div class="row col-md-12 col-md-offset-0 custyle">
        <div class="panel panel-primary">
            <input class="form-control" type="text" placeholder="Search" aria-label="Search">
            <table class="table table-striped custab">
                <thead>
                    <tr>
                     <th>ID</th>
                     <th>usuario</th>
                     <th>movimiento</th>
                     <th class="text-center">status</th>
                     <th class="text-center">creado</th>
                     </tr>
                </thead>
                <tr v-for="(user,index) in logs" v-bind:key="index">
                    <td v-if="user.rol!=2">{{user.id}}</td>
                    <td v-if="user.rol!=2">{{user.user}}</td>
                    <td v-if="user.rol!=2">{{user.movimiento}}</td>
                    <td v-if="user.rol!=2" class="text-center">{{user.status}}</td> 
                    <td v-if="user.rol!=2" class="text-center">{{user.created_at}}</td> 
                </tr>
            </table>
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
</div>

</div>

</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            logs:[],
            url:'http://127.0.0.1:3333/api/v1/',
            userDataLogin:[],
            id:'',
            token:'',
            rol:'',
        }
    },
    mounted(){
        this.getLogsAll();
    },
    methods:{
        getLogsAll:function() {
            this.userDataLogin=JSON.parse(localStorage.getItem('userDataLogin'));
            this.token=this.userDataLogin[0].token;
            this.rol=this.userDataLogin[0].rol;
            console.log("el rol es "+this.rol);
            axios.get(this.url+"user/all/logs")
            .then(response=>{
                this.logs=response.data.logs;
            })
            .catch(error=>{
            })
        }
    }  

}
</script>


<style>


</style>