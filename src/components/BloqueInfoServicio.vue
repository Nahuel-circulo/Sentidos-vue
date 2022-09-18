<template>
  <section
    class="bloque-servicio"
    :class="{ 'bloque-servicio--inverted': inverted }"
  >
    <v-img :src="image" class="bloque-servicio__image" height="100%" max-height="600px" />
    <div class="bloque-servicio__text">
      <h2>{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>

      <ul v-if="list" class="list">
        <li v-for="item in list" :key="item" class="list-item">
          {{ item}}
        </li>
      </ul>

      <v-btn
        v-if="button"
        large
        depressed
        color="primary"
        class="px-8 mt-md-8"
        @click="toContactForm"
      >
        {{ button.title }}
      </v-btn>

       <v-btn
        v-else-if="link"
        large
        depressed
        color="primary"
        class="px-8"
        :href="link.link"
      >
        {{ link.title }}
      </v-btn>
    </div>
  </section>
</template>


<script lang="ts">
import { defineComponent } from 'vue';


interface ItemInterface {
  name: string
  id: number
}

export default defineComponent({
  name: 'BloqueInfo',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    list: {
      type: Array,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    button: {
      type: Object,
      required: false,
      default: null,
    },
    link: {
      type: Object,
      required: false,
      default: null,
    },
    inverted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
    setup() {
 
  },
})
</script>
