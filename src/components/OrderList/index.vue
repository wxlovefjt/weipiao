<template>
 <div id="detailContrainer" class="slide-enter-active">
        <el-row>
            <el-button  style="width:100%;font-size:30px;" type="primary" plain disabled>已购订单</el-button>
          <!--   <el-switch  v-model="value" active-text="不允许查看订单" inactive-text="允许查看订单" active-color="#13ce66"  inactive-color="#ff4949">
            </el-switch> -->
        </el-row>
        <Loading v-if="isLoading" />
        <!-- <div v-if="value"></div> -->
        <div v-else style="text-align:center;">
            <el-table  :data="nowtableData" style="width: 100%;  ">
                <el-table-column prop="moviename" label="电影名称"  width="150px">
                </el-table-column>
                <el-table-column prop="movieSc" label="电影评分" width="100px">
                </el-table-column>
                <el-table-column prop="caozuo" label="操作"  width="150px">
					<el-button>删除订单</el-button>
				</el-table-column>
            </el-table>
            <el-pagination small layout="total,prev, pager, next, jumper" :total="tableData.length" :page-size="pageSize"  @current-change="handleCurrentChange"  :current-page.sync="currentPage" class="page" >
            </el-pagination>
        </div>

    </div>
</template>

<script>
import Header from '@/components/Header';
import axios from 'axios';
import { constants } from 'crypto';
export default {
    name:'orderList',
    data(){
        return{
            isLoading:true,
            datail:[],
            tableData:[],
            detailMovie:{},
            currentPage:1,
            pageSize:5,
            value:true,
        }
    },
    components:{
		Header,
    },
    computed:{
      nowtableData(){
         return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      }
    },
    methods:{
        handleToBack(){
           this.$router.back();
        },
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    mounted(){
        this.axios.get("/api2/buy/getOrderList").then(res => {
            console.log(res);
            this.isLoading=false;
            var status = res.data.status;
            console.log(status);
            console.log(res.data.data.orderList);
            if (status === 0) {
                this.tableData = res.data.data.orderList;
            }
        });
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
                next('/mine/login');
            }
        });
  },
}
</script>

<style scoped>
#detailContrainer{  left: 0; top: 0; width: 100%; min-height: 100%; background: white; }
#detailContrainer.slide-enter-active{animation: 0.4s slideMove; }
.page{
    position: fixed;
    bottom: 60px;
   /*  left: 150px; */
} 
</style>
