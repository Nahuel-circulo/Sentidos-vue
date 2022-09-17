<template>
  <main>
    <Header
      title="Mis Reservas"
      subtitle="Vizualiza tus reservas y confirmalas para no perderlas"
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
                    <th class="text-left text-body-1">Numero de mesa</th>
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
                      <v-btn color="#CD7A7F" v-if="!item.confirmado" text>
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
            :value="rating"
          ></v-rating>
          <v-btn text color="#CD7A7F">
            Enviar
          </v-btn>
        </v-form>
      </div>
    </v-container>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
export default Vue.extend({
  data() {
    return {
      hola: 0,
      comment: "",
      valid: false,
      rating: 0,
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
  methods: {},
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
