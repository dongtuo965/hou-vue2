<template>
  <div>

    <el-container>
<!--      头部-->
      <el-header style="display: flex;justify-content: space-between;align-items: center">
        <div >商品后台管理系统</div>
      </el-header>
      <el-container>
<!--        侧边栏-->
        <el-aside width="200px">
          <el-menu
              style="width: 200px"
              :default-active="$route.path" exact
              class="el-menu-vertical-demo"
              background-color="#222D3B"
              :collapse-transition=false
              text-color="#fff"
              active-text-color="#ffd04b" router>
            <el-menu-item index="/facilitymanager">
              <i class="el-icon-s-platform"></i>
              <span slot="title">设备管理</span>
            </el-menu-item>
            <el-menu-item index="/usermanages">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">444</span>
              </template>
            </el-menu-item>
            <el-submenu index="/taskmanages">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>任务管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/taskmanages/urgenttask">紧急任务</el-menu-item>
                <el-menu-item index="/taskmanages/commontask">普通任务</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="/center">
              <i class="el-icon-s-home"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
<!--        内容部分-->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'Layout',
  data () {
    return {

    }
  }
}
</script>
<style scoped lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    //min-height: 400px;
  }
  
  .layout {
    width: 100%;
    height: 100%;
  }
  
  .el-container.is-vertical {
    height: 100%;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-header {
    background-color: #253043;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    height: 100vh;
    background: #222D3B;
    overflow: hidden !important;
  }
  
  </style>