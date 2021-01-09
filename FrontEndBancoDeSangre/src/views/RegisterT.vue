<template>
    <div class="login-form">
    <form v-on:submit.prevent="register" >
        <h2 class="text-center">registrarse</h2>       
        <div class="form-group">
            <label class="pull-left checkbox-inline">correo</label><br/>
            <input type="email" v-model="user.email" class="form-control" placeholder="direcion del correo electronico"
            pattern=".+@[Gg][Mm][Aa][iI][lL][.][cC][oO][mM]" required="required">
        </div>
        <div class="form-group">
            <label class="pull-left checkbox-inline">contraseña</label><br/>
            <input type="password" v-model="user.password" class="form-control" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$" 
            title="Must contain at least one number and one uppercase and lowercase letter 
            and one symbol !@#$%_=+-, and at least 8 or more characters or 12" placeholder="contraseña"
            required />
        </div>
        <div class="form-group">
            <label class="pull-left checkbox-inline">curp</label><br/>
            <input type="text" v-model="user.curp" class="form-control" placeholder="curp"  required>
        </div>
        <div class="form-group">
            <label class="pull-left checkbox-inline">fecha de nacimiento</label><br/>
            <input type="date" v-model="user.date" class="form-control" name="trip-start"  placeholder="date"   min="1980-01-01" max="2000-01-01" required>
        </div>
        <div class="form-group">
            <label class="pull-left checkbox-inline">tipo de sangre</label><br/>
            <select name="continentes" v-model="select" class="form-control">
                <option>O positivo</option>
                <option>O negativo</option>
                <option>A negativo</option>
                <option>A positivo</option>
                <option>B negativo</option>
                <option>B positivo</option>
                <option>AB negativo</option>
                <option>AB positivo</option>
            </select>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">registrarse</button>
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
    name:"registert",
    data(){
        return{
            userData:[],
            userDataLogin:[],
            select:'',
            user:{
                email:'',
                password:'',
                curp:'',
                date:'',
            },
            url:'http://127.0.0.1:3333/api/v1/',
        }
    },
    mounted(){
        this.start();
    }
    ,methods:{
        start:function(){
            this.userData=JSON.parse(localStorage.getItem('user'));
        },
        register:function() {
            var userP={
                userName:this.userData[0].name,
                userFirtsName:this.userData[0].firtsName,
                userLastName:this.userData[0].lastsName,
                email:this.user.email,
                password:this.user.password,
                sex:this.userData[0].sex,
                movilPhone:this.userData[0].phone,
                dateBirth:this.user.date,
                bloodType:this.select,
                curp:this.user.curp,
                rol:'1',
            }
            axios.post(this.url+"user/register",userP)
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
                this.$router.push("/panel");
            })
            .catch(error=>{
                var err=error.response.status+" "+error.response.statusText;
                this.fileLogsError(name,err);
            });
            
        },
        fileLogsSucess:function(name){
            var log={
                user:name,
                movimiento:'create user',
                status:'OK 201 created',
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
                movimiento:'create user',
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

<style >

</style>