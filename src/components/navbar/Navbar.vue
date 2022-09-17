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
          <span class="white--text" v-if="user">{{ user.name }}</span>
          <v-icon color="white" small>mdi-account</v-icon>
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
        <navbar-menu-link type="NuxtLink" url="/"> Inicio </navbar-menu-link>

        <navbar-menu-link type="NuxtLink" url="/menu"> Menú </navbar-menu-link>
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
        <navbar-menu-link v-if="!user" type="NuxtLink" url="/login">
          Ingresar/Registrarse
        </navbar-menu-link>
        <navbar-menu-link type="NuxtLink" url="/novedades">
          Novedades
        </navbar-menu-link>
        <navbar-menu-link type="NuxtLink" url="/contacto">
          Contacto
        </navbar-menu-link>
        <v-btn
          @click="cerrarSesion"
          v-if="user"
          text
          color="white"
          class="mx-auto mt-2"
          >Cerrar Sesion</v-btn
        >
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
          to="/login"
          v-if="!user"
          class="navbar__menu--desktop__links__link"
          >Ingresar/Registrarse</router-link
        >
        <router-link to="/novedades" class="navbar__menu--desktop__links__link"
          >Novedades</router-link
        >
        <router-link to="/contacto" class="navbar__menu--desktop__links__link"
          >Contacto</router-link
        >
        <v-btn @click="cerrarSesion" v-if="user" text color="white"
          >Cerrar Sesion</v-btn
        >
      </div>
      <div class="navbar__menu--desktop__sm" v-if="isLoaded">
        <a style="text-decoration:none;" v-if="rrss.facebook_link" :href="rrss.facebook_link" target="_blank">
          <v-icon color="white">mdi-facebook</v-icon>
        </a>
        <a style="text-decoration:none;"
          v-if="rrss.instagram_link"
          :href="rrss.instagram_link"
          target="_blank"
        >
          <v-icon color="white">mdi-instagram</v-icon>
        </a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import NavbarMenuLink from "./NavbarMenuLink.vue";
export default Vue.extend({
  components: {
    NavbarMenuLink,
  },
  data() {
    return {
      rrss: {
        facebook_link: "https://facebook.com",
        instagram_link: "https://instagram.com",
        mail: "",
        phone: 0,
        office_hours: "",
      },
      menuIsActive: false,
      serviciosIsActive: false,
      isLoaded: true,
    };
  },
  methods: {
    menuToggle(menuState: boolean) {
      this.menuIsActive = menuState;
    },
    serviciosToggle(serviciosState: boolean) {
      this.serviciosIsActive = serviciosState;
    },
    cerrarSesion() {
      localStorage.removeItem("sentidos_user");
      this.$store.commit("usuarios/SET_USER", null);
    },
  },
  computed: {
    user() {
      return this.$store.getters["usuarios/getUser"];
    },
  },

  watch: {
    $route() {
      this.menuIsActive = false;
    },
    user(newValue, oldValue) {

      if (newValue) {
        this.$router.push("/");
      }

      if (oldValue) {

        this.$router.push("/");
      }
    },
  },
});
</script>
