<template>
 <div class="login-form">
    <form v-on:submit.prevent="deleteAppointMent">
        <h2 class="text-center">cita</h2>       
        <div class="form-group">
           <div class="form-control"> 
               <label class="text-primary" >{{nombre}}</label><br/>
           </div>
        </div>    
        <div class="form-group">
            <div class="form-control"> 
               <label  class="text-primary" >{{movilPhone}}</label><br/>
           </div>
        </div>
        <div class="form-group">
            <div class="form-control"> 
               <label  class="text-primary" >{{hora}}</label><br/>
           </div>
        </div>
        <div class="form-group">
            <div class="form-control"> 
               <label class="text-primary" >{{fecha}}</label><br/>
           </div>
        </div>
        <div class="form-group">
            <div class="form-control"> 
               <label class="text-primary" >{{bloodType}}</label><br/>
           </div>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-danger btn-block">eliminar</button>
        </div>
        <div class="clearfix">
            <a href="/panel" class="pull-right">regresar</a>
        </div>        
    </form>
 </div>  
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            userDataLogin:[],
            id:'',
            token:'',
            rol:'',
            email:'', 
            url:'http://127.0.0.1:3333/api/v1/',
            cita:[],
            nombre:'',
            movilPhone:'',
            hora:'',
            fecha:'',
            bloodType:'',
            idCita:'',
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
            this.email=this.userDataLogin[0].email;
            this.getAppoint();
        },
        getAppoint:function(){
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token,
                }
            }
            axios.get(this.url+"user/appointment/last",this.header)
            .then(response=>{ 
                this.cita=response.data.citas;
                this.nombre=this.cita[0].userName+" "+this.cita[0].userFirtsName+" "+this.cita[0].userLastName;
                this.movilPhone=this.cita[0].movilPhone;
                this.hora=this.cita[0].time;
                this.fecha=this.cita[0].date.substring(0,10);
                this.bloodType=this.cita[0].bloodType;
                this.idCita=this.cita[0].id;
            })
            .catch(error=>{
            })
           
        },
        deleteAppointMent:function(){
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token,
                }
            }
            console.log(this.idCita);
            axios.get(this.url+"user/appointment/delete/"+this.idCita,this.header)
            .then(response=>{ 
                this.fileLogsSucess();
            })
            .catch(error=>{
               this.fileLogsError();
            })
        },
        fileLogsSucess:function(){
            var log={
                user:this.nombre,
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
                user:this.nombre,
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

<style>


</style>