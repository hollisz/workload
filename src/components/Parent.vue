<template>
  <div class="parent">
    <div class=container>
    <h5>{{taskStart}}</h5>
    <h5>{{taskEnd}}</h5>
    </div>
    <!--<div class=container>-->
      <!--<div class="col-md-4">-->
      <!--<employee v-bind:Tasks=VisiblePeople v-bind:Header="'0'" v-bind:ReAssign="'0'" v-bind:hideColumns=hideColumns v-bind:Name=activePerson v-bind:Resources=Resources v-on:reassign="reassign"></employee>-->
      <!--</div>-->
      <!--<div class="col-md-8">-->
      <resource v-bind:message="message2" v-bind:Dates="Dates" v-bind:Days="Days" v-bind:people="People" v-bind:borrowedPeople="borrowedPeople"
        v-bind:nonBorrowedPeople="nonBorrowedPeople" v-on:employeeClicked="employeeClick" v-on:unscheduledTasks="unscheduledTasks"></resource>
      <!--</div>
    </div>-->
      <!--<div class="container">-->
      <employee v-bind:Tasks=VisiblePeople v-bind:Header="'1'" v-bind:ReAssign="'1'" v-bind:hideColumns=hideColumns v-bind:Name=activePerson
        v-bind:Resources=Resources v-on:reassign="reassign" v-on:hideOH="hideOH"></employee>
    <!--</div>-->

    <div class=container>
      <div class="col-md-2">
        <div id="unscheduledModal" class="modal reveal-modal-terms">
          <!-- Modal content -->
          <div class="modal-content">
            <div class="modal-header">
              <span class="close" @click="hideModal">&times;</span>
              <h2>Modal Header</h2>
              <button id="reassign" type="button" class="btn btn-primary" @click="hideModal">Close</button>
            </div>
            <div class="modal-body">
              <employee v-bind:Tasks=UnassignedTasks v-bind:Header="'1'" v-bind:ReAssign="'0'" v-bind:hideColumns=hideColumns v-bind:Name=activePerson
                v-bind:Resources=Resources v-on:reassign="reassign" v-on:hideOH="hideOH"></employee>
              <button id="reassign" type="button" class="btn btn-primary" @click="hideModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Child from './Child'
import Resource from './Resource'
import Employee from './Employee'

var moment = require('moment');

