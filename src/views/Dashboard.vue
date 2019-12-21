<template>
  <div class="home">
    <div class="greeting">
      <span class="price"
        >Hallo, Alex! Zur Zeit kannst du 1 BTC für
        <span :class="{ 'loading-money': loading }">{{ buy_price }} EUR</span>
        kaufen und für
        <span :class="{ 'loading-money': loading }">{{ buy_price }} EUR</span>
        verkaufen.</span
      >
    </div>
    <div class="overview">
      <Balance class="balance" />
      <BuySell :curr_buy_price="buy_price" :curr_sell_price="sell_price" />
    </div>
  </div>
</template>

<script>
import Balance from "@/components/Balance.vue";
import BuySell from "@/components/BuySell.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    Balance,
    BuySell
  },
  data() {
    return {
      polling: null,
      baseURL: "https://blockchain.info",
      buy_price: null,
      sell_price: null,
      loading: true
    };
  },
  methods: {
    pollData() {
      this.polling = setInterval(() => {
        axios
          .get(`${this.baseURL}/ticker`)
          .then(response => {
            this.buy_price = response.data.EUR.buy;
            this.sell_price = response.data.EUR.sell;
            this.loading = false;
          })
          .catch(error => {
            console.log(error);
          });
      }, 3000);
    }
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  created() {
    axios
      .get(`${this.baseURL}/ticker`)
      .then(response => {
        this.buy_price = response.data.EUR.buy;
        this.sell_price = response.data.EUR.sell;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      });
    this.pollData();
  }
};
</script>

<style lang="scss" scoped>
.greeting {
  margin: 65px 0px;

  span {
    font-size: 3rem;
    font-weight: 300;
  }

  .price {
    text-shadow: 3px 4px 5px #0e0e0e;
  }
}

.overview {
  display: flex;
}

.balance {
  margin-right: 70px;
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
