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
    padding: 20px 60px ;
    right: 8px;
    left: 8px;
    bottom: 2px;
    width: auto;
    box-sizing: border-box;
    overflow-y: hidden;
    height: calc(100vh - 70px);
  }

</style>
