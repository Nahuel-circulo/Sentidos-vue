<template>
  <main class="reservas__view">
    <v-container>
      <h1>Reservas - Seleccione su mesa</h1>
      <v-row>
        <v-col cols="12" sm="7" md="7" lg="6">
          <v-row class="pa-0 ma-0 tables__container">
            <v-col
              class="d-flex justify-center"
              cols="3"
              v-for="(item, i) in tables"
              :key="i"
            >
              <v-btn
                class="icon-color"
                @click="changeColor(item.position)"
                :color="item.reservado ? '#CD7A7F' : '#545454'"
                icon
              >
                {{ item.position }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="5" md="5" lg="6">
          <v-form>
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
            <v-textarea
              solo
              class="reservas__form-field"
              name="input-7-4"
              :counter="144"
              :rules="comentarioRules"
              label="Comentario (opcional)"
            ></v-textarea>

            <v-btn color="#CD7A7F" class="white--text"> Siguiente </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <reservas-stepper/>
    </v-container>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import moment from "moment";
import ReservasStepper from "@/components/ReservasStepper.vue";
export default defineComponent({
    setup() {
        const hoy = moment().format("YYYY-MM-DD");
        const fecha = ref();
        const table = ref(0);
        const comentario = ref();
        const comentarioRules = [
            (v: any) => v.length <= 30 || "Comentario debe tener como maximo 144 caracteres",
        ];
        const email = ref();
        const emailRules = [
            (v: any) => !!v || "Email es requerido",
            (v: any) => /.+@.+\..+/.test(v) || "Debe ser un email valido",
        ];
        const name = ref();
        const nameRules = [
            (v: any) => !!v || "Nombre es requerido",
            (v: any) => v.length <= 30 || "Nombre debe tener como maximo 30 caracteres",
        ];
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
            const index = tables.value.findIndex((table) => table.position === position);
            if (table.value == 0) {
                tables.value[index].reservado = !tables.value[index].reservado;
                table.value = position;
            }
            else if (table.value == position) {
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
        };
    },
    components: { ReservasStepper }
});
</script>
