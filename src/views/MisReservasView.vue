<template>
  <main>
    <Header
      title="Mis Reservas"
      subtitle="Visualiza tus reservas y confirmalas para no perderlas"
      :image="require('@/assets/images/mis-reservas.jpg')"
    />
    <v-container class="my-10">
      <div class="formulario-container">
        <v-data-iterator
          :items="mis_reservas"
          hide-default-footer
          :loading="loading"
          no-data-text="No Posee Reservas"
        >
          <template v-slot:loading>
            <div class="spin-container">
              <div class="spinner"></div>
            </div>
          </template>

          <template v-slot:default="props" v-if="!loading">
            <v-simple-table class="comercios_adheridos__table">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left text-body-1">Fecha</th>
                    <th class="text-left text-body-1">Horario</th>
                    <th class="text-left text-body-1">Número de mesa</th>
                    <th class="text-left text-body-1">
                      Cantidad de Comensales
                    </th>
                    <th class="text-left text-body-1">Confirmar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in mis_reservas"
                    :key="item.id + index"
                  >
                    <td class="comercios_adheridos__table uppercase">
                      {{ item.fecha }}
                    </td>
                    <td class="comercios_adheridos__table">
                      <p class="ma-0 rubro" v-if="item.horario == 'M'">
                        Matutino
                      </p>
                      <p class="ma-0 rubro" v-if="item.horario == 'N'">
                        Nocturno
                      </p>
                    </td>
                    <td class="comercios_adheridos__table">
                      {{ item.nro_mesa }}
                    </td>
                    <td class="comercios_adheridos__table">
                      {{ item.comensales }}
                    </td>
                    <td class="comercios_adheridos__table direccion">
                      <v-btn
                        @click="pagar(item.id)"
                        color="#CD7A7F"
                        v-if="!item.confirmado"
                        text
                      >
                        Pagar
                      </v-btn>
                      <p v-else style="color: #cd7a7f">PAGADO</p>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </v-data-iterator>
      </div>
    </v-container>
    <Header
      title="Tu opinión nos importa"
      subtitle="Contanos tu experiencia y calificanos"
      :image="require('@/assets/images/opinion.png')"
    />
    <v-container>
      <div style="max-width: 500px; margin: 0 auto">
        <v-form v-model="valid">
          <h3>Tu opinión</h3>
          <v-textarea
            v-model="comment"
            label="Tu comentario"
            counter="120"
            maxlength="120"
            single-line
          ></v-textarea>
          <h3>Puntuación</h3>
          <v-rating
            style="margin: 0 auto"
            hover
            length="5"
            size="54"
            color="#BB8A00"
            v-model="rating"
          ></v-rating>
          <v-btn @click="sendOpinion" text color="#CD7A7F"> Enviar </v-btn>
        </v-form>
      </div>
    </v-container>
    <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="sended">
      
        <v-alert v-model="sended" dismissible :type="type">{{
          message
        }}</v-alert>
      
    </v-dialog>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
import axios from "axios";
import { api_django } from "@/api/apiDajngo";
export default Vue.extend({
  data() {
    return {
      hola: 0,
      comment: "",
      valid: false,
      rating: 0,
      sended: false,
      dialog:false,
      message: "",
      type: "success",
    };
  },
  computed: {
    user() {
      return this.$store.getters["usuarios/getUser"];
    },
    mis_reservas() {
      return this.$store.getters["reservas/getMisReservas"];
    },
    loading() {
      return this.$store.getters["reservas/getReservasLoadin"];
    },
  },
  methods: {
    async sendOpinion() {
      try {
        const { data } = await api_django.post("/opinion/", {
          name: this.user.name,
          comment: this.comment,
          calification: this.rating,
          gender: this.user.gender,
        });
        console.log(data.results);
        this.message = "Gracias por dejarno tu opinión";
        this.type = "success";
        this.sended = true;
      } catch (error) {
        this.message = "Ocurrio un problema al enviar";
        this.type = "error";
        this.sended = true;
      }
    },
    async pagar(idMesa: number) {
      try {
        const { data } = await api_django.put(`/reservation/${idMesa}/`, {
          nro_mesa: 2,
          horario: "M",
          fecha: "2022-09-20",
          confirmado: true,
          comensales: 3,
          user_id: 1,
        });
        console.log(data.results);
        this.message = "Reserva Cofirmada Correctamente";
        this.sended = true;
        this.dialog = true;
        this.type = "success";
      } catch (error) {
        console.log(error);
        this.message = "Ocurrio un problema al confirmar reserva";
        this.type = "error";
        this.sended = true;
        this.dialog = true;
      }
    },
  },
  components: { Header },
  beforeMount() {
    if (!this.user) {
      this.$router.push("/login");
    }
  },
  created() {
    this.$store.dispatch("reservas/fetchMisReservas", this.user.id);
  },
});
</script>
