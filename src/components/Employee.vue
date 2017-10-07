<template>
  <div class="employee">
    <div class="container">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <div class="row">
            <div class="col-md-3">
              <h4>{{Name}}</h4>
            </div>
            <div class="col-md-5">
              <h5>Total Hours: {{totalHours}} Minus OH: {{minusOH}}</h5>
            </div>
          </div>
        </div>
        <CtxMenu v-bind:items="Resources" v-on:menuclick="gotEvent">
          <div class="table-responsive tableContent">
            <table class="table table-bordered table-fit">
              <thead>
                <tr bgcolor="#bgbgbg">
                  <th></th>
                  <th v-for="col in columns" v-bind:item="col">{{col}}</th>
                </tr>
              </thead>
              <tbody>
                <tr :class="row.Style" v-for="row in Tasks" v-bind:item="row" v-on:click="hideStuff">
                  <td><input id="checkBox" type="checkbox" v-bind:value="check(row)" v-model="checkedTasks"></td>
                  <td v-for="col in columns" v-bind:item="col">{{row[col]}}</td>
                </tr>
              </tbody>
            </table>
            <div class="text-center">
              <button id="reassign" type="button" class="btn btn-primary" @click="showModal">Re-Assign</button>
            </div>
            <div id="myModal" class="modal">
              <!-- Modal content -->
              <div class="modal-content">
                <div class="modal-header">
                  <span class="close">&times;</span>
                  <h2>Modal Header</h2>
                </div>
                <div class="modal-body">
                  <p>Some text in the Modal Body</p>
                  <p>Some other text...</p>
                  <button id="reassign" type="button" class="btn btn-primary" @click="hideModal">Close</button>
                </div>
                <div class="modal-footer">
                  <h3>Modal Footer</h3>
                </div>
              </div>

            </div>
          </div>
        </CtxMenu>
      </div>
    </div>
  </div>
</template>

<script>

import CtxMenu from './CtxMenu'

export default {
  name: 'employee',
  props: {
    Name: String,
    Tasks: Array,
    Resources: Array
  },
  data() {
    return {
      checkedTasks: []
    }
  },
  updated: function () {
    console.log("Updated");
        this.hideStuff(); 
    },
  methods: {
    "check": function check(row) {
      return row["ID"]
    },
    "gotEvent": function gotEvent(stuff)
    {
 
      this.$emit('reassign', this.checkedTasks, stuff);

    },
    "hideStuff": function hideStuff() {
        
        var hideTd; 
        var hideTh;

        hideTd= $("td[item='Borrowed']");
        hideTh = $("th[item='Borrowed']");
        hideTd.hide();
        hideTh.hide();
        hideTd= $("td[item='Name']");
        hideTh = $("th[item='Name']");
        hideTd.hide();
        hideTh.hide();
        hideTd= $("td[item='Date']");
        hideTh = $("th[item='Date']");
        hideTd.hide();
        hideTh.hide();
        hideTd= $("td[item='Type']");
        hideTh = $("th[item='Type']");
        hideTd.hide();
        hideTh.hide();
        hideTd= $("td[item='ID']");
        hideTh = $("th[item='ID']");
        hideTd.hide();
        hideTh.hide();
        hideTd= $("td[item='ProjectAccept']");
        hideTh = $("th[item='ProjectAccept']");
        hideTd.hide();
        hideTh.hide();
        hideTd= $("td[item='Lent']");
        hideTh = $("th[item='Lent']");
        hideTd.hide();
        hideTh.hide();
        hideTd= $("td[item='Style']");
        hideTh = $("th[item='Style']");
        hideTd.hide();
        hideTh.hide();
    },
    "showModal": function() {
        $("#myModal").show();
    },
    "hideModal": function() {
        $("#myModal").hide();
    }
  },
  filters: {
      
  },
  computed: {
      "rightClick": function rightClick() {
        var names = [];

        for(var i=0; i<this.Tasks.length; i++)
        {
          names.push(this.Tasks[i].Name);
          console.log("pusj " + this.Tasks[i].Name);
        } 
        
        return names;
      },
    "columns": function columns() {
      var arr = this.Tasks;
      //arr.splice(0,1);

      if (this.Tasks.length == 0) {
        return [];
      }

      return Object.keys(this.Tasks[0])
    },
    "totalHours": function totalHours() {
       var sum = 0;
        var i = 0;

      for (; this.Tasks[i];) {
        sum = sum + this.Tasks[i].ScheduledHours;
        i++;
      }

      return sum;
    },
    "minusOH": function minusOH() {
       var sum = 0;
        var i = 0;

      for (; this.Tasks[i];) {
        sum = sum + this.Tasks[i].ScheduledHours;
        if(this.Tasks[i].Status == "OH")  
          sum = sum - this.Tasks[i].ScheduledHours;
        i++;
      }

      return sum;
    }
  },
  components: {
    CtxMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
  .tableContent {
    display: block;
    padding: 8px;
    font-family: 'Open Sans', sans-serif;
    font-size: 100%;
    white-space: nowrap;
    color: #3B3C3E;
    font-size: 10px;
    font-weight: bold;
    text-align: left;
  }
  
  .blue {
    background-color: #0066FF;
    color: blue;
    font-weight: bold;
    display: none;
  }
  
  .DTO {
    border: solid;
    border-color: green;
  }
  
  .Holiday {
    border: solid;
    border-color: green;
  }
  
  .atrisk {
    border: solid;
    border-color: red;
  }
  
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  .ContextItem {
    background-color: White;
    color: Black;
    font-weight: normal;
  }
  
  .ContextItem:hover {
    background-color: #0066FF;
    color: White;
    font-weight: bold;
  }
  
  .detailItem {
    background: transparant;
  }
  
  .detailItem:hover {
    background-color: #FEE378;
    border: 1px outset #222222;
    font-weight: bold;
    cursor: default;
  }
  
  .modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    padding-top: 100px;
    /* Location of the box */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
  }
  /* Modal Content */
  
  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
  }
  /* Add Animation */
  
  @-webkit-keyframes animatetop {
    from {
      top: -300px;
      opacity: 0
    }
    to {
      top: 0;
      opacity: 1
    }
  }
  
  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0
    }
    to {
      top: 0;
      opacity: 1
    }
  }
  /* The Close Button */
  
  .close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  
  .modal-header {
    padding: 2px 16px;
    background-color: blue;
    color: white;
  }
  
  .modal-body {
    padding: 2px 16px;
  }
  
  .modal-footer {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
  }
</style>