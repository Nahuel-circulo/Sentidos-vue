import { api_django } from '@/api/apiDajngo';
import { GetterTree, ActionTree, MutationTree } from 'vuex';


export interface MesasC {
    id:        string;
    updatedAt: Date;
    createdAt: Date;
    nro_mesa: number;
    reservado: Boolean;
}


export interface Reservas {
    id:         string;
    fecha:      Date;
    horario:    string;
    confirmado: boolean;
    cancelado:  boolean;
    comensales: number;
    user:       User;
    createdAt:  Date;
    updatedAt:  Date;
    mesa:       Mesa;
}

export interface Mesa {
    id:        string;
    updatedAt: Date;
    createdAt: Date;
    nro_mesa:  number;
}

export interface User {
    id:        string;
    gender:    string;
    email:     string;
    createdAt: Date;
    updatedAt: Date;
    name:      string;
}

export interface MenuStateInterface {
    mesas: MesasC[],
    reservas: Reservas[]
    misReservas: Reservas[],
    loading: Boolean,
    reservaStatus: ReservaStatus
}

export interface ReservaStatus {
    type: String,
    message: String
}

const state = (): MenuStateInterface => ({
    mesas: [],
    reservas: [],
    misReservas: [],
    loading: false,
    reservaStatus: { message: '', type: '' }
})

// getters
const getters: GetterTree<MenuStateInterface, any> = {
    getMesas: (state, getters, rootState) => {
        return state.mesas
    },
    getReservas: (state, getters, rootState) => {
        return state.reservas
    },
    getMisReservas: (state) => {
        return state.misReservas
    },
    getReservasLoadin: (state) => {
        return state.loading
    },
    getReservaStatus: (state) => {
        return state.reservaStatus
    }

}

// actions
const actions: ActionTree<MenuStateInterface, any> = {
    fetchMesas: async ({ commit, state }) => {
        const { data } = await api_django.get('/mesa?limit=20')
        commit('SET_MESAS', data.docs)
    },
    fetchReservas: async ({ commit, state }, { fecha, horario }) => {
        const { data } = await api_django.get(`/reservations?where[fecha][equals]=${fecha}&where[horario][equals]=${horario}`, )
        state.reservas = data.docs
        commit('SET_RESERVAS', data.docs)
    },
    postReserva: async ({ commit }, payload:any) => {
        try {

            const { data } = await api_django.post('/reservations', {
                'mesa': payload.mesa,
                'horario': payload.horario,
                'fecha': payload.fecha,
                'confirmado': payload.confirmado,
                'comensales': payload.comensales,
                'user':payload.user_id,
                'cancelado':payload.cancelado
            })

            commit('SET_RESERVA_STATUS',{ type: 'success', message: 'Reserva Relizada con exito' })
        } catch (error) {
            commit('SET_RESERVA_STATUS', { type: 'error', message: 'Ocurrió un error al relizar la reserva' })
        }

    },
    fetchMisReservas: async ({ commit }, payload: string) => {
        commit('SET_LOADING', true)
        const { data } = await api_django.get(`/reservations?where[user][equals]=${payload}`)
        console.log(data.docs)
        commit('SET_MIS_RESERVAS', data.docs)
        commit('SET_LOADING', false)
    }


}

// mutations
const mutations: MutationTree<MenuStateInterface> = {
    SET_MESAS(state, payload: Array<Mesa>) {
        let mesas: Array<MesasC> = payload.map((mesa) => {
            return { ...mesa, reservado: false }
        })
        state.mesas = mesas
    },

    SET_RESERVAS(state, payload: Array<Reservas>) {
        if (payload.length) {
            let mesasReservadas: Array<MesasC> = [...state.mesas]
            payload.forEach((reserva) => {

                mesasReservadas.forEach((mesa, i) => {
                    if (mesa.nro_mesa == reserva.mesa.nro_mesa) {
                        const mesaReservada = { ...mesa, reservado: true }
                        mesasReservadas[i] = mesaReservada
                    } else {
                        mesasReservadas[i] = mesa
                    }
                })

            })
            state.mesas = mesasReservadas
        }
    },
    RESET_MESAS(state) {
        let mesas = state.mesas.map((mesa) => {
            return { ...mesa, reservado: false }
        })
        state.mesas = mesas
    },
    SET_MIS_RESERVAS(state, payload: Array<Reservas>) {
        state.misReservas = payload
    },
    SET_LOADING(state, payload: boolean) {
        state.loading = payload
    },
    SET_RESERVA_STATUS(state, payload: ReservaStatus) {
        state.reservaStatus = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}