'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} M</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMassage = 'Something went wrong1!') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMassage}. with (${response.status}) status.😔`);
    }
    return response.json();
  });
};

////////////////////////////////////////////////////////////////////////////////////

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getPosition()
    .then(res => {
      const { latitude: lat, longitude: lng } = res.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
    })
    .then(response => {
      if (response.status == 403) {
        throw new Error(
          `Please calm down and send request more slowly. (${response.status}) status.`
        );
      }
      if (!response.ok) {
        throw new Error(
          `something went wrong try another thing or try again later 🌑 maybe the geo code is not exist. (${response.status}) status.`
        );
      }
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v3.1/alpha/${data.countryCode}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Country not found maybe you choose some place like middle of the ocean 🌏 try another location. (${response.status}) status.`
        );
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(`An error occurred that is ${err.message}`);
      renderError(`An error occurred -- ${err.message} --`);
    })
    .finally((countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);

/////////////////////////////////////////////////////////////////////////////////////////

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

// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => {
//       response.json();
//       //  , err => alert(err)
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders?.[0];
//       if (!neighbor) return;
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
//       );
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`Error happened that is ${err} ❌`);
//       renderError(`Error occurred it is ${err.message} 💥. Try another time!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('germany');
// });

// getCountryData('dfsdfsdf')

///////////////////////////////////////////////////////////////////////////

// const getJSON = function (url, errorMassage = 'Something went wrong1!') {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(`${errorMassage}. with (${response.status}) status.😔`);
//     }
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(
//           `Country --${country}-- not found!! ${response.status}`
//         );
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       // const neighbor = data[0].borders?.[0];
//       const neighbor = 'lkjsdf';

//       if (!neighbor) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(
//           `The neighbor county not found (${response.status})status, maybe the problem with server ⛅`
//         );
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`Reza error occurred that was ''${err}'' ❌💥`);
//       renderError(
//         `Reza a error occurred that was **${err.message}** try another time!!🌋`
//       );
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('china');
// });

// getCountryData('sdfsd');

/////////////////////////////////////////////////////////////////////////////////////////

// const getJSON = function (url, errorMassage = 'Something went wrong1!') {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(`${errorMassage}. with (${response.status}) status.😔`);
//     }
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   getJSON(
//     `https://restcountries.com/v3.1/name/${country}`,
//     'Country not found!'
//   )
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbor = data[0].borders?.[0];

//       if (!neighbor) {
//         throw new Error('No neighbor found.')
//       };

//       return getJSON(`https://restcountries.com/v3.1/alpha/${neighbor}`, 'neighbor not found!');
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`Reza an error occurred that was ''${err}'' ❌💥`);
//       renderError(
//         `Reza an error occurred that was **${err.message}** try another time!!🌋`
//       );
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

// getCountryData('sdfsd');

////////////////////////////////////////////////////////////////////////////////////////////////

// // ___________ Coding_Challenge_______________

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   )
//     .then(response => {
//       if (response.status == 403) {
//         throw new Error(
//           `Please calm down and send request more slowly. (${response.status}) status.`
//         );
//       }
//       if (!response.ok) {
//         throw new Error(
//           `something went wrong try another thing or try again later 🌑 maybe the geo code is not exist. (${response.status}) status.`
//         );
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       console.log(data);
//       return fetch(`https://restcountries.com/v3.1/alpha/${data.countryCode}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(
//           `Country not found maybe you choose some place like middle of the ocean 🌏 try another location. (${response.status}) status.`
//         );
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       console.error(`An error occurred that is ${err.message}`);
//       renderError(`An error occurred -- ${err.message} --`);
//     })
//     .finally((countriesContainer.style.opacity = 1));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
// whereAmI(40.933, -100.474);
// whereAmI(40.933, -80.434374);

// btn.addEventListener('click', function () {
//   // document.body.innerHTML = document.body.innerHTML

//   whereAmI(52.508, 13.381);
//   whereAmI(19.037, 72.873);
//   whereAmI(-33.933, 18.474);
// });

// _____________ End_Of_The_Coding_Challenge____________

//////////////////////////////////////////////////////////////////////////////

// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for(let i=0; i<10000000000; i++){}
//   console.log(res)
// });

// console.log('Test end');
// btn.addEventListener('click', function(){

//   console.log('button')
// })

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log(`Lunched 🌟`);
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve(`You win 🎉`);
//     } else {
//       reject(new Error(`You lost 😔`));
//     }
//   }, 1000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// const wait = function (second) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, second * 1000);
//   });
// };

// wait(2)
//   .then(res => {
//     console.log('I waited for 2 second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 1 second');
//   });

// wait(1)
//   .then(() => {
//     console.log('one second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('two second passed');
//     return wait(1)
//   }).then(()=>{
//     console.log('three second passed')
//     return wait(1)
//   }).then((res)=>{
//     console.log('four second passed')
//     console.log(res)
//   })

// Promise.reject('An random error occurred').catch(err => console.error(new Error(err)))

// ______________________ Coding_Challenge_2______________________

// const container = document.querySelector('.images');

// // img.addEventListener('load', function () {
// // });
// const wait = function (second) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, second * 1000);
//   });
// };

// const createImage = function (imagePath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imagePath;

//     img.addEventListener('load', function () {
//       container.appendChild(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('image is not founded'));
//     });
//   });
// };

// let currentImage;

// createImage('./img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none'
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none'
//   })
//   .catch(err => console.error(err));

// __________________ Coding_challenge_ended ___________________

//////////////////////////////////////////////////////////////

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding
//     const resGeo = await fetch(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//     );
//     if (!resGeo.ok) {
//       throw new Error(`Problem with getting location data`);
//     }
//     const dataGeo = await resGeo.json();

//     // Country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/alpha/${dataGeo.countryCode}`
//     );
//     if (!res.ok) {
//       throw new Error(`Problem with getting country name`);
//     }
//     const data = await res.json();
//     renderCountry(data[0]);
//     return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
//   } catch (err) {
//     console.error(`--${err}-- 👨‍💻 command error`);
//     renderError(`some thing went wrong ☹ --${err.message}--`);
//     throw err;
//     // return 'Value'
//   }
// };
// whereAmI()
//   .then(city => console.log(`city is: ${city}`))
//   .catch(err => {
//     console.error(`2: --${err.message}--`);
//   });
// console.log('After function');

// (async function () {
//   try {
//     const infoCountry = await whereAmI();
//     console.log(`city is: ${infoCountry}--`);
//   } catch (err) {
//     console.error(`2: --${err.message}--`);
//   }
//   console.log(`Finished the async execution`)
// })();

////////////////////////////////////////////////////////////////////////////

// const get3Countries = async function (cr1, cr2, cr3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${cr1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${cr2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${cr3}`);

//     const arr = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${cr1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${cr2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${cr3}`),
//     ]);

//     console.log(arr.map(d => d[0].capital[0]));
//   } catch (err) {
//     console.log(err);
//   }
// };

// get3Countries('iran', 'usa', 'germany');

//////////////////////////////////////////////////////////////////////////////

// (async function(){
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/iran`),
//     getJSON(`https://restcountries.com/v3.1/name/usa`),
//     getJSON(`https://restcountries.com/v3.1/name/france`),
//   ])
//   console.log(res[0])
// })();

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject("ERROR"),
//   Promise.resolve('Another Success')
// ]).then(res => console.log(res))

// Promise.all([
//   Promise.resolve('Success'),
//   // Promise.reject("ERROR"),
//   Promise.resolve('Another Success')
// ]).then(res => console.log(res))

// Promise.any([
//   Promise.reject("ERROR"),
//   Promise.resolve('Success'),
//   Promise.resolve('Another Success')
// ]).then(res => console.log(res))

// Promise.race([
//   Promise.reject("ERROR"),
//   Promise.resolve('Success'),
//   Promise.resolve('Another Success')
// ]).then(res => console.log(res))

////////////////////////////////////////////////////////////////////////////////

//
// function whereAmI(lat, lng) {
//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   )
//     .then(res => {
//       if (res.status != 403) {
//         return res.json();
//       } else {
//         throw new Error('please request slowly');
//       }
//     })
//     .then(data => {
//       console.log(data);
//       return fetch(`https://restcountries.com/v3.1/alpha/${data.countryCode}`);
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(data[0]))
//     .catch(err => {console.error(err, 'error')});
// }

