<template>
    <section class="rates-wrapper">
      <section class="rates-list-content">
        <h2 class="title">Курс валют к рублю</h2>
        <list-exchange-rates
          @open-converter="goToConverter($event)"
        />
      </section>
      <rate-converter
        v-if="isConverterOpened"
        class="rate-converter"
        :rate="rate"
      />
    </section>
</template>

<script>
const RateConverter = () => import('./RateConverter.vue');

import ListExchangeRates from './ListExchangeRates.vue';

export default {
  name: 'ExchangeRates',

  components: {
    ListExchangeRates,
    RateConverter,
  },

  data() {
    return {
      isConverterOpened : false,
      rate : {
        name    : '',
        nominal : 0,
        value   : 0,
      }

    }
  },

  methods: {
    goToConverter({ rateName, rateNominal, rateValue }) {
      this.isConverterOpened = true;
      this.rate.name = rateName;
      this.rate.nominal = rateNominal;
      this.rate.value = rateValue;

      window.scrollTo({
        top: 0,
      });
    },
  },

}
</script>

<style style lang="less" scoped>
.rates-wrapper {
    width: max-content;
    display: flex;
    background-color: white;
    border: 1px solid #919191;
    margin: 0 auto;
    box-sizing: border-box;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.06);
    border-radius: 4px 4px 0px 0px;
}

.rates-list-content {
    width: 456px;
    margin: 24px 36px;
    height: 100%;
}

.title {
    text-align: left;
    margin-bottom: 24px;
}
</style>
