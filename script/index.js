//Dark and Light Mode

let darkModeIndex = true;
const toggleIndex = document.querySelector('#toggle-index');
const toggle = document.querySelector('.dark-mode-toggle');
const body = document.querySelector('body');
const headerText = document.querySelector('header h1');
const headerPhoto = document.querySelector('header img');
const footerIcon = document.querySelectorAll('footer i');
const dropDownLink = document.querySelector('.dropdown-menu a');
const searchText = document.querySelector('.search-area h3');
const displayText = document.querySelector('.display-mode');
const searchButton = document.getElementById('searchBtn');
const inputMessage = document.getElementById('inputMsg');

toggleIndex.addEventListener('click', colorModeActivateIndex);

function colorModeActivateIndex(){
  if(darkModeIndex){
    darkModeIndex = false;
    body.style.backgroundColor = '#F7E7D5';
    body.style.color = '#733416';
    headerText.style.color = '#733416';
    searchText.style.color = '#331609';
    searchButton.style.color = '#331609';
    inputMessage.style.color = '#331609';
    headerPhoto.src = "./img/logo-light.PNG";
    footerIcon.forEach(icon => icon.style.color = '#733416'); 
    dropDownLink.style.color = '#733416';
    dropDownLink.style.border = '2px dotted #733416';
    displayText.innerText = 'Dark Mode';
    toggle.classList.remove('fa-toggle-off');
    toggle.classList.add('fa-toggle-on');

  } else {
    darkModeIndex = true;
    body.style.backgroundColor = '#733416';
    body.style.color = '#F7E7D5';
    headerText.style.color = '#F7E7D5';
    searchText.style.color = '#F7E7D5';
    searchButton.style.color = '#F7E7D5';
    inputMessage.style.color = '#F7E7D5';
    headerPhoto.src = "./img/logo-dark.PNG";
    footerIcon.forEach(icon => icon.style.color = '#F7E7D5'); 
    dropDownLink.style.color = '#F7E7D5';
    dropDownLink.style.border = '2px dotted #F7E7D5';
    displayText.innerText = 'Light Mode';
    toggle.classList.add('fa-toggle-off');
    toggle.classList.remove('fa-toggle-on');
  }
};



const resultDiv = document.getElementById("results");
let dataSaved = null;
let searchResults = null;
const errorMsg = document.getElementById("inputMsg");
const loader = document.querySelector("#loading");
const searchContent = document.querySelector(".search-content");
const searchArea = document.querySelector(".search-area");

// Fetch the data and save it to the DOM (only once)
async function fetchAndSaveData() {
  if (!dataSaved) {
    const url =
      "https://raw.githubusercontent.com/chingu-voyages/v46-tier1-team-07/main/data/recipes.json";
    // const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=60&q=${searchInput}`;
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": "Add API Key Here",
    //     "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    //   },
    // };
    try {
      const response = await fetch(url);
      //   const response = await fetch(url, options);
      const data = await response.json();
      dataSaved = data.results;
    } catch (error) {
      errorMsg.innerHTML = `<p>Something went wrong</p>`;
      resultDiv.innerHTML = "";
      return;
    }
  }
}

// Add event listener
document.getElementById("addInput").addEventListener("keyup", (event) => {
  if (addInput.value.length === 0) {
    errorMsg.innerHTML = `<p>Please enter a search term</p>`;
    resultDiv.innerHTML = "";
    return;
  } else {
    if (event.key === "Enter") {
      errorMsg.innerHTML = "";
      recipeApiResult();
    }
  }
});

document.getElementById("searchBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("addInput").value.trim();
  if (searchInput.length > 0) {
    recipeApiResult();
  } else {
    errorMsg.innerHTML = `<p>Please enter a search term</p>`;
    resultDiv.innerHTML = "";
    return;
  }
});

async function recipeApiResult() {
  try {
    const searchInput = document.getElementById("addInput").value.toLowerCase();
    searchResults = dataSaved.filter((item) =>
      item.description.toLowerCase().includes(searchInput)
    );
    if (searchResults.length > 0) {
      showResults(searchResults);
    } else {
      showNoResults();
    }
  } catch (error) {
    errorMsg.innerHTML = `<p>Something went wrong</p>`;
    resultDiv.innerHTML = "";
    return;
  }
  document.getElementById("addInput").value = "";
}

// Display search results
function showResults(data) {
  displayLoading();

  searchArea.style.background = "none";
  searchContent.style.background = "none";
  searchArea.style.justifyContent = "flex-start";
  window.scrollTo(0, 0);

  resultDiv.innerHTML = "";

  data.forEach((item) => {
    resultDiv.innerHTML += `<div class="result-item">
    <img src="${item.thumbnail_url}" alt="${item.name}"/>
    <p class="item-name">${item.name}</p>
    <button class="info-button" onclick="showRecipeDetails(${item.id})">More Information</button>
    </div>`;
  });
  errorMsg.innerHTML = "";
}

function showNoResults() {
  searchArea.style.justifyContent = "flex-start";
  searchArea.style.background = "none";
  searchContent.style.background = "none";
  resultDiv.innerHTML = `<p>There are no results</p>`;
}

// Define the recepiApiDetails function
async function recepiApiDetails(id) {
  try {
    const recipe = findRecipeById(id, searchResults);
    let instructionSteps = " ";
    recipe.instructions.forEach((item) => {
      instructionSteps += `<li>${item.display_text}</li>`;
    });
    let category = " ";
    recipe.topics.forEach((item) => {
      category += `<span>${item.name}, </span>`;
    });
    if (recipe) {
      resultDiv.innerHTML = `
        <div class="recipe-details">
          <div class="recipe-img">
            <img src="${recipe.thumbnail_url}" alt="${recipe.name}"/>
          </div>
          <div class ="recipe-info">
            <p class="recipe-name">${recipe.name}</p>
            <div>
              <p class="category"><strong>Category: ${category}</strong></p>
              <p>Instructions:</p>
              <ul>${instructionSteps}</ul>
            </div>
            <button class="info-button" onclick="showSearchResults()">Back to Results</button>
          </div>
        </div>
        `;
    } else {
      resultDiv.innerHTML = `<p>Recipe not found</p>`;
    }
  } catch (error) {
    errorMsg.innerHTML = `<p>Something went wrong</p>`;
    return;
  }
}

// Show Recipe Details
function showRecipeDetails(id) {
  window.scrollTo(0, 0);
  recepiApiDetails(id);
}

// Show Search Results
function showSearchResults() {
  showResults(searchResults);
}

// Add this function to find a recipe by ID
function findRecipeById(id, recipesList) {
  return recipesList.find((recipe) => recipe.id === id);
}

// Loading spinner until fetch is uploaded
function displayLoading() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 500);
}

// hiding loading
function hideLoading() {
  loader.classList.remove("display");
}

// Fetch and save data to DOM when the page loads
window.addEventListener("load", () => {
  fetchAndSaveData();
});

document.getElementById("refresh-btn").addEventListener("click", function () {
  window.location.reload();
});
