export default {
    path:'/buy/:movieid',
    name: 'buy',
    //path:'/bu,y/1/:movieid',
    component:()=>import('@/views/Buy'),
    /* components:{
        default:()=>import('@/components/NowPlaying'),
        buy:()=>import('@/views/Buy')
    }, */
    
}