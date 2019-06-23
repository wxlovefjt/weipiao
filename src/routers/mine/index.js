export default {
    path:'/mine',
    component:() => import('@/views/Mine'),
    children: [
        {
            path:'person',
            component: () =>import('@/views/Mine/person.vue')
        },
        {
            path:'orderList',
            component: () =>import('@/components/OrderList')
        },
        {
            path:'login',
            component: () =>import('@/components/Login')
        },
        {
            path:'register',
            component: () =>import('@/components/Register')
        },
        {
            path:'findPassword',
            component: () =>import('@/components/FindPassword')
        },
        {
            path:'/mine',
            redirect: 'person'
        }
    ]
}