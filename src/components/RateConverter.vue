<template>
    <section class="rate-converter">
        <div class="rate-converter__wrapper">
            <div class="rate-converter__input-wrapper rate-converter__input-wrapper_type_rubles">
                <label>
                    <p class="rate-converter__input-label">В рублях</p>
                    <input
                        class="rate-converter__input rate-converter__input_type_rubles"
                        type="text"
                        placeholder="0"
                        v-model="rubAmount"
                        @keyup="rubToForeign"
                    >
                    <p class="rate-converter__input-hint">
                        1 RUR = {{ currentRubleExchangeRate }}
                    </p>
                </label>

            </div>

            <img
                class="rate-converter__arrow-picture"
                src="../assets/arrow.svg"
                alt="Конвертация"
            >
            <div class="rate-converter__input-wrapper rate-converter__input-wrapper_type_foreign">
                <label>
                    <p class="rate-converter__input-label">{{ rate.name }}</p>
                    <input
                        class="rate-converter__input rate-converter__input_type_foreign"
                        type="text"
                        placeholder="0"
                        v-model="foreignAmount"
                        @keyup="foreignToRub"
                    >
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

export default {

    props : {
        rate : {
            type     : Object,
            required : true,
        },
    },

    data() {
        return {
            rubAmount: '',
            foreignAmount : '',
        }
    },

    computed : {
        currentRubleExchangeRate() {
            const value = 1 / this.rate.value;

            return value.toFixed(4);
        }

    },

    methods : {
        foreignToRub() {
            this.rubAmount = this.foreignAmount * this.rate.value;
        },

        rubToForeign() {
            this.foreignAmount = this.rubAmount / this.rate.value * this.rate.nominal;
        },

        resetValues() {
            this.rubAmount = '';
            this.foreignAmount = '';
        }
    },

}
</script>

<style lang="less">
@import "../main.less";

.rate-converter {
    border-left: 1px solid #E5E5E5;

    &__arrow-picture {
        width: 48px;
        height: 48px;
        align-self: center;
        margin-bottom: 24px;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-top: 115px;
    }

    &__input-wrapper {
        width: 516px;
        margin: 0px 24px;
        margin-bottom: 36px;
    }

    &__input {
        .text-normal-bold();

        height: 180px;
        font-size:48px;
        color:#52575C;
        text-align: right;
        padding-right: 12px;
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
        .primary();

        color: #FFFFFF;
        height: 44px;
        width: 138px;
        margin: 0 auto;

        &:hover {
            background-color: #75bd7a;
            box-shadow: 0 1px 3px rgb(0 0 0 / 20%);
        }
    }
}


</style>
