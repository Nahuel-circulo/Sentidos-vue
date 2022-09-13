import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu';
import opiniones from './modules/opiniones';
import reservas from './modules/reservas';
Vue.use(Vuex)

export interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}


export default new Vuex.Store({
  modules: {
    menu,
    opiniones,
    reservas
  }
})
