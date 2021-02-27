// const express = require('express')
// const app = express()
// const port = 3000


// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
    const promises = [];
    for (let i =+1; i <=  898; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((poke) => ({
            name: poke.name,
            id: poke.id,
            image: poke.sprites['front_default'],
            type: poke.types.map((type) => type.type.name).join(', ')
        })); 
        displayPokemon(pokemon);
   });
};
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map((pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
