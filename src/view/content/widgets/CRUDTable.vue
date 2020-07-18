<template>
  <div>
    <div class="mr-4">
      <v-btn color="primary" dark large @click="openModalAdd">Agregar</v-btn>
    </div>
    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-left">Apellidos</th>
            <th class="text-left">Email</th>
            <th class="text-left">Pais</th>
            <th class="text-left">Editar</th>
            <th class="text-left">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.Nombre">
            <td>{{ item.Name }}</td>
            <td>{{ item.LastName }}</td>
            <td>{{ item.Email }}</td>
            <td>{{ item.Country }}</td>
            <td>
              <v-btn icon @click="openModalUpdate(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn icon @click="deleteEvent(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="mr-4">
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>{{nameModal}}</v-card-title>
          <v-container>
            <v-form
              @submit.prevent="modelDialog === 'addEvent' ? addEvent() : updateEvent(updateItem)"
            >
              <v-text-field type="text" label="Agregar Nombre" required v-model="name"></v-text-field>
              <v-text-field type="text" label="Agregar Apellido" required v-model="lastName"></v-text-field>
              <v-text-field type="text" label="Agregar E-mail" required v-model="email"></v-text-field>
              <v-text-field type="text" label="Agregar Pais" required v-model="country"></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                class="mr-4"
                @click.stop="dialog=false"
              >{{nameButton}}</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  name: "CRUDTable",
  data() {
    return {
      desserts: [],
      dialog: false,
      name: null,
      lastName: null,
      country: null,
      email: null,
      editContact: false,
      modelDialog: null,
      nameButton: null,
      nameModal: null,
      updateItem: {}
    };
  },
  mounted() {},
  created() {
    this.getEvent();
  },
  methods: {
    async updateEvent(item) {
      try {
        await db
          .collection("user")
          .doc(item.id)
          .update({
            Name: this.name,
            LastName: this.lastName,
            Country: this.country,
            Email: this.email,
          });
        this.dialog = "";
        this.nameModal = "";
        this.nameButton = "";
        this.updateItem = "";
        this.name = "";
        this.lastName = "";
        this.country = "";
        this.email = "";
        this.getEvent();
      } catch (error) {
        console.log("Error updateEvent is-> ", error);
      }
    },
    async deleteEvent(item) {
      try {
        await db
          .collection("user")
          .doc(item.id)
          .delete();
        this.getEvent();
      } catch (error) {
        console.log("Error deleteEvent is-> ", error);
      }
    },
    openModalUpdate(item) {
      this.modelDialog = "updateEvent";
      this.dialog = true;
      this.nameModal = "Editar Usuario";
      this.nameButton = "Editar";
      this.updateItem = item;
      this.name = item.Name;
      this.lastName = item.LastName;
      this.country = item.Country;
      this.email = item.Email;
    },
    openModalAdd() {
      this.modelDialog = "addEvent";
      this.dialog = true;
      this.nameModal = "Agregar nuevo usuario";
      this.nameButton = "Agregar";
    },
    async addEvent() {
      try {
        if (this.name && this.lastName && this.country && this.email) {
          await db.collection("user").add({
            Name: this.name,
            LastName: this.lastName,
            Country: this.country,
            Email: this.email,
          });
          this.getEvent();

          this.name = null;
          this.lastName = null;
          this.country = null;
          this.email = null;
        } else {
          console.log("Campos Oblicatorios");
        }
      } catch (error) {
        console.log("Error addEvent is-> ", error);
      }
    },
    async getEvent() {
      this.desserts = [];
      try {
        const snapshot = await db.collection("user").get();

        snapshot.forEach(doc => {
          let eventoData = doc.data();
          eventoData.id = doc.id;
          this.desserts.push(eventoData);
        });
      } catch (error) {
        console.log("Error getEvent is-> ", error);
      }
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
