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
  background-color: #E5E5E5;
}
</style>
