<template>
  <div class="hello">
 

   
  </div>
</template>

<script>
import axios from "axios";
import db from "../assets/config.js";

export default {
  name: "HelloWorld",
  data: function() {
    return {
      card: {}
    };
  },
  props: {
    msg: String
  },
  created() {
    this.getCard();
  },
  methods: {
    getCard() {
      axios({
        method: "GET",
        url: `https://deckofcardsapi.com/api/deck/new/draw/?count=1`
      })
        .then(cards => {
          console.log(cards.data.cards[0]);
          this.card.code = cards.data.cards[0].code;
          this.card.value = cards.data.cards[0].value;
          this.card.imgUrl = cards.data.cards[0].image;

          db.ref("card/" + cards.data.cards[0].code).set(cards.data.cards[0]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
