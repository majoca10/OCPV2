<template>
    <v-sheet elevation="6">
    <v-tabs
      background-color="white"
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
      
    >
      <v-tabs-slider color="gray"></v-tabs-slider>
      <v-tab
        v-for="(items,i) in items"
        :key="i"
        :to="items.to"
        router
        exact
      >
        {{ items.title }}
      </v-tab>
    </v-tabs>
  </v-sheet>

</template>

<script>

export default {
    data() {
     return{
            clipped: false,
            drawer: false,
            fixed: false,
            items:[
                {
                    title:'Pais',
                    to:'/ubicacion/pais'
                },
                {
                    title:'Departamento',
                    to:'/ubicacion/departamento'
                },
                {
                    title:'Ciudad',
                    to:'/ubicacion/ciudad'
                },
                {
                    title:'Zonas',
                    to:'/ubicacion/zonas'
                },
                {
                    title:'Barrios',
                    to:'/ubicacion/barrios'
                },
            ]

     }   
    },
}
</script>