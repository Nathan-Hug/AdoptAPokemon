
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


// Fetch Pokemon data from the API
const fetchPokemon = () => 
{
  const waitingPokemon = [105, 65, 137, 101, 149, 20, 5, 129, 10, 87]
  const promises = [];

  for(let i = 0; i < waitingPokemon.length; i++) 
  {
    const url = `https://pokeapi.co/api/v2/pokemon/${waitingPokemon[i]}`;
    promises.push(fetch(url).then((res) => res.json()));
    adoptablePokemon.push(fetch(url).then((res) => res.json()));
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
console.log(adoptablePokemon);
// Display the Pokemon data that was fetched into link html elements
// This function is called inside fetchPokemon, line 67
const displayPokemon = (pokemon) =>
{
    console.log(pokemon);
    const pokemonString = pokemon.map(pokeman => `
      <li>
        <img src="${pokeman.image}"/>
        <h2>${pokeman.id}. ${pokeman.name}</h2>
        <p>Type: ${pokeman.type}</p>
        <button id="${pokeman.id}" class="adoptButton">Adopt Me</button>
      </li>`
      )
      .join('');

    adoptList.innerHTML = pokemonString;
}


pokeSelect.onchange = setPokeInfo;

// Set detailed information of current option select from Pokemon that are available for adoption
function setPokeInfo() {
  for(let i = 0; i < testPokemon.length; i++)
  {
    if(pokeSelect.value === testPokemon[i].name) 
    {
      pokeName.innerHTML = testPokemon[i].name;
    }
  }
}





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