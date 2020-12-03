<template>
    <q-page>
        <TaskList :filter="task_status" class="q-mb-lg"/>
        <q-page-sticky position="bottom-left" :offset="[18, 18]">
            <q-btn dense fab icon="mdi-filter" size="xs" color="primary" label="Filter" no-caps @click="filterList" />
        </q-page-sticky>
    </q-page>
</template>

<script>
import TaskList from 'components/TaskList.vue'
import { mapGetters, mapActions } from 'vuex'
import { Loading, QSpinnerBars } from 'quasar'
export default {
  name: 'SingleList',
  components: {
    TaskList
  },
  computed: {
    ...mapGetters('user', ['getScrolledHeader']),
    ...mapGetters('user', ['getTasks'])
  },
  data () {
    return {
      scrolled: 0,
      fab: false,
      task_status: 'Pending'
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
    },
    filterList () {
      const _ = this
      Loading.show({
        spinner: QSpinnerBars
      })
      setTimeout(() => {
        if (_.task_status === 'Pending') {
          _.task_status = 'Completed'
        } else {
          _.task_status = 'Pending'
        }
        Loading.hide()
      }, 2000)
    }
  }
}
</script>
