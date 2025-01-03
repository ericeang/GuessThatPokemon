let pokemonName = "";
let brightness = 0;

const fetchData = async () => {
  try {
    // Set initial displays for sprite, message, and restart button to none.
    const img = document.getElementById("pokemonSprite");
    img.style.display = "none";

    const pokemonMessage = document.getElementById("pokemonMessage");
    pokemonMessage.style.display = "none";

    const restart = document.getElementById("restart");
    restart.style.display = "none";

    // Get random pokemon from 1 to 151
    const randomIndex = Math.floor(Math.random() * 151) + 1;
    const genOnePokemon = `https://pokeapi.co/api/v2/pokemon/${randomIndex}`;

    //
    const response = await fetch(genOnePokemon);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    pokemonName = data.name;

    const pokemonSprite = data.sprites.other["official-artwork"].front_default;
    img.src = pokemonSprite;
    img.style.display = "block";
    img.style.filter = "brightness(0)";
  } catch (error) {
    console.error("Error:", error);
  }
};

const handleGuess = () => {
  const pokemon = document.getElementById("pokemonGuess");
  const pokemonGuess = pokemon.value.toLowerCase();

  if (pokemonGuess === pokemonName) {
    const pokemonMessage = document.getElementById("pokemonMessage");
    pokemonMessage.style.display = "block";
    pokemonMessage.textContent = "You win!";

    const img = document.getElementById("pokemonSprite");
    img.style.filter = "brightness(1)";

    const restart = document.getElementById("restart");
    restart.style.display = "block";
    brightness = 0;
  } else {
    const pokemonMessage = document.getElementById("pokemonMessage");
    pokemonMessage.style.display = "block";
    pokemonMessage.textContent = "Try again!";

    const img = document.getElementById("pokemonSprite");
    if (brightness < 1) {
      img.style.filter = `brightness(${(brightness += 0.1)})`;
    }
  }

  pokemon.value = "";
};

const input = document.getElementById("pokemonGuess");
input?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGuess();
  }
});

fetchData();
