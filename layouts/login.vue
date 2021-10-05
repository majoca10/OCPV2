<template>
      <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field 
            label="Usuario" 
            prepend-icon="mdi-account-circle"
            v-model="login.usuario"
          />
          <v-text-field 
            label="Password"
            prepend-icon="mdi-lock"
            v-model="login.password"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="info" @click="login()">Ingresar</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      usuario: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.post('local', {
          data: {
          usuario: this.usuario,
          password: this.password
          }
        })
            console.log(data)
        this.$router.push('/board')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>