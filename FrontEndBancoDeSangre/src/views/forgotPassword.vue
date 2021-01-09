<template>
<div class="login-form">
    <form v-on:submit.prevent="sendEmail">
        <h2 class="text-center">enviarme un correo</h2>             
        <div class="form-group">
            <input type="email" v-model="email" class="form-control" placeholder="direcion del correo electronico"
            pattern=".+@[Gg][Mm][Aa][iI][lL][.][cC][oO][mM]" required="required">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">enviar correo</button>
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
            email:'',
            url:'http://127.0.0.1:3333/api/v1/',    
        }
    },
    methods:{
        sendEmail:function() {  
            axios.post(this.url+"user/forgotPassword",{
                email:this.email,
            })
            .then(response=>{
                this.fileLogsSucess(this.email);
                alert("correo enviado");
                this.$router.push("/login");
            })
            .catch(error =>{
                var err=error.response.status+" "+error.response.statusText;
                this.fileLogsError(err,this.email);
                alert("intenetelo mas tarde");
            })

        },
        fileLogsSucess:function(email){
            var log={
                user:email,
                movimiento:'forgot password',
                status:'ok 200 sucess full',
            }
            axios.post(this.url+"user/logs",log)
            .then(response=>{
                this.email="";
            })
            .catch(error=>{
            });
            
        },
        fileLogsError:function(err,email) {
            var log={
                user:email,
                movimiento:'forgot password',
                status:err,
            }
            axios.post(this.url+"user/logs",log)
            .then(response=>{
                this.email="";
            })
            .catch(error=>{
            });
            
        }
    }
    
}
</script>