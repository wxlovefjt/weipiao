<template>
  <div>
    <el-container>
        <el-header>微票影院后台管理,欢迎:{{ $store.state.user.name }}</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="1"  >
                        <el-menu-item index="1">
                            <i class="el-icon-user-solid"></i>
                            <router-link to="/admin/users" tag="span" slot="title" >用户管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="2" >
                            <i class="el-icon-video-camera-solid"></i>
                            <router-link to="/admin/movie" tag="span" slot="title" >电影管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="3"> 
                            <i class="el-icon-location-information"></i>
                            <router-link to="/admin/cinema" tag="span" slot="title" >影院管理</router-link>
                        </el-menu-item>
                        </el-menu>
                </el-aside>
                <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "admin",
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    axios.get("/api2/admin").then(res => {
      var status = res.data.status;
      console.log(status);
      if (status === 0) {
        next();
      } else {
        next("/mine/login");
      }
    });
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  padding-left: 60px;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
