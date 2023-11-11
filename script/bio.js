//Dark and Light Mode

let darkModeBio = true;
const toggleBio = document.querySelector('#toggle-bio');
const toggle = document.querySelector('.dark-mode-toggle');
const body = document.querySelector('body');
const headerText = document.querySelector('header h1');
const headerPhoto = document.querySelector('header img');
const footerIcon = document.querySelectorAll('footer i');
const dropDownLink = document.querySelector('.dropdown-menu a');
const displayText = document.querySelector('.display-mode');

toggleBio.addEventListener('click', colorModeActivateBio);

function colorModeActivateBio(){
  if(darkModeBio){
    darkModeBio = false;
    body.style.backgroundColor = '#F7E7D5';
    body.style.color = '#733416';
    headerText.style.color = '#733416';
    headerPhoto.src = "./img/logo-light.PNG";
    footerIcon.forEach(icon => icon.style.color = '#733416'); 
    dropDownLink.style.color = '#733416';
    dropDownLink.style.border = '2px dotted #733416';
    displayText.innerText = 'Dark Mode';
    toggle.classList.remove('fa-toggle-off');
    toggle.classList.add('fa-toggle-on');

  } else {
    darkModeBio = true;
    body.style.backgroundColor = '#733416';
    body.style.color = '#F7E7D5';
    headerText.style.color = '#F7E7D5';
    headerPhoto.src = "./img/logo-dark.PNG";
    footerIcon.forEach(icon => icon.style.color = '#F7E7D5'); 
    dropDownLink.style.color = '#F7E7D5';
    dropDownLink.style.border = '2px dotted #F7E7D5';
    displayText.innerText = 'Light Mode';
    toggle.classList.add('fa-toggle-off');
    toggle.classList.remove('fa-toggle-on');

  }
};