<template>
    <div class="login-form">
    <form v-on:submit.prevent="resetPassword" >
        <h2 class="text-center">restablecer contraseña</h2>       
        <div class="form-group">
            <!--<label class="pull-left checkbox-inline">contraseña</label><br/>-->
            <input type="password" v-model="password" class="form-control" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$" 
            title="Must contain at least one number and one uppercase and lowercase letter 
            and one symbol !@#$%_=+-, and at least 8 or more characters or 12" placeholder="nueva contraseña"
            required />
        </div>
        <div class="form-group">
            <!--<label class="pull-left checkbox-inline">confirmar contraseña</label><br/>-->
            <input type="password" v-model="confirmPassword" class="form-control" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$" 
            title="Must contain at least one number and one uppercase and lowercase letter 
            and one symbol !@#$%_=+-, and at least 8 or more characters or 12" placeholder="confirmar contraseña"
            required />
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">restablecer contraseña</button>
        </div>
        <div class="clearfix">
            <a href="/login" class="pull-right">regresar</a>
        </div>        
    </form>
   
</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            password:'',
            confirmPassword:'',
            email:'',
            url:'http://127.0.0.1:3333/api/v1/',
            id:'',   
        }
    },
    mounted(){
        this.start();
    },
    methods:{
        start:function() {
            this.id=this.$route.params.id;
        },
        resetPassword:function() { 
            if(this.password===this.confirmPassword){
               var data={
                   id:this.id,
                   newPassword:this.confirmPassword,
               }
               axios.post(this.url+"user/resetPassword",data)
               .then(response=>{
                   this.fileLogsSucess(this.id);
                   this.password="";
                   this.confirmPassword="";
                   alert("contraseña restablecida");
                   this.$router.push("/login");
               })
               .catch(error=>{
                    var err="404 not found";
                    this.fileLogsError(this.id,err);
                    this.password="";
                    this.confirmPassword="";
               });
            }  
            else{
                alert("no coinciden las contraseñas");
            }
        }
        ,fileLogsSucess:function(id){
            var log={
                user:id,
                movimiento:'reset password',
                status:'OK 200 The request was fulfilled',
            }
            axios.post(this.url+"user/logs",log)
            .then(response=>{
            })
            .catch(error=>{
            });
            
        },
        fileLogsError:function(id,err) {
            var log={
                user:id,
                movimiento:'reset password',
                status:err,
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