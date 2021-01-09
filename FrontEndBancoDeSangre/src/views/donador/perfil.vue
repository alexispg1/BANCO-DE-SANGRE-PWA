<template>
 <div class="row">
  <div class="col-sm-2 admin-sidebar">
    <div class="nav flex-column nav-pills text-center text-uppercase admin-nav" id="sidebar-admin" role="tablist" aria-orientation="vertical">
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel" role="tab" aria-controls="admin-requests" aria-selected="false">ver publicaciones</a>
        <a class="nav-link admin-nav-item admin-sidebar-item"  data-toggle="pill" href="http://localhost:8080/panel/master" v-if="user.rol=='2'" role="tab" aria-controls="admin-userss" aria-selected="false">donadores</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/logs" v-if="user.rol=='2'" role="tab" aria-controls="admin-userss" aria-selected="false">logs</a>
       
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/cuestionario" v-if="user.rol=='1' " role="tab" aria-controls="admin-analytics" aria-selected="false">generar una cita</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/historialcitas" v-if="user.rol=='1'" role="tab" aria-controls="admin-messages" aria-selected="false">historial de citas</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/ultimacita" v-if="user.rol=='1'" role="tab" aria-controls="admin-sessions" aria-selected="false">ultima cita</a>
        
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/publicacion"  v-if="user.rol=='3'" role="tab" aria-controls="admin-sessions" aria-selected="false">crear publicacion</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/listapacientes" v-if="user.rol=='4'" role="tab" aria-controls="admin-sessions" aria-selected="false">ver citas</a>
        
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/perfil" role="tab" aria-controls="admin-sessions" aria-selected="false">perfil</a>

    </div>
</div>
<div class="container">
  <div class="row">
    <div class="col-md-6 img">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzOpl3-kqfNbPcA_u_qEZcSuvu5Je4Ce_FkTMMjxhB-J1wWin-Q"  alt="" class="img-rounded">
      <div>
        <v-file-input
        accept="image/png, image/jpeg, image/bmp"
        placeholder="cambiar foto de perfil"
        prepend-icon="mdi-camera"
        label="foto"
        ></v-file-input>
      </div>
      <div>
        <v-btn depressed small  @click="showModal"  v-on:click="logOut" color="primary">cerrar cesion</v-btn>
      </div>
    </div>
    <div class="col-md-6 details">
      <blockquote>
        <h5>{{user.name}}</h5>
        <small><cite title="Source Title">{{"tipo de sangre : "+user.bloodType}} <i class="icon-map-marker"></i></cite></small>
      </blockquote>
      <p>
        {{"correo electronico : "+user.email}}<br>
        {{"telefono : "+user.movil}} <br>
        {{"sexo : "+user.sex}}
      </p>
      <p v-if="user.rol=='1'">{{"usted es un "+"donador"}}</p>
      <p v-if="user.rol=='2'">{{"usted es un "+"administrador"}}</p>
      <p v-if="user.rol=='3'">{{"usted es un "+"promotor"}}</p>
      <p v-if="user.rol=='4'">{{"usted es una "+"recepcionista"}}</p>
      <div class="my-2">
        <v-btn depressed small  @click="showModal" color="primary">cambiar contraseña</v-btn>
      </div>
     
      </div> 
      
    </div>

    </div>

     <div>
        <b-modal ref="my-modal" hide-footer title="CAMBIAR CONTRASEÑA">
          <h3>
            <div class="d-block text-center" >
              <input type="password" v-model="contrasenia" class="form-control" placeholder="contraseña anterior">
            </div>
          </h3>
          
          <div class="d-block text-center" >
              <input type="password" v-model="nuevaContrasenia" class="form-control" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$" 
                title="Must contain at least one number and one uppercase and lowercase letter 
                and one symbol !@#$%_=+-, and at least 8 or more characters or 12" placeholder="nueva contraseñia"
                required/>
          </div>
          
          <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">cambiar contraseña </b-button>
          <b-button class="mt-3" variant="outline-danger" block @click="hideModal">salir</b-button>
        </b-modal>
      </div>
    
 </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      userDataLogin:[],
      user:{
        id:'',
        token:'',
        rol:'',
        email:'',
        name:'',
        sex:'',
        movil:'',
        bloodType:'',
        
      },
      url:'http://127.0.0.1:3333/api/v1/',
      contrasenia:'',
      nuevaContrasenia:'',
    }
  },
  mounted(){
    this.start();
  },
  methods:{
    start : function(){ 
      this.userDataLogin=JSON.parse(localStorage.getItem('userDataLogin'));
      this.user.id=this.userDataLogin[0].id;
      this.user.token=this.userDataLogin[0].token;
      this.user.rol=this.userDataLogin[0].rol;
      this.user.email=this.userDataLogin[0].email;
      this.user.name=this.userDataLogin[0].name;
      this.user.sex=this.userDataLogin[0].sex;
      this.user.movil=this.userDataLogin[0].movil;
      this.user.bloodType=this.userDataLogin[0].bloodType;
      console.log("el rol es "+this.user.rol);
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
        this.$refs['my-modal'].hide()
    },
    toggleModal() {
      this.$refs['my-modal'].toggle('#toggle-btn')
      console.log("contrasenia anterior "+this.contrasenia);
      console.log("nueva contrasenia "+this.nuevaContrasenia);
      this.header={
        headers:{
          Authorization:"Bearer "+this.user.token
        }
      }
      var data={
        password:this.contrasenia,
        newPassword:this.nuevaContrasenia,
      }
      axios.post(this.url+"user/changePassword",data,this.header)
      .then(response=>{
        this.nuevaContrasenia="";
        this.contrasenia="";
        if(response.data.message=="Password Success"){
          alert("contraseña cambiada correcta mente")
          fileLogsSucess(this.user.name);
        }
        else{
          alert("la contraseña deberia de tener almenos un numero un letra en mayuscula numeros y un caracter ")
        }
      })
      .catch(error=>{
        var erro=error.response.status+" "+error.response.statusText;
        this.nuevaContrasenia="";
        this.contrasenia="";
        alert("la contraseña deberia de tener almenos un numero un letra en mayuscula numeros y un caracter ");
        this.fileLogsError(this.user.name,erro);
      })
      
    },
    fileLogsSucess:function(name){
      var log={
        user:name,
        movimiento:'change password',
        status:'OK 201 authorized',
      }
      axios.post(this.url+"user/logs",log)
      .then(response=>{
      })
      .catch(error=>{
      });
    },
    fileLogsError:function(name,err) {
      var log={
        user:name,
        movimiento:'change password',
        status:err,
      }
      axios.post(this.url+"user/logs",log)
      .then(response=>{

      })
      .catch(error=>{
      });
            
    },
    logOut:function() {
      this.$router.push("/login"); 
    },

  }
}
</script>

<style >
.container{
    padding:5%;
}
.container .img{
    text-align:center;
}
.container .details{
    border-left:3px solid #ded4da;
}
.container .details p{
    font-size:15px;
    font-weight:bold;
}
</style>