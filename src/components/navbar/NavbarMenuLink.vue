<template>
  <div style="width: 100%">
    <router-link
      v-if="type === 'NuxtLink'"
      exact
      :to="url"
      class="navbar__menu__link"
    >
      <span class="overlay">
      </span>

      <span>
        <img v-if="icon" :src="icon" />
      </span>
      <span>
        <slot></slot>
      </span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavbarLink',
  props: {
    type: {
      type: String,
      default: 'NuxtLink',
    },
    url: {
      type: String,
      default: '/',
    },
    icon: {
      type: String,
      default: null,
    },
  },
  setup() {
    //
  },
})
</script>