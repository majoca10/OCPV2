<template>
  <div>
    <MenUbicacion />
    <Nuxt />
  <div>
<v-container fluid pa-0>
  <v-row 
    align="center" 
    justify="center" 
    style="height:100vh" dense
  >
    <v-colm style="height: 100%; width: 30%; margin-top: 25px; padding-right: 15px;">
      <v-card elevation="3" aling="center">
        <v-card-title>Paises</v-card-title>
        <v-card-text>Test de informacion de datos de paises</v-card-text>
        <form style="padding: 10px;">
              <v-text-field
              v-model="id"
              v-if="id"
            ></v-text-field>
            <v-text-field
              v-model="pais"
              :error-messages="paisErrors"
              :counter="4"
              label="Pais"
              required
              @input="$v.pais.$touch()"
              @blur="$v.pais.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="codigo"
              :error-messages="codigoErrors"
              label="Codigo"
              required
              @input="$v.codigo.$touch()"
              @blur="$v.codigo.$touch()"
              type="number"
            ></v-text-field>
              <v-text-field
              v-model="codigo2"
              :error-messages="codigo2Errors"
              label="Codigo2"
              required
              @input="$v.codigo2.$touch()"
              @blur="$v.codigo2.$touch()"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="codigofe"
              :error-messages="codigofeErrors"
              label="Codigo Factura Electronica"
              required
              @input="$v.codigofe.$touch()"
              @blur="$v.codigofe.$touch()"
              type="number"
            ></v-text-field>
            <v-btn
              class="mr-4"
              @click="agregar()"
              color="success"
            >
              Agregar
            </v-btn>
            <v-btn @click="limpiar()">
              Limpiar
            </v-btn>
        </form>
      </v-card>
      </v-colm>
        <v-colm style="height: 100%; width: 60%; margin-top: 25px;">
        <v-card elevation="3">
        <v-card-title>Paises</v-card-title>
        <v-card-text>Test de informacion de datos de paises</v-card-text>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                  hide-details
                 style="padding-left: 15px; padding-right: 15px;" 
                ></v-text-field>
              <v-simple-table style="padding: 10px;">
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
                      <th class="text-left">
                        Codigo2
                      </th>
                      <th class="text-left">
                        Codigo FE
                      </th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="pais of paises"
                      :key="pais"
                    >
                      <td>{{ pais.id }}</td>
                      <td>{{ pais.nombre }}</td>
                      <td>{{ pais.codigo }}</td>
                      <td>{{ pais.codigo2 }}</td>
                      <td>{{ pais.cod_factelectronica }}</td>
                      <td><v-btn tile color="success" @click="edit(pais.id,pais.pais,pais.codigo,pais.codigo2,pais.codigofe)">
                      <v-icon left>mdi-pencil</v-icon>
                      Edit
                      </v-btn></td>
                      <td><v-btn tile color="error" @click="eliminar(pais.id)">
                      <v-icon left>mdi-minus</v-icon>
                      Edit
                      </v-btn></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
                     </v-card>
          </v-colm>
        </v-row>
</v-container>        
    </div>
  </div>
  
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    mixins: [validationMixin],

    validations: {
      pais: { required, maxLength: maxLength(4) },
      codigo: { required },
      codigo2: { required },
      codigofe: { required },
    },
  
    data (){
      return{
        search:'',
        paises:[]
      }
    },
    
    async created(){
     try {
          const res = await axios.get('http://127.0.0.1:9000/api/paises')
          this.paises = res.data;
          console.log(paises)
      } catch (error){
        console.log(error)
      }
    },

    
    computed: {

      paisErrors () {
        const errors = []
        if (!this.$v.pais.$dirty) return errors
        !this.$v.pais.maxLength && errors.push('Pais Requiere almenos 4 Caracteres')
        !this.$v.pais.required && errors.push('Pais es Requerido')
        return errors
      },
      codigoErrors () {
        const errors = []
        if (!this.$v.codigo.$dirty) return errors
        !this.$v.codigo.maxLength && errors.push('Codigo Requiere almenos 1 Caracteres')
        !this.$v.codigo.required && errors.push('Codigo es Requerido')
        return errors
      },
      codigo2Errors () {
        const errors = []
        if (!this.$v.codigo2.$dirty) return errors
        !this.$v.codigo2.maxLength && errors.push('Codigo2 Requiere almenos 1 Caracteres')
        !this.$v.codigo2.required && errors.push('Codigo2 es Requerido')
        return errors
      },
      codigofeErrors () {
        const errors = []
        if (!this.$v.codigofe.$dirty) return errors
        !this.$v.codigofe.maxLength && errors.push('CodigoFE Requiere almenos 1 Caracteres')
        !this.$v.codigofe.required && errors.push('CodigoFE es Requerido')
        return errors
      },

      id:{
        get(){
          return this.$store.state.ubicacion.id
        },
        set(value){
          this.$store.commit("ubicacion/storeId", value)
        }
      },
      pais:{
        get(){
          return this.$store.state.ubicacion.pais
        },
        set(value){
          this.$store.commit("ubicacion/storePais", value)
        }
      },
      codigo:{
        get(){
          return this.$store.state.ubicacion.codigo
        },
        set(value){
          this.$store.commit("ubicacion/storeCodigo", value)
        }
      },
      codigo2:{
        get(){
          return this.$store.state.ubicacion.codigo2
        },
        set(value){
          this.$store.commit("ubicacion/storeCodigo2", value)
        }
      },
      codigofe:{
        get(){
          return this.$store.state.ubicacion.codigofe
        },
        set(value){
          this.$store.commit("ubicacion/storeCodigofe", value)
        }
      },

    },

    methods: {
     async agregarPais (pais) {
       if(user.id){
        await this.$axios.put(baseURL + "/paises" + user.id, pais);
       } else{
        await this.$axios.post(baseURL + "/paises", pais);
       }
        await this.resetForm({id:'0', pais:'', codigo:'', codigo2:'', codigofe:'',});
        await this.$store.commit("ubicacion/storedata", (await this.$axios.get(baseURL)))
      },
      resetForm(pais){
        this.$store.commit("ubicacion/storeId", pais.id);
        this.$store.commit("ubicacion/storePais", pais.pais);
        this.$store.commit("ubicacion/storeCodigo", pais.codigo);
        this.$store.commit("ubicacion/storeCodigo2", pais.codigo2);
        this.$store.commit("ubicacion/storeCodigofe", pais.codigofe);
      },
      limpiar () {
        this.$v.$reset()
        this.pais = ''
        this.codigo = ''
        this.codigo2 = ''
        this.codigofe = ''
      },
    },

  }  
</script>