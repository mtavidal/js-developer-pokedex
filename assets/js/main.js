const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokeDetail = document.getElementById('poke-detail')
const pokemonArrayList = new Map()

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    pokemonArrayList.set(pokemon.number, pokemon)
    return `
        <li id="poke-${pokemon.number}" class="pokemon ${pokemon.type}" onclick="showDetails('${pokemon.number}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


function showDetails(pokemonNumber) {
    const pokemonDetails = pokemonArrayList.get(parseInt(pokemonNumber))
    const newHtml = detailHtml(pokemonDetails)
    pokeDetail.className = pokemonDetails.type + ' pokemon'
    pokeDetail.innerHTML = newHtml
    document.getElementsByClassName('content')[0].style.display = 'none'
    document.getElementsByClassName('content-details')[0].style.display = 'block'
}

function detailHtml(pokemon) {
    return `
        <span class="number-detail"> #${pokemon.number} </span>
        <h1 class="name"> ${pokemon.name} </h1>
        <div class="detail"><ol class="types"> ${pokemon.types.map((type) => `<li class="type-detail ${type}">${type}</li>`).join('')}</ol></div>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        
        <ol class="details">
        
            <li> Species: ${pokemon.species}</li>
            <li> Weight: ${pokemon.weight}</li>
            <li> Height: ${pokemon.height}</li>
            <li> Abilities: ${pokemon.abilities}</li>
        
        
        </ol>
        
    `
}

backBtn.addEventListener('click', () => {
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementsByClassName('content-details')[0].style.display = 'none'
})