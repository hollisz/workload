<template>
<div id="demo" v-on:contextmenu="openMenu">
     <h1 class="center">
      Right click anywhere to bring up a menu.
    </h1>
    <ul id="right-click-menu" tabindex="-1" v-el="right" v-if="viewMenu" v-on:blur="closeMenu"  v-style="top:top, left:left">
        <li>First list item</li>
        <li>Second list item</li>
    </ul>
</div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'demo',
  props: {
    Billed: Number
  },
  data() {
    return {
        viewMenu: false,
        top: '0px',
        left: '0px'
    }
  },
  methods: {
        setMenu: function(top, left) {
          
            //largestHeight = window.innerHeight - this.$$.right.offsetHeight - 25;
            //largestWidth = window.innerWidth - this.$$.right.offsetWidth - 25;

            if (top > largestHeight) top = largestHeight;

            if (left > largestWidth) left = largestWidth;

            this.top = top + 'px';
            this.left = left + 'px';
        },

        closeMenu: function() {
            this.viewMenu = false;
        },

        openMenu: function(e) {
            this.viewMenu = true;

            Vue.nextTick(function() {
                this.$$.right.focus();
                this.setMenu(e.y, e.x)
            }.bind(this));
            e.preventDefault();
        }
  },
  computed: {
    
}
}
</script>


<style scoped>
body {
    width: 100%;
    height: 100%;
}

h1 {
  font-size: 3em;
}

.center {
  text-align: center;
}

#demo {
    width: 100%;
    height: 100%;
}

#right-click-menu{
    background: #FAFAFA;
    border: 1px solid #BDBDBD;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 250px;
    z-index: 999999;
}

#right-click-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 35px;
}

#right-click-menu li:last-child {
    border-bottom: none;
}

#right-click-menu li:hover {
    background: #1E88E5;
    color: #FAFAFA;
}


</style>


// new Vue({
//     el: '#demo',

//     data: {
//         viewMenu: false,
//         top: '0px',
//         left: '0px'
//     },

//     methods: {
//         setMenu: function(top, left) {
          
//             largestHeight = window.innerHeight - this.$$.right.offsetHeight - 25;
//             largestWidth = window.innerWidth - this.$$.right.offsetWidth - 25;

//             if (top > largestHeight) top = largestHeight;

//             if (left > largestWidth) left = largestWidth;

//             this.top = top + 'px';
//             this.left = left + 'px';
//         },

//         closeMenu: function() {
//             this.viewMenu = false;
//         },

//         openMenu: function(e) {
//             this.viewMenu = true;

//             Vue.nextTick(function() {
//                 this.$$.right.focus();

//                 this.setMenu(e.y, e.x)
//             }.bind(this));
//             e.preventDefault();
//         }
//     }
// })

// body {
//     width: 100%;
//     height: 100%;
// }

// h1 {
//   font-size: 3em;
// }

// .center {
//   text-align: center;
// }

// #demo {
//     width: 100%;
//     height: 100%;
// }

// #right-click-menu{
//     background: #FAFAFA;
//     border: 1px solid #BDBDBD;
//     box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
//     display: block;
//     list-style: none;
//     margin: 0;
//     padding: 0;
//     position: absolute;
//     width: 250px;
//     z-index: 999999;
// }

// #right-click-menu li {
//     border-bottom: 1px solid #E0E0E0;
//     margin: 0;
//     padding: 5px 35px;
// }

// #right-click-menu li:last-child {
//     border-bottom: none;
// }

// #right-click-menu li:hover {
//     background: #1E88E5;
//     color: #FAFAFA;
// }

