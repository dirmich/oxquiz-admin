import { set, toggle } from '@/utils/vuex'

export const state = () => ({
  drawer: null,
  color: 'success',
  image: ''// 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg'
})

export const getters = {
}

export const mutations = {
  setDrawer: set('drawer'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer')
}

export const actions = {
}
