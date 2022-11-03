<template>
  <main class="homeView">
    <Carousel />
    <div class="reserva-section">
      <v-btn
        plain
        elevation="0"
        to="/reservas"
        block
        class="reserva-section__btn"
      >
        Reserva aquí
      </v-btn>
    </div>

    <BloqueInfoServicio
      :title="'Sentidos restaurante y casa de té.'"
      :subtitle="'Somos apasionados por lo que hacemos, usamos los mejores ingredientes en nuestros productos para hacerte vivir una experiencia única.'"
      :image="require('@/assets/images/casa-de-te.jpg')"
    />

    <h1 class="mt-2 text-center white--text" style="background-color: #bb8a00">
      Lo que dicen Nuestros Clientes
    </h1>
    <v-carousel color="#CD7A7F" cycle height="auto" hide-delimiter-background>
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
                  {{ comentario.user.name }}
                </h2>
                <v-img
                  class="comentario__image"
                  :src="
                    comentario.user.gender == 'H'
                      ? require('../assets/M.svg')
                      : require('../assets/F.svg')
                  "
                >
                </v-img>
                <v-rating
                  readonly
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
    <div class="reserva-section mb-4">
      <v-btn
        plain
        elevation="0"
        to="/mi-cuenta"
        block
        class="reserva-section__btn"
      >
        Dejanos tu opinión
      </v-btn>
    </div>
    <div class="protocolo-container">
      <v-img
        class="protocolo-image mx-auto"
        max-width="800px"
        contain
        :src="require('@/assets/images/protocolo.jpg')"
      >
      </v-img>
    </div>
    <BloqueInfoServicio
      :inverted="true"
      :title="'Métodos de pago'"
      :list="metodosPago"
      :image="require('@/assets/images/pagos.jpg')"
    />
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
      metodosPago: [
        "Efectivo",
        "Débito",
        "Crédito",
        "Mercado Pago",
        "Transferencia Bancaria",
      ],
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
