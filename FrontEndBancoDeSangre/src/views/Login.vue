<template>
   <div class="login-form">
    <form v-on:submit.prevent="login" v-if="show">
        <h2 class="text-center">iniciar sesion</h2>       
        <div class="form-group">
             <input type="email" v-model="user.email" class="form-control" placeholder="correo" required="required">
        </div>
        <div class="form-group">
            <input type="password" v-model="user.password" class="form-control" placeholder="contraseña" required="required">
        </div>
        <div class="form-group">
            <button type="submit"  class="btn btn-primary btn-block">iniciar sesion</button>
        </div>
        <div class="clearfix">
            <label class="pull-left checkbox-inline"></label><br/>
            <a href="/forgotpassword" class="pull-right">olvidaste tu contraseña?</a>
        </div>        
    </form>
    <p class="text-center"><a href="/register">crear una cuenta</a></p>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            user:{
                email:'',
                password:'',
            },
            url:'http://127.0.0.1:3333/api/v1/',
            userDataLogin:[],
            show:true,
        }
    },
    methods:{
        login:function() {
            axios.post(this.url+"user/login",this.user)
            .then(response=>{
                var id=response.data.doner.id;
                var type=response.data.doner.type;
                var token=response.data.doner.token;
                var rol=response.data.doner.rol;
                var email=response.data.doner.email;
                var name=response.data.doner.name+" "+response.data.doner.firtsName+" "+response.data.doner.lastName;
                var sex=response.data.doner.sex;
                var movil=response.data.doner.movilPhone;
                var bloodType=response.data.doner.bloodType;
                this.fileLogsSucess(name);
                this.userDataLogin.push({
                 id:id,
                 type:type,
                 token:token, 
                 rol:rol,
                 email:email,
                 name:name,
                 sex:sex,
                 movil:movil,
                 bloodType:bloodType,
                })
                localStorage.setItem('userDataLogin',JSON.stringify(this.userDataLogin));
                
                if(rol==2){
                    this.$router.push("/login/dospasos");
                    this.sendEMail(id,email);
                }
                else{
                    this.$router.push("/panel");
                }
                  
            })
            .catch(error=>{
                var err=error.response.status+" "+error.response.statusText;
                this.fileLogsError(name,err);
                alert("error credenciales incorrectas")
            });

        },
        fileLogsSucess:function(name){
            var log={
                user:name,
                movimiento:'login',
                status:'ok 200 login',
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
                movimiento:'login',
                status:err,
            }
            axios.post(this.url+"user/logs",log)
            .then(response=>{
                alert("contraseña o password incorreectos");
            })
            .catch(error=>{
            });
            
        },
        onReset(evt) {
            evt.preventDefault();
            this.user.email = "";
            this.user.password = "";
            this.show = false;
            this.$nextTick(() => {
            this.show = true;
            });
        },
        sendEMail:function(id,email){
            var data=({
                id_doner:id,
                email:email,
            })
            axios.put(this.url+"user/dospasos",data)
            .then(response=>{
                alert("revise su inbox")
            }).catch(error=>{
            })
        }
       
    },
    
}
</script>



<style >
.login-form {
		width: 500px;
    	margin: 30px auto;
	}
    .login-form form {
    	margin-bottom: 15px;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
    .login-form h2 {
        margin: 0 0 15px;
    }
    .form-control, .btn {
        min-height: 38px;
        border-radius: 2px;
    }
    .btn {        
        font-size: 15px;
        font-weight: bold;
    }

</style>

