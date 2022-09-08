<template>
  <main class="menu-view">
    <v-container>
      <div class="menu__qr">
        <v-row class="menu__qr-container d-flex justify-center">
          <v-col cols="12" sm="8" md="6" class=" d-flex flex-column items-center justify-center">
            <h2 class="menu__qr-title" >Escanee el <span class="menu__qr-title__bold"> código QR </span> y siga desde su celular</h2>
            <p class="menu__qr-subtitle">Cómo escanear el código QR:</p>
            <p class="menu__qr-steps" v-for="(step, i) in steps" :key="step">{{ i + 1}}. {{ step }}</p>
          </v-col>
          <v-col cols="12" sm="8" md="6">
            <v-img class="menu__qr-image"  :src="require('@/assets/qr-code.svg')"> </v-img>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="food in productos"
          :key="food.id"
        >
          <ProductCard
            :description="food.description"
            :image="food.image"
            :price="food.price"
            :title="food.name"
          />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "@/components/ProductCard.vue";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export default defineComponent({
  components: {
    ProductCard,
  },
  setup() {
    const productos: Array<Product> = [
      {
        id: "1",
        name: "Asado de novillo corte americano",
        description:
          "Es el producto de cortar los bifes angostos a través del hueso más largo, en tiras de una pulgada de espesor.La carne no es otra que la del bife de chorizo. Por lo general mantiene una buena textura y un sabor satisfactorio al paladar.",
        price: "$100",
        image: "ASADO-NOVILLO.png",
      },
      {
        id: "2",
        name: "Bondiola de cerdo mechada con panceta ahumada.",
        description:
          "Dos sabores se juntan para potenciarse y lograr algo inigualable. Una comida para degustar con un buen vino tinto y comprender los aromas y texturas que se logran a partir de la combinación de los ingredientes de este plato.",
        price: "$100",
        image: "BONDIOLA-CERDO.png",
      },
      {
        id: "3",
        name: "Chorizo criollo de rueda",
        description:
          "Una de las especialidades de la casa que impacta a primera vista por su forma y tamaño. Un clásico irresistible de las parrillas argentinas, ideal para degustar con un aperitivo y una rica ensalada antes del plato principal.",
        price: "$100",
        image: "CHORIZO-RUEDA.png",
      },
      {
        id: "4",
        name: "Empanada de carne",
        description:
          "Sabrosas y calentitas, no te las podés perder. Son una excelente elección como entrada para que abra el apetito mientras esperamos lo que viene. Nuestra recomendación es degustarlas con un delicioso malbec.",
        price: "$100",
        image: "EMPANADA.png",
      },
      {
        id: "5",
        name: "Ensalada Cesar",
        description:
          "Completa y deliciosa, una entrada que podría transformarse en tu plato principal. Sus ingredientes le dan una excelente textura, y el grado de crocante acompaña al  buen sabor en general. Para disfrutar y compartir en tu mesa.",
        price: "$100",
        image: "ENSALADA-CESAR.png",
      },
      {
        id: "6",
        name: "Entraña rellena",
        description:
          "Exquisita carne que se despega del costillar del asado.Es muy sabrosa y tierna, por lo general  se prefiere en entradas pero también va excelente como plato principal y se adapta a cualquier tipo de guarnición que complete la presentación.",
        price: "$100",
        image: "ENTRANA.png",
      },
      {
        id: "7",
        name: "Huevos a la plancha con morrón asado",
        description:
          "Sin dudas que cuando decidimos sumarlo a nuestra carta fue pensando en una opción diferente. Una deliciosa guarnición de huevos a la plancha en pareja con morrones finamente asados, especiales para combinar con un jugoso corte de carne.",
        price: "$100",
        image: "HUEVO-CON-MORRON.png",
      },
      {
        id: "8",
        name: "Papas fritas con cebollas confitadas",
        description:
          "Una revolución a la clásica guarnición, donde se agregan cebollas confitadas que le dan un mayor protagonismo en la mesa. Una mezcla de texturas y sabores que harán aún más increíble la experiencia.",
        price: "$100",
        image: "PAPA-CON-CEBOLLA.png",
      },
      {
        id: "9",
        name: "Papas fritas",
        description:
          "Las clásicas papas fritas crocantes por fuera y tiernas por dentro que no pueden faltar en la mesa de los argentinos, y menos en la de La Cabrera.",
        price: "$100",
        image: "PAPAS-FRITAS.png",
      },
      {
        id: "10",
        name: "Ravioles de mozzarella y jamón",
        description:
          "Pasta de tradición italiana elaborada con los productos más frescos para lograr un relleno de excelente calidad. Intentamos transmitir esos secretos guardados de la nonna para que la familia reunida en la mesa pueda descubrirlos.",
        price: "$100",
        image: "RAVIOLES-JAMON-QUESO.png",
      },
    ];

    const steps = [
      "Abra la cámara de su celular.",
      "Apunte hacia la pantalla como si fuera a sacar una foto, ubicando el código en el centro.",
      "Cuando la cámara lo detecte, le mostrará un link.",
      "Haz click  ¡Y LISTO!",
    ];
    return {
      productos,
      steps,
    };
  },
});
</script>
