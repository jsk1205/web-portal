<template>
  <!-- 我的前台页面之 首页 -->
  <div class="home-wrapper">
    <div class="home-head">
      <div class="home-head-content">
        <div class="home-head-left">
          <img src alt class="home-head-bg" />
          <h3 style="margin-left:20px;font-size:20px">*****智能云</h3>
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
          <span>首页</span>
          <span>数据接口</span>
          <span>充值</span>
          <span>登录</span>
          <i style="margin-left:-20px">|</i>
          <span style="color:blue;margin-left:10px">免费注册</span>
        </div>
      </div>

      <div class="elTabs" style="margin-left:200px">
        <ul style="display:flex;margin-top:20px">
          <li>
            <a :class="{active : Index == 1}" @click="changeNav(1)">首页</a>
            <div v-if="Index == 1" class="line"></div>
          </li>
          <li >
            <a :class="{active : Index == 2}" @click="changeNav(2)">产品</a>
            <div v-if="Index == 2" class="line"></div>
          </li>
          <li>
            <a :class="{active : Index == 3}" @click="changeNav(3)">解决方案</a>
            <div v-if="Index == 3" class="line"></div>
          </li>
           <li>
            <a :class="{active : Index == 4}" @click="changeNav(4)">帮助与支持</a>
            <div v-if="Index == 4" class="line"></div>
          </li>
          <li>
            <a :class="{active : Index == 5}" @click="changeNav(5)">客户案例</a>
            <div v-if="Index == 5" class="line"></div>
          </li>
        </ul>
      </div>
    </div>
    

    <div >
        
     <Category :Index="Index"/>

    </div>

    <Floor/>
  </div>
</template>

<script>
import Category from '@/components/Category'
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
      Category,
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
  height: 120px;
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
  margin-top: 20px;
  display: flex;
  align-items: center;
  margin-left: 200px;
}

.home-head-bg {
  width: 50px;
  height: 50px;
  background: salmon;
}
.el-input {
  width: 300px;
  margin-top:20px;
  position: absolute;
  right: 650px;
}

.el-input__inner{
  margin-top:20px;
}
.home-head-right {
  margin-top:20px;
  position: absolute;
  right:200px;
  font-size: 18px;
}
.home-head-right>span {
  display: inline-block;
  width:80px;
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
</style>
