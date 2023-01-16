console.log("hello from client side js")

const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageOne= document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    fetch("http://localhost:3000/weather?address=" +location).then((response) => {
      response.json().then((data) => {
          if (data.error) {
              messageOne.textContent = data.error;
              messageTwo.textContent = '';
          console.log(data.error);
          } else {
              messageOne.textContent = data.forecast;
              messageTwo.textContent = data.location;
          console.log(data.location);
          console.log(data.forecast);
          console.log(data.address);
        }
      });
    });

    console.log('testing!')
})