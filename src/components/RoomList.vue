<template>

  <div>
    This is Room
  </div>
</template>

<script>

export default {
  components: {
  },
  props: ['playerName'],
  data () {
    return {
      roomList: [],
      roomName: '',
    }
  },
  methods: {

    createRoom: function () {
  
    },
    joinRoom: function (id) {

    }
  },
  mounted: function () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-3 {
  border: 1px solid lightgray;
  margin: 10px;
  padding: 10px;
}
.header {
  text-align: left;
}
.roomMaster,
.roomInfo {
  color: slategray;
}
.separator {
  border: 1px solid lightgreen;
  margin: 10px;
}
.row {
  justify-content: space-between;
}
</style>
