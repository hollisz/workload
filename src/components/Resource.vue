<template>
  <div class="resource">
    <div id="container">
              <div class="panel panel-default">
          <div class="panel-body">
      <div class="col-md-12">
            <div class="relativeContainer">
              <!-- Fixed Column for both scroller -->
              <div class="leftContainer">
                <!-- Fixed Column for horz scroller -->
                <div class="leftSBWrapper">
                  <div class="table-responsive">
                    <table>
                      <tr>
                        <th></th>
                      </tr>
                      <tr>
                        <th class="heading">Engineering Resources</th>
                      </tr>
                      <tr v-for="row in nonBorrowedPeople" v-bind:item="row" @click="reFreshPeople">
                        <th bgcolor="#428bca">{{ row.Name }}</th>
                      </tr>
                      <tr>
                        <th class="heading">Borrowed Resources</th>
                      </tr>
                      <tr v-for="row in borrowedPeople" v-bind:item="row" @click="reFreshPeople">
                        <th bgcolor="#428bca">{{ row.Name }}</th>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="rightContainer">
                <div class="topSBWrapper">
                  <table class="gridfixed table-responsive" width="1020px" align="left">
                    <tr>
                      <td class="dates tdfixed" v-for="col in Dates" v-bind:item="col">{{ col }}</td>
                    </tr>
                    <tr>
                      <td class="tdfixed" bgcolor="#b3d9ff" v-for="col in Days" v-bind:item="col">{{ col }}</td>
                    </tr>
                  </table>
                </div>
                <div class="SBWrapper">
                  <table class="table-responsive gridfixed" width="1020px">
                    <tr v-for="row in nonBorrowedPeople" v-bind:item="row" @click="reFreshPeople">
                      <td class="tdfixed" v-for="day in row.Days" :class="day.Class">
                        <div v-if="day.Class=='Billable'">{{ day.BilledHours }}</div>
                        <div v-if="day.Class=='scheduled' && day.ScheduledHours != 8">{{day.ScheduledHours}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="free tdfixed" v-for="col in Days"></td>
                    </tr>
                    <tr v-for="row in borrowedPeople" v-bind:item="row" @click="reFreshPeople">
                      <td class="tdfixed" v-for="day in row.Days" :class="day.Class">
                        {{ day.BilledHours }}/{{ day.ScheduledHours }}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div class="container">
              <br>
              <div class="well">
                <div class="text-center">
                  <button id="save" type="button" class="btn heading">Save</button>
                  <button id="cancel" type="button" class="btn weekend">Cancel</button>
                </div>
              </div>
            </div>
            <div class="text-left">
              <p>
                <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  <span class="glyphicon glyphicon-chevron-down"></span> Legend
                </a>
              </p>
            </div>
            <div class="collapse" id="collapseExample">
              <div class="card card-block">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <td class="billed">Billed</td>
                        <td class="holiday">Holiday</td>
                        <td class="dto">DTO</td>
                        <td class="nonbillable">Non-Billable</td>
                        <td class="supporttrain">Support/Training</td>
                        <td class="lentinternal">Lent Internal</td>
                      </tr>
                      <tr>
                        <td class="lentexternal">Lent External</td>
                        <td class="scheduled">Scheduled</td>
                        <td class="oh">OH</td>
                        <td class="weekend">Weekend</td>
                        <td class="free">Free</td>

                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

$(function () {
    $('.SBWrapper').scroll(function () {
        var rc = $(this).closest('.relativeContainer');
        var lfW = rc.find('.leftSBWrapper');
        var tpW = rc.find('.topSBWrapper');
        
        lfW.css('top', ($(this).scrollTop()*-1));
        tpW.css('left', ($(this).scrollLeft()*-1));        
    });
});

export default {
  name: 'child',
  props: {
    message: String,
    people: Array,
    borrowedPeople: Array,
    nonBorrowedPeople: Array,
    Dates: Array,
    Days: Array

  },
  data() {
    return {
      blueActive: true,
      dtoActive: true,
      classObject: {
        blueActive: true
      }
    }
  },
  filters: {

  },
  methods: {
    "scroll": function (){
    $('.SBWrapper').scroll(function () {
        console.log("asdf")
        var rc = $(this).closest('.relativeContainer');
        var lfW = rc.find('.leftSBWrapper');
        var tpW = rc.find('.topSBWrapper');
        
        lfW.css('top', ($(this).scrollTop()*-1));
        tpW.css('left', ($(this).scrollLeft()*-1));        
    });
    },
    "rankType": function rankType(val) {
      if (val == "Billed")
        return 10;
      if (val == "Holiday")
        return 9;
      if (val == "DTO")
        return 8;
      if (val == "Non-Billable")
        return 7;
      if (val == "Support/Training")
        return 6;
      if (val == "Lent Internal")
        return 5;
      if (val == "Lent External")
        return 4;
      if (val == "Scheduled")
        return 3;
      if (val == "OH")
        return 2;
      if (val == "Free")
        return 1;
    },
    "checkType": function checkType(oldVal, newVal) {
      if (this.rankType(newVal) >= this.rankType(oldVal))
        return newVal;
      else
        return oldVal;
    },
    "sumscheduled": function sumscheduled() {
      var sum = 0;
      var i = 0;

      for (; this.people[i];) {
        sum = sum + this.people[i].ScheduledHours;
        i++;
      }

      return sum;
    },
    "compare": function compare(a, b) {
      if (a.Name < b.Name)
        return -1;
      if (a.Name > b.Name)
        return 1;
      return 0;
    },
    "sortPeople": function sortPeople() {
      var arr = this.people;
      arr.sort(this.compare);

      return arr;
    },
    "reFreshPeople": function reFreshPeople(event) {
      var text = $(event.target).text();
      this.$emit('employeeClicked', text);
    }
  },
  computed: {
    "columns": function columns() {
      if (this.people.length == 0) {
        return [];
      }
      return Object.keys(this.people[0])
    },
    "hours": function hours (){
      var visibleHours = new Array;

      for(var i=0; i<this.row.Days.length; i++)
      {
        console.log("Huos:" + this.Days[i].BilledHours + " class:" + this.Days[i].Class)
        visibleHours.push({Hours: this.Days[i].BilledHours, Class: this.Days[i].Class});
      }
      
      return visibleHours;
      // <td class="tdfixed" v-for="day in row.Days" :class="day.Class">
      // return day.BilledHours;
  }
  },
  components: {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
  .b {
    font-family: 'Open Sans', sans-serif;
    font-size: 100%;
  }
  
  .dates {
    color: #cce6ff
  }
  
  .panel {
    background-color: #7d91a3;
  }
  
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  .dates {
    color: white;
    background-color: gray;
  }
  
  .heading {
    background-color: #0c3161;
    color: white;
  }
  
  .free {
    background-color: white;
  }
  
  .holiday {
    background-color: #FF0000;
  }
  
  .billablecommited {
    background-color: paleturquoise;
  }
  
  .billed {
    background-color: lightblue;
  }
  
  .scheduled {
    background-color: blue;
    color: white;
  }
  
  .dto {
    background-color: hotpink;
  }
  
  .nonbillable {
    background-color: tan;
  }
  
  .supporttrain {
    background-color: brown;
  }
  
  .lentinternal {
    background-color: green;
  }
  
  .lentexternal {
    background-color: orange;
  }
  
  .oh {
    background-color: yellow;
  }
  
  .weekend {
    background-color: #B5B5B5;
    color: #3B3C3E;
    font-size: 12px;
    font-weight: bold;
  }
  
  .btn {
    font-size: 100%;
    white-space: nowrap;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    text-align: left;
  }
  /*table {
    border-collapse: separate;
    border-spacing: 0;
    border-top: 1px solid grey;
    display: block;
    padding: 8px;
    font-family: 'Open Sans', sans-serif;
    font-size: 100%;
    white-space: nowrap;
    color: #142a75;
    font-size: 10px;
    font-weight: bold;
    text-align: left;
    white-space: nowrap;
  }
  
  td,
  th {
    vertical-align: top;
    border-top: 1px solid #ccc;
    padding: 10px;
    width: 100px;
  }
  
  .tablescroll {
    width: 800px;
    height: 500px;
    overflow-y: scroll;
    margin-left: 5em;
    overflow-x: scroll;
    padding: 0;
  }
  
  .tableContent {}
  
  .fix {
    position: absolute;
    top: auto;
  }
  
  .outer {
    position: relative;
  }
  
  .inner {
    overflow-x: scroll;
    overflow-y: scroll;
    width: auto;
    margin-left: 100px;
  }*/
  
  #container {
    margin: 0px;
    overflow: hidden;
    border: 0px solid pink;
  }
  
  table {
    border-collapse: separate;
    border-spacing: 5;
    border: 1px solid #ccc;
    font-family: 'Open Sans', sans-serif;
    font-size: 100%;
    white-space: nowrap;
    color: #142a75;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
  }
  
  td,
  th {
    vertical-align: top;
    border: 1px solid #ccc;
    padding: 5px;
    height: 40px;
  }
  
  .gridfixed {
    table-layout: fixed;
  }
  
  .tdfixed {
    padding: 0px;
    width: 50px;
  }
  
  .relativeContainer {
    position: relative;
    width: auto;
    height: 666px;
    overflow: hidden;
    border: 0px solid red;
  }
  
  .leftContainer {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 650px;
    width: auto;
    overflow: hidden;
    border: 0px solid blue;
  }
  
  .rightContainer {
    position: absolute;
    left: 130px;
    top: 0px;
    width: auto;
    height: 666px;
    overflow: hidden;
    border: 0px solid green;
  }
  
  .leftSBWrapper {
    position: relative;
    left: 0px;
    top: 0px;
    width: auto;
    z-index: 10;
  }
  
  .topSBWrapper {
    position: relative;
    width: 1000px;
    left: 0px;
    top: 0px;
    z-index: 10;
  }
  
  .SBWrapper {
    position: relative;
    width: 1000px;
    height: 580px;
    overflow: auto;
  }
</style>