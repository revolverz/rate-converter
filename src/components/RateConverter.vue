<template>
    <section class="rate-converter">
        <img
            class="rate-converter__close-picture"
            src="../assets/close.svg"
            alt="Закрыть"
            @click="$emit('close-converter')"
        >
        <div class="rate-converter__wrapper">
            <div
                class="rate-converter__input-wrapper rate-converter__input-wrapper_type_rubles"
                :class="positionInputTypeRubles"
            >
                <label>
                    <p class="rate-converter__input-label">В рублях</p>
                    <cleave
                        v-model="rubAmount"
                        :options="{ numeral: true }"
                        placeholder="0"
                        class="rate-converter__input rate-converter__input_type_rubles"
                        ref="inputRubAmount"
                    />
                    <p class="rate-converter__input-hint">
                        1 RUR = {{ currentRubleExchangeRate }}
                    </p>
                </label>
            </div>

            <img
                class="rate-converter__arrow-picture"
                src="../assets/arrow.svg"
                alt="Обратная конвертация"
                @click="reverseValues"
            >

            <div
                class="rate-converter__input-wrapper rate-converter__input-wrapper_type_foreign"
                :class="positionInputTypeForeign"
            >
                <label>
                    <p class="rate-converter__input-label">{{ rate.name }}</p>
                    <cleave
                        v-model="foreignAmount"
                        :options="{ numeral: true }"
                        placeholder="0"
                        class="rate-converter__input rate-converter__input_type_foreign"
                        ref="inputForeignAmount"
                    />
                    <p class="rate-converter__input-hint">
                        1 {{ rate.name }} = {{ rate.value.toFixed(4) }}
                    </p>
                </label>
            </div>

            <button
                class="rate-converter__reset-values-btn"
                @click="resetValues"
            >
                Сбросить значения
            </button>
        </div>
    </section>
</template>

<script>
import Cleave from 'vue-cleave-component';
import Big from 'big.js';

export default {
    name: 'RateConverter',

    components: {
        Cleave,
    },

    props : {
        rate : {
            type     : Object,
            required : true,
        },
    },

    watch: {
        currentRubleExchangeRate() {
            this.resetValues()
        },
    },

    data() {
        return {
            rubAmount      : null,
            foreignAmount  : null,
            isValuesReverse : false,
        }
    },

    computed : {
        currentRubleExchangeRate() {
            return new Big(1 / this.rate.value.toFixed(4)).toNumber();
        },

        positionInputTypeRubles() {
            return this.isValuesReverse ? 'rate-converter__input-wrapper_type_rubles-position' : '';
        },

        positionInputTypeForeign() {
            return this.isValuesReverse ? 'rate-converter__input-wrapper_type_foreign-position' : '';
        },
    },

    mounted() {
        this.$refs.inputForeignAmount?.$el.addEventListener('keyup', () => {
            this.foreignToRub()
        });
        this.$refs.inputRubAmount?.$el.addEventListener('keyup', () => {
            this.rubToForeign()
        });
    },

    methods : {
        foreignToRub() {
            this.rubAmount = new Big(this.foreignAmount * this.rate.value).toNumber();
        },

        rubToForeign() {
            this.foreignAmount = new Big(this.rubAmount / this.rate.value * this.rate.nominal).toNumber();
        },

        resetValues() {
            this.rubAmount = null;
            this.foreignAmount = null;
        },

        reverseValues() {
            this.isValuesReverse = !this.isValuesReverse;

            if (this.isValuesReverse) {
                this.foreignAmount = new Big(this.rubAmount).toNumber();
                this.foreignToRub();
            } else {
                this.rubAmount = new Big(this.foreignAmount).toNumber();
                this.rubToForeign();
            }
        },
    },
}
</script>

<style lang="less">
@import "../main.less";
@import "../media-queries.less";

.rate-converter {
    border-left: 1px solid #E5E5E5;

    &__arrow-picture {
        width: 48px;
        height: 48px;
        align-self: center;
        margin-bottom: 24px;
        order : 1;

        &:hover {
            opacity: 0.66;
        }
    }

    &__close-picture {
       margin: 12px;
       cursor: pointer;
       width: 24px;
       height: 24px;

        &:hover {
            opacity: 0.66;
        }

        .mobile({
            width: 48px;
            height: 48px;
        })
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-top: 60px;

        .mobile({
            order: 2;
        })
    }

    &__input-wrapper {
        margin: 0px 24px;
        margin-bottom: 36px;

        &_type_rubles {
            order : 0;

            &-position {
                order : 2;
            }
        }

        &_type_foreign {
            order : 2;

            &-position {
                order : 0;
            }
        }

        .mobile({
            margin-bottom: 24px;
        })
    }

    &__input {
        .text-normal-bold();

        height: 180px;
        font-size: 48px;
        color:#52575C;
        text-align: right;
        padding-right: 12px;
        outline: none;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid #919191;

        .mobile({
            height: 100px;
        })
    }

    &__input:hover {
        border: 1px solid #52575C;
    }

    &__input-hint {
        .text-normal();

        font-size: 13px;
        line-height: 18px;
        display: block;
        margin: 0;
        text-align: right;
        margin-right: 19px;
    }

    &__input-label {
        margin-bottom: 5px;
        margin-top: 0;
        text-align: left;
    }

    &__reset-values-btn {
        background-color: #fff;
        color: #25282b;
        border: 1px solid #75bd7a;
        height: 45px;
        width: 138px;
        margin: 0 auto;
        margin-bottom: 36px;
        order: 4;

        &:hover {
            color: #53ad59;
            border: 1px solid #53ad59;
        }
    }
}
</style>
