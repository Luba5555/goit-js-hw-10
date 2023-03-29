import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

    const searchBoxEl = document.querySelector('#search-box');
    const countryListEl = document.querySelector('.country-list');
    const countryInfoEl = document.querySelector('.country-info');  
    const body = document.querySelector('body');

   
  
  searchBoxEl.addEventListener('input', debounce(onSearchBoxEl, DEBOUNCE_DELAY));
  
  
  
  function onSearchBoxEl(e) {
    e.preventDefault();
   
     const inputSearchBoxElName = searchBoxEl.value.trim();
      if (inputSearchBoxElName === '') {
          return;
      } else
          fetchCountries(inputSearchBoxElName)
              .then(countries => {
                  if (countries.length === 1) {
                      renderCountryInfo(countries);
                      return;
                  }
                  if (countries.length > 1 && countries.length < 10) {
                      renderCountryListEl(countries);
                     return;
                  }
                  {
                      Notiflix.Notify.info(
                          'Too many matches found. Please enter a more specific name.'
                      );
                  }
              })
              .catch(() => {
                  Notiflix.Notify.failure('Oops, there is no country with that name');
              });
  }
  
  function renderCountryListEl(countries) {
      clear();
      console.log(countries);
      const markupList = countries
          .map(
              el =>
                  `<li class="country-list-item">
              <img src="${el.flags.svg}" alt="Flag" width="50">
              <span class="country-list--span">${el.name}</span>
          </li>`
          )
          .join('');
          countryListEl.insertAdjacentHTML('afterbegin', markupList);
  }
  
  function renderCountryInfo(countries) {
      clear();
      console.log(countries);
      const el = countries[0];
      console.log(el);
      const langs = el.languages.map(({ name }) => name).join(', ');
      const markupCard = `<div class="country-card">
          <div class="country-card--box">
              <img src="${el.flags.svg}" alt="Flag" width="60", height="30">
              <h2 class="country-card-title"> ${el.name}</h2>
          </div>
              <p class="country-card-info"><b>Capital:</b> ${el.capital}</p>
              <p class="country-card-info"><b>Population:</b> ${el.population}</p>
              <p class="country-card-info"><b>Languages:</b> ${langs}</p>
          </div>`;
      countryInfoEl.insertAdjacentHTML('afterbegin', markupCard);
  }
  function clear() {
    countryListEl.innerHTML = '';
      countryInfoEl.innerHTML = '';
  }
  

  body.style.backgroundImage =
  'radial-gradient( circle,  rgba(238,174,202,1) 0%, rgba(148,187,233,1) 97.5% )';
   searchBoxEl.style.marginRight = "auto";
   searchBoxEl.style.marginLeft = "auto";
   searchBoxEl.style.display = "block";
   
   countryListEl.style.marginRight = "auto";
   countryListEl.style.marginLeft = "auto";
   countryListEl.style.display = "block";
// countryListEl.style.display = "flex";
// countryListEl.style.justifyContent = "center";

   countryInfoEl.style.marginRight = "auto";
   countryInfoEl.style.marginLeft = "auto";
   countryInfoEl.style.display = "flex";
   countryInfoEl.style.justifyContent = "center";