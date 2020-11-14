const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const showMillionaresBtn = document.getElementById('show-millionares');
const doubleBtn = document.getElementById('double');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add cash

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  
  const user = data.results[0];

  const newUser = {
      name: `${user.name.first} ${user.name.last} `,
      money: Math.floor(Math.random() * 10000000)
  };

  addData(newUser);

}


// add the new obj to data arr
function addData(obj) {
    data.push(obj);
    console.log(obj);

    updateDOM();
}

 // update dom
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  providedData.forEach(item => {
      const element = document.createElement('div');
      element.classList.add('person');
      element.innerHTML = `<strong>${item.name}</strong>
      ${formatMoney(item.money)}`;
      main.appendChild(element);
  });
}

//format number as money

function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +" kr.";
}


// event listeners
addUserBtn.addEventListener('click', getRandomUser);