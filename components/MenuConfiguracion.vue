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
                    to:'/configuracion/pais'
                },
                {
                    title:'Departamento',
                    to:'/configuracion/departamento'
                },
                {
                    title:'Ciudad',
                    to:'/configuracion/ciudad'
                },
                {
                    title:'Zonas',
                    to:'/configuracion/zonas'
                },
                {
                    title:'Barrios',
                    to:'/configuracion/barrios'
                },
            ]

     }   
    },
}
</script>