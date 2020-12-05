/* eslint-disable camelcase */
export function ALTER_MODE (state) {
  state.userMode = !state.userMode
}

export function ALTER_HEADER (state, payload) {
  state.scrolled = payload
}

export function ADD_TASK (state, payload) {
  const { category_id } = payload
  state.tasks.unshift(payload)
  state.category.forEach(cat => {
    if (cat.id === category_id) {
      cat.count++
    }
  })
  state.category.find(cat => {
    if (cat.name === 'All') {
      cat.count++
    }
  })
}

export function UPDATE_TASK (state, payload) {
  const { id } = payload
  var newArr = [...state.tasks]
  var index = state.tasks.findIndex(task => task.id === id)
  newArr[index] = payload
  state.tasks = newArr
}

export function DELETE_TASK (state, payload) {
  const { id, category_id } = payload
  var newArr = [...state.tasks]
  var index = state.tasks.findIndex(task => task.id === id)
  state.tasks = newArr.splice(0, index)

  var newCatArr = [...state.category]
  var catIndex = state.category.findIndex(cat => cat.id === category_id)
  newCatArr[catIndex].count--
  state.category = newCatArr

  state.category.find(cat => {
    if (cat.name === 'All') {
      cat.count--
    }
  })
}

export function ADD_CATEGORY (state, payload) {
  state.category.push(payload)
}

export function COMPLETE_TASK (state, payload) {
  state.tasks.find(task => {
    if (task.id === payload) {
      task.status = 'Completed'
    }
  })
}
