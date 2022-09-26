import { createRouter, createWebHashHistory } from 'vue-router'
const Recommend = () => import('@/views/recommend'/* webpackChunkName: "recommend" */)
const Search = () => import('@/views/search'/* webpackChunkName: "search" */)
const Singer = () => import('@/views/singer'/* webpackChunkName: "singer" */)
const TopList = () => import('@/views/top-list'/* webpackChunkName: "top-list" */)
const SingerDetail = () => import('@/views/singer-detail'/* webpackChunkName: "singer-detail" */)
const Album = () => import('@/views/album'/* webpackChunkName: "album" */)
const TopDetail = () => import('@/views/top-detail'/* webpackChunkName: "top-detail" */)
const UserCenter = () => import('@/views/user-center'/* webpackChunkName: "user-center" */)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    name: 'recommend',
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
  },
  {
    name: 'singer',
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    name: 'topList',
    path: '/top-list',
    component: TopList,
    children: [
      {
        path: ':id',
        component: TopDetail
      }
    ]
  },
  {
    name: 'serach',
    path: '/serach',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    name: 'user',
    path: '/user',
    components: {
      user: UserCenter
    }
  }
]

const router = createRouter({
  history: createWebHashHistory('/recommend'),
  routes
})

export default router
