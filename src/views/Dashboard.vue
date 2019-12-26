<template>
  <div class="home">
    <div v-if="!loading" class="greeting">
      <span class="price">Hallo, {{ userFirstName }}!</span>
    </div>

    <!-- Balance view serves as a button to add and remove btc -->
    <Balance
      @click.native="$router.push({ path: 'mybitcoin' })"
      v-if="!loading"
      :curr_price="buy_price"
      class="balance"
    />

    <!-- Table for current btc prices -->
    <PriceOverview class="price-overview" :currentPrices="currentPrices" />
  </div>
</template>

<script>
import Balance from "@/components/Balance.vue";
import BuySell from "@/components/BuySell.vue";
import PriceOverview from "@/components/PriceOverview.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    Balance,
    BuySell,
    PriceOverview
  },
  data() {
    return {
      polling: null,
      baseURL: "https://blockchain.info",
      buy_price: null,
      sell_price: null,
      loading: true,
      stopPolling: false,
      currentPrices: {},
      userFirstName: "Gast"
    };
  },
  methods: {
    pollData() {
      // Prevent polling after element is destroyed / different page was loaded
      if (this.stopPolling) return;
      // Get bitcoin price via API every 10 seconds
      axios
        .get(`${this.baseURL}/ticker`)
        .then(response => {
          this.buy_price = response.data.EUR.buy;
          this.sell_price = response.data.EUR.sell;
          this.loading = false;
          this.currentPrices = response.data;
        })
        .catch(error => {
          console.log(error);
        });
      setTimeout(this.pollData, 10000);
    }
  },
  created() {
    // Get user data
    this.pollData();
    const user = JSON.parse(localStorage.getItem("user"));
    this.userFirstName = user.firstName;
  },
  beforeDestroy() {
    // Dont poll after leaving view
    this.stopPolling = true;
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 60vh;
  margin: 65px 0px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  box-sizing: border-box;
}

.price-overview {
  max-width: 100%;
  max-height: 100%;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}
.greeting {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;

  span {
    font-size: 3rem;
    font-weight: 300;
  }

  .price {
    text-shadow: 3px 4px 5px #0e0e0e;
  }
}

.overview {
}

.balance {
  margin-right: 70px;
  align-self: end;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
}

.loading-money {
  animation: blinking 1s infinite alternate;
}

@keyframes blinking {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}
</style>
