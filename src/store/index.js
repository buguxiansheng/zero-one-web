import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state:{
        user:{
            userName:'',
            token: ''
        },
        menuList: [] 
    },
    mutations:{
        changeUser(state,val1,val2){
            state.user.userName = val1
            state.user.token = val2 
        },
        changeMenuList(state,val){
            state.menuList = val
        }
    }
})

export default store

