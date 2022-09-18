import { api_django } from '@/api/apiDajngo';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

// initial state

export interface Usuario {
    id: number;
    name: string;
    email: string;
    gender: number;
}

export interface MenuStateInterface {
    usuario: Usuario | null
    loginError: String
}

const state = (): MenuStateInterface => ({
    usuario: null,
    loginError: ""
})

// getters
const getters: GetterTree<MenuStateInterface, any> = {
    getUser: (state) => {
        return state.usuario
    },
    getLoginError: (state) => {
        return state.loginError
    }
}

// actions
const actions: ActionTree<MenuStateInterface, any> = {
    fetchUser: async ({ commit }, { email, password }) => {
        const { data } = await api_django.get('/users/', {
            params: {
                email,
                password
            }
        })
        if (data.results.length) {
            localStorage.setItem("sentidos_user", JSON.stringify(data.results[0]))
            commit('SET_USER', data.results[0])
            commit("SET_LOGIN_ERROR", "")
        } else {
            commit("SET_LOGIN_ERROR", "Los datos ingresados son incorrectos")
        }
    },
}

// mutations
const mutations: MutationTree<MenuStateInterface> = {
    SET_USER(state, usuario) {
        state.usuario = usuario
    },
    SET_LOGIN_ERROR(state, payload) {
        state.loginError = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}