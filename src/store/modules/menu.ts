import { api_django } from '@/api/apiDajngo';
import { GetterTree, ActionTree, MutationTree } from 'vuex';


export interface Producto {
    id:          string;
    name:        string;
    description: string;
    price:       string;
    image:       Image;
    delivery:    boolean;
    categoria:   Categoria;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface Categoria {
    id:        string;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Image {
    id:        string;
    filename:  string;
    mimeType:  string;
    filesize:  number;
    width:     number;
    height:    number;
    sizes:     Sizes;
    createdAt: Date;
    updatedAt: Date;
    url:       string;
}

export interface Sizes {
    thumbnail: Thumbnail;
    card:      Card;
    tablet:    Card;
}

export interface Card {
}

export interface Thumbnail {
    width:    number;
    height:   number;
    mimeType: string;
    filesize: number;
    filename: string;
    url:      string;
}


export interface MenuStateInterface {
    comidas: Producto[]
    tes: Producto[]
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
    fetchComidas: async ({ commit, state }, categoria:string) => {
        console.log(categoria)
        const { data } = await api_django.get("/producto?where[categoria][equals]=6362d349c20c424d4b387d6c")
        console.log('comidas :',data)
        commit('SET_COMIDAS', data.docs)
    },
    fetchTes: async ({ commit, state }, categoria:string) => {
        console.log(categoria)
        const { data } = await api_django.get("/producto?where[categoria][equals]=6362d378c20c424d4b387d8b")
        console.log('tes: ',data)
        commit('SET_TES', data.docs)
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