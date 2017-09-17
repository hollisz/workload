<template lang="html">
  <div @contextmenu="openMenu" @click="closeMenu" class="ctx-menu">
    <slot></slot>
    <div
    :style="ctxStyle"
     class="ctx-menu-content">
      <ul>
        <li v-for="item in items" @click="itemClick(item)">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CtxMenu',
  data: function() {
    return {
      menuTop: 0,
      menuLeft: 0,
      menuVisible: false
    }
  },
  props: ['items'],
  methods: {
    setPositionFromEvent(event) {
      const { pageX, pageY } = event;
      this.menuTop = pageY - (document.body.scrollTop);
      this.menuLeft = pageX;
    },
    openMenu: function(event) {
      
      console.log(this.items[0]);
      this.menuVisible = true;
      // debugger;
      this.setPositionFromEvent(event);
      event.preventDefault()
      event.stopPropagation()
      return false;
    },
    closeMenu: function(event) {
      this.menuVisible = false;
    },
    itemClick: function(item){
      console.log(item);
      this.$emit('menuclick',item);
    }
  },
  computed: {
    ctxStyle() {
     return {
       'display': this.menuVisible ? 'block' : 'none',
       'top': (this.menuTop || 0) + 'px',
       'left': (this.menuLeft || 0) + 'px'
     }
   }
  }
};
</script>


<style scoped>
.ctx-menu{
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.ctx-menu-content{
  /*margin: 5px 0;*/
  background-color: lightblue;
  border: 1px solid #d3dce6;
  box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.12);
  /*padding: 6px 0;*/
  /*z-index: 10;*/
  /*position: absolute;*/
  top: 0;
  left: 0;
  min-width: 100px;
  /*border: 1px solid gray;*/
  /*background-color: white;*/
  position: absolute;
  padding: 0px 0px;
  line-height: 24px;
}
.ctx-menu-content ul{
  list-style: none;
  padding: 0px 0px;
  margin: 0px;
}
.ctx-menu-content ul li{
  padding-left: 10px;
  padding-right: 10px;
}
.ctx-menu-content ul li:hover{
  /*background-color: gray;*/
  background-color: #e5e9f2;
  color: #475669;
}
</style>


