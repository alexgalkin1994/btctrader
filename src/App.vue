<template>
  <div id="app">
    <div id="nav">
      <div id="logo">
        <router-link to="/">BTCtrader</router-link>
      </div>
      <div id="menu">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/details">Details</router-link>
        <router-link to="/converter">Umrechner</router-link>
        <router-link to="/diagram">Diagramm</router-link>
        <router-link to="/mybitcoin">Mein Bitcoin</router-link>
      </div>
    </div>
    <router-view />
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

::selection {
  background-color: rgba($color: #ef7ec4, $alpha: 0.99);
  color: white;
}

body {
  margin: 0;
  background-color: $background-color;
  padding: 45px 50px;
}
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
}

#nav {
  display: flex;
  justify-content: space-between;

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
</style>
