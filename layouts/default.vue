<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
            <v-card class="logo py-4 d-flex justify-center">
          <v-img
            lazy-src="http://127.0.0.1:3000/logo.png"
            max-height="70"
            max-width="50"
            src="http://127.0.0.1:3000/logo.png"
          ></v-img>
        </v-card>
      <template>
<v-card
    class="text-center"
    max-width="500"
  >
    <v-toolbar
      color="primary"
      dark
    >
    <v-toolbar-title>MODULOS</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"  
      >
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content   :to="item.to" router exact>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </template>

        <v-list-item
          :to="child.to"
          v-for="child in item.items"
          :key="child.title"
          route
          exact
        >
          <v-list-item-action>
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="child.title" :to="items.to" route exact></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
</v-card>
</template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      offset: true,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-cash-register',
          title: 'Facturacion',
          to:'/facturacion'
        },
        {
          icon:'mdi-tooth-outline',
          title:'Clinico',
          to:'/clinico'
        },
        {
          icon:'mdi-account-cash-outline',
          title:'Contable',
          to:'/contable'
        },
        {
          icon:'mdi-storefront-outline',
          title:'Inventario',
          to:'/inventarios'
        },
        {
          icon:'mdi-file-chart-outline',
          title:'Informes',
          to:'/Informes'
        },
        {
          icon:'mdi-cog-outline',
          title:'Configuracion',
                    items: [
                      { 
                        icon: 'mdi-crosshairs',
                        title: 'Ubicacion',
                        to:'/ubicacion' 
                      },
                      {
                        icon: 'mdi-domain',
                        title: 'Empresa',
                        to:'/empresa'
                      },
                      {
                        icon: 'mdi-cogs',
                        title: 'Param/Cont',
                        to:'/paramcontables'
                      },
                  ],
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

