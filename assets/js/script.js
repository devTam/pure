// SET UP FIREBASE
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAEyXjkWyPBc_UBY9TKyg7nCpoe0G0EY_Q',
  authDomain: 'pure-kaduna.firebaseapp.com',
  projectId: 'pure-kaduna',
  storageBucket: 'pure-kaduna.appspot.com',
  messagingSenderId: '590961830195',
  appId: '1:590961830195:web:c4efd359344678f1fb3646',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// TIMER

// Set the date we're counting down to
var countDownDate = new Date('January 23, 2021 12:30:00').getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById('timer').innerHTML = `
  <div class="time">
    <div class="number">${days}</div>
    <div class="alpha">DAYS</div>
  </div>
  <span class="column">:</span> 

  <div class="time">
    <div class="number">${hours}</div>
    <div class="alpha">HOURS</div>
  </div>
  <span class="column">:</span> 

  <div class="time">
    <div class="number">${minutes}</div>
    <div class="alpha">MINUTES</div>
  </div>
  <span class="column">:</span> 

  <div class="time">
    <div class="number">${seconds}</div>
    <div class="alpha">SECONDS</div>
  </div>
  `;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById('timer').innerHTML = 'EXPIRED';
  }
}, 1000);

// SWIPER JS
var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  thumbs: {
    swiper: galleryThumbs,
  },
});

// FORM DETAILS
const nameEntered = document.getElementById('name');
const phone = document.getElementById('number');
const occupation = document.getElementById('occupation');
const email = document.getElementById('email');
const form = document.getElementById('form');
const btn = document.getElementById('register');

const db = firebase.firestore();

// toast options
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let nameValue = nameEntered.value;
  let phoneValue = phone.value;
  let occupationValue = occupation.value;
  let emailValue = email.value;

  const res = db
    .collection('data')
    .doc(`${nameValue}`)
    .set(
      {
        name: nameValue,
        occupation: occupationValue,
        phone: phoneValue,
        email: emailValue ? emailValue : '',
      },
      { merge: true }
    )
    .then(() => {
      // Clear form after registration
      nameEntered.value = '';
      phone.value = '';
      occupation.value = '';
      email.value = '';

      // close modal
      btn.setAttribute('data-bs-dismiss', 'modal');
      btn.click();
      btn.removeAttribute('data-bs-dismiss');

      // Show toast
      toastr['success']('We have saved you a spot', 'Congratulations!');
    });
});

// GET DOCS
// const getMarker = async() => {
//   const snapshot = await db.collection('data').get();

//   return snapshot.docs.map(doc => doc.data());

// }

// getMarker().then(result => console.log(result))
