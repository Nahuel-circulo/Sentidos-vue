<template>
  <main class="homeView">
    <Carousel />
    <div class="reserva-section">
      <v-btn plain elevation="0" block class="reserva-section__btn">
        Reserva aquí
      </v-btn>
    </div>
    <h2 class="ml-8 mt-2">Lo que dicen Nuestros Clientes</h2>
    <v-carousel
      color="#CD7A7F"
      :show-arrows="false"
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
                {{ comentario.comentario }}
              </p>
            </v-col>
            <v-col cols="12" sm="5" class="d-flex justify-center align-center">
              <div class="mx-auto d-flex flex-column">
                <v-img
                  class="comentario__image"
                  :src="
                    comentario.sexo == 'M'
                      ? require('../assets/M.svg')
                      : require('../assets/F.svg')
                  "
                >
                </v-img>
                <v-rating
                  color="#BB8A00"
                  v-model="comentario.calificacion"
                  class="ma-2"
                  density="default"
                ></v-rating>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-carousel-item>
    </v-carousel>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Carousel from "@/components/Carousel.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    Carousel,
  },
  setup() {
    const comentarios = [
      {
        name: "Juana Reyes",
        comentario:
          "Me ha gustado mucho la atención y profesionalidad con la que reciben a los comensales. Sin duda, lo recomiendo.",
        calificacion: 5,
        sexo: "F",
      },
      {
        name: "Fulanito",
        comentario: "Muy buena la comida, me gustó mucho.",
        calificacion: 4,
        sexo: "M",
      },
      {
        name: "Menganido",
        comentario:
          "La carne estaba un poco dura, dicen que es de ternera... cuando la empezaron a correr.",
        calificacion: 2,
        sexo: "M",
      },
    ];
    return {
      comentarios,
    };
  },
});
</script>
