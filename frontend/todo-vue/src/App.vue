<script></script>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/archive">Archive</router-link>
  </div>
  <router-view />
</template>

<style scoped>

@media (min-width: 1024px) {
  #nav {
    display: flex;
    justify-content: center;
    font-family: 'Inter';
    font-size: 1.2rem;
    background-color: #B6CFD8;
  }

  #nav a {
    color: #000000;
    padding: 20px;
  }

  #nav a.router-link-active {
    background-color: hsla(160, 100%, 37%, 0.2);
  }


  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
