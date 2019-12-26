<template>
  <div id="app">
    <div id="nav">
      <div id="logo">
        <router-link to="/">BTCtrader</router-link>
      </div>
      <!-- Menu -->
      <div id="menu">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/details">Details</router-link>
        <router-link to="/converter">Umrechner</router-link>
        <router-link to="/diagram">Diagramm</router-link>
        <router-link to="/mybitcoin">Mein Bitcoin</router-link>
        <router-link to="/profile">Profil</router-link>
      </div>
    </div>
    <div class="main-window-view">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800&display=swap");
$text-color: #f1faff;
$background-color: #262640;
$muted-text-color: rgba(
  $color: $text-color,
  $alpha: 0.7
);
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
::selection {
  background-color: rgba($color: #ef7ec4, $alpha: 0.99);
  color: white;
}

body {
  margin: 0;
  background-color: $background-color;
  padding: 45px 50px;
  height: 100vh;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-window-view {
  width: 100%;
  max-width: 1340px;
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  a {
    font-weight: bold;
    text-decoration: none;
    color: $muted-text-color;
    margin-left: 30px;
    font-size: 0.875rem;
    letter-spacing: 0.08rem;
    font-weight: 400;
    padding: 5px;

    &:hover {
      color: rgba($color: $text-color, $alpha: 1);
    }

    &.router-link-exact-active {
      color: $text-color;
    }
  }
}

#logo {
  a {
    font-size: 1.5rem;
    font-weight: 800;
    padding: 0;
    margin: 0;
    color: $text-color;
  }
}

.notification {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 30px;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
  width: fit-content;
  border-radius: 5px;
  padding: 20px 30px 20px 20px;
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
  top: 2px;
  right: 7px;
  color: $text-color;
  text-decoration: none;
  opacity: 0.9;
  cursor: pointer;
}

input[type="text"] {
  background: transparent;
  border: none;
  border-bottom: 1px solid $text-color;
  color: $text-color;
  width: 12rem;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  padding: 5px 0px;
  margin-right: 10px;

  &::placeholder {
    color: $muted-text-color;
  }

  &:focus {
    outline: 3px solid transparent;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.02, 0.9, 0.49, 1.06);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
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
  cursor: pointer;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 2px 4px 4px rgba($color: #0e0e0e, $alpha: 0.5);
  }
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

.radio-span {
  color: $text-color;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
  font-size: 14px;
  &:hover {
    background-color: rgba($color: #7a4bfd, $alpha: 0.5);
  }
}

.radio-input {
  display: none;
}

.radio-input:checked + .radio-span {
  background: #7a4bfd;
  color: $text-color;
}
</style>
