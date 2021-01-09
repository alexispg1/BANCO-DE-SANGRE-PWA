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
            <input class="form-control" type="text" placeholder="buscar por nombre" aria-label="Search">
            <table class="table table-striped custab">
                <thead>
                    <tr>
                     <th>ID</th>
                     <th>nombre</th>
                     <th>movil</th>
                     <th class="text-center">correo</th>
                     <th class="text-center">sexo</th>
                     <th class="text-center">rol</th>
                     <th class="text-center">Action</th>
                     </tr>
                </thead>
                <tr v-for="(user,index) in user_all" v-bind:key="index">
                    <td v-if="user.rol!=2">{{user.id}}</td>
                    <td v-if="user.rol!=2">{{user.userName}}{{" "+user.UserFirtsName}}</td>
                    <td v-if="user.rol!=2">{{user.movilPhone}}</td>
                    <td v-if="user.rol!=2" class="text-center">{{user.email}}</td>
                    <td v-if="user.rol!=2" class="text-center"><span class="label label-default">{{user.sex}}</span></td>
                    
                    <td v-if="user.rol!=2 " class="text-center" >
                        <span  v-if="user.rol==1" class="label label-success">donador</span>
                        <span  v-if="user.rol==3" class="label label-success">promotor</span>
                        <span  v-if="user.rol==4" class="label label-success">recepcionista</span>
                    </td>       
                    <td v-if="user.rol!=2" class="text-center"><a class='btn btn-warning btn-xs' id="show-btn" @click="showModal(user)"  href="#"><span class="glyphicon glyphicon-edit"></span>editar</a> </td>
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

 <div>
    <b-modal ref="my-modal" hide-footer title="cambia el rol del usuario">
      <div class="d-block text-center" >
        <h3><select name="select" class="form-control" v-model="select">
            <option value="donador">donador</option> 
            <option value="promotor" >promotor</option>
            <option value="recepcionista">recepcionista</option>
            </select></h3>
      </div>
    <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">cambiar rol </b-button>
    <b-button class="mt-3" variant="outline-danger" block @click="hideModal">cancelar</b-button>
     
    </b-modal>
  </div>

</div>  
   

</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            datas:[],
            token:'',
            id:'',
            rol:'',
            user_all:[],
            url:"http://127.0.0.1:3333/api/v1/",
            select:'',
            user:'',
            email:'',
        }
    },
    mounted(){
        this.getAllDoners()
    },
    methods:{
        getAllDoners:function(){
            this.datas=JSON.parse(localStorage.getItem('datas'));
            this.id=this.datas[0].id;
            this.token=this.datas[0].token;
            this.rol=this.datas[0].rol;
            this.email=this.datas[0].email;
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token
                }
            }
            axios.get(this.url+"user/all",this.header)
            .then(response=>{
                console.log(response.data.user_all)
                this.user_all=response.data.user_all;
            })
            .catch(error =>{

            })
        
        },
        showModal(user) {
            this.$refs['my-modal'].show()
            this.user=user;
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        toggleModal() {
            this.$refs['my-modal'].toggle('#toggle-btn')
            console.log("user id es  "+this.user.id);
            if(this.select==""){
                console.log("no a selecionado ninguno");
            }
            if(this.select=="donador"){
                //console.log("rol"+" 1 ");
                this.changeRol(this.user,1);
            }
            if(this.select=="promotor"){
                //console.log("rol "+" 3 ");
                this.changeRol(this.user,3);
            }
            if(this.select=="recepcionista"){
                //console.log("rol "+" 4 ");
                this.changeRol(this.user,4);
            }
        },
        changeRol:function(user,rol){
            console.log("token "+this.token);
            console.log("user "+user.id);
            console.log("rol "+rol);
             this.header = {
                headers: {
                    Authorization:"Bearer "+this.token
                }
            } 
            var Change={
                rol:rol,
            };
            axios.put(this.url+"user/edit/"+user.id,Change,this.header)
            .then(response=>{
                console.log(response);
                this.getAllDoners();
                this.fileLogsSucess();
            })
            .catch(error=>{
                this.fileLogsError();
            })
        },
        fileLogsSucess:function(){
            var log={
                user:'admin',
                movimiento:'edit rol',
                status:'OK 200 change',
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
                movimiento:'edit rol',
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

<style>
@media screen and (max-width: 480px) {
    .admin-sidebar{
        display: none;
    }
}

@media screen and (min-width: 480px) {
    .admin-tabs{
        display: none;
    }
}

.admin-sidebar{
    max-width: 13%;
}

.custab{
    border: 1px solid #ccc;
    padding: 5px;
    margin: 5% 0;
    box-shadow: 3px 3px 2px #ccc;
    transition: 0.5s;
    }
.custab:hover{
    box-shadow: 3px 3px 0px transparent;
    transition: 0.5s;
    }
    
</style>