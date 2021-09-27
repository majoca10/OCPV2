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
    <v-colm style="height: 100%; width: 45%; margin-top: 25px; padding-right: 15px;">
      <v-card elevation="3" aling="center">
        <v-card-title>Paises</v-card-title>
        <v-card-text>Test de informacion de datos de paises</v-card-text>
        <form style="padding: 10px;">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :counter="10"
              label="Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-select
              v-model="select"
              :items="items"
              :error-messages="selectErrors"
              label="Item"
              required
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
            ></v-select>
            <v-checkbox
              v-model="checkbox"
              :error-messages="checkboxErrors"
              label="Do you agree?"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox>

            <v-btn
              class="mr-4"
              @click="submit"
              color="success"
            >
              Agregar
            </v-btn>
            <v-btn @click="clear">
              Limpiar
            </v-btn>
        </form>
      </v-card>
      </v-colm>
        <v-colm style="height: 100%; width: 45%; margin-top: 25px;">
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
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in paises"
                      :key="item.pais"
                    >
                      <td>{{ item.id }}</td>
                      <td>{{ item.pais }}</td>
                      <td>{{ item.codigo }}</td>
                      <td><v-btn tile color="success">
                      <v-icon left>mdi-pencil</v-icon>
                      Edit
                      </v-btn></td>
                      <td><v-btn tile color="error">
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

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },
  
    data (){
      return{
        name: '',
        email: '',
        select: null,
        search:'',
        paises:[
          {
            id: '1',  
            pais: 'Colombia',
            codigo: 169,
          },
        ]
      }
    },
    
    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
    },

  }  
</script>