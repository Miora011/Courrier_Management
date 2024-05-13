<template>
    <v-card
      title="Ajout des courrier"
      flat
    >
      <v-row justify="center" align="center">
  
        <!--Pop up courrier-->
        <div class="pa-4 text-center">
          <v-dialog v-model="dialogCourrier" max-width="800">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                icon="mdi mdi-email-plus"
                v-bind="activatorProps"
                variant="plain"
                style="font-size: 20px"
              ></v-btn>
            </template>
  
            <v-card prepend-icon="mdi-account" title="Ajout de courrier">
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field  v-model="formData.date_a" label="Date d'arriver*" type="date" required variant="outlined" :rules="[() => !!formData.date_a || 'Champ requis']"></v-text-field>
                  </v-col>
  
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field  v-model="formData.num_a" label="Numéro d'arriver*" type="number" required variant="outlined" :rules="[() => !!formData.num_a || 'Champ requis']"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" sm="6">
                    <v-text-field  v-model="formData.num_c" label="Numéro de courrier*" type="number" required variant="outlined" :rules="[() => !!formData.num_c || 'Champ requis']"></v-text-field>
                  </v-col>
  
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      label="Lieu d'envoi*"
                      :rules="[() => !!formData.lieu || 'Champ requis']"
                      v-model="formData.lieu"
                     
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
  
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field  label="Date du courrier*" v-model="formData.date_c" type="date" required variant="outlined" :rules="[() => !!formData.date_c || 'Champ requis']"></v-text-field>
                  </v-col>
  
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      label="Motif*"
                      :rules="[() => !!formData.motif || 'Champ requis']"
                      v-model="formData.motif"
                      
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
  
                  <v-col cols="12" md="4" sm="6">

                    
                    <v-autocomplete
                      :items="['TG', 'Percepteur','Agent comptable', 'Agent de recouvrement', 'Caissier', 'Fondé', 'Inspecteur du Trésor','Gestionaire budgétaire ']"
                      label="Résponsable*"
                      v-model="formData.resp"
                      :rules="[() => !!formData.resp || 'Champ requis']"
                      placeholder="Selectionner..."
                      hint ="Veuillez cocher une seule cage"
                      variant="outlined"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
  
                <small class="text-caption text-medium-emphasis">
                  *Champ Obligatoire à remplir
                </small>
              </v-card-text>
  
              <v-divider></v-divider>
  
              <v-card-actions>
                <v-spacer></v-spacer>
  
                <v-btn text="Fermer" color="error" variant="plain" @click="dialogCourrier = false"></v-btn>
  
                <v-btn
                  color="success"
                  text="Enregistrer"
                  variant="tonal"
                  @click="saveCourrier"
                  
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <!--end pop up courrier-->
  
      <v-btn icon="mdi mdi-printer" variant="plain" style="font-size: 20px;"></v-btn>
    </v-row>
  
    
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Rechercher"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
          color="#01579B"
        ></v-text-field>
      </template>

    <!--Modifier et Supprimer dans colonne Action-->
    <v-data-table :headers="headers" :items="Courrier" :search="search">
        
        <template v-slot:[`item.action`]="{ item }">
          <v-btn icon @click="editItem(item)">
            <v-icon color="blue">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteItem(item)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      
    </v-card>
  </template>
  
  <script>
import axios from 'axios';

export default {
  name: 'MyList',
  data() {
    return {
      dialogCourrier: false,
      search: '',
            headers: [
        { key: 'date_a', title: 'Date_arriver' },
        { key: 'num_a', title: 'Numéro_arriver' },
        { key: 'num_c', title: 'Numéro de courrier' },
        { key: 'lieu', title: 'Lieu_envoie' },
        { key: 'date_c', title: 'Date du courrier' },
        { key: 'motif', title: 'Motif' },
        { key: 'resp', title: 'Résponsable' },
        { key: 'action', title: 'Action' }
      ],

      Courrier: [],
      formData: {
      date_a: '', 
      num_a: '',    
      num_c: '',    
      lieu: '',     
      motif: '',    
      date_c: '',   
      resp: ''      
      },

      selectedCourrier: null // Nouvelle propriété pour stocker les informations de l' selectedCourrierélément sélectionné
    };
  },
  
    methods: {
   async fetchCourrier() {
  try {
    const response = await axios.get('http://localhost:3000/list');
    console.log(response.data); // afficher les données récupérées dans la console
    this.Courrier = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données du courrier:', error);
  }
},
    editItem(item) {
      // Mettre à jour la propriété selectedCourrier avec les informations de l'élément sélectionné
      this.selectedCourrier = { ...item };
      // Remplir le formulaire avec les informations de l'élément sélectionné
      this.formData = { ...item };
      // Ouvrir le dialogCourrier de modification
      this.dialogCourrier = true;
    },
    async saveCourrier() {
      // Vérifier si des champs obligatoires sont vides
      if (this.formData.cin === '',this.formData.nom === '',this.formData.poste === '', this.formData.adresse === '',this.formData.sexe === '', this.formData.email === '') {
        alert("Veuillez entrer tous les champs obligatoire s'il vous plaît")
      }
      try {
        if (this.selectedCourrier) {
          // Si selectedCourrier existe, cela signifie que le formulaire est utilisé pour la modification
          await this.updateListe();
        } else {
          // Sinon, le formulaire est utilisé pour l'ajout
          const response = await axios.post('http://localhost:3000/list', this.formData);
          this.Courrier.push(response.data);
          this.dialogCourrier = false; // Ferme le dialogue d'ajout après l'ajout réussi
        }
        this.formData = {}; // Réinitialise le formulaire après l'ajout ou la modification
        this.selectedCourrier = null; // Réinitialise selectedPersonnel après l'ajout ou la modification
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement du courrier:', error);
      }
    },
    async updateListe() {
      try {
        const response = await axios.put(`http://localhost:3000/list/${this.selectedCourrier.num_a}`, this.formData);
        // Mettre à jour les informations dans la liste des courriers
        const index = this.Courrier.findIndex(courrier => courrier.num_a === response.data.num_a);
        if (index !== -1) {
          this.Courrier.splice(index, 1, response.data);
        }
        // Fermer le dialogue après la mise à jour réussie
        this.dialogCourrier = false;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du courrier:', error);
      }
    },
    // Méthode pour supprimer un personnel
    
      async deleteItem(item) {
    try {
      // Supprimer immédiatement l'élément du tableau local
      const index = this.Courrier.findIndex(courrier => courrier.num_a === item.num_a);
      if (index !== -1) {
        this.Courrier.splice(index, 1);
      }

      // Envoyer la requête de suppression à l'API backend
      await axios.delete(`http://localhost:3000/list/${item.num_a}`);
      
      // Afficher un message de succès ou effectuer d'autres actions si nécessaire
    } catch (error) {
      console.error('Erreur lors de la suppression du courrier:', error);
    }
  }
  },
  mounted() {
    this.fetchCourrier();
  }
}
</script>