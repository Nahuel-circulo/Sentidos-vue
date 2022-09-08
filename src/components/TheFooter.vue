<template>
  <v-footer class="footer font-inter">
    <div class="footer__container">
      <div class="footer__info">
        <div style="max-width: 485px">
          <v-img
            class="footer__info-logo"
            :src="require('@/assets/logo.svg')"
          />
        </div>
        <p style="max-width: 485px; text-align: center">
          Copyright © 2022 Sentidos, Inc.
        </p>
        <div class="d-flex justify-space-between flex-wrap py-2">
          <p>
            <span class="text-divider">|</span>
            Política de privacidad
            <span class="text-divider">|</span>
            Condiciones de Servicio
            <span class="text-divider">|</span>
          </p>
          <p>
            <span class="text-divider">|</span>
            Desarrollado por DevStation
            <span class="text-divider">|</span>
          </p>
        </div>
      </div>
    </div>
  </v-footer>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
