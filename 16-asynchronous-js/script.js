'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountry = function (name) {
  const onLoad = function () {
    const [data] = JSON.parse(this.responseText);
    console.warn('Response', data);

    const template = `
      <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population / 1e6).toFixed(1)}M</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', template);
    countriesContainer.style.opacity = 1;
  };

  const request = new XMLHttpRequest();
  request.addEventListener('load', onLoad);
  request.open('GET', `https://restcountries.com/v2/name/${name}`);
  request.send();
};

getCountry('usa');
getCountry('united kingdom');