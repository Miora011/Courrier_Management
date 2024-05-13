<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Email</div>

      <v-text-field
        density="compact"
        v-model="email"
        placeholder="Entrer votre email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Mot de passe

       
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        v-model="password"
        placeholder="Entrer votre mot de passe"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="login"
        block
      >
        Log In
      </v-btn>

      
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
  name: 'MyLogin',
  data() {
      return {
          email: '',
          password: '',
          visible: false,
          loading: false,
      };
  },
  methods: {
      async login() {
          this.loading = true;
          try {
              const response = await axios.post('http://localhost:3000/login/verify', { email: this.email, password: this.password });
              this.loading = false;
              if (response.data.status === 'success') {
                alert("Authentification réussi, Bienvenue")
                    location.reload();
    
                
              } else {
                  alert(response.data.message); // Affiche une alerte avec le message d'erreur
              }
          } catch (err) {
              this.loading = false;
              console.error(err);
              alert('Erreur du serveur');
          }
      },
  },
};
</script>

<style>

</style>