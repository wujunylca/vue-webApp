<template>
	<div v-show="showFlag" class="food" transition="move" v-el:food>
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image" alt="">
				<div class="back" @click="hide">
					<span class="icon-arrow_lift"></span>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldprice">￥{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-wrapper">
				   <cartcontrol :food="food"></cartcontrol> 
			    </div>
			    <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0" transition="fade">加入购物车</div>
			</div>
			<split v-show="food.info"></split>
			<div class="info" v-show = "food.info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :rating="food.rating"></ratingselect>
				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar" class="avatar" width="12" height="12">
							</div>
							<div class="time">{{rating.rateTime}}</div>
							<div class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
							</div>
						</li>
					</ul>
					<div class="no-ratings" v-show="!food.ratings || !food.ratings.length"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text-ecmascript-6">
    import Vue from "vue";
    import BScroll from "better-scroll";
    import cartcontrol from "components/cartcontrol/cartcontrol"
    import split from "components/split/split"
    import ratingselect from "components/ratingselect/ratingselect.vue"

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
	export default{
		props:{
			food:{
				type: Object
			}
		},
		data(){
			return {
				showFlag: false,
				selectType:ALL,
				onlyContent: true,
				desc:{
					all:"全部",
					positive:"推荐",
                    negative:"吐槽"  
				}
			}
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$els.food,{
							click: true
						});
					}else{
						this.scroll.refresh();
					}
				})
			},
			hide() {
				this.showFlag = false;
			},
			addFirst(event) {
               if(!event._constructed){
               	 return ;
               }
               this.$dispatch("cart.add",event.target);
               Vue.set(this.food,"count",1)
			},
			needShow(type,text){
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType === ALL){
					return true;
				}else{
					return type === this.selectType;
				}
			}
		},
		events: {
           "ratingtype.select"(type){
           	 this.selectType = type;
           	 this.$nextTick(()=>{
 			 this.scroll.refresh();
           	 });	
           },
           "content.toggle"(onlyContent) {
               this.onlyContent = onlyContent;
               this.$nextTick(()=>{
               this.scroll.refresh();
               });
              
           }
		},
		components: {
            cartcontrol,
            split,
            ratingselect
		}
	};
</script>

<style lang="stylus" rel = "stylesheet/stylus">
	@import "../../common/stylus/min.styl"
	.food
	  position: fixed
	  left: 0
	  top: 0
	  bottom: 96px
	  z-index: 30
	  width: 100%
	  background: #fff
	  &.move-transition
	    transition: all 0.2s linear
	    transform: translate3d(0,0,0)
	  &.move-enter,&move-leave
	    transform: translate3d(100%,0,0)
	  .image-header
	    position: relative
	    width: 100%
	    height: 0
	    padding-top: 100%
	    img
	      position: absolute
	      top: 0
	      left: 0
	      width: 100%
	      height: 100%
	    .back
	      position: absolute
	      top: 20px
	      left: 0
	      .icon-arrow_lift
	        display: block
	        padding: 20px
	        font-size: 40px
	        color: #fff
	  .content
	    position: relative
	    padding: 36px
	    .title
	      line-height: 28px
	      margin-bottom: 16px
	      font-size: 28px
	      font-weight: 700
	      color: rgb(7,17,27)
	    .detail
	      margin-bottom: 36px
	      line-height: 20px
	      height: 20px
	      font-size: 0
	      .sell-count,.rating
	        font-size: 20px
	        color:rgb(147,153,159)
	      .sell-count
	        margin-right: 24px
	    .price
	      font-weight: 700
	      line-height: 48px
	      .now
	        margin-right: 36px
	        font-size: 28px
	        color: rgb(240,20,20)
	      .old
	        text-decoration: line-through
	        font-size: 20px
	        color: rgb(147,153,159)
	    .cartcontrol-wrapper
	      position: absolute
	      right: 24px
	      bottom: 24px
	    .buy
		    position: absolute
		    right: 36px
		    bottom: 36px
		    z-index: 20
		    height: 48px
		    line-height: 48px
		    padding: 0 24px
		    box-sizing: border-box
		    border-radius: 24px
		    font-size: 20px
		    color: #fff
		    background: rgb(0,160,220)
		    &.fade-transition
		      transition: all 0.2s
		      opacity: 1
		    &.fade-enter,&.fade-leave
		      opacity: 0
	  .info
	    padding: 36px
	    .title
	      line-height: 28px
	      margin-bottom: 12px
	      font-size: 28px
	      color: rgb(7,17,27)
	    .text
	      line-height: 48px
	      padding: 0 16px
	      font-size: 24px
	      color: rgb(77,85,93)
	  .rating
	    padding-top: 36px
	    .title
	      line-height: 28px
	      margin-left: 36px
	      font-size: 28px
	      color: rgb(7,17,27)
	    .rating-wrapper
	    	padding: 0 36px
	    	.rating-item
		    	position: relative
		    	padding: 32px 0
		    	border-1px(rgba(7,17,27,0.1))
		    	.user
		    		position: absolute
		    		right:0
		    		top:32px
		    		line-height:24px
		    		font-size:0
		    		.name
		    			display:inline-block
		    			margin-right: 12px
		    			vertical-align:top
		    			font-size: 20px
		    			color:rgb(147,153,159)
		    		.avatar
		    			border-radius: 50%
		    	.time
		    		line-height: 24px
		    		margin-bottom:12px
		    		font-size: 20px
		    		color: rgb(147,153,159)
		    	.text
		    		line-height:32px
		    		font-size: 24px
		    		color:rgb(7,17,27)
		    		.icon-thumb_up,.icon-thumb_down
		    			line-height: 48px
		    			margin-right: 8px
		    			font-size:24px
		    		.icon-thumb_up
		    			color:rgb(0,160,220)
		    		.icon-thumb_down
		    			color: rgb(147,153,159)	

</style>