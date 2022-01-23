<template>
  <div id="app">
    <ExchangeRates/>
  </div>
</template>

<script>
import ExchangeRates from './components/ExchangeRates.vue'

export default {
  name: 'App',
  components: {
    ExchangeRates
  }
}
</script>

<style>
#app {
  margin: 36px 0px;
}

html,
body {
    background-color:#E5E5E5;
}
</style>
