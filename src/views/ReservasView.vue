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
                  :min="hoy"
                  :max="max"
                  onkeydown="return false"
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
                <div class="my-2 d-flex flex-row justify-space-around">
                  <div style="background-color: #e9eaed" class="px-4 py-2">
                    Reservado
                  </div>
                  <div
                    style="background-color: #1a2223"
                    class="px-4 py-2 white--text"
                  >
                    Disponible
                  </div>
                  <div
                    style="background-color: #cd7a7f"
                    class="px-4 py-2 white--text"
                  >
                    Su seleccion
                  </div>
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
                      :color="table.nro == item.nro_mesa ? '#CD7A7F' : '#1A2223'"
                      :disabled="item.reservado"
                      @click="changeColor(item.nro_mesa,item.id)"
                    >
                      {{ item.nro_mesa }}
                    </v-btn>
                  </v-col>
                </v-row>
              </div>

              <v-btn
                color="#CD7A7F white--text"
                :disabled="table.nro == 0"
                @click="e1 = 3"
              >
                Continuar
              </v-btn>

              <v-btn text @click="volverSeleccion"> Atrás </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <!-- step 3 -->
              <div class="step py-8">
                <label class="date-picker__label" for="mesa"
                  >Mesa seleccionada</label
                >
                <v-text-field
                  class="reservas__form-field"
                  v-model="table.nro"
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
                <div class="my-2" >
                  {{user.id}}
                  <p class="mb-0 red--text" v-if="esMenor">Debido a la fecha seleccionada ({{fecha}}), se encuentra dentro de las proximas 24hs,  deberá pagar en ésta instancia para poder completar la reserva.</p>
                  <p class="mb-0" v-else> Pagar (puede abonar hasta 48hs antes) </p>
                  <v-btn text color="#CD7A7F" @click="pagar" :disabled="pagado">
                    <span v-if="pagado">Pagado</span>
                    <span v-else> Pagar $500</span>
                  </v-btn>
                  
                </div>
              </div>
              <v-btn :disabled="!pagado && esMenor" color="#CD7A7F white--text" @click="completarReserva">
                Continuar
              </v-btn>

              <v-btn text @click="volverSeleccion2"> Atrás </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </div>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="alert"
    >
      <v-alert v-model="alert" dismissible :type="reservaStatus.type">
        {{ reservaStatus.message }}
      </v-alert>
      <v-btn v-if="reservaStatus.type == 'success'" to="/mi-cuenta" >
        Ir a mis reservas</v-btn
      >
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
      pagado:false,
      alert: false,
      hoy: moment().format("YYYY-MM-DD"),
      max: moment().add(30, "days").format("YYYY-MM-DD"),
      fecha: moment().add(2, "days").format("YYYY-MM-DD"),
      table: {
        nro : 0,
        id: ''
      },
      comentanio: "",
      confirmado:false,
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
    changeColor(nro_mesa: number,id:string) {
      this.table.nro = nro_mesa
      this.table.id = id
    },
    pagar() {
      this.pagado = true;
      this.confirmado = true;
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
        mesa: this.table.id,
        horario: this.horario == "Matutino" ? "M" : "N",
        fecha: this.fecha,
        confirmado: this.confirmado,
        cancelado: false,
        comensales: this.cantidad,
        user_id: this.user.id,
      });
    },
    volverSeleccion() {
      this.e1 = 1;
      this.table.nro = 0;
      this.$store.commit("reservas/RESET_MESAS");
    },
    volverSeleccion2() {
      this.e1 = 2;
      this.pagado = false
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
    reservaStatus() {
      return this.$store.getters["reservas/getReservaStatus"];
    },

    esMenor(){
     return moment(this.fecha).dayOfYear() - moment().dayOfYear() <= 1
    }
  },
  beforeMount() {
    if (!this.user) {
      this.$router.push("/login");
    }
  },
  watch: {
    reservaStatus(newValue, oldValue) {
      if (newValue) {
        this.alert = true;
      }
    },
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
