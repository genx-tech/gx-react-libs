import numeral from 'numeral';

numeral.register('locale', 'cht', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    abbreviations: {
        thousand: '千',
        million: '百萬',
        billion: '十亿',
        trillion: '兆'
    },
    ordinal: function (number) {
        return '.';
    },
    currency: {
        symbol: '¥'
    }
});