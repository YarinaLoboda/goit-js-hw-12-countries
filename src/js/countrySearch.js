import debounce from 'lodash.debounce';
import createMarkupCountryCard from '../js/renderCountryCard';
import CountryApiService from './CountryApiService';

const refs = {
  inputSearchVal: document.getElementById('searchval'),
  countryCardContainer: document.querySelector('div.js-country-card'),
  buttonClear: document.getElementById('button-clear'),
};

const countryApiService = new CountryApiService();

refs.inputSearchVal.addEventListener(
  'input',
  debounce(onChangeSearchValInput, 500),
);

refs.buttonClear.addEventListener('click', onClickButtonClear);

disableButtonClear(refs.buttonClear);

function onChangeSearchValInput(e) {
  if (!e.target.value) {
    clearCountryRenderContainer();
    disableButtonClear(refs.buttonClear);
    countryApiService.resetQueryData();
    return;
  }

  enableButtonClear(refs.buttonClear);

  countryApiService.query = e.target.value;

  countryApiService
    .fetchCountry()
    .then(data => {
      renderCountryCard(data);
    })
    .catch(error => console.log(error));
}

function renderCountryCard(arg) {
  refs.countryCardContainer.innerHTML = createMarkupCountryCard(arg);
}

function clearCountryRenderContainer() {
  refs.countryCardContainer.innerHTML = '';
}

function clearInputSearchVal() {
  refs.inputSearchVal.value = '';
}

function onClickButtonClear(e) {
  countryApiService.resetQueryData();
  clearInputSearchVal();
  clearCountryRenderContainer();
  disableButtonClear(e.target);
}

function disableButtonClear(elRef) {
  elRef.setAttribute('disabled', true);
}

function enableButtonClear(elRef) {
  elRef.removeAttribute('disabled');
}
