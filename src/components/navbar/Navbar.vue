<template>
  <nav id="navbar" class="navbar">
    <div class="navbar__container">
      <div class="navbar__home">
        <router-link to="/" exact>
          <img
            :src="require('../../assets/logo.svg')"
            alt="Sentidos tea house"
          />
        </router-link>
      </div>
      <!--  -->
      <div class="navbar__links">
        <div class="navbar__links__link">
          <router-link to="/">Inicio</router-link>
        </div>
        <div class="navbar__links__link">
          <router-link to="/menu">Menu</router-link>
        </div>
        <div class="navbar__links__link">
          <router-link to="/eventos">Eventos</router-link>
        </div>
        <!-- <div class="navbar__links__link">
          <button
            @mouseover="serviciosToggle(true)"
            @mouseleave="serviciosToggle(false)"
          >
            Servicios <img src="/img/icons/dropdown.png" />
          </button>

          <div
            class="navbar__links__servicios"
            :class="{ 'navbar__links__servicios--active': serviciosIsActive }"
            @mouseover="serviciosToggle(true)"
            @mouseleave="serviciosToggle(false)"
          >
            <router-link to="/servicios/prestamos-inmediatos"
              >Prestamos Inmediatos</router-link
            >
            <router-link to="/servicios/benetickets-ciudad"
              >Benetickets Ciudad</router-link
            >
            <router-link to="/servicios/tarjeta-arcoiris"
              >Tarjeta Arcoiris</router-link
            >
          </div>
        </div> -->
        <div class="navbar__links__link">
          <router-link to="/reservas">Reservas</router-link>
        </div>
      </div>
      <!--  -->
      <div class="navbar__hamburguer">
        <button @click="menuToggle(true)">
          <v-icon color="white" small>mdi-menu</v-icon>
        </button>
      </div>
    </div>

    <div class="navbar__menu" :class="{ 'navbar__menu--active': menuIsActive }">
      <div class="navbar__menu__header">
        <div class="navbar__menu__header__logo">
          <router-link to="/" exact>
            <img
              :src="require('../../assets/logo.svg')"
              alt="Sentidos tea house"
            />
          </router-link>
        </div>
        <!--  -->
        <button class="navbar__menu__header__close" @click="menuToggle(false)">
          <span>Cerrar</span>
          <v-icon color="white" small>mdi-close</v-icon>
        </button>
      </div>
      <!--  -->
      <div class="navbar__menu__links">
        <navbar-menu-link type="NuxtLink" url="/">
          <v-icon>
            mdi-home
          </v-icon> Inicio
        </navbar-menu-link>
        
        <navbar-menu-link type="NuxtLink" url="/menu">
          Menú
        </navbar-menu-link>
        <navbar-menu-link type="NuxtLink" url="/reservas">
          Reservas
        </navbar-menu-link>
        <!-- <div
          class="navbar__menu__link servicios"
          @mouseover="serviciosIsActive = true"
          @mouseleave="serviciosIsActive = false"
        >
          <div></div>
          <span class="d-flex justify-space-between">
            Servicios
            <v-icon>mdi-chevron-down</v-icon>
          </span>
          <div></div>

          <div v-show="serviciosIsActive" class="navbar__menu__servicios">
            <navbar-menu-link
              type="NuxtLink"
              url="/servicios/prestamos-inmediatos"
            >
              Préstamos Inmediatos
            </navbar-menu-link>
            <navbar-menu-link
              type="NuxtLink"
              url="/servicios/benetickets-ciudad"
            >
              Benetickets
            </navbar-menu-link>
            <navbar-menu-link type="NuxtLink" url="/servicios/tarjeta-arcoiris">
              Tarjeta Arcoiris
            </navbar-menu-link>
          </div>
        </div> -->
        <navbar-menu-link type="NuxtLink" url="/eventos">
          Eventos
        </navbar-menu-link>
        <navbar-menu-link type="NuxtLink" url="/login-signin">
          Login/Signin
        </navbar-menu-link>
        <navbar-menu-link type="NuxtLink" url="/novedades">
          Novedades
        </navbar-menu-link>
        <navbar-menu-link type="NuxtLink" url="/contacto">
          Contacto
        </navbar-menu-link>
      </div>
      <!--  -->
      <div class="navbar__menu__footer"></div>
    </div>
    <div
      class="navbar__menu navbar__menu--desktop"
      :class="{ 'navbar__menu--active': menuIsActive }"
    >
      <button class="navbar__menu--desktop__close" @click="menuToggle(false)">
        <v-icon color="white" small>mdi-close</v-icon>
      </button>

      <div class="navbar__menu--desktop__links">
        <router-link
          to="/login-signin"
          class="navbar__menu--desktop__links__link"
          >Login/Signin</router-link
        >
        <router-link to="/novedades" class="navbar__menu--desktop__links__link"
          >Novedades</router-link
        >
        <router-link to="/contacto" class="navbar__menu--desktop__links__link"
          >Contacto</router-link
        >
      </div>
      <div class="navbar__menu--desktop__sm" v-if="isLoaded">
        <a v-if="rrss.facebook_link" :href="rrss.facebook_link" target="_blank">
          <img src="/img/icons/facebook.png" alt="Facebook" />
        </a>
        <a
          v-if="rrss.instagram_link"
          :href="rrss.instagram_link"
          target="_blank"
        >
          <img src="/img/icons/instagram.png" alt="Instagram" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavbarMenuLink from "./NavbarMenuLink.vue";
export default defineComponent({
  components: {
    NavbarMenuLink,
  },
  setup() {
    const menuIsActive = ref<boolean>(false);
    const menuToggle = (menuState: boolean) => {
      menuIsActive.value = menuState;
    };
    const serviciosIsActive = ref<boolean>(false);
    const serviciosToggle = (serviciosState: boolean) => {
      serviciosIsActive.value = serviciosState;
    };
    const rrss = ref({
      facebook_link: "",
      instagram_link: "",
      mail: "",
      phone: 0,
      office_hours: "",
    });
    const isLoaded = ref(false);

    return {
      menuIsActive,
      menuToggle,
      serviciosIsActive,
      serviciosToggle,
      rrss,
      isLoaded,
    };
  },
  watch: {
    $route() {
      this.menuIsActive = false;
    },
  },
});
</script>
