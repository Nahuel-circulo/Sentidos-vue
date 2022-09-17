<template>
  <main class="homeView">
    <Carousel />
    <div class="reserva-section">
      <v-btn plain elevation="0" to="/reservas" block class="reserva-section__btn">
        Reserva aquí
      </v-btn>
    </div>
    <BloqueInfoServicio :title="'Nosotros'" :subtitle="'texto texto'" 
    :image="require('@/assets/images/casa-de-te.jpg')"/>

    <h1 class="ml-8 mt-2 text-center">Lo que dicen Nuestros Clientes</h1>
    <v-carousel
      color="#CD7A7F"
      
      cycle
      height="auto"
      class="my-2"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(comentario, i) in comentarios"
        :key="i"
        class="comentario"
      >
        <div class="comentario">
          <v-row class="ma-0 pa-0">
            <v-col
              cols="12"
              sm="7"
              class="ma-0 px-16 d-flex justify-center align-center"
            >
              <p class="comentario__comentario">
                {{ comentario.comment }}
              </p>
            </v-col>
            <v-col cols="12" sm="5" class="d-flex justify-center align-center">
              <div class="mx-auto d-flex flex-column">
                <h2 class="text-center white--text my-2">
                  {{ comentario.name }}
                </h2>
                <v-img
                  class="comentario__image"
                  :src="
                    comentario.gender == 'H'
                      ? require('../assets/M.svg')
                      : require('../assets/F.svg')
                  "
                >
                </v-img>
                <v-rating
                  color="#BB8A00"
                  v-model="comentario.calification"
                  class="ma-2"
                  density="default"
                ></v-rating>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-carousel-item>
    </v-carousel>
    <BloqueInfoServicio :inverted="true" :title="'Métodos de pago'" :list="metodosPago"  
    :image="require('@/assets/images/pagos.jpg')"/>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Carousel from "@/components/Carousel.vue";
import BloqueInfoServicio from "@/components/BloqueInfoServicio.vue";

export default Vue.extend({
  name: "HomeView",

  components: {
    Carousel,
    BloqueInfoServicio,
  },
  data() {
    return {
      metodosPago:["Efectivo","Débito","Crédito","Mercado Pago","Transferencia Bancaria"]
    };
  },
  computed: {
    comentarios() {
      return this.$store.getters["opiniones/getOpiniones"];
    },
  },
  created() {
    this.$store.dispatch("opiniones/fetchOpiniones");
  },
});
</script>
