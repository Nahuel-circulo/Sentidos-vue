import { api_django } from '@/api/apiDajngo';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

// initial state
// shape: [{ id, quantity }]

export interface User {
    id:        string;
    gender:    string;
    email:     string;
    createdAt: Date;
    updatedAt: Date;
    name:      string;
}
export interface Opiniones {
    id:           string;
    comment:      string;
    calification: number;
    user:         User;
    createdAt:    Date;
    updatedAt:    Date;
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
        const { data } = await api_django.get('/opinion',{
            params:{
                limit:3,
                depth:1
            }
        })
        console.log(data.docs)
        state.opiniones = data.docs
        commit('SET_OPINIONES',data.docs)
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