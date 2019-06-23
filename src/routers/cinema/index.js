export default {
    path:'/cinema',
    component:() => import('@/views/Cinema'),
    children:[
        {
            path:'cityList',
            component:() => import('@/components/CityList')
        },
        {
            path:'/cinema',
            component:() => import('@/components/CityList')
        },
    ]
}