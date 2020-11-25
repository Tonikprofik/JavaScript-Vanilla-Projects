const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');


// Search meal and fetch API
function searchMeal(e) {
    //prevent submit to submit empty
    e.preventDefault();

    // Clear single meal
    single_mealEl.innerHTML = '';

    //Get search term
    const term = search.value;
    
    // Check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for ${term}: </h2>`;

                if(data.meals === null) {
                    resultHeading.innerHTML= `<p>There are no results. Try again</p>`;
                } else {
                    mealsEl.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `)
                    .join('');
                }
            });

        // Clear search text
        search.value='';


    } else {
        //alert('Please enter a search term');
        resultHeading.innerHTML = `<h2>Please enter a search term</h2>`
    }
}

// Fetch random meal from API
function getRandomMeal() {
    // clear meals and heading
    mealsEl.innerHTML= '';
    resultHeading.innerHTML='';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        })

}


// Fetch Meal by ID
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const meal = data.meals[0];
            console.log(meal);

            addMealToDOM(meal);
        });

}

// add meal to DOM
function addMealToDOM(meal){
    const ingredients = [];

    //iterate through ingredient1, ingredient2, measure1, measure2 keys. 
    // since there are no arrays
    for(let i=1; i<=20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`
              ${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            //when there are empty ingredients
            break;
        }
    }

    single_mealEl.innerHTML= `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredientls</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
    </div>`;
}

// Even listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
    // go through all child items
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        console.log(mealID);
        getMealById(mealID);
    }
})