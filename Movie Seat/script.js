const container = document.querySelector('.container');

// selectorAll for more classes
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// update total seats and ticket price
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
});

// seat click event
container.addEventListener('click', e => {
    // occupied not clickable
    if (e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')) 
    {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});
