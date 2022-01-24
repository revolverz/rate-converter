import { RATES_SCRIPT_SOURCE } from './constants.js';
import axios from 'axios';

/**
 * Отдает следующую порцию элементов
 * @param  {array} rates весь массив с объектами валют
 * @param  {number} range запрошенное число элементов
 * @param  {number} part номер диапазона
 * @return {array} Возвращает порцию объектов валют
 */
const getArrRange = (rates, range, part) => {
    const start = range * (part - 1);
    const end = (range * part);

    return rates.slice(start, end);
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
 * Делает запрос на удаленный сервер ЦБ для получения курсов валют
 * @return {array} Возвращает весь массив валют
 */
export const getAllRates = async ()  => {
    const result = await axios( {
        method  : 'get',
        url : RATES_SCRIPT_SOURCE,
    } );

    if ( !result.data ) {
        throw 'Data fetch error!';
    }

    const rates = convertToArray(result.data.Valute);

    return rates;
}

/**
 * Запрашивает все валюты и отбирает запрашиваемый диапазон
 * @param  {number} pageNumber номер диапазона
 * @return {array} Возвращает текущий диапазон объектов валют
 */
export const getRatesPortion = async (pageNumber)  => {
    const rates = await getAllRates();
    const currentPortionRates = getArrRange(rates, 10, pageNumber )

    return currentPortionRates;
}
