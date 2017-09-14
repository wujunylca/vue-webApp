<template>
    <div class="header">
      <div class="content-wrapper">
         <div class="avater">
             <img width="128" height="128" :src="seller.avatar">
         </div>
         <div class="content">
           <div class="title">
             <span class="brand"></span>
             <span class="name">{{seller.name}}</span>
           </div>
           <div class="description">
             {{seller.description}}/{{seller.deliveryTime}}分钟送达
           </div>
            <div  v-if="seller.supports" class="support" >
              <span class="icon" :class="classMap[seller.supports[0].type]"></span>
              <span class="text">{{seller.supports[0].description}}</span>
           </div>  
         </div>
         <div v-if="seller.supports" class="support-count" v-on:click="showDetail">
           <span class="count">{{seller.supports.length}}个</span>
           <i class="icon-keyboard_arrow_right"></i>
         </div>
      </div>
      <div class="bulletin-wrapper" v-on:click="showDetail">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
        <img :src="seller.avatar" width='100%' height="100%" >
      </div>
      <div v-show="detailShow" class="detail" transition="fade">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                <span class="text">{{seller.supports[$index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
	</div>
</template>

<script type="text-ecmascript-6">
  import star from "components/star/star.vue"
  export default {
     props: {
       seller: {
         type: Object
       }
     },
     data(){
       return{
         detailShow: false
       }
     },
     methods:{
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
     },
     created() {
       this.classMap=["decrease","discount","special","invoice","guarantee"]
     },
     components: {
       star
     }

  };
</script>

<style lang="stylus" rel = "stylesheet/stylus">
@import "../../common/stylus/min.styl"
.header
  position:relative
  overflow:hidden
  color:#fff
  background: rgba(7,17,27,0.5)
  .content-wrapper
    position:relative
    padding: 48px 24px 36px 48px
    font-size: 0
    .avater
      display:inline-block
      vertical-align: top
      img
        border-radius: 4px
    .content
      display:inline-block
      margin-left: 32px
      font-size: 28px
      .title
        margin: 4px 0 16px 0
        .brand
          display: inline-block
          vertical-align: top
          width: 60px
          height: 36px
          bg-image("brand")
          background-size:60px 36px
          background-repeat: no-repeat
        .name
          margin-left: 12px
          font-size: 32px
          line-height:36px
          font-weight:bold
        
      .description
        margin-bottom:20px
        line-height:24px
        font-size: 24px
      .support
        .icon
          display: inline-block
          width: 24px 
          height: 24px
          margin-right: 8px
          background-size: 24px 24px
          background-repeat: no-repeat
          &.decrease
            bg-image("decrease_1")
          &.discount
            bg-image("discount_1")
          &.guarantee
            bg-image("guarantee_1")
          &.invoice
            bg-image("invoice_1")
          &.special
            bg-image("special_1")

        .text
         vertical-align: top
         line-height: 24px
         font-size: 20px
    .support-count
      position: absolute
      right: 24px
      bottom:22px
      padding: 14px 16px
      height: 24px
      line-height: 24px
      border-radius: 28px
      background: rgba(0,0,0,0.2)
      text-align: center
      .count 
        vertical-align:top
        font-size: 20px
      .icon-keyboard_arrow_right
        margin-left:4px
        line-height: 24px
        font-size: 20px
  .bulletin-wrapper
    position:relative

    height: 56px
    line-height 56px
    padding: 0 44px 0 24px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background: rgba(7,17,27,0.2)
    .bulletin-title
      display: inline-block
      vertical-align:top
      width: 44px
      height: 24px
      margin-top: 14px
      bg-image("bulletin")
      background-size: 44px 24px
      background-repeat:no-repeat
    .bulletin-text
      margin:0 8px
      font-size:20px 
      vertical-align: top
    .icon-keyboard_arrow_right
       position:absolute
       right: 12px
       top:16px
       font-size: 20px
  .background 
    position:absolute
    top:0
    left:0
    width:100%
    height:100%;
    z-index:-1
    filter:blur(20px)
  .detail
    position:fixed
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    transition: all 0.5s
    backdrop-filter:blur(10px);
    &.fade-transition
      opacity: 1
      background: rgba(7,17,27,0.8)
    &.fade-enter,&.fade-leave
      opacity: 0
      background: rgba(7,17,27,0)
    .detail-wrapper
      min-height: 100%
      width:100%
      .detail-main
        margin-top: 128px
        padding-bottom: 128px
        .name
          line-height: 32px
          text-align: center
          font-size: 16px
          font-weight:700
        .star-wrapper
          margin-top: 36px
          padding: 4px 0
          text-align: center
        .title 
          display: flex
          width: 80%
          margin: 56px auto 48px auto
          .line 
            flex: 1
            position: relative
            top:-6px
            border-bottom: 1px solid rgba(255,255,255,0.2)
          .text
            padding: 0 24px 
            font-weight:700
            font-size: 14px
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding: 0 24px
            margin-bottom: 24px
            font-size: 0
            &:last-child
             margin-bottom: 0
            .icon
              display: inline-block
              width: 32px
              height: 32px
              vertical-align: top
              margin-right: 12px
              background-size: 32px 32px
              background-repeat: no-repeat
              &.decrease
                bg-image("decrease_1")
              &.discount
                bg-image("discount_1")
              &.guarantee
                bg-image("guarantee_1")
              &.invoice
                bg-image("invoice_1")
              &.special
                bg-image("special_1")
            .text
              font-size: 24px
              line-height:32px  
        .bulletin
          width: 80%
          margin: 0 auto
          padding: 0 24px
          line-height: 48px
          font-size: 24px
    .detail-close
      position: relative
      width: 64px
      height:64px
      margin: -128px auto  0 auto
      clear: both
      font-size: 64px 
</style>