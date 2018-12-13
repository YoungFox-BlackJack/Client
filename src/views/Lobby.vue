<template>
    <div v-if="this.playerName">
        <b-container class="bv-example-row">
            <b-row>
                <b-col></b-col>
                <b-col>
                    <div>
                        <form @submit.prevent="createRoom">
                            <div class="form-group">
                                <label>Room Name:</label><br>
                                <input type="text" class="form-control" v-model="addRoomName" placeholder="Room Name">
                            </div>
                            <br>
                            <button type="submit" class="btn btn-secondary">Create Room</button>
                        </form>
                    </div>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-container>
        
        <br><br>
        <div class="row" style="margin-right:0px">
            <div v-for="(room, index) in rooms" :key="index" class="col-3">
                <b-card :title="room.name"
                        img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuIzfdn51viAqMdaqTQAi55VEkEEP3z4jKR8ui0SJG1Wn22bh4gA"
                        img-alt="Image"
                        img-top
                        style="max-width: 200px;"
                        class="mb-2">
                    <div>                 
                        Room Master: {{ room.player1.name }}
                    </div>
                    <div v-if="!room.player2 || !room.player2.name">
                        # of players: 1
                    </div>
                    <div v-else>
                        # of players: 2
                    </div>
                    <b-button v-if="!room.player2 || !room.player2.name" @click.prevent="joinRoom(room.roomId)" variant="primary">Join Room</b-button>
                    <b-button v-else variant="danger" disabled>Room Full</b-button>
                </b-card>
            </div>
        </div>
    </div>

    <div v-else>
        <img src="https://www.yebocasino.co.za/images/blackjackbanner.png" alt="">
        <br><br>
        <b-container class="bv-example-row">
            <b-row>
                <b-col></b-col>
                <b-col>
                    <form @submit.prevent="createName">
                        <div class="form-group">
                            <label>Enter your Name:</label><br>
                            <input type="text" class="form-control" v-model="playerInput" placeholder="Player Name">
                        </div>
                        <br>
                        <button type="submit" class="btn btn-secondary">Enter</button>
                    </form>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-container>
      
    </div>

</template>

<script>
import firebase from '../firebase/fire'

export default {
  name: 'lobby',
  data () {
    return {
      playerInput: '',
      playerName: '',
      addRoomName: "",
      rooms: []
    }
  },
  methods: {
    login: function () {
      this.playerName = this.playerInput
      localStorage.setItem('player', this.playerInput)
    },
    createName() {
        this.playerName = this.playerInput
    },
    createRoom() {
        firebase.database().ref('rooms').push({
            name: this.addRoomName,
            player1: {
              name: this.playerName || 'TEST',
              ready: false
            },
            player2: {
              name: null,
              ready: false
            }
        })
        .then(snapshot => {
            this.addRoomName = ""
            this.$router.push(`room/${snapshot.key}`)
        })
        
    },
    joinRoom(id) {
        firebase.database().ref(`rooms/${id}/player2/name`).set(this.playerName, snapshot => {
            this.$router.push(`room/${id}`);
        })
    }
  },
  created: function() {
        let self = this
        firebase.database().ref('rooms').on('value', function(snapshot) {
        console.log('firebase', snapshot.val())
        let data = Object.entries(snapshot.val());
        let rooms = [];
        data.forEach(element => {
            let obj = {
            roomId: element[0],
            name: element[1].name || 'Default',
            player1: element[1].player1,
            player2: element[1].player2
            };
            rooms.push(obj);
        });
        self.rooms = rooms;
    })
  }
}
</script>

<style scoped>

</style>
