<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :elevated="getScrolledHeader">
      <q-toolbar>
        <q-btn flat round dense icon="mdi-view-dashboard-outline" class="q-mr-sm" v-if="$route.name === 'Dashboard'" />
        <q-btn flat round dense icon="mdi-chevron-left" class="q-mr-sm" @click="$router.go(-1)" v-else/>
        <q-toolbar-title v-if="getScrolledHeader">
          <strong style="font-size: 16px; "> {{ $route.params.category ? $route.params.category : $route.name }} </strong>
        </q-toolbar-title>
        <q-space />
        <q-btn dense  round icon="mdi-bell-outline" class="q-ma-md" :to="{name: 'Notifications'}">
          <q-badge :color="getNotifications.length ? 'secondary' : ''" floating>
            {{ getNotifications.length ? getNotifications.length : '' }}
          </q-badge>
        </q-btn>
        <!-- <q-btn dense  round class="q-ma-md" @click="$q.dark.toggle()"> -->
        <q-btn dense  round class="q-ma-md" @click="changeMode()">
          <q-icon name="mdi-lightbulb-on" :color="$q.dark.isActive ? 'yellow' : 'grey' " />
        </q-btn>
      </q-toolbar>
      <q-toolbar inset v-if="!getScrolledHeader">
        <q-toolbar-title>
          <strong> {{ $route.params.category ? $route.params.category : $route.name }} </strong>
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-page-container>
    <div class="bg-primary text-transparent" style="z-index: 100; margin-top: -2px; border-bottom-left-radius: 50%; border-bottom-right-radius: 50%;">
        some weird shit I used to create space lol
    </div>
      <transition enter-active-class="animated slideInUp" leave-active-class="animated fadeOut" appear :duration="400" >
        <router-view class="layout-view"></router-view>
      </transition>
    </q-page-container>

    <!-- Floating Action button for the New Task -->
    <Fab />

  </q-layout>
</template>
<style>
  .my-card{
    width: 100%
  }
  .icon_img{
    filter: drop-shadow(0 0 0.3rem #6ADCC3);
  }
  .dangle {
    animation: shimmy 2s infinite;
    animation-direction: alternate;
  }
  @keyframes shimmy {
    0% {
      transform: translate(0, -20px);
    }
    100% {
      transform: translate(10px, 20px);
  }
}
</style>
<script>
import Fab from 'components/Fab.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MainLayout',
  components: {
    Fab
  },
  computed: {
    ...mapGetters('user', ['getScrolledHeader']),
    ...mapGetters('user', ['getUserMode']),
    ...mapGetters('user', ['getNotifications'])
  },
  data () {
    return {
      // scrolled: 0
    }
  },
  mounted () {
    const _ = this
    _.$q.dark.set(_.getUserMode)
  },
  methods: {
    ...mapActions('user', ['ALTER_MODE']),
    handleScroll () {
      window.scrollY >= 60 ? this.scrolled = 100 : this.scrolled = 0
    },
    changeMode () {
      const _ = this
      _.$q.dark.toggle()
      _.ALTER_MODE()
    }
  }
}
</script>
