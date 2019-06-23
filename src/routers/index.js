import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import mineRoute from './mine'
import cinemaRouter from './cinema'
import adminRouter from './admin'
import buyRouter from './buy'

Vue.use(Router)

export default new Router({
  mode: 'history',
  //base: process.env.BASE_URL,
  base:'weipiao',
  routes: [
   movieRouter,
   mineRoute,
   cinemaRouter,
   adminRouter,
   buyRouter,
   {
    path:'/*',
    redirect:'/movie'
 },
  ]
})
