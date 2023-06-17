import { createStore } from 'vuex'

export default createStore({
  
  state: {
    id:''
  },

  getters: {
   
  },

  mutations: {
    SettingUId(state, id){
        state.id = id;
    },
  },

  actions: {

  },

})

