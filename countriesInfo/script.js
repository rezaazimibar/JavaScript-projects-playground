'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
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
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open(
//       'GET',
//       `https://countries-api-836d.onrender.com/countries/name/${country}`
//     );
//     request.send();

//     request.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);
//       console.log(data);
//       const html = `
//       <article class="country">
//       <img class="country__img" src="${data.flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} M</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//       </div>
//     </article>`;
//       countriesContainer.insertAdjacentHTML('beforeend', html);
//       countriesContainer.style.opacity = 1;
//     });
//   };

// console.log('first block')
// setTimeout(()=>{console.log("at time")}, 5000)
// console.log('last block')
// https://countries-api-836d.onrender.com/countries/

// getCountryData('iran')
// getCountryData('united state')
// getCountryData('pt')
// getCountryData('in')

////////////////////////////////////////////////////////////////////////////

// const getCountryAndNeighbor = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbor country (2)
//     const neighbor = data.borders?.[0];
//     if (!neighbor) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
//     );
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       // console.log(this.responseText)
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbor('usa');

// setTimeout(() => {
//   console.log('first passed');
//   setTimeout(() => {
//     console.log('second passed');
//     setTimeout(() => {
//       console.log('third passed');
//       setTimeout(() => {
//         console.log('forth passed');
//       }, 2000);
//     }, 2000);
//   }, 2000);
// }, 2000);

// const request = fetch(
//   `https://countries-api-836d.onrender.com/countries/name/usa`
// );
// console.log(request)

// fetch(`https://countries-api-836d.onrender.com/countries/name/iran`)
//   .then(res => res.json)
//   .then(data => {return 23}).then(da => console.log(23))

//////////////////////////////////////////////////////////////////////////////////////
// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };

// getCountryData('usa');
/////////////////////////////////////////////////////////////////////////////////////

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders?.[0];

//       if (!neighbor) return;

//       // Country 2
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
//       );
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'));
// };
// // getCountryData('france');
// getCountryData('germany')
////////////////////////////////////////////////////////////////////////

const getCountryData = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(
      response => response.json()
      // err => alert(err)
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) return;
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
      );
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`Error happened that is ${err} ❌`);
      renderError(`Error occurred it is ${err.message} 💥. Try another time!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('usa');
});

getCountryData('dfsdfsdf')