// navigator.geolocation.getCurrentPosition(
//   position => {
//     console.log(position);
//     whereAmI(position.coords.latitude, position.coords.longitude);
//   },
//   err => {
//     console.log(err);
//   }
// );

// let img;
// const container = document.querySelector('.images');

// function createImage(imgPath) {
// return new Promise(function (resolve, reject) {
// img = document.createElement('img');
//     img.setAttribute('src', imgPath);

//     img.addEventListener('load', function () {
//       container.appendChild(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('image is not available'));
//     });
//   });
// }

// createImage('./img/img-1.jpg')
// .then(res => {
//   img = res;
//   return wait(5);
// })
// .then(res => {
//   container.removeChild(img);
//   return createImage('./img/img-2.jpg');
// })
// .then(res => {
//   img = res
//   return wait(2)
// }).then(res=>{
//   container.removeChild(img)
// })

// const wait = function (time) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, time * 1000);
//   });
// };

// ____________________________Coding_Challenge_#3____________________________

// const wait = function (length) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(resolve, length * 1000);
//   });
// };

// const container = document.querySelector('.images');
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       container.appendChild(img);
//       resolve(img);
//     });
//   });
// };

// const loadNPause = async function () {
//   let img = await createImage('./img/img-1.jpg');
//   await wait(2);
//   container.removeChild(img);
//   img = await createImage('./img/img-2.jpg');
//   await wait(2);
//   container.removeChild(img);
// };

// // loadNPause();

// const loadAll = async function (arr) {
//   const imgs = arr.map(async item => await createImage(item));
//   const results = await Promise.all(imgs)
//   results.forEach(img => img.classList.add('parallel'))
//   console.log(results);
// };

// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
