import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jay's game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🔥Click to increase fire";
app.appendChild(button);

let sparks = 0;

const counterText = document.createElement("counterText");
counterText.textContent = "🔥Fire: " + sparks;
app.appendChild(counterText);

function incrementCounter () {
    sparks += 1;
    counterText.textContent = "🔥Fire: " + sparks;
}

button.addEventListener("click", () => {
    incrementCounter();
});

setInterval(incrementCounter, 1000);