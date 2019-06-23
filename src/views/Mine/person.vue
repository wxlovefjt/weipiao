<template>
    <div >
        <div  class="container-head">
            <div class="container-tab">
                <div class="Licon" ><li class="el-icon-setting" style="font-size:30px; "></li></div>
                <div class="Ricon" ><li class="el-icon-bell" style="font-size:30px; "></li></div>
            </div>
            <div class="Img-Touxing">
                <div class="Img-center"><img class="imgT" :src="$store.state.user.userHead">{{ $store.state.user.name }}</div>
            </div>
            <div class="kapian">
                <div class="kapian-left" s>欢迎您:<br/><span v-if="$store.state.user.isAdmin">管理员 <a href="/admin" target="_bank">权限管理</a></span>
                            <span v-else>普通会员</span>
                </div>
                 <el-divider direction="vertical"></el-divider>
                <div class="kapian-right"  >  <a href="javascript:;" @touchstart="handleToLogout"><li class="el-icon-top-right" style="font-size:25px;"></li></a></div>
            </div>
        </div>
        <div class="elIcon">
            <div class="elIcon-icon"><li class="el-icon-s-custom" style="font-size:30px;"></li><br/><span>个人中心</span></div>
            <div class="elIcon-icon"><li class="el-icon-video-camera-solid" style="font-size:30px;"></li><br/><span>影院中心</span></div>
            <div class="elIcon-icon"><li class="el-icon-map-location" style="font-size:30px;"></li><br/><span>定位</span></div>
            <div class="elIcon-icon"><li class="el-icon-upload" style="font-size:30px;"></li><br/><span>云服务</span></div>
            <div class="elIcon-icon"><li class="el-icon-share" style="font-size:30px;"></li><br/><span>分享</span></div>
        </div>
        <div class="upload-Img">
            <input type="file" name="file" value="上传头像" @change="handleTouploadImg" />
        </div>
        <div class="buyform" style="">
            <el-divider></el-divider>
            <span class="buyform-span" >已购订单</span>  <li class="el-icon-arrow-right el-li-right" @click="handleOrderList" ></li>
            <el-divider></el-divider>
            <span class="buyform-span">想看的电影和演出</span> <li class="el-icon-arrow-right el-li-right" ></li>
            <el-divider></el-divider>
            <span class="buyform-span">看过的电影</span> <li class="el-icon-arrow-right el-li-right" ></li>
            <el-divider></el-divider>
            <span class="buyform-span">播放记录</span> <li class="el-icon-arrow-right el-li-right" ></li>
            <el-divider></el-divider>
            <span class="buyform-span">微票影院卡</span> <li class="el-icon-arrow-right el-li-right" ></li>
            <el-divider></el-divider>  
            <span class="buyform-span">银行卡特惠</span> <li class="el-icon-arrow-right el-li-right" ></li>
            <el-divider></el-divider>
            <span class="buyform-span">优惠券</span> <li class="el-icon-arrow-right el-li-right" ></li>    
        </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/JS';
import axios from 'axios';
import { constants } from 'crypto';
export default {
    name:'center',
    data(){
        return{
            datail:[],
            detailMovie:{},
        }
    },
    mounted() {
        /* this.axios.get("/api2/buy/getOrderList").then(res => {
            console.log(res);
            var status = res.data.status;
            console.log(status);
            console.log(res.data.data.orderList);
            if (status === 0) {
                this.tableData = res.data.data.orderList;
            }
        }); */
       /*  this.handlegetOrderList();
        console.log('-------') */
        
  },
  /*  computed:{
      nowtableData(){
        return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      }
    }, */
    methods:{
        handleToLogout(){
           this.axios.get('/api2/users/logout').then((res)=>{
               var status=res.data.status;
               if(status===0){
                   this.$store.commit('/user/USER_NAME',{ name:'',isAdmin:0,userHead:'' });
                   this.$router.push('/mine/login');
               }
           });
        },
        handleTouploadImg(ev){
                 console.log('打印handleTouploadIM方法')
                var file=ev.target.files[0];
                var param=new FormData();
                param.append('file',file,file.name);
                var config={
                    header:{
                        'Content-type':'multipart/form-data',
                    }
                };
                this.axios.post('/api2/users/uploadUserHead',param,config).then((res)=>{
                    var status=res.data.status;
                    var This=this;
                    if(status===0){
                        messageBox({
                            title:'信息',
                            content:'头像上传成功',
                            ok:'确定',
                            handleOk(){
                                This.$store.commit('user/USER_NAME',{
                                name:This.$store.state.user.name, 
                                isAdmin:This.$store.state.user.isAdmin,
                                userHead:res.data.data.userHead+'?'+Math.random(),
                                });
                            },
                        });
                        console.log(res.data.data.userHead)
                    }else{
                        messageBox({
                            title:'信息',
                            content:'头像上传失败',
                            ok:'确定',
                        });
                    }
                })
        },
         handleOrderList(){
             this.$router.push('/mine/orderList');
         },
    },
    beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    //to 去哪、 from 从哪来  next  接下来   
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
                next('/mine/login');
            }
        });
  },
}
</script>

<style scoped>
.container-head{
    widows: 100%;
    height: 175px;
    position: relative;
    background-color:rgba(223, 223,223 , 0.8);
}
.container-head .container-tab{
    width:100%;
    height: 50px;
    padding-top: 10px;
    background-color: darkgray;
}
.container-head .container-tab .Licon{
    float: left;
    display: inline;
    margin-left: 10px;

}
.container-head .container-tab .Ricon{
    float: right;
    display: inline;
    margin-right: 10px;
}
.container-head .Img-touxiang{
    align:center;
    padding: 0 auto;
    position: relative;
}
.Img-center{
    position: relative;
    left: 150px;
}
.imgT{
    width:50px;
    height: 50px;
    border-radius:50%;
}
.container-head .kapian{
    position: absolute;
    width: 80%;
    left: 25px;
    height: 50px;
    padding:20px 5px 0 5px;
    border-radius: 20px;
    background-color: rgba(43, 34, 34, 0.5);
}
.kapian .kapian-left{
    float: left; display: inline;
}
.kapian .kapian-right{
    float: right; display: inline;
}
.elIcon{
    padding-top: 50px;
    height: 75px;
}
.elIcon .elIcon-icon{
    float: left;
    display: inline;
    width: 20%;
    text-align: center;
    background-color: rgba(blue, white,red , 0.8)
}
.uoload-Img{


}
.buyform{
     padding:0 10px 0 10px;
}
.buyform .buyform-span{
    font-size:20px;
}
.buyform .el-li-right{
    font-size:20px; 
    float:right;
}
a{
    text-decoration: none;
    color: black;
}
</style>
