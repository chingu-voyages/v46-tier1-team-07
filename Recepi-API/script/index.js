// API endpoint
const apiLink = "../data/recipes.json";

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

// Fetch API data
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
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  data.forEach((item) => {
    const recipesItem = document.createElement("div");
    recipesItem.innerHTML = `<p>${item.name}</p>`;
    resultDiv.appendChild(recipesItem);
  });
}

function showNoResults() {
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = `<p>There are no results</p>`;
}
