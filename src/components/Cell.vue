
<template>
  <div class="cell" v-bind:class="classObject">
    <div v-bind:item="Billed">{{ Billed }}</div>
  </div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.nested/1.01/jquery.nested.min.js"></script>

<script>
export default {
  name: 'cell',
  props: {
    Billed: Number,
    Scheduled: String,
    Class: String
  },
  data() {
    return {
      dtoActive: true
    }
  },
  computed: {
    classObject: function() {
      return {
          dtoActive: (this.Class == "DTO")
    }
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';

.dtoActive {
  background-color: hotpink;
}
</style>
