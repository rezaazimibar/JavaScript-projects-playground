'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/name/${country}`
    );
    request.send();
  
    request.addEventListener('load', function () {
      const [, data] = JSON.parse(this.responseText);
      console.log(data);
      const html = `
      <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} M</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    });
  };
  
  
  // console.log('first block')
  // setTimeout(()=>{console.log("at time")}, 5000)
  // console.log('last block')
  // https://countries-api-836d.onrender.com/countries/
  
  getCountryData('iran')
  getCountryData('united state')
  getCountryData('pt')
  getCountryData('in')