import { api_django } from '@/api/apiDajngo';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

export interface Mesas {
    id:       number;
    nro_mesa: number;
}
export interface Reservas {
    id:         number;
    nro_mesa:   number;
    horario:    string;
    fecha:      String;
    confirmado: boolean;
    comensales: number;
}

export interface MenuStateInterface {
    mesas: Mesas[],
    reservas: Reservas[]
}

const state = (): MenuStateInterface => ({
    mesas: [],
    reservas: []
})

// getters
const getters: GetterTree<MenuStateInterface, any> = {
    getMesas: (state, getters, rootState) => {
        return state.mesas
    },
    getReservas: (state, getters, rootState) => {
        return state.reservas
    },

}

// actions
const actions: ActionTree<MenuStateInterface, any> = {
    fetchMesas: async ({ commit, state }, products) => {
        const { data } = await api_django.get('/tables/')
        state.mesas = data.results
        commit('SET_MESAS',data.results)
    },


}

// mutations
const mutations: MutationTree<MenuStateInterface> = {
    SET_MESAS(state, payload) {
        state.mesas = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}