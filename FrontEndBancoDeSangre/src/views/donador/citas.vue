<template>
<div class="container">
	<div id="login" class="modal-dialog">
		<div class="modal-content">
			<div class="modal-body">
				<div class="alert alert-info"><span class="glyphicon glyphicon-log-in"></span> <strong>citas</strong></div><hr>
				<form id="formLogin" class="form"  role="form" v-on:submit.prevent="generarCita"> 
					<label>nombre completo</label> 
					<div style="margin-bottom: 12px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
						<input type="text"  :value="user.nameComplet" class="form-control"  data-toggle="tooltip" data-placement="top" required="">
					</div>
					<label>movil</label> 
					<div style="margin-bottom: 12px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
						<input type="text"  :value="movil" class="form-control"  data-toggle="tooltip" data-placement="top" required="">
					</div>
                    <label>hora</label> 
                    <div style="margin-bottom: 12px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
						<input type="time" v-model="time" min="05:00" max="12:00" class="form-control"  data-toggle="tooltip" data-placement="top" required="">
					</div>
                     <label>fecha</label> 
                    <div style="margin-bottom: 12px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
						<input type="date" v-model="date"  min="2018-01-01" max="2020-1-1" class="form-control"  data-toggle="tooltip" data-placement="top" required="">
					</div>

					<div class="form-group">
                        <button type="submit"  class="btn btn-primary btn-block">enviar</button>
                    </div>
				</form>
                <div class="clearfix">
                    <a href="/panel" class="pull-right">regresar</a>
                </div> 
			</div>
		</div>
	</div>
</div>   
    
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            citas:[],
            datas:[],
            userName:'',
            userFirtsName:'',
            userLastName:'',
            sex:'',
            movil:'',
            doner:'',
            user:{
                nameComplet:'',
            },
            time:'',
            date:'',
            url:'http://127.0.0.1:3333/api/v1/',
        }
    },
    mounted(){
        this.start();
    },
    methods:{
        start:function(){
            this.citas=JSON.parse(localStorage.getItem('citas'));
            this.userName=this.citas[0].userName;
            this.userFirtsName=this.citas[0].userFirtsName;
            this.userLastName=this.citas[0].userLastName;
            this.sex=this.citas[0].sex;
            this.movil=this.citas[0].movil;
            this.doner=this.citas[0].doner;
            this.user.nameComplet=this.userName+" "+this.userFirtsName+" "+this.userLastName
        },
        generarCita:function(){
            this.datas=JSON.parse(localStorage.getItem('datas'));
            var id =this.datas[0].id;
            var token=this.datas[0].token;
            var rol=this.datas[0].rol;
            var email=this.datas[0].email;
            console.log("id "+id);

            this.header={
                headers:{
                    Authorization:"Bearer "+token
                }
            }
            var appointMent={
               time:this.time,
               date:this.date,
            }
            axios.post(this.url+"user/appointment",appointMent,this.header)
            .then(response=>{
                this.fileLogsSucess();
                alert("cita generada correctamente");
                this.$router.push("/panel")
            })
            .catch(error=>{
                var err=error.response.status+" "+error.response.statusText;
                this.fileLogsError(err);
            })
        },
        fileLogsSucess:function(){
            var log={
                user:this.user.nameComplet,
                movimiento:'generated a appoinment',
                status:'OK 200 success',
            }
            axios.post(this.url+"user/logs",log)
            .then(response=>{
            })
            .catch(error=>{
            });
        },
        fileLogsError:function(err) {
            var log={
                user:this.user.nameComplet,
                movimiento:'generated a appoinment',
                status:err,
            }
            axios.post(this.url+"user/logs",log)
            .then(response=>{
            })
            .catch(error=>{
            });   
        },
        makeToast(variant = null) {
            this.$bvToast.toast('Toast body content', {
                title: `cita medic ${'realizada con exito'}`,
                variant: variant,
                solid: true
            })
        }

    },
   

}
</script>

<style >

</style>