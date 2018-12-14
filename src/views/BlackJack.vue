<template>
  <div>
    <b-carousel
      id="carousel1"
      style="text-shadow: 1px 1px 2px #333;"
      controls
      indicators
      background="#ababab"
      :interval="4000"
      img-width="1024"
      img-height="150"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide img-blank>
        <h5>
          Peraturan : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          eros felis, tincidunt a tincidunt eget, convallis vel est. Ut pellentesque
          ut lacus vel interdum.
        </h5>
      </b-carousel-slide>
      <b-carousel-slide img-blank>
        <H1>Game Still Runing .....</H1>
      </b-carousel-slide>
    </b-carousel>
    <b-container class="bv-example-row" style="padding-top:10px">
      <b-row>
        <b-col col="2">
          <div>
            <b-card-group deck class="mb-3">
              <b-card border-variant="dark" header="Chat Room" align="center">
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </b-card>
            </b-card-group>
          </div>
        </b-col>
        <b-col cols="5">
          <div>
            <b-card-group deck class="mb-3">
              <b-card border-variant="dark" header="You" align="center">
                <b-row>
                  <div>
                    <b-card-group>
                      <b-card
                        v-for="(card, index) in ownCards"
                        :key="index"
                        align="center"
                        :img-src="card.image"
                      ></b-card>
                    </b-card-group>
                  </div>
                </b-row>
                <!-- bottom -->
                <b-row>
                  <b-col>
                    <div>
                      <div>
                        <!-- <b-button style="margin:20px">Pass</b-button>
                        <b-button style="margin-left:10px ">Next</b-button>-->
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <!-- n-buttom -->
              </b-card>
            </b-card-group>
          </div>
        </b-col>
        <b-col cols="5">
          <div>
            <b-card-group deck class="mb-3">
              <b-card border-variant="dark" header="Opponent" align="center">
                <b-row>
                  <div>
                    <b-card-group>
                      <b-card
                        v-for="(card, index) in opponentCards"
                        :key="index"
                        align="center"
                        img-src="https://opengameart.org/sites/default/files/styles/medium/public/card%20back%20black.png"
                      ></b-card>
                    </b-card-group>
                  </div>
                </b-row>
                <!-- bottom -->
                <b-row>
                  <b-col>
                    <div></div>
                  </b-col>
                </b-row>
                <!-- n-buttom -->
              </b-card>
            </b-card-group>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div>
      <b-button
        style="margin:20px"
        class="mr-3"
        :class="{disabled: isPlayerTurn}"
        @click="draw"
      >Draw</b-button>
      <b-button style="margin-left:20px" @click="pass">Pass</b-button>

      <b-alert
        dismissible
        :show="readyAlert"
        :variant="alert"
        @dismissed="readyAlert=false"
      >{{message}}</b-alert>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import axios from "axios";
export default {
  mounted() {
    let playerRef = firebase
      .database()
      .ref("rooms/" + localStorage.getItem("room") + "/" + localStorage.getItem('token'));
    playerRef.on("value", snapshot => {
      if (snapshot.val().turn) {
        this.isPlayerTurn = false;
      } else {
        this.isPlayerTurn = true;
      }
    });

    let cards = firebase
      .database()
      .ref("rooms/" + localStorage.getItem("room") + "/" + localStorage.getItem('token') + '/cards');
    cards.on("value", snapshot => {
      this.ownCards = []
      this.ownCards = Object.values(snapshot.val());
    });

    let test = firebase.database().ref(localStorage.getItem("room") + "/" + localStorage.getItem('token'));
    test.on("value", (snapshot, err) => {
      this.gameEnd = 0;
      snapshot.forEach(childNode => {
        if (childNode.child("/done").val()) {
          this.gameEnd++;
        }
      });
    });

    let opponent = firebase.database().ref(`rooms/${localStorage.getItem("room")}`);
    opponent.on("value", (snapshot, err) => {
      if (!err) {
        console.log(snapshot.val(), 'AAA')
        for (let key in snapshot.val()) {
          console.log(key)
          if (key!= 'name' && key !='playing' && key != localStorage.getItem('token')) {
            firebase.ref("rooms/" + localStorage.getItem("room") + "/" + key + '/cards')
            .on("value", snapshot => {
                this.opponentCards.push('ga bole liat')
            })
          }
        } 
      }
    })
  },
  methods: {
    pass() {
      firebase
        .database()
        .ref(`rooms/${localStorage.getItem("room")}/${localStorage.getItem("token")}`)
        .update(
          {
            turn: false,
            done: true
          },
          error => {
            if (error) {
              // this.message = 'Failed to ready check, please ready again'
              // this.alert = 'danger'
              // this.readyAlert = true
            } else {
              let players = firebase.database().ref(`rooms/${localStorage.getItem("room")}`);
              players.on("value", snapshot => {
                for (let key in snapshot.val()) {
                  if (key!= 'name' && key != localStorage.getItem('token')) {
                   firebase
                      .database().ref(`rooms/${localStorage.getItem("room")}/${key}`).update(
                        {
                          turn: true
                        })
                  }
                  }
                })
            }
          }
        );
    },
    draw() {
      let card = null;
      axios({
        method: "GET",
        url: `https://deckofcardsapi.com/api/deck/new/draw/?count=1`
      })
        .then(cards => {
          card = cards.data.cards[0];
          firebase
            .database()
            .ref(`rooms/${localStorage.getItem("room")}/${localStorage.getItem("token")}/cards`)
            .push(card);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data() {
    return {
      turn: true,
      readyAlert: false,
      message: "",
      alert: "",
      start: false,
      gameStart: false,
      totalReady: 0,
      allReady: true,
      isPlayerTurn: true,
      ownCards: [],
      opponentCards: [],
      gameEnd: 0
    };
  },
  watch: {
    gameEnd(value) {
      if (value === 2) {
        this.$router.push("/result");
      }
    }
  }
};
</script>

