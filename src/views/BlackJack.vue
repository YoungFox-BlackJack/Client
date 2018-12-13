<template>
  <div>
    <b-button class="mr-3" :class="{disabled: isPlayerTurn}">Draw</b-button>
    <b-button>Pass</b-button>
   <b-alert dismissible :show="readyAlert" :variant="alert"  @dismissed="readyAlert=false">{{message}}</b-alert>
    <ul>
      <li v-for="(card, index) in ownCards" :key="index">{{card}} </li>
    </ul>
     <ul>
      <li v-for="(card, index) in opponentCards" :key="index">Ga bole tau </li>
    </ul>
</div>
</template>
<script>
import firebase from "firebase"
export default {
  methods: {
    startGame () {
      
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

