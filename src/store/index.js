import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex({
    state: {
        username: ''
    },
    getters: {
        getStateUsername(state) {
            return state.username
        }
    },
    mutations: {
        change(state, username) {
            state.username = username
        }
    }

})

export default store