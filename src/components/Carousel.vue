<template>
  <v-carousel
    cycle
    height="500px"
    class="home-carousel"
    hide-delimiter-background
  >
    <v-carousel-item v-for="(slide, i) in images" :key="i">
      <v-img :src="slide" height="500px" cover class="home-carousel__image">
        <div class="home-carousel__container">
          <div class="home-carousel__container__item font-merriweather">
            <v-img
              :src="require('../assets/Sentidos_text.svg')"
              class="home-carousel__container__item-brand"
            ></v-img>
            <h3 class="home-carousel__container__item-title">
              Conocé nuestros servicios
            </h3>
            <router-link
              to="/eventos"
              class="home-carousel__container__item-content"
            >
              Eventos
            </router-link>
          </div>
        </div>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const images = [
      "https://www.restaurantenodo.es/wp-content/uploads/2019/06/restaurant-food-salat-2.jpg",
      "https://i0.wp.com/cravedfw.com/wp-content/uploads/2020/07/071620_ngon_kathytran_054a5174.jpg",
    ];

    return {
      images,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-carousel {
  &__image {
    position: relative;
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      background-color: black;
      opacity: 60%;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  }
  &__container {
    z-index: 10;
    width: 80%;
    height: 100%;
    max-height: 900px !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;

    &__item {
      color: white;
      z-index: 100;

      &-brand {
        max-width: 550px;
        margin: 0 auto;
      }
      &-title {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 24px;
        @media screen and (min-width: 600px) {
          font-size: 38px;
        }
      }
      &-content {
        text-decoration: none;
        color: white;
        margin: 15px 0 !important;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 18px;
        @media screen and (min-width: 600px) {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
