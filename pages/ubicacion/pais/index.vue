<template>
  <div>
    <MenUbicacion />
  <v-row 
    align="center" 
    justify="center" 
    style="height:100vh" dense
  >
    <div style="height: 100%; width: 30%; margin-top: 25px; padding-right: 15px;">
      <v-card elevation="3" aling="center">
        <v-card-title>Paises</v-card-title>
        <v-card-text>Test de informacion de datos de paises</v-card-text>
        <form style="padding: 10px;">
              <v-text-field
              v-model="formPais.id"
              v-if="id"
            ></v-text-field>
            <v-text-field
              v-model="formPais.nombre"
              :error-messages="paisErrors"
              :counter="4"
              label="Pais"
              required
              @input="$v.pais.$touch()"
              @blur="$v.pais.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="formPais.codigo"
              :error-messages="codigoErrors"
              label="Codigo"
              required
              @input="$v.codigo.$touch()"
              @blur="$v.codigo.$touch()"
              type="number"
            ></v-text-field>
              <v-text-field
              v-model="formPais.codigo2"
              :error-messages="codigo2Errors"
              label="Codigo2"
              required
              @input="$v.codigo2.$touch()"
              @blur="$v.codigo2.$touch()"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="formPais.cod_factelectronica"
              :error-messages="codigofeErrors"
              label="Codigo Factura Electronica"
              required
              @input="$v.cod_factelectronica.$touch()"
              @blur="$v.cod_factelectronica.$touch()"
              type="number"
            ></v-text-field>
            <v-btn
              class="mr-4"
              @click="submit()"
              color="success"
            >
              Agregar
            </v-btn>
            <v-btn @click="limpiar()">
              Limpiar
            </v-btn>
        </form>
      </v-card>
      </div>
        <div style="height: 100%; width: 60%; margin-top: 25px;">
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
                      <td><v-btn tile color="success" @click="submit(pais.id,pais.nombre,pais.codigo,pais.codigo2,pais.cod_factelectronica)">
                      <v-icon left>mdi-pencil</v-icon>
                      Edit
                      </v-btn></td>
                      <td><v-btn tile color="error" @click="eliminar(pais.id)">
                      <v-icon left>mdi-minus</v-icon>
                      Eliminar
                      </v-btn></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
                     </v-card>
          </div>
        </v-row>
    </div>
  
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      pais: { required, maxLength: maxLength(4) },
      codigo: { required },
      codigo2: { required },
      cod_factelectronica: { required },
    },
  
    data (){
      return{
        search:'',
        paises:[],
        formPais:{
        id:'',
        nombre:'',
        codigo:'',
        codigo2:'',
        cod_factelectronica:''
        }
      }
    },
    
    async mounted(){
     try {
          const res = await this.$axios.get('/paises')
          this.paises = res.data;
          console.log(res)
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
        if (!this.$v.cod_factelectronica.$dirty) return errors
        !this.$v.cod_factelectronica.maxLength && errors.push('CodigoFE Requiere almenos 1 Caracteres')
        !this.$v.cod_factelectronica.required && errors.push('CodigoFE es Requerido')
        return errors
      },
    },

    methods: {
      submit(){
        this.$axios.post('/paises/', this.form).then(function( response ){
        console.log(this.form)// Handle success
         }.bind(this));
        }
    },
    

  }  
</script>