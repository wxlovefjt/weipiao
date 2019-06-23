<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="确认订单">
           <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <Loading v-if="isLoading" />
        <div v-else>
           <div><h2>订单状态:等待付款</h2></div>
           <div>
                <div>
                    <img  :src="detailMovie.img | setWH('148.208')" alt="">
                </div>
                <div><h2>{{ detailMovie.nm }}</h2>
					 <p>{{ detailMovie.enm }}</p>
					 <p>评分：{{ detailMovie.sc }}</p>
                </div>
            </div>
            <div v-if="payConfirm">
                <el-button type="info" @click="payOk" round>确认订单</el-button>
            </div>
            <div class="messageTan" v-else  style="">
                <span style="font-size:20px;">请输入您的支付密码:</span>
                <br/><br/>
                <el-input v-model="paypassword" show-password style="width:80%;transform: translateX(10%); "></el-input>
                <br/><br/>
                <el-button type="info" @click="handleToBuy" style="float:left" round>付款</el-button>
                <el-button type="info"  style="float:right" @click="payNo"  round>取消</el-button>
               <!--  <input type="submit" @touchstart="handleToBuy" value="付款"> -->
            </div>
           <!-- <div>输入密码付款:<input v-model="password" type="password"> 
                <div><input type="submit" @touchstart="handleToBuy" value="付款"></div>
           </div> -->
       </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/JS';
import Header from '@/components/Header'
import axios from 'axios';
import { constants } from 'crypto';
export default {
   name:'buy',
   data(){
         return {
             id:this.$route.params.movieid,
             detailMovie:{},
             isLoading:true,
             password:'',
             paypassword:'',
             payConfirm:true,
         }
   },
   components:{
		Header,
    },
   props: ['movieid'],
   mounted () {
	    this.axios.get('/api/detailmovie?movieId='+this.id).then((res)=>{
		    var msg=res.data.msg;
		        if(msg==='ok'){
							 this.isLoading=false;
								this.detailMovie=res.data.data.detailMovie;
								console.log(this.detailMovie);
								this.$nextTick(()=>{
                    new Swiper(this.$refs.detail_player,{
												slidesPerView: 'auto',
												freeMode: true,
												freeModeSticky: true,
												});
							   	});
		                }
	       })
    },
   
   methods:{
       payOk(){
           this.payConfirm=false;
       },
       payNo(){
           this.payConfirm=true;
       },
       handleToBack(){
           this.$router.back();
        },
       handleToBuy(){
            this.axios.post('/api2/buy/buymovie',{
			    movieid:this.id,
                paypassword:this.paypassword,
                moviename:this.detailMovie.nm,
                movieSc:this.detailMovie.sc,
		    }).then((res)=>{
                var status=res.data.result.status
                this.paypassword='',
                this.payConfirm=true;
			   var This=this
			   if(status==1){
                   console.log('成功')
                    messageBox({
						title:'结果',
                        //content:res.data.msg,
                        content:res.data.result.msg,
						ok:'确定',
						handleOk(){
							This.$router.push('/mine/person');
						}
					})
			   }else{
				   messageBox({
					   title:'结果',
					   content:res.data.result.msg,
					   ok:'确定'
				   })
			   }
			   console.log(res);
		   })
       }
   },
    beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
        axios.get('/api2/users/getUser').then((res) => {
                   //移除本地缓存
                    localStorage.removeItem('name');
                    localStorage.removeItem('isAdmin');
                    var status=res.data.status;
            if(status===0){
                next(vm=>{
                    //数据缓存到本地
                    localStorage.setItem('name',res.data.username);
                    localStorage.setItem('isAdmin',res.data.isAdmin);
                    localStorage.setItem('userHead',res.data.userHead)
                    vm.$store.commit('user/USER_NAME',{
                        name:res.data.username, 
                        isAdmin:res.data.isAdmin,
                        userHead:res.data.userHead,});
                    console.log(res.data.username)
                    console.log(res.data.userHead)
                });
            }else{
                messageBox({
						title:'结果',
                        //content:res.data.msg,
                        content:'请先登录，再购买',
						ok:'确定',
						handleOk(){
                            //This.$router.push('/mine/login');
                            next('/mine/login');
						}
					})
            }
        });
  },
}

</script>

<style scoped>
#detailContrainer{  left: 0; top: 0; width: 100%; min-height: 100%; background: white; }
#detailContrainer.slide-enter-active{animation: 0.4s slideMove; }
/* .slide-enter-active .messageBox{ z-index: 100;} */
.messageTan{
    width: 80%;
    height: 100px;
    background-color:rgba(255, 255, 255, 0.8);
    margin: 0 auto;
    position: relative;
    transform: translateY(-100%);
}
</style>

