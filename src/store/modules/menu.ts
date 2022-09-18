import { api_django } from '@/api/apiDajngo';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

// initial state
// shape: [{ id, quantity }]

export interface Food {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
}

export interface MenuStateInterface {
    comidas: Food[]
    tes: Food[]
}

const state = (): MenuStateInterface => ({
    comidas: [],
    tes: []
})

// getters
const getters: GetterTree<MenuStateInterface, any> = {
    getComidas: (state, getters, rootState) => {
        return state.comidas
    },
    getTes: (state, getters, rootState) => {
        return state.tes
    },
}

// actions
const actions: ActionTree<MenuStateInterface, any> = {
    fetchComidas: async ({ commit, state }, products) => {
        const { data } = await api_django.get('/food/', {
            params: {
                category: products
            }
        })
        commit('SET_COMIDAS', data.results)
    },
    fetchTes: async ({ commit, state }, products) => {
        const { data } = await api_django.get('/food/', {
            params: {
                category: products
            }
        })
        commit('SET_TES', data.results)


    },



}

// mutations
const mutations: MutationTree<MenuStateInterface> = {
    SET_COMIDAS(state, payload) {
        state.comidas = payload
    },
    SET_TES(state, payload) {
        state.tes = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}