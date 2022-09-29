<template>
  <main>
    <Header
      :image="require('../assets/images/reserva.jpg')"
      title="Reservas"
      subtitle="Anticipate y reserva tu lugar"
    />
    <div class="reservas__view">
      <v-container>
        <v-stepper v-model="e1" class="my-8">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              Seleccione Fecha y Horario
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              Seleccione Mesa
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"> Complete su reserva </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <!-- step 1 -->
              <div class="step py-8">
                <div class="mb-2">
                  <label class="date-picker__label" for="horario"
                    >Horario</label
                  >
                  <select
                    name="horario"
                    class="reservas__form-field v-field custom_select mb-"
                    v-model="horario"
                  >
                    <option value="Matutino">Matutino</option>
                    <option value="Nocturno">Nocturno</option>
                  </select>
                </div>
                <label class="date-picker__label" for="fecha">Fecha</label>
                <input
                  :min="fecha"
                  :max="max"
                  v-model="fecha"
                  id="fecha"
                  class="reservas__form-field date-picker mb-4"
                  type="date"
                  name="Fecha"
                />
              </div>
              <v-btn color="#CD7A7F text--white" @click="fetchReservas">
                Continuar
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <!-- step 2 -->
              <div class="step py-8">
                <p>Por favor seleccione su mesa</p>
                <!--               <p><span class="">Reservado</span> <span>Disponible</span> <span>Su selccion</span></p>
 -->
                <div class=" my-2 d-flex flex-row justify-space-around">
                  <div style="background-color:#E9EAED;" class="px-4 py-2 ">Reservado</div>
                  <div style="background-color:#1A2223;" class="px-4 py-2 white--text">Disponible</div>
                  <div style="background-color:#CD7A7F;" class="px-4 py-2 white--text">Su seleccion</div>
                </div>
                <v-row class="pa-0 ma-0 tables__container">
                  <v-col
                    class="d-flex justify-center"
                    cols="3"
                    v-for="(item, i) in tables"
                    :key="i"
                  >
                    <v-btn
                      class="icon-color"
                      :color="table == item.nro_mesa ? '#CD7A7F' : '#1A2223'"
                      :disabled="item.reservado"
                      @click="changeColor(item.nro_mesa)"
                    >
                      {{ item.id }}
                    </v-btn>
                  </v-col>
                </v-row>
              </div>

              <v-btn
                color="#CD7A7F white--text"
                :disabled="table == 0"
                @click="e1 = 3"
              >
                Continuar
              </v-btn>

              <v-btn text @click="volverSeleccion"> Atrás </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <!-- step 3 -->
              <div class="step py-8">
                <v-text-field
                  class="reservas__form-field"
                  v-model="name"
                  :rules="nameRules"
                  :counter="30"
                  label="Nombre y Apellido"
                  required
                  solo
                ></v-text-field>
                <v-text-field
                  class="reservas__form-field"
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                  solo
                ></v-text-field>
                <label class="date-picker__label" for="mesa"
                    >Mesa seleccionada</label
                  >
                <v-text-field
                  class="reservas__form-field"
                  v-model="table"
                  readonly
                  label="Mesa"
                  name="mesa"
                  required
                  solo
                ></v-text-field>
                <div class="mb-2">
                  <label class="date-picker__label" for="cantidad"
                    >Cantidad de comensales</label
                  >
                  <select
                    name="cantidad"
                    class="reservas__form-field v-field custom_select mb-"
                    label="Cantidad de Comensales"
                    v-model="cantidad"
                  >
                    <option
                      v-for="(item, i) in items"
                      :value="item"
                      :key="i + item"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>

                <v-textarea
                  solo
                  class="reservas__form-field"
                  name="input-7-4"
                  :counter="144"
                  label="Comentario (opcional)"
                ></v-textarea>
              </div>
              <v-btn color="#CD7A7F white--text" @click="completarReserva">
                Continuar
              </v-btn>

              <v-btn text @click="e1 = 2"> Atrás </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </div>
    <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="alert">
      
      <v-alert v-model="alert" dismissible :type="reservaStatus.type">
        {{reservaStatus.message}}
      </v-alert>
      <v-btn v-if="reservaStatus.type == 'success'" to="/mis-reservas"> Ir a mis reservas</v-btn>
    
  </v-dialog>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import Header from "@/components/Header.vue";

export default Vue.extend({
  data() {
    return {
      e1: 1,
      alert:false,
      hoy: moment().format("YYYY-MM-DD"),
      max: moment().add(30, "days").format("YYYY-MM-DD"),
      fecha: moment().add(2, "days").format("YYYY-MM-DD"),
      table: 0,
      comentanio: "",
      email: "",
      emailRules: [(v: any) => !!v || "Email es requerido"],
      name: "",
      nameRules: [(v: any) => !!v || "Nombre es requerido"],
      horario: "Matutino",
      cantidad: 1,
      items: [1, 2, 3, 4],
    };
  },
  methods: {
    changeColor(nro_mesa: number) {
      this.table = nro_mesa;
    },
    fetchReservas() {
      var hora;
      if (this.horario == "Matutino") {
        hora = "M";
      } else {
        hora = "N";
      }
      this.$store.dispatch("reservas/fetchReservas", {
        fecha: this.fecha,
        horario: hora,
      });
      this.e1 = 2;
    },
    completarReserva() {
      this.$store.dispatch("reservas/postReserva", {
        nro_mesa: this.table,
        horario: this.horario == "Matutino" ? "M" : "N",
        fecha: this.fecha,
        confirmado: false,
        comensales: this.cantidad,
        user_id:this.user.id
      });
    },
    volverSeleccion() {
      this.e1 = 1;
      this.table = 0;
      this.$store.commit("reservas/RESET_MESAS");
    },
  },
  mounted() {
    this.$store.dispatch("reservas/fetchMesas");
  },
  computed: {
    tables() {
      return this.$store.getters["reservas/getMesas"];
    },
    reservations() {
      return this.$store.getters["reservas/getReservas"];
    },
    user() {
      return this.$store.getters["usuarios/getUser"];
    },
    reservaStatus(){
      return this.$store.getters['reservas/getReservaStatus']
    }
  },
  beforeMount() {
    if (!this.user) {
      this.$router.push("/login");
    }
  },
  watch: {
    reservaStatus(newValue,oldValue){
      if (newValue) {
        this.alert = true
      }
    }
  },
  components: { Header },
});
</script>
<style lang="scss" scoped>
.step {
  max-width: 600px;
  margin: 0 auto;
}
</style>
