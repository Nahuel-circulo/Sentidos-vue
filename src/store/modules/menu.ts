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
    productos: Food[]
}

const state = (): MenuStateInterface => ({
    productos: []
})

// getters
const getters: GetterTree<MenuStateInterface, any> = {
    getProductos: (state, getters, rootState) => {
        return state.productos
    },

}

// actions
const actions: ActionTree<MenuStateInterface, any> = {
    fetchProductos: async ({ commit, state }, products) => {
        const { data } = await api_django.get('/food/')
        state.productos = data.results
        console.log(data.results)
        commit('SET_PRODUCTOS',data.results)
    },


}

// mutations
const mutations: MutationTree<MenuStateInterface> = {
    SET_PRODUCTOS(state, payload) {
        state.productos = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}