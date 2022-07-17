let currentLocale;

let fCurrencyShortFormatter;

export function fCurrencyShort(number, currency) {
    if (!fCurrencyShortFormatter) {
        fCurrencyShortFormatter = new Intl.NumberFormat(currentLocale, {
            currency,
            notation: 'compact',
        });
    }

    return fCurrencyShortFormatter.format(number);
}

const formatNumberIntl = (locale) => {
    if (locale !== currentLocale) {
        currentLocale = locale;
        fCurrencyShortFormatter = null;
    }
};

export default formatNumberIntl;
