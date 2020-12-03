<template>
  <div>
    <div class="row ">
      <div class="col-xs-6 q-pa-sm text-center" v-for="(task, index) in getCategory" :key="index" >
        <q-card class="my-card" v-ripple @click="view_category(task.name, task.id)">
          <q-card-section class="text-white">
            <q-img :src="task.img_src" :alt="task.name" class="icon_img" />
            <!-- <img :src="task.img_src" :alt="task.name" /> -->
          </q-card-section>

          <q-separator inset />
          <q-card-section class="">
            <div class="text-h6"> {{ task.name }} </div>
            <div class="text-subtitle2"> {{ task.count.toLocaleString() }} </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    lists: Array
  },
  computed: {
    ...mapGetters('user', ['getCategory'])
  },
  data () {
    return {
      //
    }
  },
  methods: {
    view_category (cat, id) {
      const _ = this
      _.$router.push({
        name: 'Single_List',
        params: { category: cat, id: id }
      })
    }
  }
}
</script>
