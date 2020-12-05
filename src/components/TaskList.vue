<template>
  <div class="q-px-lg q-pb-md">
        <div v-if="filterCompletedTask && !filterCompletedTask.length">
            <q-img src="~assets/img/pending_task.png" class="icon_img dangle q-mt-lg" basic v-if="filter_phase === 'Pending'" />
            <q-img src="~assets/img/completed_task.png" class="icon_img dangle q-mt-lg" basic v-else />
            <div class="text-center">
                Hello, {{ filter_phase }} Tasks will appear here 🥰
            </div>
        </div>
        <q-timeline color="positive" v-else>
        <q-timeline-entry heading>
            {{ filter_phase }}
        </q-timeline-entry>

        <q-timeline-entry :icon="task.status == 'Completed' ? 'done_all' : ''" v-for="task in filterCompletedTask" :key="task.id">
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
                <div class="row justify-between">
                    <q-btn no-caps label="Complete" outline rounded  color="positive" class="q-mt-md q-ml-md q-pl-sm q-pr-sm" v-if="task_details.status == 'Pending'" @click="complete_task(task_details.id)" />
                    <q-btn no-caps label="Edit" outline rounded  color="primary" class="q-mt-md q-mr-md q-pl-sm q-pr-sm" @click="editTask = !editTask" v-if="task_details.status === 'Pending'"/>
                    <q-btn no-caps label="Delete" outline rounded  color="red" class="q-mt-md q-ml-md q-pl-sm q-pr-sm" @click="delete_task(task_details.id, task_details.category_id)" v-else />
                </div>

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

        <!-- Dialog for Edit Task -->
        <q-dialog full-width v-model="editTask" position="bottom">
            <q-card style="width: 100%; border-top-right-radius: 20px; border-top-left-radius: 20px; ">
                <q-linear-progress :value="1" color="primary" />
                <q-card-section>
                Edit Task
                <q-icon name="mdi-cog" color="primary" class="fa fa-spin" />
                </q-card-section>

                <q-card-section>
                <div class="q-gutter-md">
                    <q-input dense rounded outlined v-model="editTaskDetails.name" label="Task Name" />
                    <q-input dense rounded outlined v-model="editTaskDetails.additional_info" label="Additional Info" />
                    <q-select dense rounded outlined v-model="selectedCategory" :options="categoryOptions" label="Select Category" />
                    <q-input dense rounded outlined v-model="editTaskDetails.date">
                    <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-date v-model="editTaskDetails.date" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                            </q-date>
                        </q-popup-proxy>
                        </q-icon>
                    </template>

                    <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-time v-model="editTaskDetails.date" mask="YYYY-MM-DD HH:mm" format24h>
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                            </q-time>
                        </q-popup-proxy>
                        </q-icon>
                    </template>
                    </q-input>
                    <div style="width: 97%;" class="q-mr-lg">
                        <q-btn no-caps outline :loading="server_add_task_btn" rounded label="Update Task" color="primary" style="width: 100%; " @click="update_task()">
                            <template #loading>
                            <q-spinner-bars />
                            </template>
                        </q-btn>
                    </div>
                    <!-- The empty div below, is used to generate a little height above the task details modal -->
                    <div></div>
                </div>
                </q-card-section>
            </q-card>
        </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    filter: String
  },
  computed: {
    ...mapGetters('user', ['getTasks']),
    ...mapGetters('user', ['getCategory']),
    filterCompletedTask () {
      const _ = this
      const id = this.$route.params.id
      const cat = this.$route.params.category
      if (cat === 'All') {
        _.tasks = _.getTasks
      } else {
        _.tasks = _.getTasks.filter(task => task.category_id === id)
      }
      // Na the return dey cause this red error thingy
      return this.tasks.filter(task => task.status === this.filter)
    //   return this.getTasks.filter(task => task.status === this.filter)
    }
  },
  data () {
    return {
      singleTaskDetails: false,
      task_details: {},
      filter_phase: 'Pending',
      tasks: [],
      categoryOptions: [],
      selectedCategory: '',
      category_id: '',
      editTaskDetails: {
        name: '',
        additional_info: '',
        date: 'Tap icons to set Date & Time'
      },
      editTask: false,
      server_add_task_btn: false
    }
  },
  methods: {
    ...mapActions('user', ['COMPLETE_TASK']),
    ...mapActions('user', ['UPDATE_TASK']),
    ...mapActions('user', ['DELETE_TASK']),
    viewTaskDetails (id) {
      const _ = this
      _.singleTaskDetails = true
      _.getTasks.filter(task => {
        if (task.id === id) {
          _.task_details = task
          _.getCategory.forEach(cat => _.categoryOptions.push(cat.name))
          _.editTaskDetails.name = task.name
          _.editTaskDetails.additional_info = task.additional_info
          _.editTaskDetails.date = task.date
          _.selectedCategory = task.category
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
      _.singleTaskDetails = false
    },
    update_task () {
      const _ = this
      // eslint-disable-next-line camelcase
      const { name, additional_info, date } = _.editTaskDetails
      // eslint-disable-next-line no-useless-return
      if (!name.trim() || !_.selectedCategory || !date) return
      _.server_add_task_btn = true
      const configuredTask = {
        id: _.task_details.id,
        category: _.selectedCategory,
        category_id: _.task_details.category_id,
        name: name,
        additional_info: additional_info,
        date: date,
        status: _.task_details.status
      }
      setTimeout(() => {
        _.UPDATE_TASK(configuredTask)
        _.server_add_task_btn = false
      }, 300)
    },
    // eslint-disable-next-line camelcase
    delete_task (id, category_id) {
      const _ = this
      _.DELETE_TASK({ id, category_id })
      _.singleTaskDetails = false
    },
    notify (type, message) {
      const _ = this
      _.$q.notify({
        type: type,
        message: message
      })
    }
  },
  watch: {
    filter (val) {
      const _ = this
      val === 'Completed' ? _.filter_phase = 'Completed' : _.filter_phase = 'Pending'
    },
    selectedCategory (val) {
      const _ = this
      if (val === 'All') {
        _.notify('positive', 'Select another category Please 😅')
        _.selectedCategory = ''
        // return
      }
    }
  }
}
</script>
