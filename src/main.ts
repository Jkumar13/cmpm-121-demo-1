import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🔥Fire Clicker🔥";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.width = '1280px';
header.style.height = '125px';
header.style.fontSize = '100px';
header.style.background = 'grey';
app.append(header);

let isPurchased = 0;
let tenCost = 10;
let hundredCost = 100;
let thousandCost = 1000;

const clickerButton = document.createElement("button");
clickerButton.textContent = "🔥";
clickerButton.style.width = '1280px';
clickerButton.style.height = '300px';
clickerButton.style.fontSize = '100px';
clickerButton.style.background = 'yellow';
app.appendChild(clickerButton);

clickerButton.addEventListener("mouseenter", function( event ) {   
  clickerButton.style.background = 'orange';
}, false);
clickerButton.addEventListener("mouseleave", function( event ) {   
  clickerButton.style.background = 'yellow';
}, false);

let sparks = 0;

const counterText = document.createElement("counterText");
counterText.textContent = "🔥Fire: " + sparks;
counterText.style.background = 'orange';
counterText.style.fontSize = '48px';
app.appendChild(counterText);


const Ten = document.createElement("button");
Ten.textContent = "+0.1 Growth (Costs " + tenCost + "🔥)";
Ten.style.fontSize = '24px';
Ten.style.background = 'yellow';
app.appendChild(Ten);

const Hundred = document.createElement("button");
Hundred.textContent = "+2.0 Growth (Costs " + hundredCost + "🔥)";
Hundred.style.fontSize = '24px';
Hundred.style.background = 'green';
app.appendChild(Hundred);

const Thousand = document.createElement("button");
Thousand.textContent = "+50 Growth (Costs " + thousandCost + "🔥)";
Thousand.style.fontSize = '24px';
Thousand.style.background = 'red';
app.appendChild(Thousand);

function incrementCounterSimple() {
  sparks += isPurchased;
  counterText.textContent = "🔥Fire: " + sparks;
}

setInterval(incrementCounterSimple, 1000);

function incrementCounter(int: number) {
  sparks += int;
  counterText.textContent =
    "______________🔥Fire: " + sparks.toFixed(0) + ", Growth: " + isPurchased.toFixed(1) + "______________";
}
clickerButton.addEventListener("click", () => {
  incrementCounter(1);
  counterText.textContent = "🔥Fire: " + sparks;
});
let tenTrack = 0;
let hundredTrack = 0;
let thousandTrack = 0;
Ten.addEventListener("click", () => {
  if (sparks >= tenCost) {
    sparks -= tenCost;
    isPurchased += 0.1;
    tenTrack += 1;
    tenCost *= 1.15;
    Ten.textContent =
      "+0.1 Growth (Costs " + tenCost.toFixed(1) + "🔥, " + tenTrack + " Purchased)";
  }
  counterText.textContent = "🔥Fire: " + sparks;
});
Hundred.addEventListener("click", () => {
  if (sparks >= hundredCost) {
    sparks -= hundredCost;
    isPurchased += 2;
    hundredTrack += 1;
    hundredCost *= 1.15;
    Hundred.textContent =
      "+2 Growth (Costs " + hundredCost.toFixed(1) + "🔥, " + hundredTrack + " Purchased)";
  }
  counterText.textContent = "🔥Fire: " + sparks;
});
Thousand.addEventListener("click", () => {
  if (sparks >= thousandCost) {
    sparks -= thousandCost;
    isPurchased += 50;
    thousandTrack += 1;
    thousandCost *= 1.15;
    Thousand.textContent =
      "+50 Growth (Costs " +
      thousandCost.toFixed(1) +
      "🔥, " +
      thousandTrack +
      " Purchased)";
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
  const seconds = (currentTime - previousTime) / 1000;
  exponentialCounter += seconds * isPurchased;
  console.log(exponentialCounter.toFixed(0));
  incrementCounter(exponentialCounter / 100);
  previousTime = currentTime;
  requestAnimationFrame(animate);
}
