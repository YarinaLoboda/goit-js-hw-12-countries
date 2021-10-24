import debounce from 'lodash.debounce';
import fetchCountries from '../js/fetchCountries';
import createMarkupCountryCard from '../js/renderCountryCard';

const refs = {
  inputSearchVal: document.getElementById('searchval'),
  countryCardContainer: document.querySelector('div.js-country-card'),
  buttonClear: document.getElementById('button-clear'),
};

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
    return;
  }

  enableButtonClear(refs.buttonClear);

  fetchCountries(e.target.value)
    .then(renderCountryCard)
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
