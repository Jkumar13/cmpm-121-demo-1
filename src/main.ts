import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jay's game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let isPurchased = 0;
let tenCost = 10;
let hundredCost = 100;
let thousandCost = 1000;

const Ten = document.createElement("button");
Ten.textContent = "+0.1 Growth (Costs " + tenCost + "🔥)";
app.appendChild(Ten);

const Hundred = document.createElement("button");
Hundred.textContent = "+2.0 Growth (Costs " + hundredCost + "🔥)";
app.appendChild(Hundred);

const Thousand = document.createElement("button");
Thousand.textContent = "+50 Growth (Costs " + thousandCost + "🔥)";
app.appendChild(Thousand);

let sparks = 10;

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
  counterText.textContent =
    "🔥Fire: " + sparks.toFixed(0) + ", Growth: " + isPurchased.toFixed(1);
}
// clickerButton.addEventListener("click", () => {
//   incrementCounter(1);
//   counterText.textContent = "🔥Fire: " + sparks;
// });
let tenTrack = 0;
let hundredTrack = 0;
let thousandTrack = 0;
Ten.addEventListener("click", () => {
  if (sparks >= tenCost) {
    sparks -= tenCost;
    isPurchased += 0.1;
    tenTrack += 1;
    tenCost *= 1.15;
    Ten.textContent = "+0.1 Growth (Costs " + tenCost + "🔥, " + tenTrack + " Purchased)";
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
      "+2 Growth (Costs " + hundredCost + "🔥, " + hundredTrack + " Purchased)";
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
      "+50 Growth (Costs " + thousandCost + "🔥, " + thousandTrack + " Purchased)";
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
