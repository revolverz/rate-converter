import { RATES_SCRIPT_SOURCE } from './constants.js';
import axios from 'axios';

const getArrRange = (array, range, part) => {
    let start = range * (part - 1);
    let end = (range * part);

    return array.slice(start, end);
}

/**
 * Преобразовывает данные в массив для удобства итерации
 * @param  {object} rates объект с валютами
 * @return {array} Возвращает массив объектов валют
 */
const convertToArray = (rates) => {
    const arrayRates = Object.keys(rates).map(function (key) { return rates[key]; });

    return arrayRates;
 }

/**
 * Делает запрос на удаленный сервер ЦБ для получения курсов валлют
 * @param  {number} pageNumber номер диапазона
 * @return {array} Возвращает текущий диапазон объектов валют
 */

export const getRates = async (pageNumber)  => {
    const result = await axios( {
        method  : 'get',
        url : RATES_SCRIPT_SOURCE,
    } );

    if ( !result.data ) {
        throw 'Data fetch error!';
    }

    const rates = convertToArray(result.data.Valute);
    const currentPartRates = getArrRange(rates, 10, pageNumber )

    return currentPartRates;
}


import { dinero, convert } from 'dinero.js';
import { USD, EUR } from '@dinero.js/currencies';

export const converting = () => {
    const rates = { EUR: { amount: 89, scale: 2 } };
    const d = dinero({ amount: 500, currency: USD });

    console.log("d", d);

    convert(d, EUR, rates); // a Dinero object with amount 44500 and scale 4
}

export const foreignToRub = (amount, rate) => {
    const rubRate = amount * rate;

    return rubRate;
}

export const rubToForeign = (amount, rate) => {
    const foreignRate = amount / rate;

    return foreignRate;
}
