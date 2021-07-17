import { session } from '~/utils/storage'

export const state = () => ({
  token:null
})

export const getters = {
  isLogged(state) {
    return !!state.token
  },
  getToken(state) {
    return state.token
  }
}

export const mutations = {
  setLogged(state,logged) {
    state.isLogged = logged
  },
  setToken(state,token) {
    state.token = token
  }
}

export const actions = {
  async login({
    commit, dispatch
  }) {
    try {
      let token = session.get('token')
      this.$axios.setToken(token, 'Bearer')
      commit('setToken', token)
    }
    catch(e) {
      dispatch('logout')
    }
  },
  async logout({
    commit
  }) {
    session.reset('token')
    this.$axios.setToken(null, 'Bearer')
    await commit('setToken', null)
  }
}
