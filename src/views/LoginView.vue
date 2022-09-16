<template>
  <div class="container-form">
    <div class="formulario" :class="active ? 'active' : ''">
      <div class="formulario-section" v-if="active">
        <div class="formulario-container">
          <h2 class="my-4">REGISTRARSE</h2>
          <v-form ref="form" v-model="registerValid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="40"
              :rules="nameRules"
              label="Name"
              required
              solo
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              solo
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              label="Contraseña"
              hint="Contraseña correcta"
              counter
              solo
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-select
              v-model="gender"
              :items="sexos"
              item-text="nombre"
              item-value="value"
              :rules="[(v) => !!v || 'Sexo es requerido']"
              label="Sexo"
              required
              solo
            ></v-select>
          </v-form>
          <v-btn class="white--text" color="#cd7a7f" @click="register"
            >Registrarse</v-btn
          >
          <p class="mt-4">
            Ya tienes una cuenta?
            <v-btn text small @click="cambiar">Ingresar</v-btn>
          </p>
        </div>
      </div>
      <div class="formulario-section" v-else>
        <div class="formulario-container">
          <h2 class="my-4">INGRESAR</h2>
          <v-form ref="formLogin" v-model="loginValid" lazy-validation>
            <v-text-field
              v-model="emailLogin"
              label="E-mail"
              solo
              :rules="emailRulesLogin"
            ></v-text-field>
            <v-text-field
              v-model="passwordLogin"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Contraseña"
              solo
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>
          <v-btn color="#cd7a7f" class="white--text" @click="login"
            >Ingresar</v-btn
          >
          <p class="mt-4">
            No estas registrado?
            <v-btn text small @click="cambiar">Registrarse</v-btn>
          </p>
          <p v-if="errorMessageLogin" class="red--text">{{errorMessageLogin}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { api_django } from "@/api/apiDajngo";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      usuario: null,
      active: false,
      registerValid: false,
      loginValid: false,
      name: "",
      password: "",
      passwordLogin: "",
      showPassword: false,
      nameRules: [
        (v: any) => !!v || "Nombre es obligatorio",
        (v: any) =>
          (v && v.length <= 40) ||
          "Nombre debe contener menos de 40 caracteres",
      ],
      email: "",
      emailLogin: "",
      emailRules: [
        (v: any) => !!v || "E-mail es obligatorio",
        (v: any) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
      ],
      emailRulesLogin: [
        (v: any) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
      ],
      rules: {
        required: (value) => !!value || "Obligatorio.",
        min: (v) => v.length >= 8 || "Minino 8 caracteres",
        emailMatch: () => `The email and password you entered don't match`,
      },
      gender: null,
      sexos: [
        { nombre: "Femenino", value: "M" },
        { nombre: "Masculino", value: "H" },
      ],
    };
  },
  methods: {
    cambiar() {
      this.active = !this.active;
    },
    async login() {
      if (this.loginValid && this.emailLogin && this.passwordLogin) {
        this.$store.dispatch("usuarios/fetchUser", {
          email: this.emailLogin,
          password: this.passwordLogin,
        });
      } else {
        this.$refs.formLogin.validate();
      }
    },
    async register() {
      if (this.registerValid && this.password && this.email && this.gender) {
        try {
          const { data } = await api_django.post("/users/", {
            name: this.name,
            gender: this.gender,
            email: this.email,
            password: this.password,
          });
          console.log(data);
          this.usuario = data.results;
        } catch (error) {
          alert(`Ya existe un usuario con email ${this.email}`)
        }
      } else {
        this.$refs.form.validate();
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters["usuarios/getUser"];
    },
    errorMessageLogin(){
     return this.$store.getters["usuarios/getLoginError"]
    }
  },
});
</script>

<style lang="scss" scoped>
.container-form {
  background-color: black;
  width: 100%;
  position: relative;
  transition: all 0.5s ease-in-out;

  .formulario-container {
    padding: 10px 20px;
    width: 90%;
    max-width: 500px;
    border: 2px solid #CD7A7F;
    border-radius: 8px;
  }

  .formulario-section{
    width: 100%;
  }
  .formulario {
    position: relative;
    left: 0;
    height: calc(100vh - 100px);
    background-color: #f2eee3;
    width: 100%;
    transition: all 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-container {
      width: 90%;
      margin: 0 auto;
      max-width: 400px;
      text-align: center;
      transition: all 0.5s ease-in-out;
    }
  }
}

.active {
  left: 0% !important;
}

@media screen and(min-width:600px) {
  .container-form {
    .formulario {
      width: 50%;
    }
  }

  .active {
    left: 50% !important;
  }
}
</style>
