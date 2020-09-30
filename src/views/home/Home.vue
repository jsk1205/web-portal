<template>
  <!-- 我的前台页面之 首页 -->
  <div class="home-wrapper">

    <div class="home-head">
      <div class="home-head-content">
        <div class="home-head-left">
          <img src="../../assets/img/logo.png" alt class="home-head-bg" />
          <!-- <h3 style="margin-left:20px;font-size:20px">*****智能云</h3> -->
        </div>

        <el-input
          placeholder="搜索"
          v-model="input"
          size="small"
          clearable
          class="input-with-select"
          suffix-icon="el-icon-search"
          
        >
          <el-button type="primary" icon="el-icon-search" >搜索</el-button>
        </el-input>

        <div class="home-head-right">
          <span style="color:#656565;height:19px">登录</span>
          <i class="line">|</i>
          <span style="color:#00AFEF;height:19px">注册</span>
        </div>
      </div>

      <div class="elTabs" style="margin-left:358px">
        <ul style="display:flex;margin-top:20px">
          <li>
            <a :class="{active : Index == 1}" @click="changeNav(1)">首页</a>
            <div v-if="Index == 1" class="line"></div>
          </li>
          <li >
            <a :class="{active : Index == 2}" @click="changeNav(2)">产品技术</a>
            <div v-if="Index == 2" class="line"></div>
          </li>
          <li>
            <a :class="{active : Index == 3}" @click="changeNav(3)">解决方案</a>
            <div v-if="Index == 3" class="line"></div>
          </li>
           <li>
            <a :class="{active : Index == 4}" @click="changeNav(4)">客户案例</a>
            <div v-if="Index == 4" class="line"></div>
          </li>
          <li>
            <a :class="{active : Index == 5}" @click="changeNav(5)">关于我们</a>
            <div v-if="Index == 5" class="line"></div>
          </li>
        </ul>
      </div>

    
    </div>
    

    <div class="home-content">
        
      <div class="home-content-banners">
        <img src="../../assets/img//banner-1.jpg" alt="">
      </div>

      <div class="home-content-us">
       
          
          <img src="../../assets/img/企业图片.jpg" alt="" class="home-content-img">
          <div>
            <div class="home-content-title">
              <span class="txtUS">关于我们</span>
              <span class="txtUP">ABOUT US</span>
            </div>
            <div class="us">
              <p class="usOne">公司前身：成立于2003年的北京同方瑞和科技发展有限公司，多年来不断进行自主版权企业信息化管理平台、电子支付系统、物流仓储运输系统、办公自动化系统、电子档案系统、PDF电子文档应用系统的开发与研究，以优秀的解决
方案、服务品质，十多年来获得行业用户良好口碑 </p>
            <p class="usTwo">利用区块链、人工智能和大数据技术聚集科技金融、资产数字化等领域的创新产业和解决方案，致力于成为数字经济时代的优秀科技企业 </p>
            <p class="usThree">公司创新科技发源于硅谷，由著名华人科学家及国内行业资深人士联合创建</p>
            <p class="usFour">公司与北大经济学院深度合作确保金融领域专业性</p>
            </div>
          </div>
     
      </div>
     <!-- <Category :Index="Index"/> -->
    
    </div>

      <Floor/>
  </div>
</template>

<script>
// import Category from '@/components/Category'
import Floor from '@/components/Floor'
export default {
  name: "Home",
  data() {
    return {
      input: "",
      Index:1,
    };

  },
  components:{
      // Category,
      Floor
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
   //导航切换
   changeNav(index){
  
    this.Index=index
   }
  }
};
</script>

<style lang="scss" scoped>
.home-wrapper {
  height: 100%;
  width: 1920px;
}
.home-head {
  height: 130px;
  width: 1920px;
  margin: 0 auto;
  overflow: hidden;
  background: #fff;
}
.home-head-content {
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.home-head-left {
  margin-top: 16px;
  display: flex;
  align-items: center;
  margin-left: 360px;
}

.home-head-bg {
  width: 335px;
  height: 48px;
  // background: salmon;
}
.el-input {
  width: 200px;
  height: 38px;
  margin-top:21px;
  position: absolute;
  right: 514px;
}

.el-input__inner{
  margin-top:20px;
}
.home-head-right {
  margin-top:30px;
  position: absolute;
  right:359px;
  // font-size: 20px;

  
}
.home-head-right>span {
  display: inline-block;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 400;
}
.line{
  display: inline-block;
  width:2px;
  height: 20px;
  border-radius: 1px;
  margin:0 17px;
}
.active{
  color: rgba(233,100,99,1);
}
.elTabs ul li{
  margin: 0 20px;
  // width:90px;
  // background: chocolate;
}
.elTabs ul li a{
  display: inline-block;
  font-size: 18px;
}
// 图片
.home--content-banners{
  width:1920px;
  height: 600px;
  overflow: hidden;
}
.home-content-banners img{
  width:100%;
  height: 100%;
}
.home-content-us{
  display: flex;
  background: #F9F9FD;
}
.home-content-img{
  display: block;
  width:482px;
  height: 530px;
  margin:120px 80px 120px 370px;
}
.home-content-title{
  margin:173px 604px 48px 0;
}
.home-content-title>span{
  display: block;
  text-align: center;
}
.txtUS{
    // width:156px;
  height: 38px;  
  font-size: 40px;
  font-family: PingFang SC;
  font-weight: 800;
  color: #192238;
}
.txtUP{
  // width: 84px;
  height: 12px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 800;
  color: #192238;
  opacity: 0.8;
  margin-top:36px;
}
.us{
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 34px;
  font-size: 18px;
  color: #414365;
}
.usOne{
  width:618px;
  height: 121px;
  color: #1c1d20;
}
.usTwo{
  width: 611px;
  height: 53px;
  margin:31px 0 32px 0;
}
.usThree{
  // width: 593px;
  height: 19px;

}
.usFour{
  // width: 395px;
  height: 18px;
  margin-top:31px;
}
</style>
