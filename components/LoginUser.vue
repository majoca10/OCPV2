<template>
      <v-app id="inspire">
          <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                  <v-flex xs12 sm8 md4>
                      <v-card class="py-4 d-flex justify-center" style="box-shadow: none;">
                          <v-img
                            lazy-src="http://127.0.0.1:3000/logo.png"
                            max-height="70"
                            max-width="50"
                            src="http://127.0.0.1:3000/logo.png"
                          ></v-img>
                      </v-card>
                      <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Oral Clinic Plus</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                              <v-text-field
                                  v-model="userInfo.username"
                                  prepend-icon="person"
                                  name="login"
                                  label="Cedula"
                                  type="number"
                                  :error-messages="usernameErrors"
                                  :counter="11"
                                  required
                                  @input="$v.username.$touch()"
                                  @blur="$v.username.$touch()"                                  
                              ></v-text-field>
                              <v-text-field
                                  v-model="userInfo.password"
                                  prepend-icon="lock"
                                  name="password"
                                  label="Password"
                                  type="password"
                                  :error-messages="passwordErrors"
                                  :counter="4"
                                  required
                                  @input="$v.password.$touch()"
                                  @blur="$v.password.$touch()" 
                              ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="submitForm(userInfo)">Conectar</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-flex>
                </v-layout>
            </v-container>
          </v-main>
      </v-app>
    </template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      username: { required },
      password: { required },
    },
  
    data (){
      return{
          userInfo: {
          username: '',
          password: ''
        },
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

    props: ["submitForm", "buttonText", "hasName"],

    computed: {

      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors.push('Cedula es Requerido')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Contraseña es Requerido')
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