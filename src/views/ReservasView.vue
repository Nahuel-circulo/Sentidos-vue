<template>
  <main class="reservas__view">
    <v-container>
      <h1>Reservas</h1>

      <v-stepper v-model="e1">
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
                <label class="date-picker__label" for="horario">Horario</label>
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
                v-model="fecha"
                id="fecha"
                class="reservas__form-field date-picker mb-4"
                type="date"
                name="Fecha"
              />
              {{ fecha }}
            </div>
            <v-btn color="#CD7A7F text--white" @click="fetchReservas">
              Continuar
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <!-- step 2 -->
            <div class="step py-8">
              <v-row class="pa-0 ma-0 tables__container">
                <v-col
                  class="d-flex justify-center"
                  cols="3"
                  v-for="(item, i) in tables"
                  :key="i"
                >
                  <v-btn
                    class="icon-color"
                    :color="item.reservado ? '#CD7A7F' : '#545454'"
                  >
                    {{ item.id }}
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <v-btn color="#CD7A7F white--text" @click="e1 = 3">
              Continuar
            </v-btn>

            <v-btn text @click="e1 = 1"> Atras </v-btn>
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
              <v-text-field
                class="reservas__form-field"
                v-model="table"
                readonly
                label="Mesa"
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
            <v-btn color="#CD7A7F white--text" @click="e1 = 1">
              Continuar
            </v-btn>

            <v-btn text @click="e1 = 2"> Atras </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      {{ reservations }}
    </v-container>
  </main>
</template>

<!-- <script lang="ts">
import { defineComponent, ref } from "vue";

import moment from "moment";
import ReservasStepper from "@/components/ReservasStepper.vue";
export default defineComponent({
  setup() {
    const e1 = ref(1);
    const hoy = moment().format("YYYY-MM-DD");
    const fecha = ref();
    const table = ref(0);
    const comentario = ref();
    const comentarioRules = [" "];
    const email = ref();
    const emailRules = [(v: any) => !!v || "Email es requerido"];
    const name = ref();
    const nameRules = [(v: any) => !!v || "Nombre es requerido"];
    const horario = ref("Matutino");
    const cantidad = ref(1);
    const items = [1, 2, 3, 4];
    const tables = ref([
      {
        position: 1,
        reservado: false,
      },
      {
        position: 2,
        reservado: false,
      },
      {
        position: 3,
        reservado: false,
      },
      {
        position: 4,
        reservado: false,
      },
      {
        position: 5,
        reservado: false,
      },
      {
        position: 6,
        reservado: false,
      },
      {
        position: 7,
        reservado: false,
      },
      {
        position: 8,
        reservado: false,
      },
      {
        position: 9,
        reservado: false,
      },
      {
        position: 10,
        reservado: false,
      },
      {
        position: 11,
        reservado: false,
      },
      {
        position: 12,
        reservado: false,
      },
      {
        position: 13,
        reservado: false,
      },
      {
        position: 14,
        reservado: false,
      },
      {
        position: 15,
        reservado: false,
      },
      {
        position: 16,
        reservado: false,
      },
      {
        position: 17,
        reservado: false,
      },
      {
        position: 18,
        reservado: false,
      },
      {
        position: 19,
        reservado: false,
      },
      {
        position: 20,
        reservado: false,
      },
    ]);
    const changeColor = (position: number) => {
      const index = tables.value.findIndex(
        (table) => table.position === position
      );
      if (table.value == 0) {
        tables.value[index].reservado = !tables.value[index].reservado;
        table.value = position;
      } else if (table.value == position) {
        table.value = 0;
        tables.value[index].reservado = !tables.value[index].reservado;
      }
    };
    return {
      changeColor,
      tables,
      table,
      name,
      nameRules,
      email,
      emailRules,
      comentario,
      comentarioRules,
      cantidad,
      items,
      fecha,
      hoy,
      horario,
      e1,
    };
  },
  components: { ReservasStepper },
});
</script> -->

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import ReservasStepper from "@/components/ReservasStepper.vue";

export default Vue.extend({
  components: {
    ReservasStepper,
  },
  data() {
    return {
      e1: 1,
      hoy: moment().format("YYYY-MM-DD"),
      fecha: "",
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
    changeColor() {},
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
      this.$store.getters["usuarios/getUser"];
    },
  },
  beforeMount() {
    if (!this.user) {
      this.$router.push("/login")
    }
  },
});
</script>
<style lang="scss" scoped>
.step {
  max-width: 600px;
  margin: 0 auto;
}
</style>
