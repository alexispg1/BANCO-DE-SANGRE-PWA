<template>
<v-app>
    <div> 
      <v-app-bar color="deep-purple accent-4" dense dark >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Banco de sangre</v-toolbar-title>
          <v-spacer> </v-spacer>
         <!-- <v-btn color="success" v-if="rol>1">ingresar</v-btn>
          <v-btn color="error" v-if="rol>0" > salir</v-btn>-->
          <v-menu left bottom> 
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="n in links"
                :key="n"
                @click="() => {}"
              >
              <v-list-item-title>{{n.panel}}</v-list-item-title>
                </v-list-item>
            </v-list>  
          </v-menu>   
      </v-app-bar> 
    </div>
    <!--<div>
      <v-navigation-drawer color="success">
        <h1>hola perro</h1>
      </v-navigation-drawer>  

    </div>-->
      <content>
        <router-view/>
      </content>
</v-app>

</template>

<script >
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
export default {
  data(){
    return{
       userDataLogin:[],
       id:'',
       token:'',
       rol:'',
       email:'',
       show: true,
       links:[
         {panel:'publicacion'},{panel:'donador'},{panel:'citas medicas'}
        ]
    }
  },
  /*beforeMount(){
    this.start();
  },
  methods:{
    start:function(){
       this.userDataLogin=JSON.parse(localStorage.getItem('userDataLogin'));
       this.id=this.userDataLogin[0].id;
       this.token=this.userDataLogin[0].token;
       this.rol=this.userDataLogin[0].rol;
       this.email=this.userDataLogin[0].email;  
       console.log("rol es "+this.rol)   
    }

  }*/

}
</script>


<style>

</style>
