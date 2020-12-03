<template>
  <div class="q-px-lg q-pb-md">
    <div v-if="getNotifications && !getNotifications.length">
        <q-img src="~assets/img/completed_task.png" class="icon_img dangle q-mt-lg" basic />
        <div class="text-center">
            Hello, Upcoming Tasks will appear here 🥰
        </div>
    </div>
    <q-timeline color="positive" v-else>
      <q-timeline-entry heading>
        Expiring Soon 😥
      </q-timeline-entry>

      <q-timeline-entry icon="" v-for="task in getNotifications" :key="task.id">
        <div>
            <q-card class="my-card" v-ripple @click="viewTaskDetails(task.id)">
            <!-- <q-card class="my-card" v-ripple style="background-image: url('../../assets/img/bkg.svg')"> -->
                <q-card-section>
                    <div class="row justify-between">
                        <div class="title"> {{ task.name }} </div>
                        <div class="subtitle2"> {{ timeFormat(task.date) }} </div>
                    </div>
                    <div class="subtitle1 text-grey">
                        {{ task.additional_info }}
                    </div>
                </q-card-section>
                <q-card-section>
                    <div class="row justify-between">
                        <div class="title"> {{ new Date(task.date).toDateString() }} </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
      </q-timeline-entry>

    </q-timeline>

    <!-- This is for task Detail -->
    <q-dialog full-width v-model="singleTaskDetails" position="bottom">
      <q-card style="width: 100%; border-top-right-radius: 20px; border-top-left-radius: 20px; ">
        <q-linear-progress :value="1" color="primary" />
        <q-btn no-caps label="Complete" outline rounded  color="positive" class="q-mt-md q-ml-md q-pl-sm q-pr-sm" v-if="task_details.status == 'Pending'" @click="complete_task(task_details.id)" />

        <q-card-section>
            <q-list separator>
                <q-item>
                    <q-item-section>
                    <q-item-label overline> Category </q-item-label>
                    <q-item-label> {{ task_details.category }} </q-item-label>
                    </q-item-section>
                </q-item>

                <q-item>
                    <q-item-section>
                    <q-item-label overline> Name </q-item-label>
                    <q-item-label> {{ task_details.name }} </q-item-label>
                    </q-item-section>
                </q-item>

                <q-item>
                    <q-item-section>
                    <q-item-label overline> Additional Info </q-item-label>
                    <q-item-label> {{ task_details.additional_info }} </q-item-label>
                    </q-item-section>
                </q-item>

                <q-item>
                    <q-item-section>
                    <q-item-label overline> Date </q-item-label>
                    <div class="row justify-between">
                        <q-item-label> {{ new Date(task_details.date).toDateString() }} </q-item-label>
                        <q-item-label> {{ timeFormat(task_details.date) }} </q-item-label>
                    </div>
                    </q-item-section>
                </q-item>

                <q-item>
                    <q-item-section>
                    <q-item-label overline> Status </q-item-label>
                    <q-item-label>
                        <q-chip dense :label="task_details.status" text-color="white" class="q-pa-md" outline :color="task_details.status == 'Completed' ? 'primary' : 'default' " />
                    </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['getTasks']),
    ...mapGetters('user', ['getNotifications'])
  },
  data () {
    return {
      singleTaskDetails: false,
      task_details: {}
    }
  },
  mounted () {
    // console.log(moment())
  },
  methods: {
    ...mapActions('user', ['COMPLETE_TASK']),
    viewTaskDetails (id) {
      const _ = this
      _.singleTaskDetails = true
      _.getTasks.filter(task => {
        if (task.id === id) {
          _.task_details = task
        }
      })
    },
    timeFormat (time) {
      var format = new Date(time)
      return format.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    },
    complete_task (id) {
      const _ = this
      _.COMPLETE_TASK(id)
    }
  }
}
</script>
