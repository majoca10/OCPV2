<template>
<div>
    <MenuConfiguracion />
    <Nuxt />
<v-card style="margin-top: 10px;">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Id
          </th>
          <th class="text-left">
            Pais
          </th>
          <th class="text-left">
            Codigo
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.pais"
        >
          <td>
              <div>
              <td><v-checkbox
                v-model="selected"
                value="id"
                ></v-checkbox></td><td>{{ item.id }}</td>
              </div>
          </td>        
          <td>{{ item.pais }}</td>
          <td>{{ item.codigo }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
 <div>
    <v-row
        align="right"
    >
 <v-btn
      tile
      color="primary"
    >
      <v-icon left>
        mdi-pencil-plus-outline
      </v-icon>
      Agregar
    </v-btn>
     <v-btn
      tile
      color="success"
    >
      <v-icon left>
        mdi-pencil
      </v-icon>
      Editar
    </v-btn>
     <v-btn
      tile
      color="error"
    >
      <v-icon left>
        mdi-pencil
      </v-icon>
      Eliminar
    </v-btn>
     </v-row>
    </div>
  </v-card>
  </div>  
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            filterable: false,
            value: 'pais',
          },
          { text: 'id', value: 'id' },
          { text: 'pais', value: 'pais' },
          { text: 'codigo', value: 'codigo' },
        ],
        desserts: [
          {
            id: '1',  
            pais: 'Colombia',
            codigo: 169,
          },
        ],
      }
    },
  }
</script>

