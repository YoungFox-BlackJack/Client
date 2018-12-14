<template>
  <div>
    <b-button class="mr-3" :class="{disabled: isPlayerTurn}" @click="draw">Draw</b-button>
    <b-button @click="pass">Pass</b-button>
   <b-alert dismissible :show="readyAlert" :variant="alert"  @dismissed="readyAlert=false">{{message}}</b-alert>
    <ul>
      <li v-for="(card, index) in ownCards" :key="index">{{card.value}} </li>
    </ul>
     <ul>
      <li v-for="(card, index) in opponentCards" :key="index">{{card}}</li>
    </ul>
</div>
</template>
<script>
import firebase from "firebase"
import axios from "axios"
export default {
  mounted () {
    let playerRef = firebase.database().ref('players/' + localStorage.getItem('token'))
    playerRef.on('value', (snapshot) => {
      if (snapshot.val().turn) {
        this.isPlayerTurn = false
      } else {
        this.isPlayerTurn = true
      }
    })

    let cards = firebase.database().ref('players/' + localStorage.getItem('token') + '/cards')
    cards.on('value', (snapshot) => {
      this.ownCards = Object.values(snapshot.val())
    })

    let test = firebase.database().ref('players')
    test.on('value', (snapshot, err) => {
      this.gameEnd = 0
        snapshot.forEach((childNode) => {
          if(childNode.child('/done').val()) {
            this.gameEnd ++
          }
        })
    })

    let opponent = firebase.database().ref('players')
    opponent.on('value', (snapshot, err) => {
      if (!err) {
        snapshot.forEach((childNode) => {

          if (childNode.key != localStorage.getItem('token')) {
            this.opponentCards = []
            childNode.child('/cards').forEach((superChild) => {
                this.opponentCards.push('ga bole liat')
            })
          }
        })
      }
    })
  },
  methods: {
    pass () {
      firebase.database().ref(`players/${localStorage.getItem('token')}`).update({
        turn: false,
        done: true
        }, (error) => {
          if (error) {
            // this.message = 'Failed to ready check, please ready again'
            // this.alert = 'danger'
            // this.readyAlert = true
          } else {
             let players = firebase.database().ref('players')
              players.on('value', (snapshot) => {
                  snapshot.forEach((childNode) => {
                    let playerDone = childNode.child('/done').val()
                    if (childNode.key != localStorage.getItem('token') && !playerDone) {
                      firebase.database().ref(`players/${childNode.key}`).update({
                        turn: true
                      }, (error) => {
                          if (error) {

                          } else {

                          }
                      })
                    }
                  })
              })
            }
        })
    },
    draw () {
      let card = null
      axios({
        method: "GET",
        url: `https://deckofcardsapi.com/api/deck/new/draw/?count=1`
        })
        .then(cards => {
          card = cards.data.cards[0]
          firebase.database().ref(`/players/${localStorage.getItem('token')}/cards`).push(card)
        })
        .catch(err => {
          console.log(err)
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
      allReady: true,
      isPlayerTurn: true,
      ownCards: [],
      opponentCards: [],
      gameEnd: 0
    }
  },
  watch: {
    gameEnd (value) {
      if (value === 2) {
        this.$router.push('/result')
      }
    }
  }
}
</script>

