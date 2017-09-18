<template>
  <div class="child">
    <div class="container">
      <div class="DivToScroll">
        <div class="DivWithScroll">
          <div class="row">
            <div class="text-right">
              <p>
                <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  <span class="glyphicon glyphicon-chevron-down"></span> Region <br>
                </a>
              </p>
            </div>
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <td>July 2017</td>
                      <td v-for="col in Dates" v-bind:item="col">{{ col }}</td>
                    </tr>
                    <tr bgcolor="#b3d9ff">
                      <th></th>
                      <td v-for="col in Days" v-bind:item="col">{{ col }}</td>
                    </tr>
                    <tr>
                      <th bgcolor="#00FF00">Engineering Resources</th>
                      <td v-for="col in Days"></td>
                    </tr>
                  </thead>
                   <tbody>
                    <tr v-for="row in nonBorrowedPeople" v-bind:item="row" @click="reFreshPeople">
                      <td  bgcolor="#6699ff">{{ row.Name }}</td>
                      <td v-for="day in row.Days" :class="day.Class">
                        {{ day.Hours }}
                      </td>
                    </tr>
                     <tr>
                      <th bgcolor="#00FF00">Borrowed Resources</th>
                      <td v-for="col in Days"></td>
                    </tr>
                   <tr v-for="row in borrowedPeople" v-bind:item="row" @click="reFreshPeople">
                      <td  bgcolor="#6699ff">{{ row.Name }}</td>
                      <td v-for="day in row.Days" :class="day.Class">
                        {{ day.Hours }}
                      </td>
                    </tr> 
                  </tbody> 
                </table>
              </div>
            </div>
          </div>
          <div class="text-center">
          <br>
          <button id="save" type="button" class="btn btn-success">Save</button>
          <button id="cancel" type="button" class="btn btn-danger">Cancel</button>
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
              <h5>Value: Billed/Scheduled</h5>
              <div class="table-responsive">
                <table class="table table-bordered table-striped">
                  <tbody>
                    <tr>
                      <td class="Billed">Billed</td>
                      <td class="Holiday">Holiday</td>
                      <td class="Dto">DTO</td>
                      <td class="NonBillable">Non-Billable</td>
                      <td class="SupportTrain">Support/Training</td>
                      <td class="LentInternal">Lent Internal</td>
                    </tr>
                    <tr>
                      <td class="LentExternal">Lent External</td>
                      <td class="Scheduled">Scheduled</td>
                      <td class="Oh">OH</td>
                      <td class="Weekend">Weekend</td>
                      <td>Free</td>

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
</template>

<script>


export default {
  name: 'child',
  props: {
    message: String,
    people: Array,
    borrowedPeople: Array,
    nonBorrowedPeople: Array,
    Dates:Array,
    Days:Array

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
    "rankType": function rankType(val)
    {
      if(val == "Billed")
        return 10;
      if(val == "Holiday")
        return 9;
      if(val == "DTO")
        return 8;
      if(val == "Non-Billable")
        return 7;
      if(val == "Support/Training")
        return 6;
      if(val == "Lent Internal")
        return 5;
      if(val == "Lent External")
        return 4;
      if(val == "Scheduled")
        return 3;
      if(val == "OH")
        return 2;
      if(val == "Free")
        return 1;
    },
    "checkType": function checkType(oldVal, newVal) {
        if(this.rankType(newVal) >= this.rankType(oldVal))        
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
     }
  },
  components: {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';

.dates {
  color: #cce6ff
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

.blue {
  color: blue
}

.DTO {
  background-color: hotpink;
}

.Free {
  background-color: white;
}

.Scheduled {
  background-color: blue;
}

table.row-clickable tbody tr td {
    padding: 0;
}

table.row-clickable tbody tr td a {
    display: block;
    padding: 8px;
}
</style>
