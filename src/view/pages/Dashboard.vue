<template>
  <div data-app>
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
          <tr v-for="item in users" :key="item.Nombre">
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
            <v-form @submit.prevent="modelDialog === 'addEvent' ? addEvent() : updateEvent()">
              <v-text-field type="text" label="Agregar Nombre" required v-model="$store.state.name"></v-text-field>
              <v-text-field
                type="text"
                label="Agregar Apellido"
                required
                v-model="$store.state.lastName"
              ></v-text-field>
              <v-text-field
                type="email"
                label="Agregar E-mail"
                required
                v-model="emailValidate"
              ></v-text-field>
              <v-text-field
                type="text"
                label="Agregar Pais"
                required
                v-model="$store.state.country"
              ></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                dark
                class="mr-4"
                @click.stop="dialog=false"
              >{{nameButton}}</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
    <br />
    <div class="mr-4">
      <v-btn color="primary" dark large @click="openModalAdd">Agregar</v-btn>
    </div>
  </div>
</template>

<script>
// import CRUDTable from "../content/widgets/CRUDTable";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "dashboard",
  data() {
    return {
      desserts: [],
      dialog: false,
      alert: true,
      editContact: false,
      modelDialog: null,
      nameButton: null,
      nameModal: null,
      updateItem: {},
      isValidateEmail:true, 
      emailValidate:null
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
  },
  created() {
    this.getUsers();
  },
  components: {},
  computed: {
    ...mapGetters(["lastName", "country", "email", "users", "name", "item"])
  },
  methods: {
    ...mapActions([
      "getUsers",
      "addUsers",
      "deleteUser",
      "getEditId",
      "updateUsers"
    ]),
    ...mapMutations([
      "setId",
      "setDataUser",
      "setName",
      "setLastName",
      "setCountry",
      "setEmail"
    ]),
    validateEmail(valor) {
      if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(valor)) {
        this.isValidateEmail = true;
      } else {
        alert("La dirección de email es incorrecta.");
        this.isValidateEmail = false;
      }
    },
    async updateEvent() {
      this.validateEmail(this.emailValidate)
      if(this.isValidateEmail){
        this.setEmail(this.emailValidate);
        this.updateUsers();
        this.dialog = "";
        this.nameModal = "";
        this.nameButton = "";
        this.updateItem = "";
        this.emailValidate=null;
      }
    },
    async deleteEvent(item) {
      this.setId(item.id);
      this.deleteUser();
    },
    openModalUpdate(item) {
      this.modelDialog = "updateEvent";
      this.dialog = true;
      this.nameModal = "Editar Usuario";
      this.nameButton = "Editar";
      this.updateItem = item;
      this.setId(item.id);
      this.setName(item.Name);
      this.setLastName(item.LastName);
      this.setCountry(item.Country);
      this.setEmail(item.Email);
      this.emailValidate = item.Email;
    },
    openModalAdd() {
      this.modelDialog = "addEvent";
      this.dialog = true;
      this.nameModal = "Agregar nuevo usuario";
      this.nameButton = "Agregar";
    },
    async addEvent() {
      this.validateEmail(this.emailValidate)
      if(this.isValidateEmail){
        this.setEmail(this.emailValidate);
        this.addUsers();
        this.emailValidate=null;
      }
    }
  }
};
</script>
