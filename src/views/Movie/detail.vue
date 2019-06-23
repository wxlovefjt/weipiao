<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header  title="电影详情" >
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
				   <Loading v-if="isLoading" />
							<div v-else id="content" class="contentDetail">
									<div class="detail_list">
											<div class="detail_list_bg" :style="{'background-image': 'url('+detailMovie.img.replace(/w\.h/,'148.208')+')'}"></div>
											<div class="detail_list_filter"></div>
											<div class="detail_list_content">
														<div class="detail_list_img" >
															<img  :src="detailMovie.img | setWH('148.208')" alt="" >
														</div>
														<div class="detail_list_info">
															<h2>{{ detailMovie.nm }}</h2>
															<p>{{ detailMovie.enm }}</p>
															<p>评分：{{ detailMovie.sc }}</p>
															<p>{{ detailMovie.cat }}</p>
															<p>{{ detailMovie.src }}/ {{ detailMovie.dur }}分钟</p>
															<p>{{detailMovie.pubDesc }}</p>
														</div>
											</div>
									</div>
									<div class="detail_intro">
											<p>
												&nbsp;&nbsp;&nbsp;&nbsp;{{ detailMovie.dra }}
											</p>
									</div>
									<div class="detail_player swiper-container" ref="detail_player">
												<ul class="swiper-wrapper">
														<li v-for="(item,index) in detailMovie.photos" :key="index"  class="swiper-slide">
																<div >
																	<img :src="item |setWH('140.180')" alt="">
																</div>
														</li>
												</ul>
									</div>
									<div class="elmenet"> 
										<div class="elmenet_left"><span  style="font-size: 25px;">想看</span><li @click="handleChange1" :class="star"  style="font-size: 30px;"></li></div>
                                        <div class="elmenet_right"><li @click="handleChange2" :class="dele" style="font-size: 30px;"></li><span style="font-size: 25px;">不想看</span></div>
                                           <!-- <li class="el-icon-star-on" style="font-size: 30px;"></li> -->
										   <!-- <li class="el-icon-delete-solid" style="font-size: 30px;"></li> -->
									</div>
									<div  class="elmenet">
										<div class="elmenet_shopping"><li class="el-icon-shopping-cart-full" style="font-size: 30px;"></li><span style="font-size: 25px;">购物车</span></div>
										<div class="elmenet_purchase" @touchstart="handleBuy(detailMovie.id)" ><span style="font-size: 25px;">购买</span><li class="el-icon-goods" style="font-size: 30px"></li></div>
									</div>
									<div class="sub-Comment" style="padding: 5px 10px 10px 10px;">
										<el-input type="textarea" placeholder="请输入内容" v-model="comment" maxlength="" show-word-limit>
                                        </el-input>
										<br/><br/>
										<!-- <textarea v-model="comment" placeholder="请输入你想要发表的评论" rows="3" cols="50"></textarea> -->
										<el-button type="primary" style="width:100%;" @click="submitComment">发表</el-button>
										<!-- <input type="submit" value="发表" @touchstart="submitComment"> -->
									</div>
									<div style="padding:0 50px 0 50px;"><el-switch  v-model="value" active-text="不看该影片热评" inactive-text="查看该影片热评" active-color="#ff4949"  inactive-color="#13ce66">
                                          </el-switch>
									</div>
									<div v-if="value"></div>
									<div v-else>
										<el-table :data="nowtableData" style="width: 100%;  ">
											<el-table-column prop="username" label="用户"  width="100">
											</el-table-column>
											<el-table-column prop="comment" label="电影评论"  width="175">
											</el-table-column>
											<el-table-column prop="caozuo" label="操作"  width="100">
												<el-button>回复</el-button>
											</el-table-column>
										</el-table>
										<el-pagination background layout=" total,prev,  next, jumper" :total="tableData.length" @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="currentPage" class="page">
										</el-pagination>
									</div>
							</div>
	</div>
</template>

<script>
import Header from '@/components/Header'
import { constants } from 'crypto';
import {messageBox} from '@/components/JS';

