<template>
  <div class="content">
    <input
      v-model="fiat_input"
      placeholder="0"
      onfocus="this.placeholder = ''"
      onblur="this.placeholder = '0'"
      @input="searchTimeOut"
      type="text"
    />
    <div class="select-dropdown">
      <select @change="searchTimeOut" v-model="selected">
        <option value="EUR" selected>EUR</option>
        <option value="USD">USD</option>
        <option value="AUD">AUD</option>
        <option value="NZD">NZD</option>
        <option value="GBP">GBP</option>
      </select>
    </div>

    <font-awesome-icon class="sync-icon" icon="sync" />
    <span class="btc-output">{{ btc_output }} BTC</span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selected: "EUR",
      fiat_input: null,
      btc_output: 0
    };
  },
  methods: {
    searchTimeOut() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.convertToBTC();
      }, 800);
    },

    convertToBTC() {
      const currency = this.selected;
      let value = this.fiat_input;
      if (this.fiat_input != null && this.fiat_input != "") {
        axios
          .get("https://blockchain.info/tobtc", {
            params: {
              currency,
              value
            }
          })
          .then(response => {
            this.btc_output = parseFloat(
              response.data.toString().replace(/,/g, "")
            ).toLocaleString();
            console.log(this.btc_output);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.btc_output = 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$text-color: #f1faff;
$background-color: #262640;
$muted-text-color: rgba(
  $color: $text-color,
  $alpha: 0.7
);

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 3rem;
  font-weight: bold;
  overflow: hidden;
}

.select-dropdown {
  position: relative;
  background-color: $background-color;
  width: auto;
  float: left;
  max-width: 100%;
  select {
    font-size: 3rem;
    max-width: 100%;
    color: $text-color;
    font-weight: bold;
    padding: 8px 24px 8px 10px;
    border: none;
    background-color: transparent;
    appearance: none;
    &:active,
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  &:after {
    content: " ";
    position: absolute;
    top: 50%;
    margin-top: -2px;
    right: 8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid $text-color;
  }
}

.sync-icon {
  margin: 0 75px;
}

.btc-output {
}
</style>
