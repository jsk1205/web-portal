<template>
  <div class="accept-container">
    <!-- <el-button class="go-back" @click="getData">获取数据</el-button>
    <iframe
      style="width:100%;height:100%"
      id="show-iframe"
      frameborder="0"
      name="showHere"
      scrolling="auto"
      src="http://m0.mail.sina.com.cn/basic/"
    ></iframe> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "hello",
  data() {
    return {};
  },
  mounted() {
    const oIframe = document.getElementById("show-iframe");

    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    // oIframe.style.width = deviceWidth + "px";
    oIframe.style.height = deviceHeight + "px";
    var x = document.cookie;

let currentDoc = oIframe.contentWindow.document  

    console.log(oIframe);
  },
  methods: {
    getData() {
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      axios
        .post(
          "https://m0.mail.sina.com.cn/classic/index.php#action=maillist&fid=new&title=%25E6%2594%25B6%25E4%25BB%25B6%25E5%25A4%25B9&pagecount=0&pageno=1&order=htime&sorttype=desc&type=0&tag=-1",
          config
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
</style>