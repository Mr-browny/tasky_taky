import moment from 'moment'

export function getUserMode (state) {
  return state.userMode
}

export function getScrolledHeader (state) {
  return state.scrolled
}

export function getCategoryImage (state) {
  return state.new_category_img
}

export function getCategory (state) {
  return state.category
}

export function getTasks (state) {
  return state.tasks
}

export function getNotifications (state) {
  var arr = []
  var today = new Date().toISOString()
  // Na the return dey cause this red error thingy
  state.tasks.filter(task => {
    if (task.status === 'Pending' && moment(task.date).diff(moment(today), 'days') + 1 === 1) {
      arr.push(task)
    }
  })
  return arr
}
