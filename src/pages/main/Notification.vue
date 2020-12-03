<template>
    <q-page padding>
        <NotificationList />
    </q-page>
</template>

<script>
import NotificationList from 'components/NotificationList.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Notification',
  components: {
    NotificationList
  },
  computed: {
    ...mapGetters('user', ['getScrolledHeader'])
  },
  data () {
    return {
      scrolled: 0,
      fab: false
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions('user', ['ALTER_HEADER']),
    handleScroll () {
      //   once this is more than 200px, change the store settings, so the display would be altered
      window.scrollY >= 10 ? this.ALTER_HEADER(true) : this.ALTER_HEADER(false)
    }
  }
}
</script>
