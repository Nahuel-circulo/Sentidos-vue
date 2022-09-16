import { api_django } from '@/api/apiDajngo';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

// initial state

export interface Usuario {
    id:           number;
    name:         string;
    email:      string;
    gender : number;
}

export interface MenuStateInterface {
    usuario: Usuario | null
    loginError: String
}

const state = (): MenuStateInterface => ({
    usuario: null,
    loginError:""
})

// getters
const getters: GetterTree<MenuStateInterface, any> = {
    getUser: (state, getters, rootState) => {
        return state.usuario
    },
    getLoginError:(state)=>{
        return state.loginError
    }

}

// actions
const actions: ActionTree<MenuStateInterface, any> = {
    fetchUser: async ({ commit, state }, {email,password}) => {
        const { data } = await api_django.get('/users/',{params:{
            email ,
            password            
        }})
        
        console.log(data.results)

        if (data.results.length) {
            console.log("ejecutas")
            localStorage.setItem("sentidos_user",JSON.stringify(data.results[0]))
            commit('SET_USER',data.results[0])
            commit("SET_LOGIN_ERROR","")
        }else{
            commit("SET_LOGIN_ERROR","Los datos ingresados son incorrectos")
        }
    },


}

// mutations
const mutations: MutationTree<MenuStateInterface> = {
    SET_USER(state, payload) {
        state.usuario = payload
    },
    SET_LOGIN_ERROR(state,payload){
        state.loginError=payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}