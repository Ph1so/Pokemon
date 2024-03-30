const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const btn = document.getElementById("btn");
const rtext = document.getElementById('round');
const ltext = document.getElementById('log');

const cardStats1 = []; // Array to store card 1 stats
const cardStats2 = []; // Array to store card 2 stats

let getPokeData = () => {
  // Generate data for the first card and push stats into cardStats1
  generateCard(card1, cardStats1);
  // Generate data for the second card and push stats into cardStats2
  generateCard(card2, cardStats2);
};

let generateCard = (card, statsArray) => {
  // Generate a random number between 1 and 150
  let id = Math.floor(Math.random() * 150) + 1;
  // Combine the pokeapi url with pokemon id
  const finalUrl = url + id;
  // Fetch generated URL
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      // Get necessary data and assign it to variables
      const hp = data.stats[0].base_stat;
      const imgSrc = data.sprites.other.dream_world.front_default;
      const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
      const statAttack = data.stats[1].base_stat;
      const statDefense = data.stats[2].base_stat;
      const statSpeed = data.stats[5].base_stat;

      // Set themeColor based on pokemon type
      const themeColor = typeColor[data.types[0].type.name];

      // Generate card HTML content
      card.innerHTML = `
          <p class="hp">
            <span>HP</span>
            ${hp}
          </p>
          <img src=${imgSrc} />
          <h2 class="poke-name">${pokeName}</h2>
          <div class="types"></div>
          <div class="stats">
            <div>
              <h3>${statAttack}</h3>
              <p>Attack</p>
            </div>
            <div>
              <h3>${statDefense}</h3>
              <p>Defense</p>
            </div>
            <div>
              <h3>${statSpeed}</h3>
              <p>Speed</p>
            </div>
          </div>
        `;

      // Append types and style card
      appendTypes(data.types, card);
      styleCard(themeColor, card);

      // Push stats into the statsArray
      statsArray.push([hp, pokeName, statAttack, statDefense, statSpeed]);
    });
};



let appendTypes = (types, card) => {
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    card.querySelector(".types").appendChild(span);
  });
};

let styleCard = (color, card) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};
let r = 1; // Define r outside the functions

let setRound = (rin) => {
  setTimeout(() => {
    rtext.textContent = "Round " + rin;
    ltext.style.display = "block";
    // Add more stats as needed
  }, 1000); // 1000 milliseconds = 1 second
}

let countdown = (count) =>{
  if (count >= 1) {
    setTimeout(() => {
      rtext.style.display = "block";
      rtext.textContent = count;
      count--;
      countdown(count); // Call the countdown function recursively
    }, 1000); // 1000 milliseconds = 1 second
  } else {
    setTimeout(() => {
      rtext.style.display = "block";
      rtext.textContent = "FIGHT!";
      setTimeout(() => {
        setRound(r); // Pass the current round number to setRound
        r++; // Increment the round number for the next round
      }, 1); // 1000 milliseconds = 1 second
    }, 1000); // 1000 milliseconds = 1 second
  }
}

let game = () => {
  getPokeData()
  ltext.textContent = "Game Log: "; // Clear the text content of ltext
  countdown(3); // Start the countdown

  
  log.textContent += `Card 1 Stats: ${cardStats1.join(', ')}\n`;
  log.textContent += `Card 2 Stats: ${cardStats2.join(', ')}\n`;
};


btn.addEventListener("click", game);
