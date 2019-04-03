<template>
  <LRStructMaster>

    <div slot="slotLeftTitle">
      <i class="el-icon-tickets"></i>
      <span>口令组区</span>
    </div>

<!--    <div slot="slotLeftRefresh">-->
<!--      <i class="el-icon-refresh"></i>-->
<!--      <a>刷新</a>-->
<!--    </div>-->

    <div slot="slotLeftInfo">
      <!--    左边菜单内容-->
    </div>

    <div slot="slotRightTitle">
      <i class="el-icon-service"></i>
      <span>口令区</span>
    </div>

    <div slot="slotRightInfo">
      <!--右边内容-->
    </div>
  </LRStructMaster>
</template>


<script>
  import LRStructMaster from '../../components/master/LRStructMaster'

  export default {
    data () {
      return {}
    },
    components: {
      LRStructMaster
    },
    created () {

    },
    methods: {},
    computed: {}
  }
</script>

