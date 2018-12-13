<template>
  <div>
   <b-alert dismissible :show="readyAlert" :variant="alert"  @dismissed="readyAlert=false">{{message}}</b-alert>
  <div class="d-flex justify-content-center align-items-center flex-props">
    <b-button @click="join">Join</b-button>
    <b-button @click="ready">Ready </b-button>
    <b-button @click="startGame" :class="{disabled: allReady}">Game Start</b-button>
  </div>
    <router-view></router-view>
</div>
</template>
<script>
import firebase from "firebase"
export default {
  methods: {
    startGame () {

    },
    ready () {
      if (!localStorage.getItem('token')) {
        this.message = 'You have not joined any room'
        this.alert = 'danger'
        this.readyAlert = true
      } else {
       firebase.database().ref(`players/${localStorage.getItem('token')}`).update({
          ready: true
        }, (error) => {
              if (error) {
                this.message = 'Failed to ready check, please ready again'
                this.alert = 'danger'
                this.readyAlert = true
              } else {
                this.message = 'You are ready to play!'
                this.alert =  'success'
                this.readyAlert = true
                this.totalReady ++
              }
        })
      }
    },
    join () {
      let index = 0
      let playersRef = firebase.database().ref('players/')
      playersRef.on('value', (snapshot) => {
        for (var key in snapshot.val()) {
          index++
        }

        if (!localStorage.getItem('token')) {
          localStorage.setItem('token', `player${index + 1}`)
          let turn = false

          if (localStorage.getItem('token') === 'player1') {
            turn = true
          } 

          firebase.database().ref('players/' + localStorage.getItem('token')).set({
            turn: turn,
            ready: false
          }, (error) => {
            if (error) {
              this.message = 'Failed to join room, please try again'
              this.alert = 'danger'
              this.readyAlert = true
            } else {
              this.message = 'You successfully join the room'
              this.alert =  'success'
              this.readyAlert = true
            }
          })
        }
    })
    }
  },
  mounted (){
    let count = 0
    let allReady = firebase.database().ref('players')
      allReady.on('value', (snapshot) => {
       snapshot.forEach((childNodes) => {
          if (childNodes.val().ready) {
            count++
          }
       })

      if (count == 2) {
        this.$router.push({path: '/game/play'})
      } else {
        count = 0
      }
      })
  },
  data() {
    return {
      turn: true,
      readyAlert: false,
      message: '',
      alert:'',
      start: false,
      gameStart: false,
      totalReady: 0,
      allReady: true
    }
  }
}
</script>
<style>
  .flex-props {
    height: 90vh;
  }
</style>
