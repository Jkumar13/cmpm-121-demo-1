import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jay's game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let isPurchased = 0;

const button = document.createElement("button");
button.textContent = "Unlock the FIRE FACTORY (Costs 10 Fire)";
app.appendChild(button);

const clickerButton = document.createElement("button");
clickerButton.textContent = "🔥CLICK to gain FIRE!";
app.appendChild(clickerButton);

let sparks = 0;

const counterText = document.createElement("counterText");
counterText.textContent = "🔥Fire: " + sparks;
app.appendChild(counterText);

function incrementCounterSimple() {
    sparks += isPurchased;
    counterText.textContent = "🔥Fire: " + sparks;
  }

setInterval(incrementCounterSimple, 1000);

function incrementCounter(int: number) {
  sparks += int;
  counterText.textContent = "🔥Fire: " + sparks.toFixed(0);
}

clickerButton.addEventListener("click", () => {
    incrementCounter(1);
    counterText.textContent = "🔥Fire: " + sparks;
});
button.addEventListener("click", () => {
    if (sparks >= 10) {
      sparks -= 10;
      isPurchased += 1;
      button.textContent = "🔥Spend 10 fire to POWER the factory (Growth Rate: " + isPurchased + ")";
    }
    counterText.textContent = "🔥Fire: " + sparks;
});
requestAnimationFrame(animate);

let previousTime = 0;
let exponentialCounter = 0;

function animate(currentTime: number) {
  if (previousTime == 0) {
    previousTime = currentTime;
  }
  const seconds = (currentTime - previousTime) / (1000);
  exponentialCounter += seconds * isPurchased;
  console.log(exponentialCounter.toFixed(0));
  incrementCounter(exponentialCounter / 100);
  previousTime = currentTime;
  requestAnimationFrame(animate);
}

