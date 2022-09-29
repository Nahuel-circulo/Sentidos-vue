<template>
  <main>
    <Header
      title="Eventos"
      :image="require('@/assets/images/eventos.jpg')"
      subtitle="Organiza tu evento junto a nosotros"
    />
    <div class="eventosView">
      <v-container>
        <div class="eventosView__header">
          <h1 class="eventosView__header-title">
            EVENTOS CORPORATIVOS Y SALONES PRIVADOS
          </h1>
          <p class="eventosView__header-content">
            Espacios y salones exclusivos ideales para realizar eventos
            corporativos, comidas privadas mientras se disfruta de la mejor
            comida de Argentina. Organizamos comidas exclusivas para grupos,
            eventos corporativos y sociales con capacidad hasta 120 personas. Diseñamos
            menús para cada ocasión con los mejores aperitivos, deliciosas
            guarniciones y riquísimos postres artesanales.
          </p>
        </div>

        <div class="eventosView__gallery">
          <h4 class="eventosView__gallery-title">
            ALGUNAS FOTOGRAFÍAS DE NUESTROS EVENTOS
          </h4>

          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-for="evento in eventos"
              :key="evento.image"
            >
              <!-- <h3>Evento</h3> -->
              <div class="eventosView__gallery-card my">
                <v-img
                  style="aspect-ratio: 4/3"
                  class="eventosView__gallery-card__image pointer"
                  cover
                  @click="changeImage(evento.image)"
                  :src="require(`@/assets/eventos/${evento.image}`)"
                >
                </v-img>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
      {{ imagenSeleccionada }}
      <v-overlay :opacity="0.8" :value="overlay">
        <v-img
          v-if="imagenSeleccionada"
          class="image__overlay-img"
          position="relative"
          style="aspect-ratio: 4/3"
          :src="require(`@/assets/eventos/${imagenSeleccionada}`)"
        >
          <v-btn class="mt-4 btn-overlay" fab small color="orange lighten-2" @click="cerrarImagen">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-img>
      </v-overlay>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  setup() {
    const overlay = ref(false);
    const viewImageOverlay = () => {
      console.log("muestra");
      overlay.value = !overlay.value;
    };
    const imagenSeleccionada = ref("");
    const cerrarImagen = () => {
      imagenSeleccionada.value = "";
      overlay.value = false;
    };
    const changeImage = (image: string) => {
      imagenSeleccionada.value = image;
      overlay.value = true;
    };
    const eventos = [
      { name: "", image: "evento1.jpg" },
      { name: "", image: "evento2.jpg" },
      { name: "", image: "evento3.jpg" },
      { name: "", image: "evento4.jpg" },
      { name: "", image: "evento5.jpg" },
      { name: "", image: "evento6.jpg" },
      { name: "", image: "evento7.jpg" },
      { name: "", image: "evento8.jpeg" },
      { name: "", image: "evento9.jpg" },
      { name: "", image: "evento10.jpg" },
    ];
    return {
      overlay,
      viewImageOverlay,
      imagenSeleccionada,
      eventos,
      changeImage,
      cerrarImagen,
    };
  },
  components: { Header },
});
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
.btn-overlay {
  position: absolute;
  right: 15px;
  top: 0;

  @media screen and (min-width:768px){
    top:90px;
  }
}
</style>
