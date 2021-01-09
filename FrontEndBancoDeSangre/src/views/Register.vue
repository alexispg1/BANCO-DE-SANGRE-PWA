<template>
    <div class="login-form">
    <form v-on:submit.prevent="next">
        <h2 class="text-center">registrarse</h2>       
        <div class="form-group">
            <label class="pull-left checkbox-inline">nombre</label><br/>
            <input type="tex"  v-model="user.name" class="form-control" placeholder="nombre" required="required">
        </div>
        <div class="form-group">
            <label class="pull-left checkbox-inline">apellido paterno </label><br/>
            <input type="tex" v-model="user.firtsName" class="form-control" placeholder="apellido paterno" required="required">
        </div>
         <div class="form-group">
            <label class="pull-left checkbox-inline">apellido materno</label><br/>
            <input type="tex"  v-model="user.lastsName" class="form-control" placeholder="apellido materno" required="required">
        </div>
        <div class="form-group">
            <label class="pull-left checkbox-inline">telefono ejemplo (961-152-1515)</label><br/>
            <input type="tel"  v-model="user.phone" class="form-control" placeholder="numero telefonico " pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required>
        </div>
         <div class="form-group">
            <label  class="pull-left checkbox-inline">sexo</label><br/>
            Femenino:  <input type="radio" value="femenino"  v-model="picked"  required />
            Masculino: <input type="radio" value="masculino" v-model="picked"  required />
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">siguiente</button>
        </div>
        <div class="clearfix">
            <a href="/login" class="pull-right">regresar</a>
        </div>        
    </form>
   
</div>
</template>

<script>
import registert from'@/views/RegisterT.vue'
export default {
    components:{
        registert
    },
    data(){
        return{
            user:{
                name:'',
                firtsName:'',
                lastsName:'',
                phone:'',
            },
            picked:'',
            userData:[],
        }
    },
    methods:{
        next:function(){
            var partes=this.user.phone.split("-");
            var phone=partes[0]+partes[1]+partes[2];
            this.userData.push({
                name:this.user.name,
                firtsName:this.user.firtsName,
                lastsName:this.user.lastsName,
                sex:this.picked,
                phone:phone,
            });
            localStorage.setItem('user',JSON.stringify(this.userData));
            this.$router.push("/registert");  
        }
    }
    
}
</script>

<style >

</style>