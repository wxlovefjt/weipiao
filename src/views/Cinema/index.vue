<template>
    <div id="main">
        <Header title="微票影院" />
            <div id="content">
                <div class="cinema_menu">
                        <router-link tag="div" to="/cinema/cityList" class="city_switch">
                            全城 <i class="iconfont icon-lower-triangle"></i>
                        </router-link>
                        <router-link tag="div"  to="/cinema/cityList" class="brand_swtich">
                            品牌 <i class="iconfont icon-lower-triangle"></i>
                        </router-link>
                        <router-link tag="div" to="/cinema/cityList" class="feature_switch">
                            特色 <i class="iconfont icon-lower-triangle"></i>
                        </router-link>
                    </div>
                    <keep-alive>
                        <router-view />
                    </keep-alive>
            </div>
        <TarBar/>
    </div>
</template>

<script>

import Header from '@/components/Header'
import TarBar from '@/components/TarBar'

export default {
  name:'Cinema',
   components:{
       Header,
       TarBar,
   }
}
</script>

<style scoped>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}   
</style>
