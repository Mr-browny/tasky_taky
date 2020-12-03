<template>
    <q-page >
        <List />
    </q-page>
</template>

<script>
import List from 'components/TaskCategory.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SingleList',
  components: {
    List
  },
  computed: {
    ...mapGetters('user', ['getScrolledHeader'])
  },
  data () {
    return {
      scrolled: 0
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
      window.scrollY >= 2 ? this.ALTER_HEADER(true) : this.ALTER_HEADER(false)
    }
  }
}
</script>
