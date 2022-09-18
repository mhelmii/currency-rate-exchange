const currencyEl_One = document.getElementById('currency-one');
const currencyEl_Two = document.getElementById('currency-two');
const amountEl_One = document.getElementById('amount-one');
const amountEl_Two = document.getElementById('amount-two');

const swapBtn = document.getElementById('swap');
const rateEl = document.getElementById('rate');


//Fetch rates and update the DOM
function calculate(){
  const currencyOne = currencyEl_One.value;
  const currencyTwo = currencyEl_Two.value;

  fetch(`https://v6.exchangerate-api.com/v6/7447590c69f08a3d14e3aaf0/latest/${currencyOne}`)
  .then(res => res.json())
  .then(data => {
    const rate = data.conversion_rates[currencyTwo];
    rateEl.innerText = `1 ${currencyOne} is ${rate.toFixed(3)} ${currencyTwo}`;
    amountEl_Two.value = (amountEl_One.value * rate).toFixed(3);
  })
};


//Event Listeners
currencyEl_One.addEventListener('change', calculate);
amountEl_One.addEventListener('input', calculate);
currencyEl_Two.addEventListener('change', calculate);
amountEl_Two.addEventListener('input', calculate);

swapBtn.addEventListener('click', () => {
  const temp = currencyEl_One.value;
  currencyEl_One.value = currencyEl_Two.value;
  currencyEl_Two.value = temp;
  
  calculate();
});

calculate();