<template>
  <main>
    <div class="menu-view">
      <v-container>
        <div class="menu__qr">
          <v-row class="menu__qr-container d-flex justify-center">
            <v-col
              cols="12"
              sm="8"
              md="6"
              class="d-flex flex-column items-center justify-center"
            >
              <h2 class="menu__qr-title">
                Escanee el
                <span class="menu__qr-title__bold"> código QR </span> y siga
                desde su celular
              </h2>
              <p class="menu__qr-subtitle">Cómo escanear el código QR:</p>
              <p class="menu__qr-steps" v-for="(step, i) in steps" :key="step">
                {{ i + 1 }}. {{ step }}
              </p>
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <v-img
                class="menu__qr-image"
                :src="require('@/assets/qr-code.svg')"
              >
              </v-img>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>

    <Header
      :title="'Menú Casa de Té'"
      subtitle="Utilizamos los mejores productos del mercado"
      class="my-8"
      :image="require('../assets/images/casa-de-te.jpg')"
    />
    <div class="menu-view">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="food in tes"
            :key="food.id"
          >
            <ProductCard
              :description="food.description"
              :image="food.image.url"
              :price="food.price"
              :title="food.name"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <Header
      :title="'Menú Restaurante'"
      subtitle="Las comidas más ricas las encontras acá"
      class="my-8"
      :image="require('../assets/images/restaurante.jpg')"
    />
    <div class="menu-view">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="food in comidas"
            :key="food.id"
          >
            <ProductCard
              :description="food.description"
              :image="food.image.url"
              :price="food.price"
              :title="food.name"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import ProductCard from "@/components/ProductCard.vue";
import Header from "@/components/Header.vue";
export default Vue.extend({
  components: { ProductCard, Header },
  data() {
    return {
      loading: true,
      steps: [
        "Abra la cámara de su celular.",
        "Apunte hacia la pantalla como si fuera a sacar una foto, ubicando el código en el centro.",
        "Cuando la cámara lo detecte, le mostrará un link.",
        "Haz click  ¡Y LISTO!",
      ],
    };
  },
  methods: {},
  computed: {
    comidas() {
      return this.$store.getters["menu/getComidas"];
    },
    tes() {
      return this.$store.getters["menu/getTes"];
    },
  },
  created() {
    this.$store.dispatch("menu/fetchComidas", "6362d349c20c424d4b387d6c");
    this.$store.dispatch("menu/fetchTes", "6362d378c20c424d4b387d8b");
  },
});
</script>
