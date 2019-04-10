<template>
  <div class="wrapper" >
    <headerPage></headerPage>
    <div class="bottom" >
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import headerPage from '../components/master/HeaderPage.vue'

  export default {
    components: {
      headerPage
    },
    computed: {},
    mounted () {
      this.load()
    },
    created(){

    },
    methods: {
      load () {

      }
    }
  }
</script>

<style >
  .bottom{
    background: none repeat scroll 0 0 #E9EEF3;
    position: absolute;
    padding: 10px 60px;
    top: 70px;
    right: 0;
    left: 0;
    bottom: 0;
    width: auto;
    box-sizing: border-box;
    overflow-y: hidden;
  }

  .spTitle{
    font-weight: bold;
  }

  .el-input{
    width: 200px;
  }

</style>
