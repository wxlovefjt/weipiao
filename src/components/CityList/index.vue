<template>
        <div id="content">
            <div class="cinema_body">   
							<Loading v-if="isLoading" />
							  <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd"> 
											<ul >
												<li class="pullDown"> {{ pullDownMsg }} </li>
												<li v-for="item in cinemaList" :key="item.id">
													<div>
														<span>{{ item.nm }}</span>
														<span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
													</div>
													<div class="address">
														<span>{{ item.addr }}</span>
														<span>{{  item.distance }}</span>
													</div>
													<div class="card">
																		<!-- <div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class="key | classCard">{{ key | formatCard }}</div> -->
														<span v-for="(num,key) in item.tag" :key="key"> 
															<div v-if="num===1" :class="key | classCard" > {{ key | formatCard }} </div>
														</span>
															</div>
												</li>		
											</ul>
							  </Scroller>
			      </div>
        </div>
</template>

<script>
export default {
   name:'CityList',
   data () {
	   return {
			 cinemaList:[],
			 pullDownMsg:'',
			 isLoading:true,
			 prevCityId:-1
	   }
   },
   activated() {
		 var cityId=this.$store.state.city.id;
		 //判断如果是选择了城市操作，就执行更新选择城市当前信息
		 if(this.prevCityId===cityId){
			 return ;}
	   this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
		   var msg=res.data.msg;
		   if(msg==='ok'){
				 this.cinemaList=res.data.data.cinemas;
				 this.isLoading=false;
				 this.prevCityId=cityId;
		   }
	   });
   },
    filters: {
		formatCard(key){
			var card=[
				{ key:'allowRefund' , value:'退票' },
				{ key:'endorse' , value:'改签' },
				{ key:'sell' , value:'售票' },
				{ key:'snack' , value:'小吃' },
				{ key:'vipTag' , value:'折扣卡' },
				];
				for(var i=0;i<card.length;i++){
					if(card[i].key===key){
						return card[i].value;
					}
				}
				return '';
		},
		classCard(key){
				var card=[
				{ key:'allowRefund' , value:'bl' },
				{ key:'endorse' , value:'bl' },
				{ key:'sell' , value:'or' },
				{ key:'snack' , value:'or' },
				{ key:'vipTag' , value:'or'},
				];
				for(var i=0;i<card.length;i++){
					if(card[i].key===key){
						return card[i].value;
					}
				}
				return '';
		}
	},
	methods: {
		handleToDetail(){  
						 console.log('nihao');
		},
		handleToScroll(pos){
			if(pos.y>30){
          this.pullDownMsg='正在更新中';
			}
		},
		handleToTouchEnd(pos){
         if(pos.y>30){
					 this.axios.get('/api/cinemaList?cityId=83').then((res) =>{
										 var msg =res.data.msg;
												if(msg === 'ok'){
													this.pullDownMsg='更新完成';
													setTimeout(()=>{
													  	this.cinemaList=res.data.data.cinemas;
														//	this.cinemaList=res.data.data.cinemaList;
															this.pullDownMsg='';
													},1000);
													}
									});	
				 }
		},
	}
}
</script>

<style scoped>
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
.cinema_body .pullDown{ padding: 0; margin: 0; border: none;}
</style>
