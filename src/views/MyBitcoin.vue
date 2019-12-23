<template>
  <div class="my-bitcoin">
    <input
      placeholder="0"
      onfocus="this.placeholder = ''"
      onblur="this.placeholder = '0'"
      v-model.number="amount"
      type="text"
    />
    <span class="btc-label">BTC</span>
    <div class="buttons">
      <a class="add-button button" @click="addToWallet" href="#">Hinzufügen</a>
      <a class="remove-button button" @click="removeFromWallet" href="#">Entfernen</a>
    </div>
    <transition name="slide-fade">
      <div class="notification" v-if="(just_added || just_removed)">
        <a class="close-button" @click="closeNotification()" href="#">
          <font-awesome-icon class="close-icon" icon="times" />
        </a>
        {{last_amount}}&nbsp;BTC&nbsp;
        <span v-if="just_added">hinzugefügt!</span>
        <span v-if="just_removed">entfernt!</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MyBitcoin",
  data() {
    return {
      amount: null,
      last_amount: null,
      just_added: false,
      just_removed: false
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
      this.amount = null;
    },
    // Remove btc from wallet
    removeFromWallet() {
      this.just_added = false;
      const oldBalance = localStorage.getItem("wallet") || 0;
      const newBalance = parseFloat(oldBalance) - this.amount;
      localStorage.setItem("wallet", newBalance);
      this.just_removed = true;
      this.last_amount = this.amount;
      this.amount = null;
    },
    // Close added/removed notificaiton
    closeNotification() {
      this.just_added = false;
      this.just_removed = false;
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

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.btc-label {
  margin: 0 30px;
}
.my-bitcoin {
  position: relative;
  font-size: 3rem;
  height: 100%;
  width: 100%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
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

.notification {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 30px;
  right: 30px;
  border-radius: 5px;
  padding: 20px;
  height: 50px;
  font-size: 1rem;
  white-space: pre-wrap;

  background-image: linear-gradient(
    44deg,
    rgba($color: #e83785, $alpha: 0.9) 0%,
    rgba($color: #71eeee, $alpha: 0.9) 100%
  );
  transition: all 0.3s;
  &:hover {
    background-image: linear-gradient(
      44deg,
      rgba($color: #e83785, $alpha: 1) 0%,
      rgba($color: #71eeee, $alpha: 1) 100%
    );
  }
}

.close-button {
  position: absolute;
  top: 1px;
  right: 5px;
  color: $text-color;
  text-decoration: none;
  opacity: 0.7;
}
</style>