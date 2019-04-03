<template>
  <el-container class="elcontainer_lrStruct">
    <div class="divLeft">
      <div class="divLeftTop">
        <div>
<!--          <i class="el-icon-tickets"></i>-->
<!--          <span>脚本区</span>-->
          <slot name="slotLeftTitle"></slot>
        </div>
        <div>
          <slot name="slotLeftRefresh"></slot>
<!--          <i class="el-icon-refresh"></i>-->
<!--          <a>刷新</a>-->
        </div>
      </div>
      <el-aside width="100%" style="height: 98%;">
        <slot name="slotLeftInfo"></slot>
      </el-aside>
    </div>
    <div class="divRight">
      <div>
        <slot name="slotRightTitle"></slot>
<!--        <i class="el-icon-service"></i>-->
<!--        <span>计划任务区</span>-->
      </div>
      <el-main width="100%" style="height: 98%">
          <slot name="slotRightInfo"></slot>
      </el-main>
    </div>
  </el-container>
</template>


<style>
  .elcontainer_lrStruct {
    margin-top: -10px;
    height: 100%
  }

  .elcontainer_lrStruct:nth-child(5) .el-aside,
  .elcontainer_lrStruct:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .elcontainer_lrStruct:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .elcontainer_lrStruct .divLeft {
    width: 280px;
    position: relative;
  }

  .elcontainer_lrStruct .divLeftTop {
    justify-content: space-between;
    display: flex
  }

  .elcontainer_lrStruct .divRight {
    margin-left: 20px;
    width: 100%;
  }

  .elcontainer_lrStruct .divRightTop {
    margin-top: -20px;
    height: 41px;
    border-bottom: 1px solid #e5e9f2;
    display: flex;
    justify-content: space-between
  }

  .elcontainer_lrStruct .divRightInfo {
    display: flex;
    justify-content: space-between;
    /*background-color: #E9EEF3;*/
    margin-top: 8px;
    padding: 15px 0 15px 20px;
  }

  .elcontainer_lrStruct .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    margin-top: 10px;
    padding: 10px;
  }

  .elcontainer_lrStruct .el-main {
    background-color: white;
    color: #333;
    /*text-align: center;*/
    width: auto;
    margin-top: 10px;
    position: relative;
  }
</style>
