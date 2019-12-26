<template>
  <div class="content">
    <div class="form">
      <span>First Name:</span>
      <input v-model="user.firstName" type="text" />

      <span>Last Name:</span>
      <input v-model="user.lastName" type="text" />

      <span>Age:</span>
      <input v-model="user.age" type="text" />
    </div>

    <a class="button update-button" @click="updateProfile">Aktualisieren</a>

    <transition name="slide-fade">
      <div class="notification" v-if="updated">
        <a class="close-button" @click="closeNotification">
          <font-awesome-icon class="close-icon" icon="times" />
        </a>
        <span>Profil erfolgreich aktualisiert!</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      updated: false,
      user: { firstName: "", lastName: "", age: null }
    };
  },
  methods: {
    // Update the profile
    updateProfile() {
      localStorage.setItem("user", JSON.stringify(this.user));
      this.updated = true;
      setTimeout(this.closeNotification, 5000);
    },
    // Close notification
    closeNotification() {
      this.updated = false;
    }
  },
  created() {
    // Prefill data fields
    const user = JSON.parse(localStorage.getItem("user")) || {};
    this.user = user;
  }
};
</script>

<style scoped lang="scss">
.content {
  font-size: 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 30px;
  justify-items: center;
  align-items: center;
}
.form-item {
  margin: 20px;
}

input {
  font-size: 1rem;
  width: 7rem;
  text-align: left;
}

.update-button {
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
  margin-left: 0;
}
</style>
