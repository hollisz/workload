<template>
  <div class="parent">
    <child v-bind:message="message2" v-bind:Dates="Dates" v-bind:Days="Days" v-bind:people="People" v-bind:borrowedPeople="borrowedPeople" v-bind:nonBorrowedPeople="nonBorrowedPeople" v-on:employeeClicked="employeeClick"></child>
    <employee v-bind:Tasks=VisiblePeople v-bind:Name=activePerson v-bind:Resources=resources v-on:reassign="reassign"></employee>
  </div>
</template>

<script>
import Child from './Child'
import Employee from './Employee'

var moment = require('moment');

export default {
  name: 'parent',
  props: {
    message2: String
  },
  data() {
    return {
      Tasks: [{ ID: 1, Name: "Jeremy Huddleston", Billed: [{ Day: "8/21/2017", Amount: 4, Type: 7 }, { Day: "7/22/2017", Amount: 4, Type: 9 }] },
      { ID: 2, Name: "Zack Hollis", Billed: [{ Day: "8/2/2017", Amount: 6, Type: 9 }, { Day: "7/2/2017", Amount: 6, Type: 9 }] },
      { ID: 3, Name: "Albert Huddleston", Billed: [{ Day: "7/2/2017", Amount: 6, Type: 7 }, { Day: "7/2/2017", Amount: 6, Type: 9 }] }
      ],
      People: [
        { ID: 1, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: 3, Status: "Approved", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 4, BilledHours: 0, Borrowed: "false" },
        { ID: 2, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: 3, Status: "In Progress", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 4, BilledHours: 0, Borrowed: "false" },
        { ID: 3, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: 3, Status: "OH", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 3, BilledHours: 1, Borrowed: "false" },
        { ID: 4, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: 8, Status: "OH", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 4, BilledHours: 1, Borrowed: "false" },
        { ID: 5, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: 8, Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 5, BilledHours: 1, Borrowed: "false" },
        { ID: 6, Name: "Albert Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: 8, Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 6, BilledHours: 1, Borrowed: "true" },
        { ID: 7, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: 8, Status: "OH", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 3, BilledHours: 1, Borrowed: "false" },
        { ID: 8, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: 8, Status: "OH", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 4, BilledHours: 1, Borrowed: "false" },
        { ID: 9, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: 8, Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 5, BilledHours: 1, Borrowed: "false" },
        { ID: 10, Name: "Albert Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: 8, Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 6, BilledHours: 1, Borrowed: "true" },
        { ID: 11, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: 8, Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 1, BilledHours: 1, Borrowed: "false" },
        { ID: 12, Name: "Zack Hollis", FileNumber: "MO-22-IGT-17-18", Task: "SAS", Type: 3, Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 4, BilledHours: 0, Borrowed: "true" }
      ],
      Resources: [
        { ID: 1, Name: "Jeremy Huddleston", Borrowed: "false" },
        { ID: 2, Name: "Albert Huddleston", Borrowed: "true" },
        { ID: 2, Name: "Zack Hollis", Borrowed: "true" }
      ],
      Billable: ["supporttraining", "nonbillable", "dto", "holiday", "billed"],
      TaskEnum: { FREE: 0, OH: 1, SCHEDULED: 2, LENTEXTERNAL: 3, LENTINTERNAL: 4, SUPPORTTRAINING: 5, NONBILLABLE: 6, DTO: 7, HOLIDAY: 8, BILLED: 9 },
      TaskRank: ["free", "oh", "scheduled", "lentExternal", "lentInternal", "supportTraining", "nonBillable", "dto", "holiday", "billed"],
      Dates: [],
      Days: [],
      VisiblePeople: [],
      nonBorrowedPeople: Array,
      borrowedPeople: Array,
      resources: Array,
      taskStart: String,
      taskEnd: String
    }
  },
  created: function() {
    this.initializeData();
  },
  methods: {
    "initializeData": function initializeData() {
      this.calculateStartDate();
      this.populateCalender();
      this.nonBorrowedPeople = this.getHours("false");
      this.borrowedPeople = this.getHours("true");
      this.resources = this.getResources();
      this.visiblePeople(this.activePerson);
    },
    "calculateStartDate": function calculateStartDate() {

      var startDate = moment().format('l');

      for (var t = 0; t < this.Tasks.length; t++) {
        this.Tasks[t].Billed.sort((a, b) => a.Day < b.Day ? -1 : a.Day > b.Day);

        if (this.Tasks[t].Billed[0].Day < startDate) {
          startDate = this.Tasks[t].Billed[0].Day;
        }
      }

      var endDate = moment(startDate).add(30, 'days');

      for (var t = 0; t < this.Tasks.length; t++) {
        this.Tasks[t].Billed.sort((a, b) => a.Day > b.Day ? -1 : a.Day < b.Day);
        var isbefore = moment(endDate).isBefore(this.Tasks[t].Billed[0].Day);

        if (isbefore) {
          endDate = this.Tasks[t].Billed[0].Day;
        }
      }
      this.taskStart = startDate;
      this.taskEnd = endDate;
    },
    "populateCalender": function populateCalender() {
      var days = moment.duration(moment(this.taskEnd).diff(this.taskStart)).asDays();
      var start = moment(this.taskStart);

      this.Dates.push(start.format('D'));
      this.Days.push(start.format('dddd').substring(0, 1));

      for (var i = 0; i < days; i++) {
        start.add(1, 'days');
        this.Dates.push(start.format('D'));
        this.Days.push(start.format('dddd').substring(0, 1));
      }
    },
    "getHours": function getHours(borrowed) {
      var IDs = new Array;
      var hoursInDay = 8;
      var tasks = [];

      var filteredResources = this.Resources.filter(y => y.Borrowed == borrowed);

      for (var p = 0; p < filteredResources.length; p++) {
        IDs[p] = { Name: filteredResources[p].Name, Days: [] };
        IDs[p].Days = this.populateBilled(filteredResources[p].Name);

        tasks = this.People.filter(y => y.Name == filteredResources[p].Name).sort((a, b) => a.Type < b.Type ? -1 : a.Type > b.Type);

        var currentDay = 0;
        var currentTask = 0
        var currentHours = tasks[currentTask].ScheduledHours;

        for (var d = 0; d < IDs[p].Days.length; d++) {
          while (IDs[p].Days[d].Hours < hoursInDay && (currentTask < tasks.length)) {

            if ((IDs[p].Days[d].Hours + currentHours) == hoursInDay) {
              IDs[p].Days[d].Hours += currentHours;

              if (!this.isBillable(IDs[p].Days[d].Class)) {
                IDs[p].Days[d].Class = this.TaskRank[this.TaskEnum.SCHEDULED];
              }
              currentTask++;
              currentHours = tasks[currentTask].ScheduledHours;
            }
            else if ((IDs[p].Days[d].Hours + currentHours) < hoursInDay) {
              IDs[p].Days[d].Hours += currentHours;

              if (!this.isBillable(IDs[p].Days[d].Class)) {
                IDs[p].Days[d].Class = this.TaskRank[this.TaskEnum.SCHEDULED];
              }
              currentTask++;
              if (currentTask < tasks.length) {
                currentHours = tasks[currentTask].ScheduledHours;
              }
            }
            else {
              currentHours = currentHours - (hoursInDay - IDs[p].Days[d].Hours);
              IDs[p].Days[d].Hours += hoursInDay - IDs[p].Days[d].Hours;

              if (!this.isBillable(IDs[p].Days[d].Class)) {
                IDs[p].Days[d].Class = this.TaskRank[this.TaskEnum.SCHEDULED];
              }
            }
          }
        }
      }

      return IDs;
    },
    "populateBilled": function populateBilled(name) {
      var hours = new Array;
      var days = moment.duration(moment(this.taskEnd).diff(this.taskStart)).asDays();

      for (var y = 0; y <= days; y++) {
        //console.log(y);
        hours.push({ Hours: 0, Class: this.TaskRank[this.TaskEnum.FREE] });
      }

      var billedTasks = this.Tasks.filter(x => x.Name == name);

      for (var i = 0; i < billedTasks.length; i++) {
        for (var j = 0; j < billedTasks[i].Billed.length; j++) {
          var billDate = moment(billedTasks[i].Billed[j].Day);
          var slot = moment.duration(billDate.diff(this.taskStart)).asDays();
          hours[slot].Hours = (hours[slot].Hours + billedTasks[i].Billed[j].Amount);

          if (billedTasks[i].Billed[j].Type >= this.TaskRank.indexOf(hours[slot].Class)) {
            hours[slot].Class = this.TaskRank[billedTasks[i].Billed[j].Type];
          }
        }
      }

      return hours;
    },
    "sortPeople": function sortPeople() {
      var arr = this.People;
      arr.sort((a, b) => a.Name < b.Name ? -1 : a.Name > b.Name);

      return arr;
    },
    "getResources": function getResources() {
      var IDs = new Array;

      var array = this.sortPeople();

      name = array[0].Name;
      IDs.push(name);

      //Cycle through each person
      for (var j = 0; j < array.length; j++) {
        if (name != array[j].Name) {
          name = array[j].Name;
          IDs.push(name);
        }
      }

      return IDs;
    },
    "employeeClick": function() {
      var text = $(event.target).text();
      this.visiblePeople(text);
    },
    "visiblePeople": function visiblePeople(name) {
      var len = this.People.length;
      this.VisiblePeople = [];

      for (var i = 0; i < len; ++i) {
        if (this.People[i].Name == name) {
          this.VisiblePeople.push(this.People[i]);
        }
      }

      return this.VisiblePeople;
    },
    "isBillable": function isBillable(task) {
      if (this.Billable.indexOf(task) != -1)
        return 1;

    },
    "reassign": function reassign(tasks, name) {
      for (var i = 0; i < tasks.length; i++) {
        for (var j = 0; j < this.People.length; j++) {
          if (this.People[j].ID == tasks[i]) {
            //Set the name to the new resource
            this.People[j].Name = name;
            //Set the billed hours to 0
            this.People[j].BilledHours = 0;
            //Set the status to pending
            this.People[j].Status = "Pending";
            //Set borrowed to the resources borrow
            this.People[j].Borrowed = this.Resources.find(x => x.Name == name).Borrowed;

          }
        }
      }
      this.visiblePeople(this.activePerson);
      this.nonBorrowedPeople = this.getHours("false");
      this.borrowedPeople = this.getHours("true");
      this.resources = this.getResources();
    }
  },
  computed: {
    "activePerson": function activePerson() {
      if (this.VisiblePeople.length == 0) {
        var person = this.People[0].Name;
      }
      else {
        var person = this.VisiblePeople[0].Name;
      }

      this.visiblePeople(person);

      return person;
    }
  },
  components: {
    Child,
    Employee
  }
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
