<template>
    <main>
        <Header title="Mis Reservas"  subtitle="Vizualiza tus reservas y confirmalas para no perderlas"
        :image="require('@/assets/images/mis-reservas.jpg')"/>
        <Header title="Tu opinión nos importa"  subtitle="Contanos tu experiencia y calificanos"
        :image="require('@/assets/images/opinion.png')"/>


    </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue';
export default Vue.extend({
    data() {
        return {
            hola:0,
        }
    },
    computed:{
        user() {
            return this.$store.getters["usuarios/getUser"]
        }
    },
    methods: {},
    components: { Header },
    beforeMount() {
        if (!this.user) {
            this.$router.push("/login");
        }
    },
})
</script>