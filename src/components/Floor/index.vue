<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footerList">
        <div class="footerItem">
          <h4>数据来源</h4>
          <ul class="footerItemCon">
            <li>企业查</li>
            <li>铁路货运系统</li>
            <li>生活旅行/团购</li>
            <li>树茂网</li>
           
          </ul>
        </div>
        <div class="footerItem">
          <h4>帮助中心</h4>
          <ul class="footerItemCon">
            <li>注册/登录</li>
            <li>文档中心</li>
            
          </ul>
        </div>
        <div class="footerItem">
          <h4>关于我们</h4>
          <ul class="footerItemCon">
            <li>关于我们</li>
          
          </ul>
        </div>
        <div class="footerItem">
          <h4>联系方式</h4>
          <ul class="footerItemCon">
            <li>联系电话：8734993483</li>
            <li>联系地址：海淀区海淀大街1号</li>
            <li>服务时间：早9:00-晚18:00</li>
            <li>电子邮箱：mail@qq.com</li>
            
          </ul>
        </div>
      
      </div>
      <!-- <div class="copyright">
        <ul class="helpLink">
          <li>
            关于我们
            <span class="space"></span>
          </li>
          <li>
            联系我们
            <span class="space"></span>
          </li>
          <li>
            关于我们
            <span class="space"></span>
          </li>
          <li>
            商家入驻
            <span class="space"></span>
          </li>
          <li>
            营销中心
            <span class="space"></span>
          </li>
          <li>
            友情链接
            <span class="space"></span>
          </li>
          <li>
            关于我们
            <span class="space"></span>
          </li>
          <li>
            营销中心
            <span class="space"></span>
          </li>
          <li>
            友情链接
            <span class="space"></span>
          </li>
          <li>关于我们</li>
        </ul>
        <p>地址：北京市海淀区海淀大街1号</p>
        <p>京ICP备19006430号</p>
      </div> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Floor",
  
};
</script>

<style lang="less" scoped>
.footer {
  background-color: #eaeaea;
  width:1920px;
  position: fixed;
  bottom: 0;
  overflow: hidden;
  .footer-container {
    width: 1200px;
    margin: 0 auto;
    // padding: 0 15px;
    .footerList {
      margin: 0 auto;
      padding: 20px;
      border-bottom: 1px solid #e4e1e1;
      border-top: 1px solid #e4e1e1;
      overflow: hidden;
      // padding-left: 50px;
     

      .footerItem {
        width: 20%;
        float: left;
        margin:0 auto;
    
        h4 {
          font-size: 14px;
        }
        .footerItemCon {
          li {
            line-height: 18px;
          }
        }
        // &:last-child img {
        //   width: 121px;
        // }
      }
    }
    .copyright {
      padding: 20px;
      .helpLink {
        text-align: center;
        li {
          display: inline;
          .space {
            border-left: 1px solid #666;
            width: 1px;
            height: 13px;
            background: #666;
            margin: 8px 10px;
          }
        }
      }
      p {
        margin: 10px 0;
        text-align: center;
      }
    }
  }
}
</style>



