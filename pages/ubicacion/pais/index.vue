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
              v-model="name"
              :error-messages="nameErrors"
              :counter="4"
              label="Pais"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
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
                      <th>Codigo2</th>
                      <th>Codigo FE</th>
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
                      <td>{{ item.codigo2 }}</td>
                      <td>{{ item.codigofe }}</td>
                      <td><v-btn tile color="success" @click="edit(item.id,item.pais,item.codigo,item.codigo2,item.codigofe)">
                      <v-icon left>mdi-pencil</v-icon>
                      Edit
                      </v-btn></td>
                      <td><v-btn tile color="error" @click="eliminar(item.id)">
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
      name: { required, maxLength: maxLength(4) },
      codigo: { required },
      codigo2: { required },
      codigofe: { required },
    },
  
    data (){
      return{
        search:'',
        paises:[
          {
            id: '',  
            pais: '',
            codigo: '',
            codigo2:'',
            codigofe:''
          },
        ]
      }
    },

    created(){

      this.mostrar()

    },
  methods:{

      mostrar(){
        axios.get(baseURL).then(response=>{
          this.paises=response.data;
        })
      },

      crear(){
        let parametros = {pais:this.paises.name, codigo:this.paises.codigo, codigo:this.paises.codigo2, codigo:this.paises.codigofe }
        axios.post(baseURL, parametros).then(response=>{
          this.mostrar()
        })
        this.paises.name='';
        this.paises.codigo='';
        this.paises.codigo2='';
        this.paises.codigofe='';

      },

      editar(){
        let parametros = {id:this.paises.id, pais:this.paises.name, codigo:this.paises.codigo, codigo:this.paises.codigo2, codigo:this.paises.codigofe }
        axios.put(baseURL+this.paises.id, parametros).then(response=>{
          this.mostrar()
        })  

      },

      eliminar(){
        Swal.fire({
          title:'Confirma la eliminacion del registro',
          confirmButtonText:'Confirmar',
          showCancelButton:true,
        }).then((result)=>{
          if(result.isConfirmed){
            axios.delete(baseURL+id).the(response=>{
              this.mostrar()
            });
            Swal.fire('Eliminado','','success')
          }else if(result.isDenied){}
        });
      },

    },
    
    computed: {

      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Pais Requiere almenos 4 Caracteres')
        !this.$v.name.required && errors.push('Pais es Requerido')
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

    },

    methods: {
      agregar () {
        this.$v.$touch()
      },
      limpiar () {
        this.$v.$reset()
        this.name = ''
        this.codigo = ''
        this.codigo2 = ''
        this.codigofe = ''
      },
    },

  }  
</script>