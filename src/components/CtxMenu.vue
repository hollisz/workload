<template lang="html">
  <div @contextmenu="openMenu" @click="closeMenu" class="ctx-menu">
    <slot></slot>
    <div :style="ctxStyle" class="ctx-menu-content">
      <!--<ul>
        <li v-for="item in items" @click="itemClick(item)">{{ item }}</li>
      </ul>-->

      <ul>
        <li>
          <a href="">Resources <span class="glyphicon glyphicon-menu-right"></span></a>
          <ul>
            <li class="secondlevel" v-for="item in NonBorrowed" @click="itemClick(item)">{{ item }}</li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          <a href="">Borrowed <span class="glyphicon glyphicon-menu-right"></span></a>
          <ul>
            <li class="secondlevel" v-for="item in Borrowed" @click="itemClick(item)">{{ item }}</li>
          </ul>
        </li>
      </ul>
      <!--<li>
        <a href="">Borrowed</a>
        
          <li>
            <a href="">Sara</a>
          </li>
          <li>
            <a href="">Lee</a>
          </li>
        
      </li>-->
      <!-- etc. -->


    </div>
  </div>
</template>

<script>
export default {
  name: 'CtxMenu',
  props: {
    Borrowed: Array,
    NonBorrowed: Array
  },
  data: function() {
    return {
      menuTop: 0,
      menuLeft: 0,
      menuVisible: false
    }
  },
  methods: {
    setPositionFromEvent(event) {
      const { pageX, pageY } = event;
      this.menuTop = pageY - (document.body.scrollTop);
      this.menuLeft = pageX;

      console.log("Menu:" + this.menuTop + " " + this.menuLeft);
    },
    openMenu: function(event) {
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
  ul {
    padding: 0;
    margin: 0;
  }
  
  li {
    position: relative;
    background-color: red;
  }
  
  ul li {
    position: relative;
    background-color: darkgrey;
    border: 1px solid #d3dce6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .12);
    width: 100px;
  }
  
  ul ul {
    position: absolute;
    display: none;
  }
  
  li:hover ul {
    display: block;
  }
  
  .secondlevel {
    left: 90%;
  }
  
  .ctx-menu {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Chrome/Safari/Opera */
    -khtml-user-select: none;
    /* Konqueror */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
  }
  
  .ctx-menu-content {
    /*margin: 5px 0;*/
    background-color: black;
    border: 1px solid #d3dce6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .12);
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
    font-size: 10px;
  }
  
  .ctx-menu-content ul {
    list-style: none;
    padding: 0px 0px;
    margin: 0px;
  }
  
  .ctx-menu-content ul li {
    padding-left: 10px;
    padding-right: 10px;
  }
  
  .ctx-menu-content ul li:hover {
    /*background-color: gray;*/
    background-color: #e5e9f2;
    color: #475669;
  }
  
  .dropdown-submenu {
    position: relative;
  }
  
  .dropdown-submenu>.dropdown-menu {
    top: 0;
    left: 100%;
    margin-top: -6px;
    margin-left: -1px;
    -webkit-border-radius: 0 6px 6px 6px;
    -moz-border-radius: 0 6px 6px;
    border-radius: 0 6px 6px 6px;
  }
  
  .dropdown-submenu:hover>.dropdown-menu {
    display: block;
  }
  
  .dropdown-submenu>a:after {
    display: block;
    content: " ";
    float: right;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 5px 0 5px 5px;
    border-left-color: #ccc;
    margin-top: 5px;
    margin-right: -10px;
  }
  
  .dropdown-submenu:hover>a:after {
    border-left-color: #fff;
  }
  
  .dropdown-submenu.pull-left {
    float: none;
  }
  
  .dropdown-submenu.pull-left>.dropdown-menu {
    left: -100%;
    margin-left: 10px;
    -webkit-border-radius: 6px 0 6px 6px;
    -moz-border-radius: 6px 0 6px 6px;
    border-radius: 6px 0 6px 6px;
  }
</style>