export default {
  name: 'parent',
  props: {
    message2: String
  },
  data() {
    return {
      Tasks: [],
      People: [],
      Resources: [],
      Billable: ["supporttraining", "nonbillable", "dto", "holiday", "billed"],
      TaskEnum: { FREE: 0, OH: 1, SCHEDULED: 2, LENTEXTERNAL: 3, LENTINTERNAL: 4, SUPPORTTRAINING: 5, NONBILLABLE: 6, DTO: 7, HOLIDAY: 8, BILLED: 9, WEEKEND: 10 },
      TaskRank: ["free", "oh", "scheduled", "lentExternal", "lentInternal", "supportTraining", "nonBillable", "dto", "holiday", "billed", "weekend"],
      sideHideColumns: ["Borrowed","Name","Date","Type","ID","ProjectAccept","Lent","Style","EstStartDate","Task","Status","EstCompleteDate", "TargetDate", "OH"],
      hideColumns: ["Name","Date","Style","OH","Lent","Borrowed","BilledHours","Type", "ProjectAccept"],
      Dates: [],
      Days: [],
      VisiblePeople: [],
      UnassignedTasks: [],
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
    "showModal": function showModal() {
        $("#unscheduledModal").show();
    },
    "hideModal": function hideModal() {
        $("#unscheduledModal").hide();
    },
    // "failure": function failure() {
    //     return false;
    // },
    "getManagers": function getManagers() {
      var ret;

      var url = "http://localhost:63298/Protrack/WorkloadManager/GetManagers";
 
      $.ajax({
        url: url, 
        context: document.body,
        timeout: 30000,
        cache: false,
        async: false,
        error: function() {
          return false;
        },
        success: function(data) {
          ret = data;
        }
      });

      return ret;
    },
    "getData": function getData(manager, startDate) {
      var ret;

      var url = "http://localhost:63298/Protrack/WorkloadManager/GetBilled?Manager=" + manager + "&startDate=" + startDate;
 
      $.ajax({
        //url: "http://localhost:49898/api/GetTime/GetTime",
        url: url, 
        context: document.body,
        timeout: 30000,
        cache: false,
        async: false,
        error: function() {
          return false;
        },
        success: function(data) {
          ret = data;
        }
      });

      return ret;
    },
    "getTasks": function getTasks(manager) {
      var ret;

      $.ajax({
        url: "http://localhost:63298/Protrack/WorkloadManager/GetScheduled?Manager=" + manager,
        context: document.body,
        timeout: 30000,
        cache: false,
        async: false,
        error: function() {
          return false;
        },
        success: function(data) {
          ret = data;
        }
      });

      return ret;
    },
    "initializeData": function initializeData() {
      console.log("Getting managers")
      var managers = this.getManagers(); 
      console.log("Man len:" + managers.length);

      for(var k=0; k<managers.length; k++)
      {
        console.log(managers[k]);
      }

      // console.log("Getting people")
      // this.People = this.getTasks(36);
      // console.log("Start date")
      // this.calculateStartDate();
      // console.log("Get tasks:" + moment(this.taskStart).format('l'))  
      // this.Tasks = this.getData(36, moment(this.taskStart).format('l'));
      // console.log("calcenddate")
      // this.calculateEndDate();
      // console.log("Resource")
      // this.populateResources();
      // console.log("cal")
      // this.populateCalender();
      // console.log("Gethours 1")
      // this.nonBorrowedPeople = this.getHours("false");//.filter(x => x.Name == "Luis Mota");
      // console.log("Get hours2")
      // this.borrowedPeople = this.getHours("true");
      // console.log("resource2")
      // this.resources = this.getResources();
      // console.log("people")
      // this.visiblePeople(this.activePerson);
      // console.log("Done")
    },
    "dateSort": function dateSort(date1, date2) {
      return moment(date1).isBefore(moment(date2).format('l'),'day');
    },
    "calculateStartDate": function calculateStartDate() {
      this.People.sort((a,b) => this.dateSort(a.ProjectAccept,b.ProjectAccept) ? -1 : this.dateSort(b.ProjectAccept, a.ProjectAccept));
      this.taskStart = this.People[0].ProjectAccept;
      
      console.log("Old start:" + moment(this.taskStart).format('l'));

      this.taskStart = '7/1/2017'

      console.log("New start:" + moment(this.taskStart).format('l'));

    },
    "calculateEndDate": function calculateEndDate() {
      var endDate = moment(this.taskStart).add(30, 'days');

      this.Tasks.sort((a,b) => a.BilledDay > b.BilledDay ? -1 : a.BilledDay < b.BilledDay);
      this.taskEnd = this.Tasks[0].BilledDay;

      console.log("End=" + moment(this.taskEnd).format('l'))
    },
    "populateResources": function populateResources() {
        for(var i=0; i<this.People.length; i++){

          if(this.Resources.map((el) => el.Name).indexOf(this.People[i].Name) == -1){
            this.Resources.push({ID: this.People[i].ID, Name: this.People[i].Name, Borrowed: this.People[i].Borrowed});
          }
        }
    },
    "populateCalender": function populateCalender() {
      var days = moment.duration(moment(this.taskEnd).diff(this.taskStart)).asDays();
      var start = moment(this.taskStart);

      this.Dates.push(start.format('M/D'));
      this.Days.push(start.format('dddd').substring(0, 1));

      for (var i = 0; i < days+30; i++) {
        start.add(1, 'days');
        this.Dates.push(start.format('M/D'));
        this.Days.push(start.format('dddd').substring(0, 1));
      }
    },
    "getHours": function getHours(borrowed) {
      var days = new Array;
      var hoursInDay = 8;
      var tasks = [];

      console.log("Populate billed");
      var filteredResources = this.Resources.filter(y => y.Borrowed == borrowed);
      //var hours = this.populateDays();


      for (var p = 0; p < filteredResources.length; p++) {
        days[p] = { Name: filteredResources[p].Name, Days: [] };
        var hours = this.populateDays();
        //days[p].Days = this.populateScheduled(filteredResources[p].Name, hours);
        hours = this.populateBilled(filteredResources[p].Name, hours);
        days[p].Days = this.populateUnScheduled(filteredResources[p].Name, hours);
      }

      return days;
    },
    "populateDays": function populateDays() {
      var hours = new Array;

      //Get the difference between the start and end date
      var days = Math.round(moment.duration(moment(this.taskEnd).diff(this.taskStart)).asDays());
      
      for (var y = 0; y <= days+30; y++) {
        hours.push({ Date: moment(this.taskStart).add(y, 'days').format('l'), BilledHours: 0, ScheduledHours: 0, TotalHours: 0, Class: this.TaskRank[this.TaskEnum.FREE] });

        if (moment(hours[y].Date).format('dddd').substring(0, 1) == "S") {
          hours[y].Class = this.TaskRank[this.TaskEnum.WEEKEND];
        }
      }

        return hours;
    },
    "setDates": function setDates(id, d, complete) {
      var currentPeopleTask = this.People.filter(x => x.ID == id);

      currentPeopleTask[0].EstStartDate = moment(this.taskStart).add(d, 'days').format('l');

      if (complete) {
        currentPeopleTask[0].EstCompleteDate = moment(this.taskStart).add(d, 'days').format('l');
      }

      if (this.dateSort(currentPeopleTask[0].TargetDate, currentPeopleTask[0].EstCompleteDate)) {
        currentPeopleTask[0].Style = "atrisk";
      }
    },
    "refreshHours": function refreshHours(borrowed, name) {
      var days = new Array;
      var hoursInDay = 8;
      var tasks = [];

      var filteredResources = this.Resources.filter(y => y.Borrowed == borrowed && y.Name == name);
      days[p].Days = this.populateUnScheduled(filteredResources[p].Name, hours);

      return days;
    },
     "populateBilled": function populateBilled(name, hours) {

      var billedTasks = this.Tasks.filter(x => x.Name.trim() == name);
      
      for (var i = 0; i < billedTasks.length; i++) {
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day1, 6);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day2, 5);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day3, 4);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day4, 3);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day5, 2);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day6, 1);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day7, 0);
      }

      return hours;
    },
    "populateUnScheduled": function populateUnScheduled(name, hours) {
        var tasks = this.People.filter(y => y.Name == name).sort((a, b) => a.Type > b.Type ? -1 : a.Type < b.Type);

        var currentDay = 0;
        var currentTask = 0;
        var hoursInDay = 8;
        var currentHours = tasks[currentTask].ScheduledHours;
        var now = moment();
        var startingSlot = moment().diff(this.taskStart, 'days');      
        
          for(var i=0; i<hours.length; i++)
          {

            if(hours[i].Class != 'Billable')
            {
                hours[i].TotalHours = 0
                hours[i].ScheduledHours = 0
            }
          
          }

        for (var d = startingSlot; d < hours.length; d++) 
        {
         
          if(this.Days[d] != "S")
          {
            while (hours[d].TotalHours < hoursInDay && (currentTask < tasks.length)) 
            {
              if ((hours[d].TotalHours + currentHours) == hoursInDay) 
              {
                hours[d].TotalHours += currentHours;
                hours[d].ScheduledHours += currentHours;

                this.setDates(tasks[currentTask].ID, d, true);

                if (!this.isBillable(hours[d].Class)) 
                {
                  if(tasks[currentTask].OH != 1)
                  {
                    hours[d].Class = this.TaskRank[this.TaskEnum.SCHEDULED];
                  }
                  else
                  {
                    hours[d].Class = this.TaskRank[this.TaskEnum.OH];
                  }
                }
                
                currentTask++;
            
                if(currentTask != tasks.length)
                {
                  currentHours = tasks[currentTask].ScheduledHours;
                }
            }
            else if ((hours[d].TotalHours + currentHours) < hoursInDay) 
            {
              hours[d].TotalHours += currentHours;
              hours[d].ScheduledHours += currentHours;

              this.setDates(tasks[currentTask].ID, d, true);

              if (!this.isBillable(hours[d].Class)) 
              {
                if(tasks[currentTask].OH != 1)
                {
                  hours[d].Class = this.TaskRank[this.TaskEnum.SCHEDULED];
                }
                else
                {
                  hours[d].Class = this.TaskRank[this.TaskEnum.OH];
                }
              }

              currentTask++;
              if (currentTask < tasks.length) 
              {
                currentHours = tasks[currentTask].ScheduledHours;
              }
            }
            else 
            {
              currentHours = currentHours - (hoursInDay - hours[d].TotalHours);
              hours[d].TotalHours += hoursInDay - hours[d].TotalHours;
              hours[d].ScheduledHours = hoursInDay;
              this.setDates(tasks[currentTask].ID, d, false);

              if (!this.isBillable(hours[d].Class)) 
              {
                if(tasks[currentTask].OH != 1)
                {
                  hours[d].Class = this.TaskRank[this.TaskEnum.SCHEDULED];
                }
                else
                {
                  hours[d].Class = this.TaskRank[this.TaskEnum.OH];
                }
              }

            }
          }
          }
        }

        return hours;
    },
    "populateScheduled": function populateScheduled(name, hours) 
    {
      var scheduledTasks = this.People.filter((x) => x.Name.trim() == name && x.EstStartDate);

      for (var i = 0; i < scheduledTasks.length; i++) 
      {
          var billDate = moment(scheduledTasks[i].EstStartDate);
          var slot = Math.round(moment.duration(moment(scheduledTasks[i].EstStartDate).diff(this.taskStart)).asDays());
         
          hours[slot].ScheduledHours = (hours[slot].ScheduledHours + scheduledTasks[i].ScheduledHours);
          hours[slot].TotalHours += hours[slot].ScheduledHours;

          //Fix this
          hours[slot].Class = this.TaskRank[this.TaskEnum.SCHEDULED];
      }

      return hours;
    },
    "populateHours": function populateHours(billedDay, hours, day, offset)
    {
          var billDate = moment(billedDay).subtract(offset, 'day');
          
          if( billDate.isSameOrAfter(moment(this.taskStart).format('l'), 'day') && day > 0) {
            var slot = Math.round(moment.duration(billDate.diff(this.taskStart)).asDays()); 
            hours[slot].BilledHours = (hours[slot].BilledHours + day);
            hours[slot].TotalHours += hours[slot].BilledHours;
          //Fix this
            hours[slot].Class = "Billable";
          }
      
    },
    "populateBilled": function populateBilled(name, hours) 
    {

      var billedTasks = this.Tasks.filter(x => x.Name.trim() == name);
      
      for (var i = 0; i < billedTasks.length; i++) {
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day1, 6);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day2, 5);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day3, 4);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day4, 3);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day5, 2);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day6, 1);
        this.populateHours(billedTasks[i].BilledDay, hours,  billedTasks[i].Day7, 0);
      }

      return hours;
    },
    "populateTimeoff": function populateTimeOff(name) {
      // var hours = new Array;

      // var timeoff = this.Timeoff.filter(x => x.Name == name);

      // for (var i = 0; i < timeoff.length; i++) {
      //   for (var j = 0; j < timeoff[i].Time.length; j++) {
      //     var date = moment(billedTasks[i].Time[j].Day);
      //     var slot = moment.duration(date.diff(this.taskStart)).asDays();
      //     hours[slot].TimeoffHours = (hours[slot].TimeoffHours + timeoff[i].Billed[j].Amount);
      //     hours[slot].TotalHours += hours[slot].BilledHours;

      //     if (timeoff[i].Billed[j].Type >= this.TaskRank.indexOf(hours[slot].Class)) {
      //       hours[slot].Class = this.TaskRank[billedTasks[i].Billed[j].Type];
      //     }
      //   }
      // }

      // return hours;
    },
    "sortPeople": function sortPeople() 
    {
      var arr = this.People;
      arr.sort((a, b) => a.Name < b.Name ? -1 : a.Name > b.Name);

      return arr;
    },
    "getResources": function getResources() 
    {
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
    "hideOH": function hideOH(stuff) {        
            if($(stuff.target).is(':checked'))
            {
            var newTasks = this.UnassignedTasks.filter(x => x.Status != "OH");
                        this.UnassignedTasks = newTasks;
            }
            else
            {
                 this.MakeUnassignedTasks("Unassigned");
            }

            console.log(newTasks.length)
    },
    "unscheduledTasks": function() {
       this.MakeUnassignedTasks("Unassigned");
       this.showModal();
    },
    "visiblePeople": function visiblePeople(name) {
      var len = this.People.length;
      this.VisiblePeople = [];

      for (var i = 0; i < len; ++i) {
        if (this.People[i].Name == name) {
          this.VisiblePeople.push(this.People[i]);
        }
      }

      for(var k=0; k<this.VisiblePeople.length; k++){
          if(this.VisiblePeople[k].EstStartDate != null)
          {
            this.VisiblePeople[k].EstStartDate = moment(this.VisiblePeople[k].EstStartDate).format('l');
          } 
          if(this.VisiblePeople[k].EstCompleteDate != null)
          {
            this.VisiblePeople[k].EstCompleteDate = moment(this.VisiblePeople[k].EstCompleteDate).format('l');
          }
          if(this.VisiblePeople[k].TargetDate != null)
          {
            this.VisiblePeople[k].TargetDate = moment(this.VisiblePeople[k].TargetDate).format('l');
          }
          if(this.VisiblePeople[k].OH == 1)
          {
            this.VisiblePeople[k].Status = "OH";
          }
      }

      this.VisiblePeople.sort((a,b) => this.dateSort(a.EstStartDate,b.EstStartDate)  ? -1 : this.dateSort(b.EstStartDate,a.EstStartDate));

      return this.VisiblePeople;
    },
    "MakeUnassignedTasks": function MakeUnassignedTasks(name) {
      var len = this.People.length;
      this.UnassignedTasks = [];

      for (var i = 0; i < len; ++i) {
        if (this.People[i].Name == name) {
          this.UnassignedTasks.push(this.People[i]);
        }
      }

      for(var k=0; k<this.UnassignedTasks.length; k++){
          if(this.UnassignedTasks[k].EstStartDate != null)
          {
            this.UnassignedTasks[k].EstStartDate = moment(this.UnassignedTasks[k].EstStartDate).format('l');
          } 
          if(this.UnassignedTasks[k].EstCompleteDate != null)
          {
            this.UnassignedTasks[k].EstCompleteDate = moment(this.UnassignedTasks[k].EstCompleteDate).format('l');
          }
          if(this.UnassignedTasks[k].TargetDate != null)
          {
            this.UnassignedTasks[k].TargetDate = moment(this.UnassignedTasks[k].TargetDate).format('l');
          }
          if(this.UnassignedTasks[k].OH == 1)
          {
            this.UnassignedTasks[k].Status = "OH";
          }
      }

      this.UnassignedTasks.sort((a,b) => this.dateSort(a.EstStartDate,b.EstStartDate)  ? -1 : this.dateSort(b.EstStartDate,a.EstStartDate));

      return this.UnassignedTasks;
    },
    "isBillable": function isBillable(task) {
      if (this.Billable.indexOf(task) != -1)
        return 1;
    },
    "reassign": function reassign(tasks, name) {
      var ownerName;
      var ownerBorrowed;
      var currentBorrowed;

      for (var i = 0; i < tasks.length; i++) {
        var currentTaskOwner = this.People.filter(x => x.ID == tasks[i]);
        ownerName = currentTaskOwner[0].Name;
        ownerBorrowed = currentTaskOwner[0].Borrowed;
        //Set the name to the new resource
        currentTaskOwner[0].Name = name;
        //Set the billed hours to 0
        currentTaskOwner[0].BilledHours = 0;
        //Set the status to pending
        currentTaskOwner[0].Status = "Pending";
        //Set borrowed to the resources borrow
        currentBorrowed = this.Resources.find(x => x.Name == name).Borrowed;
        currentTaskOwner[0].Borrowed = currentBorrowed;
      }

      this.visiblePeople(this.activePerson);

      if(currentBorrowed == true)
      {
              var currentDays = this.borrowedPeople.filter(x => x.Name == name);
              currentDays = this.populateUnScheduled(name, currentDays[0].Days);
            }
            else
            {
              var currentDays = this.nonBorrowedPeople.filter(x => x.Name == name);
              currentDays.Days = this.populateUnScheduled(name, currentDays[0].Days);
            }

            if(ownerBorrowed == true)
            {
              var ownerDays = this.borrowedPeople.filter(x => x.Name == ownerName);
              ownerDays.Days = this.populateUnScheduled(name, ownerDays[0].Days);
            }
            else
            {
              var ownerDays = this.nonBorrowedPeople.filter(x => x.Name == ownerName);
              ownerDays.Days = this.populateUnScheduled(name, ownerDays[0].Days);
            }
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
    Employee,
    Resource
  }
}
</script>

<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  .container {
    max-width: 1600px;
  }
  
  .reveal-modal-terms {
    top: 30px;
    left: 100px;
    width: 80%;
    height: 700px;
    overflow: auto;
    background: #FFFFFF no-repeat -200px -80px;
    z-index: 101;
    padding: 30px 40px 34px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    -box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
</style>