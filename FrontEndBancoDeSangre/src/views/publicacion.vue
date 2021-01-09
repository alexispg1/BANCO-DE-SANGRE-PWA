<template>
    <div class="login-form">
        <form v-on:submit.prevent="publicar" >
            <h2 class="text-center">crear publicacion</h2> 
            <div class="form-group">
                <label>titulo de la publicacion</label>
                <input type="text" v-model="publication.title" class="form-control" name="product" placeholder="titulo" required="required">         	
            </div>
            <div class="form-group">
                <label>escribe una publicacion</label>
                <textarea rows="2"  v-model="publication.description" placeholder="escribe una publicacion" class="form-control" cols="45"></textarea>         	
            </div >
            
            <div class="form-group">
                <label>sube una imagen </label>
                <input type="file" @change="chooseFile($event)"> 
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">publicar</button>
            </div>

            <div class="clearfix">
             <a href="/panel" class="pull-right">regresar</a>
            </div>  

        </form>
               
    </div>

</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
            publication:{
                title:'',
                description:'',
                image:'',
            },
            datas:[],
            id:'',
            token:'',
            rol:'',
            email:'',
            url:'http://127.0.0.1:3333/api/v1/',
         }
    },
    mounted(){
        this.start();
    },
    methods:{
        chooseFile(event){
            this.publication.image = event.target.files[0];
			console.log(this.publication.image);
        },
        start:function(){
            this.datas=JSON.parse(localStorage.getItem('datas'));
            this.id=this.datas[0].id;
            this.token=this.datas[0].token;
            this.rol=this.datas[0].rol;
            this.email=this.datas[0].email;
            console.log("token "+this.token)
        },
        publicar:function(){
            console.log("titulo "+this.publication.title);
            console.log("description "+this.publication.description);
            console.log("imagens"+this.publication.image)
            console.log("el id del usuario es "+this.id)
            console.log("el rol del usuario es "+this.rol);
            console.log("email "+this.email);
            this.header = {
				headers: {
					Authorization: "Bearer " + this.token
				}
            }
            let formData = new FormData();

            formData.append('title',this.publication.title);
			formData.append('description', this.publication.description);
            formData.append('image', this.publication.image);
            console.log("este es el formdaa ");
            console.log(formData);
            
            axios.post(this.url+"user/promoter",formData,this.header)
			.then((response) => { 
                if(response.data.message=="Not authorized"){
                    alert("no tiene permisos de usuario")
                    this.fileLogsError(); 
                }
                else{
                    this.fileLogsSucess();
                    alert("publicacion realizada correctamente");
                    this.$router.push("/panel");
                }
			})
			.catch((error) => {
                this.fileLogsError();
			});
           
        },
        fileLogsSucess:function(){
            var log={
                user:'promoter',
                movimiento:'publication ',
                status:'OK 200 publication',
            }
            axios.post(this.url+"user/logs",log)
            .then(response=>{
            })
            .catch(error=>{
            });
        },
        fileLogsError:function() {
            var log={
                user:'promoter',
                movimiento:'publication',
                status:'401 servel error',
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