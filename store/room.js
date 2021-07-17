import { set, toggle } from '@/utils/vuex'

export const state = () => ({
  hello:0
})

export const getters = {
}

export const mutations = {
  hello: set('hello'),
  setImage: set('image'),
  setColor: set('color'),
}

export const actions = {
  act_hello(a) {
    // console.log('hello',a)
  }
}
