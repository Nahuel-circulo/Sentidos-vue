interface Product {
    id: string
    name: string
    description: string
    price: string
    image: string
}
export const productos: Array<Product> = [
    {
        id: '1',
        name: 'Asado de novillo corte americano',
        description: 'Es el producto de cortar los bifes angostos a través del hueso más largo, en tiras de una pulgada de espesor.La carne no es otra que la del bife de chorizo. Por lo general mantiene una buena textura y un sabor satisfactorio al paladar.',
        price: '$100',
        image: '@/assets/comidas/ASADO-NOVILLO.webp'
    },
    {
        id: '2',
        name: 'Bondiola de cerdo mechada con panceta ahumada.',
        description: 'Dos sabores se juntan para potenciarse y lograr algo inigualable. Una comida para degustar con un buen vino tinto y comprender los aromas y texturas que se logran a partir de la combinación de los ingredientes de este plato.',
        price: '$100',
        image: '@/assets/comidas/BONDIOLA-CERDO.webp'
    },
    {
        id: '3',
        name: 'Chorizo criollo de rueda',
        description: 'Una de las especialidades de la casa que impacta a primera vista por su forma y tamaño. Un clásico irresistible de las parrillas argentinas, ideal para degustar con un aperitivo y una rica ensalada antes del plato principal.',
        price: '$100',
        image: '@/assets/comidas/CHORIZO-RUEDA.webp'
    },
    {
        id: '4',
        name: 'Empanada de carne',
        description: 'Sabrosas y calentitas, no te las podés perder. Son una excelente elección como entrada para que abra el apetito mientras esperamos lo que viene. Nuestra recomendación es degustarlas con un delicioso malbec.',
        price: '$100',
        image: '@/assets/comidas/EMPANADA.webp'
    },
    {
        id: '5',
        name: 'Ensalada Cesar',
        description: 'Completa y deliciosa, una entrada que podría transformarse en tu plato principal. Sus ingredientes le dan una excelente textura, y el grado de crocante acompaña al  buen sabor en general. Para disfrutar y compartir en tu mesa.',
        price: '$100',
        image: '@/assets/comidas/ENSALADA-CESAR.webp'
    },
    {
        id: '6',
        name: 'Entraña rellena',
        description: 'Exquisita carne que se despega del costillar del asado.Es muy sabrosa y tierna, por lo general  se prefiere en entradas pero también va excelente como plato principal y se adapta a cualquier tipo de guarnición que complete la presentación.',
        price: '$100',
        image: '@/assets/comidas/ENTRANA.webp'
    },
    {
        id: '7',
        name: 'Huevos a la plancha con morrón asado',
        description: 'Sin dudas que cuando decidimos sumarlo a nuestra carta fue pensando en una opción diferente. Una deliciosa guarnición de huevos a la plancha en pareja con morrones finamente asados, especiales para combinar con un jugoso corte de carne.',
        price: '$100',
        image: '@/assets/comidas/HUEVO-CON-MORRON.webp'
    },
    {
        id: '8',
        name: 'Papas fritas con cebollas confitadas',
        description: 'Una revolución a la clásica guarnición, donde se agregan cebollas confitadas que le dan un mayor protagonismo en la mesa. Una mezcla de texturas y sabores que harán aún más increíble la experiencia.',
        price: '$100',
        image: '@/assets/comidas/PAPA-CON-CEBOLLA.webp'
    },
    {
        id: '9',
        name: 'Papas fritas',
        description: 'Las clásicas papas fritas crocantes por fuera y tiernas por dentro que no pueden faltar en la mesa de los argentinos, y menos en la de La Cabrera.',
        price: '$100',
        image: '@/assets/comidas/PAPAS-FRITAS.webp'
    },
    {
        id: '10',
        name: 'Ravioles de mozzarella y jamón',
        description: 'Pasta de tradición italiana elaborada con los productos más frescos para lograr un relleno de excelente calidad. Intentamos transmitir esos secretos guardados de la nonna para que la familia reunida en la mesa pueda descubrirlos.',
        price: '$100',
        image: '@/assets/comidas/RAVIOLES-JAMON-QUESO.webp'
    },
]