import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🔥Fire Clicker🔥";
document.title = gameName;
document.body.style.backgroundImage = "sun.jpg";

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.width = "80rem";
header.style.height = "5rem";
header.style.fontSize = "4rem";
app.append(header);

interface Item {
  name: string;
  cost: number;
  rate: number;
  clickPower: number;
  description: string;
  background: string;
}

const availableItems: Item[] = [
  {
    name: "SPARK",
    cost: 10,
    rate: 0.1,
    clickPower: 0,
    description: "Description: LIGHT A SPARK THAT STARTS A FIRE. +0.1 Growth",
    background: 'yellow',
  },
  {
    name: "TORCH",
    cost: 100,
    rate: 2,
    clickPower: 0,
    description:
      "Description: IGNITE A TORCH THAT LIGHTS AN INFERNO. +2 Growth",
    background: 'green',
  },
  {
    name: "VOLCANO",
    cost: 1000,
    rate: 50,
    clickPower: 0,
    description: "Description: RELEASE THE VOLCANO!!!!! +50 Growth",
    background: 'cyan',
  },
  {
    name: "CLICKFIRE",
    cost: 150,
    rate: 0.5,
    clickPower: 5,
    description:
      "Description: BECOME THE CLICK APPRENTICE. +0.5 Growth / 5 Click",
    background: 'purple',
  },
  {
    name: "SPAMFIRE",
    cost: 1500,
    rate: 5,
    clickPower: 25,
    description:
      "Description: BECOME THE CLICK MASTER!!!!! 5 Growth / +25 Click",
    background: 'indigo',
  },
];

function setButtonStyle(button: HTMLButtonElement, background: string, fontSize: string) {
  button.style.background = background;
  button.style.fontSize = fontSize;
}

let sparks = 0;
let clickingPower = 1;
let isPurchased = 0;

// clicker
const clickerButton = document.createElement("button");
clickerButton.textContent = "🔥";
clickerButton.style.width = "30rem";
clickerButton.style.height = "15rem";
clickerButton.style.fontSize = "5rem";
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
counterText.style.fontSize = "2rem";
app.appendChild(counterText);

function incrementCounterSimple() {
  sparks += isPurchased;
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
});

// refactored button logic
const itemButtons: { [key: string]: HTMLButtonElement } = {};

// loop
availableItems.forEach((item) => {
  const button = document.createElement("button");
  setButtonStyle(button, item.background, "2rem");
  button.textContent = `__________${item.name} (Costs ${item.cost.toFixed(1)}🔥)__________`;
  app.appendChild(button);
  itemButtons[item.name] = button;

  // refactored purchase logic
  button.addEventListener("click", () => {
    if (sparks >= item.cost) {
      button.textContent = `____________________PURCHASED ITEM!____________________`;
      sparks -= item.cost;
      isPurchased += item.rate;
      clickingPower += item.clickPower;
      item.cost *= 1.15; // Increase cost for the next purchase
      counterText.textContent = "🔥Fire: " + sparks;
    }
    else {
      button.textContent = `____________________CANNOT AFFORD____________________`;
    }
  });
  button.addEventListener("mouseenter", () => {
    if (sparks >= item.cost) {
      setButtonStyle(button, item.background, "2rem");
    }
    else {
      setButtonStyle(button, "red", "2rem");
    }
    button.textContent = `${item.description}`;
  });
  button.addEventListener("mouseleave", () => {
    if (sparks >= item.cost) {
      setButtonStyle(button, item.background, "2rem");
    }
    else {
      setButtonStyle(button, "red", "2rem");
    }
    button.textContent = `__________${item.name} (Costs ${item.cost.toFixed(1)}🔥)__________`;
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
