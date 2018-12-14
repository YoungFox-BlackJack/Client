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
        <H1>Player 1 Wins</H1>
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
              <b-card border-variant="dark" header="Player 1" align="center">
                <b-row>
                  <div>
                    <b-card-group>
                      <b-card
                        align="center"
                        img-src="https://cdn.onlinewebfonts.com/svg/img_561205.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://cdn.onlinewebfonts.com/svg/img_561205.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://cdn.onlinewebfonts.com/svg/img_561205.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://cdn.onlinewebfonts.com/svg/img_561205.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://cdn.onlinewebfonts.com/svg/img_561205.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://cdn.onlinewebfonts.com/svg/img_561205.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://cdn.onlinewebfonts.com/svg/img_561205.png"
                      ></b-card>
                    </b-card-group>
                  </div>
                </b-row>
                <!-- bottom -->
                <b-row>
                  <b-col>
                    <div>
                      <div>
                        <b-button style="margin:20px">Pass</b-button>
                        <b-button style="margin-left:10px ">Next</b-button>
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
              <b-card border-variant="dark" header="Player 2" align="center">
                <b-row>
                  <div>
                    <b-card-group>
                      <b-card
                        align="center"
                        img-src="https://cdn.onlinewebfonts.com/svg/img_561205.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://opengameart.org/sites/default/files/styles/medium/public/card%20back%20black.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://opengameart.org/sites/default/files/styles/medium/public/card%20back%20black.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://opengameart.org/sites/default/files/styles/medium/public/card%20back%20black.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://opengameart.org/sites/default/files/styles/medium/public/card%20back%20black.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://opengameart.org/sites/default/files/styles/medium/public/card%20back%20black.png"
                      ></b-card>
                      <b-card
                        align="center"
                        img-src="https://opengameart.org/sites/default/files/styles/medium/public/card%20back%20black.png"
                      ></b-card>
                    </b-card-group>
                  </div>
                </b-row>
                <!-- bottom -->
                <b-row>
                  <b-col>
                    <div>
                      <div>
                        <b-button style="margin:20px">Pass</b-button>
                        <b-button style="margin-left:10px ">Next</b-button>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <!-- n-buttom -->
              </b-card>
            </b-card-group>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>
<!-- carousel-1.vue -->