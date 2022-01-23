<template>
    <section>
        <div class="search">
            <label>
                <p class="search__label">Поиск:</p>
                <input
                    type="search"
                    placeholder="Начните набирать символ..."
                    class="search__input"
                    v-model="search"
                    @input="getAndFilterRates"
                >
            </label>
        </div>
        <div v-if="listRates.length">
            <ul class="rate-list">
                <li
                    class="rate-elem"
                    v-for="rate in listRates"
                    :key="rate.ID"
                    @click="openConverter(rate)"
                >
                    <div class="rate-type">
                        <p class="rate-elem__charcode">{{ rate.CharCode }}</p>
                        <div class="rate-elem__nominal">
                            {{ rate.Nominal }} {{ rate.Name }}
                        </div>
                    </div>
                    <span class="rate-elem__value">{{ rate.Value }}</span>
                </li>
            </ul>
            <button
                v-if="isNeedShowMore"
                class="show-more-btn"
                @click="getAndAddRatesPortion"
            >
                Показать еще...
            </button>
        </div>
        <p v-else>Ничего не найдено!</p>
    </section>
</template>

<script>
import { getRatesPortion, getAllRates } from './utils.js';
import { PAGE_SIZE } from './constants.js';

export default {
  name: 'ListExchangeRates',

    data() {
        return {
            listRates      : [],
            page           : 0,
            search         : '',
            isNeedShowMore : true,
        };
    },

    async mounted() {
        try {
            let firstPartRates = await getRatesPortion(1)

            this.listRates = [...firstPartRates];
        } catch ( error ) {
            console.log(error);
        }
    },

    computed : {
        nextPage() {
            return Math.ceil( this.listRates.length / PAGE_SIZE ) + 1;
        },
    },

    methods : {
        filterRates( rates ) {
            this.isNeedShowMore = false;

            this.listRates = rates.filter( rate => {
                const regex = new RegExp(this.search, 'i');

                return rate.Name.match(regex) || rate.CharCode.match(regex)
            });
        },

        async getAndFilterRates() {
            try {
                const allRates = await getAllRates();

                this.filterRates(allRates)
            } catch (error) {
                console.log(error)
            }
        },

        addRates(rates) {
            if(!rates.length) {
                this.isNeedShowMore = false;
            }

            this.listRates = [...this.listRates, ...rates]
        },

        async getAndAddRatesPortion() {
            try {
                const currentPartRates = await getRatesPortion(this.nextPage);

                this.addRates(currentPartRates);
            } catch (error) {
                console.log(error)
            }
        },

        openConverter( rate ) {
            this.$emit('open-converter', {
                rateName: rate.CharCode,
                rateNominal : rate.Nominal,
                rateValue: rate.Value
            });
        },
    },

};
</script>

<style lang="less">
@import "../main.less";

.search {
    display: inline-block;
    margin-bottom: 24px;

    &__input {
        height: 44px;
        width: 456px;
        color: #000000;
        padding: 5px;
        background: #FFFFFF;
        border: 1px solid #919191;
        box-sizing: border-box;
        border-radius: 4px;
        outline: none;
    }

    &__input:hover {
        border: 1px solid #52575C;
    }

    &__label {
        text-align: left;
        margin-bottom: 5px;
    }
}

input.search__input::placeholder {
    color: #000000;
}

.rate-list {
    padding: 0;
}

.rate-type {
    text-align: left;
    margin: 10px 0px 6px 12px;
}

.rate-elem {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #E5E5E5;
    height: 62px;
    cursor: pointer;

    &__nominal {
        .text-normal();

        font-size: 13px;
        line-height: 18px;
        color: #52575C;
    }

    &__charcode {
        .text-normal-bold();

        font-size: 20px;
        line-height: 24px;
        margin: 0;
        padding: 0;
        color: #000000;
    }

    &__value {
        .text-normal-bold();

        font-size: 20px;
        line-height: 24px;
        margin: 0;
        padding: 0;
        align-self: center;
        margin-right: 12px;
        color: #52575C;
    }

}

.rate-elem:last-of-type {
    margin-bottom: 36px;
    border-bottom: 1px solid #E5E5E5;
}

.rate-elem:hover {
    background: rgba(196, 196, 196, 0.1);
}

.show-more-btn {
    display: block;
    margin-bottom: 6px;
    border: none;
    background: transparent;
    height: 30px;
    margin: 0 auto;
}

.show-more-btn:hover {
    background: rgba(196, 196, 196, 0.1);
}

</style>
