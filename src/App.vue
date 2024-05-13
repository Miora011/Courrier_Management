<template>
  <v-card>
  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      v-if="isLoggedIn"
    >

      <v-list density="compact" nav>
        <router-link to="/dashboard" style="text-decoration: none; color: inherit;" active-class="active-link">
          <v-list-item prepend-icon="mdi mdi-view-dashboard" title="Dashboard" value="dashboard" color="#01579B"></v-list-item>
        </router-link>
        
        <router-link to="/list" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi mdi-view-list" title="List" value="list" color="#01579B"></v-list-item>
        </router-link>

        
        <v-list-item prepend-icon="mdi mdi-logout" title="Logout" value="logout" color="#01579B" @click="confirmLogout"></v-list-item>
      

       
       
      </v-list>
    </v-navigation-drawer>
    <v-main style="height: 920px; overflow-y:auto;">
      <router-view></router-view>
  </v-main>
  </v-layout>
</v-card>
  

</template>

<script>
import Swal from 'sweetalert2';
export default {
name: 'App',
data () {
    return {
      drawer: true,
      rail: true,
      isLoggedIn: true
    }
  },
  methods: {
    confirmLogout(){
      Swal.fire({
        title: 'Ête vous sûr de vouloir vous déconnecter ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#01579B ',
        cancelButtonColor: '#CF6679 ',
        confirmButtonText: 'Oui, je veux me déconnecter',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if(result.isConfirmed){
          Swal.fire({
            title: 'Déconnexion en cours',
            html: 'Veuillez patienter...',
            icon:'info',
            showConfirmButton: false,
            timer: 7000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            }
          }).then(()  => {
            this.isLoggedIn = false;
            this.$router.push({ name : 'login'})
          })
        }
      })
    }
  },
  mounted(){
    this.$router.push({name : 'dashboard'})
  }
}
</script>
<style>
.active-link {
color: #01579B !important;
}
.active-link .v-list-item{
background-color: #E0EBF3;
}
</style>