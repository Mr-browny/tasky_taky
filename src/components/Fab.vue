/* eslint-disable no-unused-vars */
<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab v-model="fab" vertical-actions-align="right" color="primary" glossy icon="mdi-plus" direction="up" >
        <q-fab-action label-position="left" color="positive" @click="add_new_category_modal()" icon="mdi-sort" label="New Category" />
        <!-- <q-fab-action label-position="left" color="secondary" @click="add_new_note_modal()" icon="mdi-pencil-plus-outline" label="Notes" /> -->
        <q-fab-action label-position="left" color="primary" @click="add_new_task_modal()" icon="mdi-account-hard-hat" label="New Task" />
      </q-fab>
    </q-page-sticky>

    <!-- Dialog for New Task -->
    <q-dialog full-width v-model="newTask" position="bottom">
      <q-card style="width: 100%; border-top-right-radius: 20px; border-top-left-radius: 20px; ">
        <q-linear-progress :value="1" color="primary" />
        <q-card-section>
          Configure Task
          <q-icon name="mdi-cog" color="primary" class="fa fa-spin" />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-md">
            <q-input dense rounded outlined v-model="newTaskDetails.name" label="Task Name" />
            <q-input dense rounded outlined v-model="newTaskDetails.additional_info" label="Additional Info" />
            <q-select dense rounded outlined v-model="selectedCategory" :options="categoryOptions" label="Select Category" />
            <q-input dense rounded outlined v-model="newTaskDetails.date">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="newTaskDetails.date" mask="YYYY-MM-DD HH:mm">
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
                    <q-time v-model="newTaskDetails.date" mask="YYYY-MM-DD HH:mm" format24h label="lol">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div style="width: 97%;" class="q-mr-lg">
              <q-btn no-caps outline :loading="server_add_task_btn" rounded label="Add Task" color="primary" style="width: 100%; " @click="add_new_task()">
                <template #loading>
                  <q-spinner-bars />
                </template>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog for New Category -->
    <q-dialog v-model="newCategoryModal" persistent :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down" >
      <q-card class="">
        <q-bar class="bg-primary">
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6"> Select Category Image </div>
        </q-card-section>
        <q-card-section>
          <div class="text-center" v-if="!getCategoryImage.length">
            LOL, you've used up the images right... well E Go Be 🤣
          </div>
          <div class="row " v-else>
            <div class="col-xs-6 col-sm-4 col-md-3 q-pa-sm text-center" v-for="cat in getCategoryImage" :key="cat.id" >
              <q-card class="my-card" v-ripple @click="openNameCategoryModal(cat.id)">
                <q-img :src="cat.img_src" basic ></q-img>
              </q-card>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row"></div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog for naming the selected category image -->
    <q-dialog v-model="nameCategoryModal" >
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Name Category 🥰</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-img :src="selected_category_img_preview" alt="Preview Category Image" />
        </q-card-section>
        <q-card-section>
          <q-input dense outlined rounded color="primary" v-model="newCategoryName" label="Enter Name" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Add" no-caps @click="add_new_category()" :loading="loading">
            <template #loading>
              <q-spinner-bars />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
export default {
  computed: {
    ...mapGetters('user', ['getCategoryImage']),
    ...mapGetters('user', ['getCategory'])
  },
  data () {
    return {
      fab: false,
      newTask: false,
      nameCategoryModal: false,
      loading: false,
      newCategoryName: '',
      newCategoryModal: false,
      maximizedToggle: true,
      categoryOptions: [],
      selectedCategory: '',
      category_id: '',
      newTaskDetails: {
        name: '',
        additional_info: '',
        date: 'Tap icons to set Date & Time'
      },
      selected_category_img_preview: '',
      server_add_task_btn: false
    }
  },
  mounted () {
    // const _ = this
    // _.getCategory.forEach(cat => _.categoryOptions.push(cat.name))
  },
  methods: {
    ...mapActions('user', ['ADD_TASK']),
    ...mapActions('user', ['ADD_CATEGORY']),
    add_new_task_modal () {
      const _ = this
      _.getCategory.forEach(cat => _.categoryOptions.push(cat.name))
      _.newTask = !_.newTask
    },
    add_new_task () {
      const _ = this
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line camelcase
      const { name, additional_info, date } = _.newTaskDetails
      if (!name.trim() || !_.selectedCategory || !_.category_id || !date) return
      _.server_add_task_btn = true
      const configuredTask = {
        id: uuidv4(),
        category: _.selectedCategory,
        category_id: _.category_id,
        name: name,
        additional_info: additional_info,
        date: date,
        status: 'Pending'
      }
      setTimeout(() => {
        _.ADD_TASK(configuredTask)
        _.server_add_task_btn = false
        _.newTaskDetails = {}
        // _.newTaskDetails.date = 'Tap icons to set Date & Time'
        _.category_id = ''
        _.selectedCategory = ''
      }, 300)
    },
    openNameCategoryModal (id) {
      const _ = this
      _.nameCategoryModal = true
      _.getCategoryImage.filter(cat => {
        if (cat.id === id) {
          _.selected_category_img_preview = cat.img_src
        }
      })
    },
    add_new_category_modal () {
      const _ = this
      _.newCategoryModal = !_.newCategoryModal
    },
    add_new_category () {
      const _ = this
      if (!_.newCategoryName.trim()) return
      _.loading = true
      // eslint-disable-next-line camelcase
      const new_category = {
        id: uuidv4(),
        name: _.newCategoryName,
        count: 0,
        img_src: _.selected_category_img_preview
      }
      // { id: 1, name: 'All', count: 0, img_src: require('../../assets/img/all.png') },
      setTimeout(() => {
        _.ADD_CATEGORY(new_category)
        _.newCategoryName = ''
        _.loading = false
        _.nameCategoryModal = false
      }, 300)
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
    selectedCategory (val) {
      const _ = this
      if (val === 'All') {
        _.notify('positive', 'Select another category Please 😅')
        _.selectedCategory = ''
        // return
      }
      _.getCategory.filter(cat => {
        if (cat.name === val) {
          _.category_id = cat.id
        }
      })
    }
  }
}
</script>
