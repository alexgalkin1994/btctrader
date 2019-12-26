<template>
  <div class="balance">
    <transition-group name="fade" mode="out-in">
      <div key="1" class="title">Kontostand</div>
      <div key="2" class="amount-in-fiat">
        {{ currentEURBalance }}
        <span key="3" class="muted">EUR</span>
      </div>
      <div key="4" class="amount-in-btc">
        {{ localizedBTC() }}
        <span key="5" class="muted">BTC</span>
      </div>
    </transition-group>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Balance",
  props: ["curr_price"],
  data() {
    return {
      currentEURBalance: 0,
      currentBTCBalance: 0
    };
  },
  methods: {
    localizedBTC() {
      const zero = 0;

      console.log(this.curr_price, this.currentBTCBalance);
      if (this.currentBTCBalance === null) {
        return zero.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
      return parseFloat(this.currentBTCBalance).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    currentEURPrice() {
      const BTCamount = localStorage.getItem("wallet");
      this.currentBTCBalance = BTCamount;

      let currEURPrice = BTCamount * parseFloat(this.curr_price);
      this.currentEURBalance = currEURPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  },
  created() {
    this.localizedBTC();
    this.currentEURPrice();
  },
  computed: {},
  watch: {
    curr_price(newPrice, oldPrice) {
      const BTCamount = localStorage.getItem("wallet");
      console.log("nbtc", BTCamount);
      this.currentBTCBalance = BTCamount;

      let currEURPrice = BTCamount * parseFloat(newPrice);
      this.currentEURBalance = currEURPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }
};
</script>

<style scoped lang="scss">
$text-color: #f1faff;
$muted-text-color: rgba(
  $color: $text-color,
  $alpha: 0.7
);

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.balance {
  padding: 30px;
  width: fit-content;
  height: 250px;
  background-image: linear-gradient(320deg, #7a4bfd 0%, #ef7ec4 80%);
  box-shadow: 3px 4px 5px rgba($color: #0e0e0e, $alpha: 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 5px 6px 7px rgba($color: #0e0e0e, $alpha: 0.9);
  }
}

.title {
  font-size: 1.25rem;
  margin-bottom: 30px;
}

.amount-in-fiat {
  font-size: 3rem;
  //text-shadow: 3px 2px 0px #ef7ec4;
  font-weight: bold;
}

.amount-in-btc {
  font-size: 1.25rem;
  font-weight: bold;
}

.muted {
  color: $muted-text-color;
}
</style>
