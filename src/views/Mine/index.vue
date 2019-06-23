<template>
    <div id="main">
        <Header  title="我的微票" >
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header> 
        <div id="content">
            <router-view />
        </div>
        <TarBar/>
    </div>
</template>

<script>

import Header from '@/components/Header'
import TarBar from '@/components/TarBar'
import Login  from '@/components/Login'

export default {
  name:'Mine',
   components:{
       Header,
       TarBar,
       Login,
   },
   methods:{
       handleToBack(){
           this.$router.back();
        }
   }
}
</script>

<style scoped>
#content{

}
</style>