export default {
	name:'Datail',
	data(){
		return{
				detailMovie:{},
				isLoading:true,
				dele:'el-icon-delete',    //初始状态
				dele2:'el-icon-delete-solid',
				star:'el-icon-star-off',
				star2:'el-icon-star-on',   //初始状态
				count:'',
				comment:'',
				tableData:[],
				currentPage:1,
				pageSize:5,
				value:true,
		}
	},
	components:{
		Header,
	},
	props: ['movieid'],	 
	computed:{
      nowtableData(){
         return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      }
    },
    methods: {
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		handleToBack(){
			this.$router.back();
		},
		handleChange1(){
			this.star='el-icon-star-on';
		},
		handleChange2(){
			this.dele='el-icon-delete-solid';
		},
		handleBuy(movieid){
            /* messageBox({
                title:'信息',
                content:'点击购票',
                ok:'确定',
						}); */
						console.log('调整')
						 console.log(movieid);
						this.$router.push({
								name: 'buy',
								params: {
								movieid: movieid
								}
							});
					//	this.$router.push('/buy/'+movieid);
		},
		submitComment(){
            this.axios.post('/api2/comments/submitcomment',{
				    comment:this.comment,
			        movieid:this.movieid,
				}).then((res)=>{
					console.log(res)
					var status=res.data.status
					console.log(status)
					var This=this
					this.comment='';
					this.getComments();
					if(status==0){
							messageBox({
							title:'信息',
							content:res.data.msg,
							ok:'确定',
							/* handleOk(){
							This.$router.push('/mine/person');
							} */
									})
						}else if(status==-1){
						messageBox({
							title:'信息',
							content:res.data.msg,
							ok:'确定'
						})
					}else if(status==-2){
                          messageBox({
							title:'信息',
							content:res.data.msg,
							ok:'确定',
							handleOk(){
							This.$router.push('/mine/login');
						}
						})
					}
					console.log(res);
				})
				},
		getComments(){
			console.log('this.movieid')
			console.log(this.movieid)
			this.axios.post('/api2/comments/getcommentsList',{
								movieid:this.movieid,
							}).then(res => {
								console.log('ID')
								console.log(res);
								console.log(this.movieid)
								var status = res.data.status;
								console.log('看看res.data.data.commentList')
								console.log(status);
								console.log(res.data.data.commentList);
								if (status === 0) {
									this.tableData = res.data.data.commentList;
								}
		
							});
            
		},
		getdetailmovie(){
            this.axios.get('/api/detailmovie?movieId='+this.movieid).then((res)=>{
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
						
		   });
		}
    },
mounted () {
	console.log(this.movieid)
	/* this.axios.get('/api/detailmovie?movieId='+this.movieid).then((res)=>{
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
						
		   }); */
		   this.getdetailmovie();
		   this.getComments();
}
}
</script >

<style scoped>

#detailContrainer{ position: absolute; left: 0; top: 0; width: 100%; min-height: 100%; background: white; z-index: 100; }
#detailContrainer.slide-enter-active{animation: 0.4s slideMove; }
@keyframes slideMove {
		0%{transform: translateX(100%);}
		100%{transform: translateX(0);}
}
#content .contentDetail{ display: block; margin-bottom:0; padding-top:46px;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden; }
.detail_list .detail_list_bg{ width:100%; height:100%; background:  0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
.elmenet{ width:100%; height: 50px;  padding-top: 10px; }
.elmenet .elmenet_left{ width: 100px; height: 30px; margin-left: 60px; float: left; display: inline-block; }
.elmenet .elmenet_right{ width: 110px; height: 30px; margin-right: 40px; float: right; display: inline-block;}
.elmenet .elmenet_righ .el-tuxing{ width: 70px; height: 30px; background-color: silver; }
.elmenet .elmenet_shopping{ width: 120px; height: 30px;  float: left;}
.elmenet .elmenet_purchase{ width: 110px; height: 30px; float: right;}
.sub-comment{
	padding: 5px 5px 10px 5px;
}
</style> 
