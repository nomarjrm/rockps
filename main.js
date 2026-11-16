let history = [];
const choices = ["Piedra", "Papel", "Tijeras"];

const buttons = document.querySelectorAll(".choice-btn");
const cpuDisplay = document.getElementById("cpu-display");
const winnerText = document.getElementById("winner-text");
const historyList = document.getElementById("history-list");

const determineWinner = (playerChoice, cpuChoice) => {
    if (playerChoice === cpuChoice) return "Empate";
    if (
        (playerChoice === "Piedra" && cpuChoice === "Tijeras") ||
        (playerChoice === "Papel" && cpuChoice === "Piedra") ||
        (playerChoice === "Tijeras" && cpuChoice === "Papel")
    ) {
        return "Ganador P1";
    }
    return "Ganador CPU";
};

const renderHistory = () => {
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = `<p class="text-slate-400 text-sm">Aún no hay partidas registradas.</p>`;
        return;
    }

    // Tomamos las últimas 5 partidas y las invertimos para ver la más reciente arriba
    const recentHistory = history.slice(-5).reverse();

    for (const game of recentHistory) {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center p-2 bg-sky-50 rounded-lg text-sm border border-slate-100";
        
        // Definimos el color del texto de la partida según el ganador
        let colorStyle = "color: #ca8a04; font-weight: bold;"; // Amarillo por defecto (Empate)
        if (game.winner === "Ganador P1") colorStyle = "color: #16a34a; font-weight: bold;"; // Verde
        if (game.winner === "Ganador CPU") colorStyle = "color: #dc2626; font-weight: bold;"; // Rojo

        li.innerHTML = `
            <span>P1: <strong>${game.player}</strong> vs CPU: <strong>${game.cpu}</strong></span>
            <span style="${colorStyle}">${game.winner}</span>
        `;
        historyList.historyList ? historyList.appendChild(li) : historyList.appendChild(li);
    }
};

const playGame = (playerChoice) => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const cpuChoice = choices[randomIndex];

    const icons = { Piedra: "✊", Papel: "📄", Tijeras: "✂️" };
    cpuDisplay.textContent = icons[cpuChoice];

    const winner = determineWinner(playerChoice, cpuChoice);

    winnerText.textContent = winner === "Empate" ? "¡Empate!" : `¡${winner}!`;
    
    // Aplicamos el color directamente al texto del ganador central
    if (winner === "Ganador P1") {
        winnerText.style.color = "#16a34a"; // Verde
    } else if (winner === "Ganador CPU") {
        winnerText.style.color = "#dc2626"; // Rojo
    } else {
        winnerText.style.color = "#ca8a04"; // Amarillo
    }

    // Registramos la jugada en el arreglo general
    history.push({ player: playerChoice, cpu: cpuChoice, winner: winner });

    // Actualizamos la vista del historial
    renderHistory();
};

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const playerChoice = button.getAttribute("data-choice");
        playGame(playerChoice);
    });
});