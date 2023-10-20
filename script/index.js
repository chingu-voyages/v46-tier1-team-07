// API endpoint
const apiLink = "https://raw.githubusercontent.com/chingu-voyages/v46-tier1-team-07/main/data/recipes.json";

//Global Variables
const resultDiv = document.getElementById("results");
const ingredientDiv = document.getElementById("ingredient");
const menu = document.querySelector('.menu');
const dropdown = document.querySelector('.dropdown-menu');

// Event listener for input and search button
document.getElementById("searchInput").addEventListener("keyup", (event) => {
  if (event.key === "Enter" && event.target.value.length > 0) {
    searchRecipes();
    event.target.value = "";
  }
});

document.getElementById("searchButton").addEventListener("click", (e) => {
  e.preventDefault();
  if (searchInput.value.length > 0) {
    searchRecipes();
    searchInput.value = "";
  }
});

// Search function
function searchRecipes() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  getApiList(searchInput);
}

// Fetch API data for search
async function getApiList(searchInput) {
  const response = await fetch(apiLink);
  const data = await response.json();
  const recipesList = data.results;

  const filteredRecipes = recipesList.filter((item) =>
    item.description.toLowerCase().includes(searchInput)
  );

  if (filteredRecipes.length > 0) {
    showResults(filteredRecipes);
  } else {
    showNoResults();
  }
}

// Display search results or no results message
function showResults(data) {
  resultDiv.innerHTML = "";
  resultDiv.classList.remove('hide');
  ingredientDiv.classList.add('hide');

  data.forEach((item) => {
    resultDiv.innerHTML += `<div class="result-item">
    <p><img src ="${item.thumbnail_url}" alt="${item.name}" width ="20%" /></p>
    <p>${item.name}</p>
    <button onClick="showDetails(${item.id})">More Information</button>
    </div>`;
  });
}

function showNoResults() {
  resultDiv.innerHTML = `<p>There are no results</p>`;
}

// Fetch data for recipe details

async function showDetails(recipeDetails) {
  const response = await fetch(apiLink);
  const data = await response.json();
  const recipesDetailsList = data.results;
  const showThis = recipesDetailsList.find(({ id }) => id === recipeDetails);

  const lists = showThis.instructions;
  let instructionList = "";
  lists.forEach((list) => {
    instructionList += `<p>${list.display_text}</p>`;

    resultDiv.classList.add('hide');
    ingredientDiv.classList.remove('hide');

    document.getElementById("ingredient").innerHTML = `
    <p><img src ="${showThis.thumbnail_url}" alt="${showThis.name}" width ="20%" /></p>
  <h2 class="recipe-name">${showThis.name}</h2>
  <h3><strong>Estimated Time</strong></h3>
  <p>${showThis.total_time_tier.display_tier}</p>
  <h3><strong>Cooking Instructions</strong></h3>
  <p> ${instructionList}</p>
  `;
  });
}

//Show and hide dropdown menu div
menu.addEventListener('click', () => {
  if (dropdown.classList.contains('hide')) {
    dropdown.classList.remove('hide')
  } else (
    dropdown.classList.add('hide')
  )
});


const darkModeToggle = document.getElementById("dark-mode-toggle");
const displayMode = document.getElementById("display-mode");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    darkModeToggle.classList.remove("fa-toggle-on");
    darkModeToggle.classList.add("fa-toggle-off");
  } else {
    darkModeToggle.classList.remove("fa-toggle-off");
    darkModeToggle.classList.add("fa-toggle-on");
  }
});

