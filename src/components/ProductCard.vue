<template>
  <v-card class="mx-auto product-card" max-width="344" >
    <v-img v-if="image" :src="image"></v-img>
    <v-card-text>
      <h4 class="product-card__title">{{ title }}</h4>
      <h4 class="product-card__price">{{ price }}</h4>
    </v-card-text>
    <v-card-actions>
      <v-btn text small class="product-card__btn" @click="show = true">
        Descripcion
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="show"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-0">
          <p>
            {{ description }}
          </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text class="product-card__btn" @click="show = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  setup() {
    const show = ref(false);

    return {
      show,
    };
  },
});
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
  transition: all .5s;
}
</style>
