<template>
  <div>
    <div v-show="1==Index">

          <!-- <div class="home-img">
            <img src="../../assets/img//banner-1.jpg" alt="">
          </div> -->

          <div class="home-content">
            <div class="home-content-item">
              <h4 style="margin-top:15px">认证证书</h4>
              <div style="background:orange" class="area">橙色区域</div>
              <p>昨夜雨疏风骤浓睡不消残酒试问卷帘人<br>却道海棠依旧知否知否应是绿肥红瘦</p>
            </div>
            <div class="home-content-item">
              <h4 style="margin-top:15px">认证证书</h4>
              <div style="background:orange" class="area">橙色区域</div>
              <p>昨夜雨疏风骤浓睡不消残酒试问卷帘人<br>却道海棠依旧知否知否应是绿肥红瘦</p>
            </div>
            <div class="home-content-item">
              <h4 style="margin-top:15px">认证证书</h4>
              <div style="background:orange" class="area">橙色区域</div>
              <p>昨夜雨疏风骤浓睡不消残酒试问卷帘人<br>却道海棠依旧知否知否应是绿肥红瘦</p>
            </div>
            <div class="home-content-item">
              <h4 style="margin-top:15px">认证证书</h4>
              <div style="background:orange" class="area">橙色区域</div>
              <p>昨夜雨疏风骤浓睡不消残酒试问卷帘人<br>却道海棠依旧知否知否应是绿肥红瘦</p>
            </div>
            <div class="home-content-item">
              <h4 style="margin-top:15px">认证证书</h4>
              <div style="background:orange" class="area">橙色区域</div>
              <p>昨夜雨疏风骤浓睡不消残酒试问卷帘人<br>却道海棠依旧知否知否应是绿肥红瘦</p>
            </div>
            <div class="home-content-item">
              <h4 style="margin-top:15px">认证证书</h4>
              <div style="background:orange" class="area">橙色区域</div>
              <p>昨夜雨疏风骤浓睡不消残酒试问卷帘人<br>却道海棠依旧知否知否应是绿肥红瘦</p>
            </div>
          </div>
        </div>

        <div v-show=" 2 == Index" style="width:80%;margin:0 auto;">
          我是产品
        </div>
         <div v-show=" 3 == Index" style="width:80%;margin:0 auto;">
          我是解决方案
        </div>
         <div v-show=" 4 == Index" style="width:80%;margin:0 auto;">
          我是帮助与支持
        </div>
        <div v-show=" 5 == Index" style="width:80%;margin:0 auto;">
          我是客户案例
        </div>
</div>
</template>

<script>
export default {
  name: 'Category',
  props:{
    Index:''
 }
}
</script>

<style lang="scss" scoped>
.home-img {
  width: 1920px;
  height: 600px;
  background: skyblue;
  margin:0 auto;
  overflow: hidden;
}
.home-content {
  padding: 15px 0;
  box-sizing: border-box;
  display: flex;
  width: 80%;
  margin:0 auto;
  flex-wrap: wrap;
//   background: chocolate;
}
.home-content-item {
  // width: 30%;
  width:495px;
  height: 160px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 15px;
  border:1px solid #f4f4f5;
  box-shadow:3px 3px 6px .5px #888888;
}
.area {
  width: 100px;
  height: 30px;
  margin: 20px 0;
}


</style>
