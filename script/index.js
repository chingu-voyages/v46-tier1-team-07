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
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  data.forEach((item) => {
    resultDiv.innerHTML += `
    <p><img src ="${item.thumbnail_url}" alt="${item.name}" width ="20%" /></p>
    <p>${item.name}</p>
    <button onClick="showDetails(${item.id})">More Information</button>
    `;
  });
}

function showNoResults() {
  const resultDiv = document.getElementById("results");
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

    document.getElementById("ingredient").innerHTML = `
  <p>${showThis.name}</p>
  <p>${showThis.total_time_tier.display_tier}</p>
  <p> ${instructionList}</p>
  `;
  });
}
