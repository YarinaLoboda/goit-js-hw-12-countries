import countryCardTpl from '../templates/country-card.hbs';
import countryShortInfo from '../templates/country-shortinfo.hbs';
import showMessage from '../templates/message.hbs';

import {
  alert,
  notice,
  info,
  success,
  error,
  defaultModules,
} from '@pnotify/core';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default function createMarkupCountryCard(country) {
  let markup = null;

  if (country.length === 1) {
    markup = countryCardTpl(country);
  } else if (country.length > 10) {
    markup = showMessage({ message: 'Too many matches found.' });

    alert({
      text: 'Too many matches found. Please enter more specific query',
      type: 'error',
      delay: 1000,
    });
  } else if (!country.length) {
    markup = showMessage({ message: 'No results found!' });

    alert({
      text: 'No results found!',
      type: 'error',
      delay: 1000,
    });
  } else if (country.length > 1 && country.length < 10) {
    markup = countryShortInfo(country);
  }

  return markup;
}
