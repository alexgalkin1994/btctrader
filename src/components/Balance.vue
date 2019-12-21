<template>
  <div class="balance">
    <div class="title">Kontostand</div>
    <div class="amount-in-fiat">
      5678,37
      <span class="muted">EUR</span>
    </div>
    <div class="amount-in-btc">
      0,8372
      <span class="muted">BTC</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Balance",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss">
$text-color: #f1faff;
$muted-text-color: rgba(
  $color: $text-color,
  $alpha: 0.7
);
.balance {
  padding: 30px;
  width: 350px;
  height: 250px;
  background-image: linear-gradient(320deg, #7a4bfd 0%, #ef7ec4 80%);
  box-shadow: 3px 4px 5px rgba($color: #0e0e0e, $alpha: 0.7);
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
  text-shadow: 3px 2px 0px #ef7ec4;
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
