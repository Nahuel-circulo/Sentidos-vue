import { api_django } from '@/api/apiDajngo';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

export interface MesasFetch {
    id: number;
    nro_mesa: number;
}
export interface Mesas {
    id: number;
    nro_mesa: number;
    reservado: Boolean;
}


export interface Reservas {
    id: number;
    user_id:number;
    nro_mesa: number;
    horario: string;
    fecha: String;
    confirmado: boolean;
    comensales: number;
}

export interface MenuStateInterface {
    mesas: Mesas[],
    reservas: Reservas[]
    misReservas: Reservas[],
    loading: Boolean
}

const state = (): MenuStateInterface => ({
    mesas: [],
    reservas: [],
    misReservas:[],
    loading: false
})

// getters
const getters: GetterTree<MenuStateInterface, any> = {
    getMesas: (state, getters, rootState) => {
        return state.mesas
    },
    getReservas: (state, getters, rootState) => {
        return state.reservas
    },
    getMisReservas:(state)=>{
        return state.misReservas
    },
    getReservasLoadin:(state)=>{
        return state.loading
    }

}

// actions
const actions: ActionTree<MenuStateInterface, any> = {
    fetchMesas: async ({ commit, state }) => {
        const { data } = await api_django.get('/tables/')
        commit('SET_MESAS', data.results)
    },
    fetchReservas: async ({ commit, state }, { fecha, horario }) => {
        const { data } = await api_django.get('/reservation/', {
            params: {
                horario,
                fecha
            }
        })
        state.reservas = data.results
        console.log(data)
        commit('SET_RESERVAS', data.results)
    },
    postReserva: async ({ commit }, payload: Reservas) => {
        try {

            const { data } = await api_django.post('/reservation/', {
                'nro_mesa':payload.nro_mesa,
                'horario':payload.horario,
                'fecha':payload.fecha,
                'confirmado':payload.confirmado,
                'comensales':payload.comensales,
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    },
    fetchMisReservas: async ({commit},payload:number)=>{
        commit('SET_LOADING', true)
        const { data } = await api_django.get('/reservation/', {
            params: {
                user_id:payload
            }
        })
        commit('SET_MIS_RESERVAS', data.results)
        commit('SET_LOADING', false)
    }


}

// mutations
const mutations: MutationTree<MenuStateInterface> = {
    SET_MESAS(state, payload: Array<MesasFetch>) {
        let mesas: Array<Mesas> = payload.map((mesa) => {
            return { ...mesa, reservado: false }
        })
        state.mesas = mesas
    },

    SET_RESERVAS(state, payload: Array<Reservas>) {
        if (payload.length) {
            console.log("ingresa")
            let mesasReservadas: Array<Mesas> = [...state.mesas]
            payload.forEach((reserva) => {

                mesasReservadas.forEach((mesa,i) => {
                    if (mesa.nro_mesa == reserva.nro_mesa) {
                        const mesaReservada = { ...mesa, reservado: true }
                        mesasReservadas[i]= mesaReservada 
                    } else {
                        mesasReservadas[i]= mesa
                    }
                })

            })
            state.mesas = mesasReservadas
        }
    },
    RESET_MESAS(state){
        let mesas = state.mesas.map((mesa)=>{
            return {...mesa,reservado:false}
        })
        state.mesas = mesas
    },
    SET_MIS_RESERVAS(state,payload:Array<Reservas>){
        state.misReservas = payload
    },
    SET_LOADING(state ,payload:boolean){
        state.loading = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}