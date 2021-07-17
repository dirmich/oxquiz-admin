import { session } from '~/utils/storage'

export default async function (ctx) {
  // console.log('check')
  const { store, req, app, redirect} = ctx
  // if (store.getters.isLogged) {
  //     // return redirect('/')
  // } else {
  //   return redirect('/login')
  // }
  const token = session.get('token')
  // store.dispatch('auth/login')
  if (!token) {
    redirect('/login')
  } else {
    await store.dispatch('login')
  }
}