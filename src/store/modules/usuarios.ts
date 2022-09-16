import { api_django } from '@/api/apiDajngo';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

// initial state
// shape: [{ id, quantity }]

export interface Usuario {
    id:           number;
    name:         string;
    email:      string;
    gender : number;
}

export interface MenuStateInterface {
    usuario: Usuario | null
}

const state = (): MenuStateInterface => ({
    usuario: null
})

// getters
const getters: GetterTree<MenuStateInterface, any> = {
    getUser: (state, getters, rootState) => {
        return state.usuario
    },

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
        }
    },


}

// mutations
const mutations: MutationTree<MenuStateInterface> = {
    SET_USER(state, payload) {
        state.usuario = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}