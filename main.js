
/*const adoptList = document.getElementById('adoptList');

const fetchPokemon = () => 
{
  const promises = [];

  for(let i = 1; i < 11; i++) 
  {
    var randomNum = Math.floor(Math.random() *151);
    const url = `https://pokeapi.co/api/v2/pokemon/${randomNum}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then(results => 
  {
    const pokemon = results.map((data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map((type) => type.type.name).join(', ')
    }));
    displayPokemon(pokemon);
  });

}
fetchPokemon();

const displayPokemon = (pokemon) => 
{
  console.log(pokemon);
  //$('.number1').text(pokemon[0].id + ": " + pokemon[0].name + pokemon[1].image);
  const pokemonString = pokemon.map(pokeman => `
    <li>
      <img src="${pokeman.image}"/>
      <h2>${pokeman.id}. ${pokeman.name}</h2>
      <p>Type: ${pokeman.type}</p>
    </li>`)
    .join('');
  adoptList.innerHTML = pokemonString;
}*/

//*********************** ABOVE CODE WORKS FOR GENERATING 10 RANDOM POKEMON ***********************

// If a pokemon's adopt me button is clicked, set that pokemon to Adopted.

const adoptList = document.getElementById('adoptList');
const pokemanLi = document.getElementsByClassName('pokeman');
const pokeSelect = document.getElementById('pokeSelect');
const pokeName = document.getElementById('pokeName');
const pokemonSelectOption = document.getElementsByClassName('pokemon-select-option');
const adoptablePokemon = [];
const selectedPokemon = document.getElementById('selectedPokemon');
const adoptSubmitButton = document.getElementById('adoptSubmitButton');


// Fetch Pokemon data from the API
const fetchPokemon = () => 
{
  const waitingPokemon = [105, 65, 137, 101, 149, 20, 5, 129, 10, 87]
  const promises = [];

  for(let i = 0; i < waitingPokemon.length; i++) 
  {
    const url = `https://pokeapi.co/api/v2/pokemon/${waitingPokemon[i]}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then(results => 
  {
    const pokemon = results.map((data) =>({
      name : data.name.charAt(0).toUpperCase() + data.name.slice(1),
      id : data.id,
      image : data.sprites['front_default'],
      type : data.types.map((type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', ')
    }));
    displayPokemon(pokemon);
  });
}

fetchPokemon(); // Run the function for fetching Pokemon data
// Display the Pokemon data that was fetched into link html elements
// This function is called inside fetchPokemon, line 67
const displayPokemon = (pokemon) =>
{
    console.log(pokemon);
    const pokemonString = pokemon.map(pokeman => `
      <li class="card">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
        <button id="${pokeman.id}" class="adoptButton"><a class="adoptionButtonLink" href="#windowTwo">Adopt Me</a></button>
      </li>`
      )
      .join('');

    adoptList.innerHTML = pokemonString;
}

function addAdoptablePokemon() {
  const pokeSelect = document.getElementById('pokeSelect').value.toLowerCase();
  const pokeName = document.getElementById('pokeName'); // Pokemon data
  const adoptionPic1 = document.getElementById('adoptionPic1'); // Pokemon data
  const adoptionPic2 = document.getElementById('adoptionPic2'); // Pokemon data
  const adoptionPic3 = document.getElementById('adoptionPic3'); // Pokemon data
  const habitat = document.getElementById('habitat'); // Pokemon data
  const generalInfo = document.getElementById('pokeGeneralInfo'); // Pokemon data

  const url = `https://pokeapi.co/api/v2/pokemon/${pokeSelect}`;
  const urlTwo = `https://pokeapi.co/api/v2/pokemon-species/${pokeSelect}` // MUST be ID

  const promises = [];
  const promises2 = [];

  promises.push(fetch(url).then((res) => res.json()));
  promises2.push(fetch(urlTwo).then((res) => res.json()));

    Promise.all(promises).then(results => 
    {
      const pokemon = results.map((data) =>({
        name : data.name.charAt(0).toUpperCase() + data.name.slice(1),
        id : data.id,
        height : data.height,
        weight : data.weight,
        frontImage : data.sprites.other['official-artwork']['front_default'],
        backImage : data.sprites['back_default'],
        frontImageTwo : data.sprites.other['dream_world']['front_default'],
        type : data.types.map((type) => type.type.name)
      }));
      pokeName.innerHTML = pokemon[0].name;
      adoptionPic1.innerHTML = `<img height="200px" width="200px" src="${pokemon[0].frontImage}"/>`;
      adoptionPic2.innerHTML = `<img height="200px" width="200px" src="${pokemon[0].backImage}"/>`;
      adoptionPic3.innerHTML = `<img height="200px" width="200px" src="${pokemon[0].frontImageTwo}"/>`;
      generalInfo.innerHTML = "Height: " + pokemon[0].height + "<br>" + "Weight: " + pokemon[0].weight;
    });

    // The below promise.ALL does not need to be an .ALL method since only ONE promise is pushed into promises2 array. Refactor required
    Promise.all(promises2).then(results => 
      {
        const pokemon = results.map((data) =>({
          form : data.habitat
        }));
        habitat.innerHTML = pokeSelect.charAt(0).toUpperCase() + pokeSelect.slice(1) + " will thrive best in a " + pokemon[0].form.name + " type of environment.";
      });
      selectedPokemon.innerHTML = "You are adopting " + "<br>" + pokeSelect.charAt(0).toUpperCase() + pokeSelect.slice(1);
}

function clearForm() {
  let pokeSelect = document.getElementById('pokeSelect');
  let adoptFormName = document.getElementById('adoptFormName');
  let adoptFormEmail = document.getElementById('adoptFormEmail');
  let currentPokemon = document.getElementById('currentPokemon');
  let adoptionReason = document.getElementById('adoptionReason');

  alert("Your submission was received. We will respond within 3 business days");
  pokeSelect.value = "";
  adoptFormName.value = "";
  adoptFormEmail.value = "";
  currentPokemon.value = "";
  adoptionReason.value = "";
}


pokeSelect.onchange = addAdoptablePokemon;
adoptSubmitButton.addEventListener('click', clearForm);


/*
setTimeout(function() { buttonMaker(); }, 500); // refactor to async await instead of timeout

function buttonMaker() {
  const adoptButton1 = document.getElementById("105");
  adoptButton1.onclick = () => {window.open('http://127.0.0.1:5500/adoptioncenter.html')}

  const adoptButton2 = document.getElementById("65");
  adoptButton2.onclick = () => {console.log("test2")}

  const adoptButton3 = document.getElementById("137");
  adoptButton3.onclick = () => {console.log("test3")}

  const adoptButton4 = document.getElementById("101");
  adoptButton4.onclick = () => {console.log("test4")}

  const adoptButton5 = document.getElementById("149");
  adoptButton5.onclick = () => {console.log("test5")}
  
  const adoptButton6 = document.getElementById("20");
  adoptButton6.onclick = () => {console.log("test6")}

  const adoptButton7 = document.getElementById("5");
  adoptButton7.onclick = () => {console.log("test7")}

  const adoptButton8 = document.getElementById("129");
  adoptButton8.onclick = () => {console.log("test8")}

  const adoptButton9 = document.getElementById("10");
  adoptButton9.onclick = () => {console.log("test9")}

  const adoptButton10 = document.getElementById("87");
  adoptButton10.onclick = () => {console.log("test10")}
}
*/