<template>
    
    <b-container class="bv-example-row">
        <b-row align-h="between">
            <b-col cols="4">
                <b-card :title="player1.name"
                        img-src="https://media.dezuu.com/D/17/9/3/0/000000_q_13073.jpg"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem; height:430px"
                        class="mb-2"
                        border-variant="secondary"
                        bg-variant="light">
                    <b-button v-if="!player1.ready && whichPlayer == 'player1'" variant="primary" @click.prevent="changeStatus">Ready?</b-button>
                    <b-button v-else-if="!player1.ready && whichPlayer == 'player2'" disabled variant="primary" @click.prevent="changeStatus">Ready?</b-button>
                    <b-button v-else-if="player1.ready && whichPlayer == 'player1'" variant="primary" @click.prevent="changeStatus">Ready!</b-button>
                    <b-button v-else-if="player1.ready && whichPlayer == 'player2'" disabled variant="primary" @click.prevent="changeStatus">Ready!</b-button>
                </b-card>
            </b-col>

            <b-col cols="4" v-if="allReady">
                <b-button  variant="success" @click="play">Let the Games Begin!</b-button>
            </b-col>


            <b-col cols="4">
                <b-card :title="player2.name"
                        img-src="https://media.dezuu.com/D/17/9/3/1/000000_q_13078.jpg"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem; height:430px"
                        class="mb-2"
                        border-variant="secondary"
                        bg-variant="light">
                    <img v-if="!player2.ready==false && player2.name == ''" width="100px" src="https://thumbs.gfycat.com/WellinformedUnfoldedIndigowingedparrot-max-1mb.gif" alt="">
                    <h3 v-if="!player2.ready==false && player2.name == ''">Waiting . . . </h3>
                    <b-button v-else-if="!player2.ready && player2.name != '' && whichPlayer =='player2'" variant="primary" @click.prevent="changeStatus2">Ready?</b-button>
                    <b-button v-else-if="!player2.ready && player2.name != '' && whichPlayer =='player1'" disabled variant="primary" @click.prevent="changeStatus2">Ready?</b-button>
                    <b-button v-else-if="player2.ready == true && whichPlayer == 'player2'" variant="primary" @click.prevent="changeStatus2">Ready!</b-button>
                    <b-button v-else-if="player2.ready == true && whichPlayer == 'player1'" disabled variant="primary" @click.prevent="changeStatus2">Ready!</b-button>
                </b-card>
            </b-col>
        </b-row>
        <audio id="marioReady" >
            <source src="../assets/mario.wav" type="audio/mpeg">
        </audio>

        <audio id="luigiReady">
            <source src="../assets/luigi.wav" type="audio/mpeg">
        </audio>

        <audio id="marioNoReady" >
            <source src="../assets/mario_no.wav" type="audio/mpeg">
        </audio>

        <audio id="luigiNoReady">
            <source src="../assets/luigi_no.wav" type="audio/mpeg">
        </audio>
    </b-container>

    

</template>

<script>
import firebase from '../firebase/fire'

export default {
    data() {
        return {
            whichPlayer: "",
            roomId: "",
            player1: {},
            player2: {
                name: ""
            } ,
            roomName: "",
            allReady: false
        }
    },
    methods: {
        play() {
            firebase.database().ref(`rooms/${this.roomId}/playing`).set(true, snapshot => {
            })
        },
        changeStatus() {
            if(this.player1.ready) {
                firebase.database().ref(`rooms/${this.roomId}/player1/ready`).set(false, snapshot => {
                })
                let notReady = document.getElementById("marioNoReady");
                notReady.play();
            } else {
                firebase.database().ref(`rooms/${this.roomId}/player1/ready`).set(true, snapshot => {
                })
                let ready = document.getElementById("marioReady");
                ready.play();
            }
        },
        changeStatus2() {
            if(this.player2.ready) {
                firebase.database().ref(`rooms/${this.roomId}/player2/ready`).set(false, snapshot => {
                })
                let notReady = document.getElementById("luigiNoReady");
                notReady.play();
            } else {
                firebase.database().ref(`rooms/${this.roomId}/player2/ready`).set(true, snapshot => {
                })
                let ready = document.getElementById("luigiReady");
                ready.play();
            }
        }
    },
    mounted: function() {
        let whichPlayer = localStorage.getItem('player')
        this.whichPlayer = whichPlayer
        let self = this
        this.roomId = this.$route.params.roomId
        firebase.database().ref(`rooms/${this.$route.params.roomId}`).on('value', function(snapshot) {
            self.player1 = snapshot.val().player1;
            if(!snapshot.val().player2.name) {
                self.player2 = {
                    name: "",
                    ready: "false"
                }    
            } else {
                self.player2 = snapshot.val().player2;
            }
            self.roomName = snapshot.val().name;
            if(snapshot.val().player2.ready && snapshot.val().player1.ready) {
                console.log('Theyre REady!!!!!!!')
                self.allReady = true
            } else {
                console.log('Theyre NOT REady')
                self.allReady = false
            }
            if(snapshot.val().playing == true) {
                self.$router.push('/about') //change to playing route
            }
        })
    }


}
</script>


<style>

</style>
