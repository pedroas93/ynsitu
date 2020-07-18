import { db } from "../../../main";

export default {
  state: {
    name: null,
    lastName: null,
    country: null,
    email: null,
    id: null,
    users: []
  },
  getters: {
    id: state => state.id,
    name: state => state.name,
    lastName: state => state.lastName,
    country: state => state.country,
    email: state => state.email,
    users: state => state.users,
  },
  actions: {
    getEditId: async function ({ dispatch }) {
      try {
        await db
          .collection("user")
          .doc(this.state.id)
          .delete();
        dispatch('getUsers');
      } catch (error) {
        console.log("Error deleteEvent is-> ", error);
      }
    },
    getUsers: async function ({ commit }) {
      try {
        commit('cleanUsers', [])
        const snapshot = await db.collection("user").get();

        snapshot.forEach(doc => {
          let eventoData = doc.data();
          eventoData.id = doc.id;
          commit('allUsers', eventoData)
        });
      } catch (error) {
        console.log("Error getEvent is-> ", error);
      }
    },
    updateUsers: async function ({ commit, dispatch }) {
      console.log('name??????????',this.state.name,'lastName',this.state.lastName)
      try {
        await db
          .collection("user")
          .doc(this.state.id)
          .update({
            Name: this.state.name,
            LastName: this.state.lastName,
            Country: this.state.country,
            Email: this.state.email
          });
        commit('clearDataUsers')
        dispatch('getUsers');
      } catch (error) {
        console.log("Error updateEvent is-> ", error);
      }
    },
    deleteUser: async function ({ dispatch }) {
      try {
        console.log('id--->', this.state.id)
        await db
          .collection("user")
          .doc(this.state.id)
          .delete();
        dispatch('getUsers');
      } catch (error) {
        console.log("Error deleteEvent is-> ", error);
      }
    },
    addUsers: async function ({ commit, dispatch }) {
      try {
        if (this.state.name && this.state.lastName && this.state.country && this.state.email) {
          await db.collection("user").add({
            Name: this.state.name,
            LastName: this.state.lastName,
            Country: this.state.country,
            Email: this.state.email
          });
          commit('clearDataUsers')
          dispatch('getUsers');

        } else {
          console.log("Campos Oblicatorios");
        }
      } catch (error) {
        console.log("Error addEvent is-> ", error);
      }
    }
  },
  mutations: {
    setName(state, actionName) {
      this.state.name = actionName;
    },
    setLastName(state, actionLastName) {
      this.state.lastName = actionLastName;
    },
    setCountry(state, actionCountry) {
      this.state.country = actionCountry;
    },
    setEmail(state, actionEmail) {
      this.state.email = actionEmail;
    },
    setId(state, actionid) {
      this.state.id = actionid;
    },
    allUsers(state, actionUsers) {
      state.users = [...state.users, actionUsers]
    },

    clearDataUsers() {
      this.state.name = null,
        this.state.lastName = null,
        this.state.country = null,
        this.state.email = null
    },
    cleanUsers(state, actionClean) {
      state.users = actionClean
    }
  },
  modules: {
    // user,
  }
};
