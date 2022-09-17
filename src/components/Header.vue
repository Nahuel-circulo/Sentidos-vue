<template >
  <v-img :src="image" class="header white--text">
    <div class="header__container">
      <div class="header__information">
        <h2 class="header__information-title">{{ title }}</h2>
        <p class="header__information-subtitle">
          {{ subtitle }}
        </p>
        <nuxt-link v-if="buttonHeader" :to="buttonHeader.link">
          <button class="header__information-btn white--text">
            {{ buttonHeader.text }}
          </button>
        </nuxt-link>
      </div>
    </div>
  </v-img>
</template>


<script lang="ts" >
import { defineComponent, PropType } from 'vue'

interface ButtonHeader {
  text: string
  link: string
}
export default defineComponent({
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    buttonHeader: {
      type: Object as PropType<ButtonHeader>,
      required: false,
    },
  },

  setup() {

    return {}
  },
})
</script>
