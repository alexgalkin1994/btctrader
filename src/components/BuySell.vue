<template>
  <div class="balance">
    <div class="top-bar">
      <div class="title">Kaufen / Verkaufen</div>
      <div class="select-currency">EUR</div>
    </div>
    <div class="buy">
      <input
        v-model.number="btc_buy_quantity"
        @input="btc_buy_transform"
        type="text"
        id="btcinput"
        placeholder="0"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = '0'"
      />
      <span>BTC</span>
      <span class="fuer">für</span>

      <div class="value-in-fiat">{{ action_buy_price_eur }} EUR</div>
      <a class="buy-button button" href="#">Kaufen</a>
    </div>
    <div class="sell">
      <input
        @input="btc_sell_transform"
        v-model.number="btc_sell_quantity"
        type="text"
        id="btcinput"
        placeholder="0"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = '0'"
      />
      <span>BTC</span>
      <span class="fuer">für</span>
      <!-- <img class="swap-icon" src="../assets/swap.svg" alt srcset /> -->
      <div class="value-in-fiat">{{ action_sell_price_eur }} EUR</div>
      <a class="sell-button button" href="#">Verkaufen</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Balance",
  props: ["curr_buy_price", "curr_sell_price"],
  data() {
    return {
      action_buy_price_eur: 0.0,
      action_sell_price_eur: 0.0,
      btc_buy_quantity: null,
      btc_sell_quantity: null
    };
  },
  methods: {
    btc_buy_transform() {
      this.action_buy_price_eur = this.btc_buy_quantity * this.curr_buy_price;
      this.action_buy_price_eur = this.action_buy_price_eur.toFixed(2);
    },
    btc_sell_transform() {
      this.action_sell_price_eur =
        this.btc_sell_quantity * this.curr_sell_price;
      this.action_sell_price_eur = this.action_sell_price_eur.toFixed(2);
    }
  }
};
</script>

<style scoped lang="scss">
$text-color: #f1faff;
$background-color: #262640;
$muted-text-color: rgba(
  $color: $text-color,
  $alpha: 0.7
);
.balance {
  width: 525px;
  height: 250px;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(
    320deg,
    rgba($color: #7a4bfd, $alpha: 0.1) 0%,
    rgba($color: #ef7ec4, $alpha: 0.1) 80%
  );
}

.buy,
.sell {
  display: flex;
  align-items: center;
  border-radius: inherit;
  font-size: 1.5rem;
  font-weight: bold;
  //background-color: $background-color;
  margin-bottom: 30px;
}

.button {
  display: flex;
  box-shadow: 1px 2px 3px rgba($color: #0e0e0e, $alpha: 0.5);
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 7rem;
  height: 2rem;
  font-weight: 400;
  font-size: 1rem;
  text-decoration: none;
  color: $text-color;
  text-align: center;
  margin-left: auto;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 2px 4px 4px rgba($color: #0e0e0e, $alpha: 0.5);
  }
}

.buy-button {
  background-image: linear-gradient(
    44deg,
    rgba($color: #26b681, $alpha: 0.9) 0%,
    rgba($color: #71eeee, $alpha: 0.9) 100%
  );
  transition: all 0.3s;
  &:hover {
    background-image: linear-gradient(
      44deg,
      rgba($color: #26b681, $alpha: 1) 0%,
      rgba($color: #71eeee, $alpha: 1) 100%
    );
  }
}

.sell-button {
  background-image: linear-gradient(
    44deg,
    rgba($color: #e83785, $alpha: 0.9) 0%,
    rgba($color: #f97575, $alpha: 0.9) 100%
  );
  transition: all 0.3s;
  &:hover {
    background-image: linear-gradient(
      44deg,
      rgba($color: #e83785, $alpha: 1) 0%,
      rgba($color: #f97575, $alpha: 1) 100%
    );
  }
}

.swap-icon {
  margin: 0 25px;
}

input[type="text"] {
  width: 7rem;
  font-size: 1.5rem;
  padding: 5px 0px;
  margin-right: 10px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
}

.title {
  font-size: 1.25rem;
  margin-bottom: 35px;
}

.amount-in-fiat {
  font-size: 3rem;
  font-weight: bold;
}

.amount-in-btc {
  font-size: 1.25rem;
  font-weight: bold;
}

.fuer {
  margin: 0px 20px;
}

.muted {
  color: $muted-text-color;
}
</style>
