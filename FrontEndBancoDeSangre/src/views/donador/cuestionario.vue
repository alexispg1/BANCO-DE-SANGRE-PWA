<template>
<div  class="login-form">
   <form v-on:submit.prevent="test" v-if="rol==1">
        <h2 class="text-center">test</h2> 
            <div class="form-group">
                <label  class="pull-left checkbox-inline">1.¿ se ha realizado tatuajes o perforaciones en el último año ?</label><br/>
                   <div class="form-check">
                       si <input type="radio" value="si" v-model="picked1"  required /> 
                       no <input type="radio" value="no" v-model="picked1"  required />
                   </div>    
            </div>   
            <div class="form-group">
             <label  class="pull-left checkbox-inline">2.¿ ha tenido relaciones sexuales de riesgo en el último año ?</label><br/>
                <div class="form-check">
                     si <input type="radio" value="si" v-model="picked2"  required /> 
                     no <input type="radio" value="no" v-model="picked2"  required />
                </div>
            </div>  

            <div class="form-group">
             <label  class="pull-left checkbox-inline">3.¿ pesa menos de 55 kgr ?</label><br/>
                <div class="form-check">
                     si <input type="radio" value="si"  v-model="picked3"  required /> 
                     no <input type="radio" value="no"  v-model="picked3"  required />
                </div>
            </div> 

            <div class="form-group">
             <label  class="pull-left checkbox-inline">4.¿ ha sido transfundido en el último año ?</label><br/>
                <div class="form-check">
                    si <input type="radio" value="si"  v-model="picked4"  required /> 
                    no <input type="radio" value="no"  v-model="picked4"  required />
                </div>
            </div> 
             <div class="form-group">
             <label  class="pull-left checkbox-inline">5.¿ está tomando alguna medicamento ?</label><br/>
                <div class="form-check">
                    si <input type="radio" value="si"  v-model="picked5"  required /> 
                    no <input type="radio" value="no"  v-model="picked5"  required />
                </div>
            </div> 

             <div class="form-group">
             <label  class="pull-left checkbox-inline">6.¿a consumido algun tipo de droga ?</label><br/>
                <div class="form-check">
                    si <input type="radio" value="si"  v-model="picked6" required /> 
                    no <input type="radio" value="no"  v-model="picked6" required />
                </div>
            </div> 

        <div class="form-group">
            <button type="submit" variant="danger" @click="makeToast('danger')" class="btn btn-primary btn-block">enviar</button>
        </div>
        <div class="clearfix">
            <a href="/panel" class="pull-right">regresar</a>
        </div>        
    </form>
   
</div>

</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            picked1:'',
            picked2:'',
            picked3:'',
            picked4:'',
            picked5:'',
            picked6:'',
            datas:[],
            rol:'',
            token:'',
            url:'http://127.0.0.1:3333/api/v1/',
            puntaje:'',
            email:'',
            citas:[],
        }

    },
    mounted(){
        this.start();
    },
    methods:{
        test:function(){
            if(this.picked1=="no"&&this.picked2=="no"&&this.picked3=="no"&&
               this.picked4=="no"&&this.picked5=="no"&&this.picked6=="no"){ 
                   this.puntaje=100;
                   this.scorePost(this.puntaje);
            }
            else{
            }
        },
        makeToast(variant = null) {
            if(this.picked1=="no"&&this.picked2=="no"&&this.picked3=="no"&&
               this.picked4=="no"&&this.picked5=="no"&&this.picked6=="no"){
            }
            else{
                this.$bvToast.toast('no eres apto para hacer una cita medica', {
                title: `mensaje ${'cita medica'}`,
                variant: variant,
                solid: true
                 })
            }
        },
        start:function(){
            this.datas=JSON.parse(localStorage.getItem('datas'));
            this.id=this.datas[0].id;
            this.token=this.datas[0].token;
            this.rol=this.datas[0].rol;
            this.email=this.datas[0].email;
        },
        scorePost:function(puntaje){
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token
                }
            }
            var score={
                score:puntaje,
            }
            axios.post(this.url+"user/score",score,this.header)
            .then(response=>{
                this.fileLogsSucess(this.email);
                this.citas.push({
                    id:response.data.donerC.id,
                    userName:response.data.donerC.userName,
                    userFirtsName:response.data.donerC.userFirtsName,
                    userLastName:response.data.donerC.userLastName,
                    sex:response.data.donerC.sex,
                    movil:response.data.donerC.movil,
                    doner:response.data.donerC.doner
                })
                localStorage.setItem('citas',JSON.stringify(this.citas));
                this.$router.push("/panel/citas")
            })
            .catch(error=>{
                var err=error.response.status+" "+error.response.statusText; 
                this.fileLogsError(this.email,err);
            })
        },
        fileLogsSucess:function(email){
            var log={
                user:email,
                movimiento:'make a quiz',
                status:'OK 200 ',
            }
            axios.post(this.url+"user/logs",log)
            .then(response=>{
            })
            .catch(error=>{
            });
        },
        fileLogsError:function(email,err) {
            var log={
                user:email,
                movimiento:'make aquiz',
                status:err,
            }
            axios.post(this.url+"user/logs",log)
            .then(response=>{
            })
            .catch(error=>{
            });
            
        },
       

    }
    
}
</script>

<style >



</style>