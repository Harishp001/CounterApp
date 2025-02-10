// DOM Elements
const counterButton = document.querySelector('#counter');
const resetButton = document.querySelector('#reset');
const incrementButton = document.querySelector('#increment');
const decrementButton = document.querySelector('#decrement');
const undoButton = document.querySelector('#undo');
const redoButton = document.querySelector('#redo');
const countDisplay = document.querySelector('#count-value');
const highestCountDisplay = document.querySelector('#highest-count');
const totalClicksDisplay = document.querySelector('#total-clicks');
const lastUpdatedDisplay = document.querySelector('#last-updated');
const themeSwitch = document.querySelector('#theme-switch');
const soundToggle = document.querySelector('#sound-toggle');
const historyChart = document.querySelector('#historyChart').getContext('2d');

// State Variables
let count = 0;
let history = [0];
let currentHistoryIndex = 0;
let highestCount = 0;
let totalClicks = 0;
let lastUpdated = 'Never';
let isSoundEnabled = true;
let isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
let audioContext = null;

// Initialize Chart
let historyChartInstance = new Chart(historyChart, {
    type: 'line',
    data: {
        labels: history.map((_, i) => i + 1),
        datasets: [{
            label: 'Count History',
            data: history,
            borderColor: '#4a90e2',
            tension: 0.1,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Initialize theme and sound buttons
themeSwitch.textContent = isDarkTheme ? '☀️' : '🌙';
soundToggle.textContent = isSoundEnabled ? '🔊' : '🔇';

// Helper Functions
function updateDisplay() {
    countDisplay.textContent = count;
    counterButton.textContent = `Count is ${count}`;
    highestCountDisplay.textContent = highestCount;
    totalClicksDisplay.textContent = totalClicks;
    lastUpdatedDisplay.textContent = lastUpdated;
    
    undoButton.disabled = currentHistoryIndex === 0;
    redoButton.disabled = currentHistoryIndex === history.length - 1;
    
    updateChart();
}

function updateChart() {
    historyChartInstance.data.labels = history.map((_, i) => i + 1);
    historyChartInstance.data.datasets[0].data = history;
    historyChartInstance.update();
}

function playSound() {
    if (!isSoundEnabled || !window.AudioContext) return;
    
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    themeSwitch.textContent = isDarkTheme ? '☀️' : '🌙';
}

function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    soundToggle.textContent = isSoundEnabled ? '🔊' : '🔇';
}

function updateCount(newCount) {
    history = history.slice(0, currentHistoryIndex + 1);
    history.push(newCount);
    currentHistoryIndex = history.length - 1;

    count = newCount;
    if (count > highestCount) highestCount = count;
    
    totalClicks++;
    lastUpdated = new Date().toLocaleString();
    
    updateDisplay();
    playSound();
}

// Event Listeners
incrementButton.addEventListener('click', () => updateCount(count + 1));
decrementButton.addEventListener('click', () => updateCount(count - 1));
counterButton.addEventListener('click', () => updateCount(count + 1));
resetButton.addEventListener('click', () => updateCount(0));

undoButton.addEventListener('click', () => {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        count = history[currentHistoryIndex];
        totalClicks++;
        lastUpdated = new Date().toLocaleString();
        updateDisplay();
        playSound();
    }
});

redoButton.addEventListener('click', () => {
    if (currentHistoryIndex < history.length - 1) {
        currentHistoryIndex++;
        count = history[currentHistoryIndex];
        totalClicks++;
        lastUpdated = new Date().toLocaleString();
        updateDisplay();
        playSound();
    }
});

themeSwitch.addEventListener('click', toggleTheme);
soundToggle.addEventListener('click', toggleSound);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    switch (e.key.toLowerCase()) {
        case 'arrowright':
        case ' ':
            e.preventDefault();
            updateCount(count + 1);
            break;
        case 'arrowleft':
            e.preventDefault();
            updateCount(count - 1);
            break;
        case 'r':
            e.preventDefault();
            updateCount(0);
            break;
        case 'd':
            e.preventDefault();
            toggleTheme();
            break;
        case 'm':
            e.preventDefault();
            toggleSound();
            break;
        case 'z':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                undoButton.click();
            }
            break;
        case 'y':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                redoButton.click();
            }
            break;
    }
});

// Initial Display Update
updateDisplay();