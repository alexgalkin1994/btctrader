<template>
  <div class="main-content">
    <div class="transactions">
      <div
        class="transaction-wrapper"
        v-for="(transaction, index) in allTransactions"
        :key="`transaction-${index}`"
      >
        <!-- Check if btc was added or removed from the balance -->
        <div
          v-if="transaction.posneg == 'positive'"
          class="positive-transaction transaction"
        >
          +{{ transaction.amount }} BTC
          <div class="date-time">
            <font-awesome-icon class="clock-icon" icon="clock" />
            {{ localizedDate(transaction.date) }}
          </div>
        </div>

        <div
          v-if="transaction.posneg == 'negative'"
          class="negative-transaction transaction"
        >
          -{{ transaction.amount }} BTC
          <div class="date-time">
            <font-awesome-icon class="clock-icon" icon="clock" />{{
              localizedDate(transaction.date)
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "History",
  props: ["transactionHistory"],
  data() {
    return {
      transactions: []
    };
  },
  methods: {
    // Make the date readable
    localizedDate(date) {
      const localizedDate = new Date(date).toLocaleDateString();
      const localizedTime = new Date(date).toLocaleTimeString();
      return localizedDate + " " + localizedTime;
    }
  },
  computed: {
    // Reverse the list to show the last transaction first
    allTransactions() {
      let transactions = this.transactionHistory;
      return transactions.slice().reverse();
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
.main-content {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 18rem;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 1rem;
  font-weight: 400;
  background-color: rgba($color: #ffffff, $alpha: 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.date-time {
  font-size: 0.75rem;
  color: $muted-text-color;
  position: absolute;
  bottom: 5px;
  left: 10px;
}
.transactions {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.transaction-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    margin-bottom: 20px;
  }
}
.transaction {
  position: relative;
  width: 100%;
  height: 5rem;
  margin: 20px 10px 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.positive-transaction {
  background-color: rgba($color: #26b681, $alpha: 0.9);
  transition: all 0.3s;
  &:hover {
    background-image: linear-gradient(
      44deg,
      rgba($color: #26b681, $alpha: 1) 0%,
      rgba($color: #71eeee, $alpha: 1) 100%
    );
  }
}

.negative-transaction {
  background-color: rgba($color: #e83785, $alpha: 0.9);
  transition: all 0.3s;
  &:hover {
    background-image: linear-gradient(
      44deg,
      rgba($color: #e83785, $alpha: 1) 0%,
      rgba($color: #f97575, $alpha: 1) 100%
    );
  }
}

.clock-icon {
  margin-right: 5px;
}
</style>
