import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🔥Fire Clicker🔥";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.width = "1280px";
header.style.height = "125px";
header.style.fontSize = "100px";
header.style.background = "grey";
app.append(header);

interface Item {
  name: string;
  cost: number;
  rate: number;
  clickPower: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "SPARK",
    cost: 10,
    rate: 0.1,
    clickPower: 0,
    description: "Description: LIGHT A SPARK THAT STARTS A FIRE. +0.1 Growth",
  },
  {
    name: "TORCH",
    cost: 100,
    rate: 2,
    clickPower: 0,
    description:
      "Description: IGNITE A TORCH THAT LIGHTS AN INFERNO. +2 Growth",
  },
  {
    name: "VOLCANO",
    cost: 1000,
    rate: 50,
    clickPower: 0,
    description: "Description: RELEASE THE VOLCANO!!!!! +50 Growth",
  },
  {
    name: "CLICKFIRE",
    cost: 150,
    rate: 0.5,
    clickPower: 5,
    description:
      "Description: BECOME THE CLICK APPRENTICE. +0.5 Growth / 5 Click",
  },
  {
    name: "SPAMFIRE",
    cost: 1500,
    rate: 5,
    clickPower: 25,
    description:
      "Description: BECOME THE CLICK MASTER!!!!! 5 Growth / +25 Click",
  },
];

let sparks = 0;
let clickingPower = 1;
let isPurchased = 0;

// clicker
const clickerButton = document.createElement("button");
clickerButton.textContent = "🔥";
clickerButton.style.width = "1280px";
clickerButton.style.height = "300px";
clickerButton.style.fontSize = "100px";
clickerButton.style.background = "yellow";
app.appendChild(clickerButton);

// hover over clicker
clickerButton.addEventListener(
  "mouseenter",
  function () {
    clickerButton.style.background = "orange";
  },
  false,
);
clickerButton.addEventListener(
  "mouseleave",
  function () {
    clickerButton.style.background = "yellow";
  },
  false,
);

// display the counter
const counterText = document.createElement("div");
counterText.textContent = "🔥Fire: " + sparks;
counterText.style.background = "orange";
counterText.style.fontSize = "48px";
app.appendChild(counterText);

function incrementCounterSimple() {
  sparks += isPurchased;
  counterText.textContent = "🔥Fire: " + sparks;
}

setInterval(incrementCounterSimple, 1000);

// increment function, ties to animate function below
function incrementCounter(int: number) {
  sparks += int;
  counterText.textContent =
    "🔥Fire: " +
    sparks.toFixed(0) +
    ", Growth: " +
    isPurchased.toFixed(1) +
    ", Clicking Power: " +
    clickingPower;
}

// when clicking on button
clickerButton.addEventListener("click", () => {
  incrementCounter(clickingPower);
  counterText.textContent = "🔥Fire: " + sparks;
});

// refactored button logic
const itemButtons: { [key: string]: HTMLButtonElement } = {};

// loop
availableItems.forEach((item) => {
  const button = document.createElement("button");
  // button.textContent = `${item.name} (Costs ${item.cost}🔥, +${item.rate} Growth, +${item.clickPower} Click Power)`;
  button.textContent = `${item.name} (Costs ${item.cost.toFixed(1)}🔥)`;
  button.style.fontSize = "33px";
  button.style.background =
    item.name === "SPARK"
      ? "yellow"
      : item.name === "TORCH"
        ? "green"
        : item.name === "CLICKFIRE"
          ? "cyan"
          : item.name === "SPAMFIRE"
            ? "purple"
            : "red";
  app.appendChild(button);

  itemButtons[item.name] = button;

  // refactored purchase logic
  button.addEventListener("click", () => {
    if (sparks >= item.cost) {
      sparks -= item.cost;
      isPurchased += item.rate;
      clickingPower += item.clickPower;
      item.cost *= 1.15; // Increase cost for the next purchase
      button.textContent = `${item.name} (Costs ${item.cost.toFixed(1)}🔥, +${item.rate} Growth, +${item.clickPower} Click Power)`;
      button.textContent = `${item.name}`;
      counterText.textContent = "🔥Fire: " + sparks;
    }
  });
  button.addEventListener("mouseenter", () => {
    button.textContent = `${item.description}`;
    button.style.fontSize = "22px";
  });
  button.addEventListener("mouseleave", () => {
    button.textContent = `${item.name} (Costs ${item.cost.toFixed(1)}🔥)`;
    button.style.fontSize = "36px";
  });
});

requestAnimationFrame(animate);

// request animation frame for continuous growth
let previousTime = 0;
let exponentialCounter = 0;

function animate(currentTime: number) {
  if (previousTime === 0) {
    previousTime = currentTime;
  }
  const seconds = (currentTime - previousTime) / 1000;
  exponentialCounter += seconds * isPurchased;
  console.log(exponentialCounter.toFixed(0));
  incrementCounter(exponentialCounter / 100);
  previousTime = currentTime;
  requestAnimationFrame(animate);
}
