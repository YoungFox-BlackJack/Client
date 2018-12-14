<template>
  <div>
    <div>
    <img v-for="(card, index) in playerOneCardsImage" :key="index" :src="card" />
    </div>
    <div>
     <img v-for="(card, index) in playerTwoCardsImage" :key="index" :src="card" />
    </div>
    <p>{{message}} </p>
    <b-button @click="clearGame">Play again</b-button>
  </div>
</template>

<script>
import firebase from  "firebase"
export default {
  mounted () {
    let players = firebase.database().ref('players')
    players.on('value', (snapshot) => {
      snapshot.forEach((childNode) => {
        if (childNode.key === 'player1') {
            childNode.child('/cards').forEach((card) => {
              if (card.val().value === 'JACK' || card.val().value === 'QUEEN' || card.val().value === 'KING') {
                this.playerOneCards.push(Number(10))
              } else if (card.val().value.includes('ACE')) {
                this.playerOneCards.push(Number(1))
              }
              else {
                this.playerOneCards.push(Number(card.val().value))
              }

              this.playerOneCardsImage.push(card.val().image)
            })
        } else {
            childNode.child('/cards').forEach((card) => {
              if (card.val().value.includes('JACK', 'QUEEN', 'KING', 'AS')) {
                  this.playerTwoCards.push(10)
              } else if (card.val().value.includes('ACE')) {
                  this.playerTwoCards.push(1)
              }
              else {
                this.playerTwoCards.push(Number(card.val().value))
              }

              this.playerTwoCardsImage.push(card.val().image)
        })
        }
      })

      let scorePlayerOne = 0
      let scorePlayerTwo = 0

      this.playerOneCards.forEach((score) =>  {
        scorePlayerOne += score
      })

      this.playerTwoCards.forEach((score) =>  {
        scorePlayerTwo += score
      })

      if (scorePlayerOne <= 21) {
        if ((scorePlayerOne > scorePlayerTwo) || (scorePlayerOne < scorePlayerTwo && scorePlayerTwo > 21)) {
          this.message = 'PLayer One Win'
        }
      } 
      if (scorePlayerTwo <= 21) {
        if ((scorePlayerTwo > scorePlayerOne) || (scorePlayerTwo < scorePlayerOne && scorePlayerOne > 21)) {
          this.message = 'PLayer Two Win'
        }
      } 
      if (this.message == '') {
        this.message = 'Dealer Win'
      }
    })
  },
  data () {
    return {
      playerOneCards: [],
      playerOneCardsImage: [],
      playerTwoCards: [],
      playerTwoCardsImage: [],
      message: ''
    }
  },
  methods: {
    clearGame () {
      firebase.database().ref('players').remove()
      localStorage.removeItem('token')
      this.$router.push('/game')
    }
  }
}
</script>
