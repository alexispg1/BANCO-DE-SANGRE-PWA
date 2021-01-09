<template>
 <div class="login-form">
    <form v-on:submit.prevent="codeVerification">
        <h2 class="text-center">verificacion de usuario</h2>       
        <div class="form-group">
            <input type="text" class="form-control" v-model="numero"   placeholder="ingese su codigo de verificacion " required="required">
        </div>    
        <div class="form-group">
            <button type="submit"  class="btn btn-primary btn-block">enviar datos</button>
        </div> 
    </form>
    <p class="text-center"><a href="/login">regresar</a></p>
</div>
</template>   

<script>
import axios from 'axios'
export default{
    data(){
        return{
            numero:'',
            userDataLogin:[],
            rol:'',
            token:'',
            id:'',
            email:'',
            url:'http://127.0.0.1:3333/api/v1/',
      }
    },
    mounted(){
        this.start();
    },
    methods:{
        start(){
            this.userDataLogin=JSON.parse(localStorage.getItem('userDataLogin'));
            this.id=this.userDataLogin[0].id;
            this.token=this.userDataLogin[0].token;
            this.rol=this.userDataLogin[0].rol;
            this.email=this.userDataLogin[0].email;
        },
        codeVerification:function(){
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token
                }
            }
            var data=({
                id_doner:this.id,
                numero:this.numero,
            })
            axios.post(this.url+"user/numberverification",data,this.header)
            .then(response=>{
                var messages=response.data.message;
                if(messages=="no autorizado"){
                    alert("verifique que el codigo sea correcto");
                }
                else{
                    console.log("felicidades");
                    this.$router.push("/panel");
                }
            })
            .catch(error=>{
               alert("error");
            })
        }

    }
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