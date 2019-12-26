<template>
  <div class="my-bitcoin">
    <div class="content">
      <input
        placeholder="0"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = '0'"
        v-model.number="amount"
        type="text"
      />
      <span class="btc-label">BTC</span>

      <div class="buttons">
        <a class="add-button button" @click="addToWallet">Hinzufügen</a>
        <a class="remove-button button" @click="removeFromWallet">Entfernen</a>
      </div>

      <transition name="slide-fade">
        <div class="notification" v-if="just_added || just_removed">
          <a class="close-button" @click="closeNotification()">
            <font-awesome-icon class="close-icon" icon="times" />
          </a>
          {{ last_amount }}&nbsp;BTC&nbsp;
          <span v-if="just_added">hinzugefügt!</span>
          <span v-if="just_removed">entfernt!</span>
        </div>
      </transition>
    </div>
    <History
      v-if="transactions.length > 0"
      class="transaction-history"
      :transactionHistory="transactions"
    />
  </div>
</template>

<script>
import History from "@/components/History.vue";

export default {
  name: "MyBitcoin",
  components: { History },
  data() {
    return {
      amount: null,
      last_amount: null,
      just_added: false,
      just_removed: false,
      transactions: []
    };
  },
  methods: {
    // Add btc to wallet
    addToWallet() {
      this.just_removed = false;
      const oldBalance = localStorage.getItem("wallet") || 0;
      const newBalance = parseFloat(oldBalance) + this.amount;
      localStorage.setItem("wallet", newBalance);
      this.just_added = true;
      this.last_amount = this.amount;
      this.addToTransactionHistory(this.amount, "positive");
      this.amount = null;
      setTimeout(this.closeNotification, 5000);
    },
    // Remove btc from wallet
    removeFromWallet() {
      this.just_added = false;
      const oldBalance = localStorage.getItem("wallet") || 0;
      const newBalance = parseFloat(oldBalance) - this.amount;
      localStorage.setItem("wallet", newBalance);
      this.just_removed = true;
      this.last_amount = this.amount;
      this.addToTransactionHistory(this.amount, "negative");
      this.amount = null;
      setTimeout(this.closeNotification, 5000);
    },
    // Close added/removed notificaiton
    closeNotification() {
      this.just_added = false;
      this.just_removed = false;
    },
    // Add transaction to localstorage
    addToTransactionHistory(amount, posneg) {
      let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
      const transaction = { amount, posneg, date: Date.now() };
      transactions.push(transaction);
      this.transactions.push(transaction);
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  },
  created() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    this.transactions = transactions;
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

.btc-label {
  margin: 0 50px 0 10px;
}
.my-bitcoin {
  position: relative;
  font-size: 3rem;
  height: 100%;
  width: 100%;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transaction-history {
  height: 80%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
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
  transition: all 0.3s;
  margin: 10px 0;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 2px 4px 4px rgba($color: #0e0e0e, $alpha: 0.5);
  }
}
.add-button {
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

.remove-button {
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
</style>
