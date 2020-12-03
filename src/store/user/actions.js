export function ALTER_MODE ({ commit }) {
  commit('ALTER_MODE')
}

export function ALTER_HEADER ({ commit }, payload) {
  commit('ALTER_HEADER', payload)
}

export function ADD_TASK ({ commit }, payload) {
  commit('ADD_TASK', payload)
}

export function ADD_CATEGORY ({ commit }, payload) {
  commit('ADD_CATEGORY', payload)
}

export function COMPLETE_TASK ({ commit }, payload) {
  commit('COMPLETE_TASK', payload)
}
