<template>
  <div style="min-height: 460px">
    <div class="backgroud-view">
      <div class="backgroud-view__left"></div>
      <div class="backgroud-view__right"></div>
    </div>
    <div class="slideBox" ref="slideBox">
      <div class="slideBox__topLayer" ref="topLayer">
        <div class="slideBox__topLayer-left">
          <div class="slideBox__topLayer-right__content">
            <h2 class="slideBox__topLayer-right__content-title">Registrarse</h2>
            <form action="">
              <div class="form-group">
                <input type="text" placeholder="Usuario" />
                <input type="password" placeholder="Contraseña" />
              </div>
              <div class="form-group"></div>
              <div class="form-group"></div>
              <button>Registrarse</button>
            </form>
            <button id="goLeft" @click="goLeft" class="off">Ingresar</button>
          </div>
        </div>

        <div class="slideBox__topLayer-right">
          <div class="slideBox__topLayer-right__content">
            <h2 class="slideBox__topLayer-right__content-title">Ingresar</h2>
            <form action="">
              <div class="form-group">
                <input type="text" placeholder="Usuario" />
                <input type="password" placeholder="Contraseña" />
              </div>
              <button id="login" type="submit">Ingresar</button>
            </form>
            <button id="goRight" @click="goRight" class="off">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";

export default defineComponent({
  setup() {
    const windowWidth = ref(0);

    const isDesktopSize = computed(() => windowWidth.value >= 768);
    const topLayer = ref<HTMLElement>();
    const slideBox = ref<HTMLElement>();

    onMounted(() => {
      windowWidth.value = window.innerWidth;
      window.addEventListener("resize", () => {
        windowWidth.value = window.innerWidth;
      });
    });
    const goRight = () => {
      if (slideBox.value) {
        slideBox.value.style.marginLeft = "0";
      }
      if (topLayer.value) {
        topLayer.value.style.marginLeft = "100%";
      }
    };
    const goLeft = () => {
      if (topLayer.value) {
        topLayer.value.style.marginLeft = "0";
      }
      if (slideBox.value) {
        if (isDesktopSize.value) {
          slideBox.value.style.marginLeft = "50%";
        } else {
          slideBox.value.style.marginLeft = "0%";
        }
      }
    };
    return {
      goRight,
      goLeft,
      topLayer,
      slideBox,
    };
  },
});
</script>

<style scoped>
button {
  background: #cd7a7f;
  padding: 10px 16px;
  width: auto;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  color: #fff;
  line-height: 16px;
  letter-spacing: 0.5px;
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
  border: 0;
  outline: 0;
  margin: 15px 15px 15px 0;
  transition: all 0.25s;
}

button:hover {
  background: #545454;
  color: #cd7a7f;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
}
.off {
  background: none;
  color: #bb8a00;
  box-shadow: none;
}

.slideBox__topLayer-right .off:hover {
  background: #eee;
  color: #bb8a00;
  box-shadow: none;
}
.slideBox__topLayer-left .off:hover {
  box-shadow: none;
  color: #bb8a00;
  background: #363a3d;
}
input {
  background: transparent;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #45494c;
  font-size: 14px;
  color: #959595;
  padding: 8px 0;
  margin-top: 20px;
}
</style>
