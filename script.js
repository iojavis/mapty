'use strict';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class App {
  constructor() {}
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap, error => {
        console.log(error);
      });
    }
  }

  _loadMap(success) {
    const { latitude, longitude } = success.coords;

    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];
    console.log(coords);
    map = L.map('map').setView(coords, 18);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coords)
      .addTo(map)
      .bindPopup('Where you are.<br> Real-time location.')
      .openPopup();

    map.on('click', function (mapE) {
      mapEvent = mapE;
      console.log(mapEvent);
      // const {lat, lng} = mapClick.latlng;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
  }

  _showForm() {}

  _toggleElevationField() {}

  _newWorkout() {}
}

form.addEventListener('click', function (e) {
  e.preventDefault();
  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      '';

  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .blindPopup(
      L.popup({
        minWidth: 100,
        maxWidth: 250,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
