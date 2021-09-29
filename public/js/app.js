console.log('Client side javascript file is loaded!');

// fetch('http://puzzle.mead.io/puzzle')
//   .then(response => {
//     return response.json();
//   })
//   .then(json => {
//     console.log(json);
//   });

const form = document.querySelector('form');
const input = document.querySelector('input');
const message = document.querySelector('#message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  message.textContent = 'Loading...';

  const location = input.value;
  fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        message.textContent = data.error;
        message.style.color = 'red';
      } else {
        message.textContent = data.data;
      }
    });
});