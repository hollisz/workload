<template>
  <div class="parent">
    <child v-bind:message="message2" v-bind:people="People" v-bind:borrowedPeople="borrowedPeople" v-bind:nonBorrowedPeople="nonBorrowedPeople" v-on:employeeClicked="employeeClick"></child>
    <employee v-bind:Tasks=VisiblePeople v-bind:Name=activePerson v-bind:Resources=resources v-on:reassign="reassign"></employee>
  </div>
</template>

<script>
import Child from './Child'
import Employee from './Employee'

export default {
  name: 'parent',
  props: {
    message2: String
  },
  data() {
    return {
      People: [
        { ID: 1, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: "Scheduled", Status: "Approved", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 0, BilledHours: 1, Borrowed: "false" },
        { ID: 2, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: "Scheduled", Status: "In Progress", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 4, BilledHours: 1, Borrowed: "false" },
        { ID: 3, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: "Scheduled", Status: "OH", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 3, BilledHours: 1, Borrowed: "false" },
        { ID: 4, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: "DTO", Status: "OH", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 4, BilledHours: 1, Borrowed: "false" },
        { ID: 5, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: "DTO", Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 5, BilledHours: 1, Borrowed: "false" },
        { ID: 6, Name: "Albert Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: "DTO", Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 6, BilledHours: 1, Borrowed: "true" },
        { ID: 7, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: "DTO", Status: "OH", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 3, BilledHours: 1, Borrowed: "false" },
        { ID: 8, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: "DTO", Status: "OH", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 4, BilledHours: 1, Borrowed: "false" },
        { ID: 9, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: "DTO", Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 5, BilledHours: 1, Borrowed: "false" },
        { ID: 10, Name: "Albert Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: "DTO", Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 6, BilledHours: 1, Borrowed: "true" },
        { ID: 11, Name: "Jeremy Huddleston", FileNumber: "MO-22-IGT-17-17", Task: "SAS", Type: "DTO", Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 1, BilledHours: 1, Borrowed: "false" },
        { ID: 12, Name: "Zack Hollis", FileNumber: "MO-22-IGT-17-18", Task: "SAS", Type: "Scheduled", Status: "Pending", EstStartDate: "7/1/2017", EstCompleteDate: "7/1/2017", ScheduledHours: 4, BilledHours: 0, Borrowed: "true" }
      ],
      Resources: [
        { ID: 1, Name: "Jeremy Huddleston", Borrowed: "false" },
        { ID: 2, Name: "Albert Huddleston", Borrowed: "true" },
        { ID: 3, Name: "Zack Hollis", Borrowed: "true" }
      ],
      TaskRank: {FREE: 1, OH: 2, SCHEDULED: 3, LENTEXTERNAL: 4, LENTINTERNAL: 5, SUPPORTTRAINING: 6, NONBILLABLE: 7, DTO: 8, HOLIDAY: 9, BILLED: 10 },
      VisiblePeople:[],
      nonBorrowedPeople:Array,
      borrowedPeople:Array,
      resources:Array
    }
  },
  created: function () {
    this.nonBorrowedPeople = this.getHours("false");
    this.borrowedPeople = this.getHours("true");
    this.resources = this.getResources();
    },
  methods: {
    "reassign": function reassign(tasks, name) {
      for(var i=0; i<tasks.length; i++)
      {
        for(var j=0; j<this.People.length; j++)
        {
          if(this.People[j].ID == tasks[i])
          {
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
    },
    "employeeClick": function () {
        var text = $(event.target).text();
        this.visiblePeople(text);
    },
    "visiblePeople": function VisiblePeople(name) {
        var len = this.People.length;
        this.VisiblePeople = [];
          console.log(name);

        for (var i=0; i<len; ++i) {
          if(this.People[i].Name == name)
            this.VisiblePeople.push(this.People[i]);
        }

        return VisiblePeople;
    },
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
    "sortPeople": function sortPeople() {
      var arr = this.People;
      arr.sort((a, b)  => a.Name < b.Name ? -1 : a.Name > b.Name);

      return arr;
    },
    "getResources": function getResources() {
      var IDs = new Array;
      
      var array = this.sortPeople();
      
        name = array[0].Name;
        IDs.push(name);

        //Cycle through each person
        for(var j=0; j<array.length; j++)  
        {
          console.log("Name:" + array[j].Name + "\n")
          if(name != array[j].Name)
          {
            name = array[j].Name;
            IDs.push(name);
          }
        }

      return IDs; 
    },
    "getHours": function getHours(borrowed) {
      var scheduled = 0;
      var billed = 0;
      var hours = 0;
      var i = 0;
      var len = 0;
      var IDs = new Array;
      var person = 0;
      var type;

      var array = this.sortPeople().filter(function(x) {return (x.Borrowed == borrowed)})
      var name = array[0].Name;
      len = array.length-1;
      
      // var filteredResources = Resources.filter(y => y.Borrowed == borrowed); 
      
      // var peeps = [];

      // for(var p=0; p<filteredResources.length; p++)
      // {
      //     array = this.People.filter(y => y.Name == Resources[i]);

      //     type = this.checkType(type, array[i].Type);
      //     scheduled = scheduled + array[i].ScheduledHours;
      //     billed = billed + array[i].BilledHours;
      //     hours = billed + scheduled;
                  
          
      // }

      console.log(array);

        while (i < len) {
            name = array[i].Name;
            type = array[i].Type;
            IDs[person] = { Name: array[i].Name, Days: [] };
          console.log("PreCycle names:" + name);
        //Cycle through each person
        while ((array[i].Name == name) && (i < len)) {
          console.log("Cycle names:" + name);
          type = this.checkType(type, array[i].Type);
          scheduled = scheduled + array[i].ScheduledHours;
          billed = billed + array[i].BilledHours;
          hours = billed + scheduled;
          
          if (hours >= 8 || !((i+1) < len) || array[i+1].Name != name) {
            //console.info(JSON.stringify(IDs, null, '  '))
            //console.log("Tpyeset: " + type)
            IDs[person].Days.push({ Hours: (hours), Class: type });
            hours = 0;
            billed = 0;
            scheduled = 0;
          }
        
          i++;
        }
      
        for(var j=IDs[person].Days.length; j< 29; j++)
          IDs[person].Days.push({ Hours: 8, Class: "Free" });

        person++;
      }
      return IDs; 
    }

  },
  computed: {
    "activePerson": function activePerson() {
        if(this.VisiblePeople.length == 0)
        {
          var person =  this.People[0].Name;
        }
        else
        {
          var person = this.VisiblePeople[0].Name;
        }
                  
         this.visiblePeople(person);

         return person;
    }
    },
     //events: {
     // menuclick: function (){

       // console.log("Clicked");
      //}
    //},
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
