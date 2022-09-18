import { api_django } from '@/api/apiDajngo';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

// initial state
// shape: [{ id, quantity }]

export interface Opiniones {
    id:           number;
    name:         string;
    comment:      string;
    calification: number;
}

export interface MenuStateInterface {
    opiniones: Opiniones[]
}

const state = (): MenuStateInterface => ({
    opiniones: []
})

// getters
const getters: GetterTree<MenuStateInterface, any> = {
    getOpiniones: (state, getters, rootState) => {
        return state.opiniones
    },

}

// actions
const actions: ActionTree<MenuStateInterface, any> = {
    fetchOpiniones: async ({ commit, state }, products) => {
        const { data } = await api_django.get('/opinion/',{
            params:{
                limit:3
            }
        })
        state.opiniones = data.results
        console.log(data.results)
        commit('SET_OPINIONES',data.results)
    },


}

// mutations
const mutations: MutationTree<MenuStateInterface> = {
    SET_OPINIONES(state, payload) {
        state.opiniones = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}