<template>
  <v-app class="app-wrapper">
    <navbar/>
    <v-main>
      <router-view/>
    </v-main>
    <the-footer/>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './components/navbar/Navbar.vue';
import TheFooter from './components/TheFooter.vue';

export default defineComponent({
    name: "App",
    data() {
        return {
        //
        };
    },
    components: { Navbar ,TheFooter}
})
</script>

<style lang="scss">
@import './assets/styles/main.scss';
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  margin-top:80px;
}
</style>