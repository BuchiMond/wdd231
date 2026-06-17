// home.js — ChamberMond Home Page Script

// ─── Footer dates ────────────────────────────────────────────────────────────
document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;

// ─── Weather ─────────────────────────────────────────────────────────────────
const API_KEY = '7d19d093732040755f761c431ad0df6e';
const LAT = '6.5244';
const LON = '3.3792';
const UNITS = 'metric';   // Celsius

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${UNITS}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${UNITS}&cnt=24`;

async function fetchWeather() {
    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(weatherURL),
            fetch(forecastURL)
        ]);

        if (!currentRes.ok || !forecastRes.ok) throw new Error('Weather fetch failed');

        const current = await currentRes.json();
        const forecast = await forecastRes.json();

        renderCurrent(current);
        renderForecast(forecast);
    } catch (err) {
        console.error('Weather error:', err);
        document.querySelector('#weather-section').innerHTML +=
            '<p class="weather-error">Weather data unavailable. Please try again later.</p>';
    }
}

function renderCurrent(data) {
    document.querySelector('#weather-town').textContent = data.name;
    document.querySelector('#weather-temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector('#weather-description').textContent = capitalise(data.weather[0].description);
    document.querySelector('#weather-humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.querySelector('#weather-wind').textContent = `Wind: ${Math.round(data.wind.speed)} m/s`;

    const icon = document.querySelector('#weather-icon');
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;
}

function renderForecast(data) {
    // Pick one reading per day (nearest to noon) for the next 3 days
    const today = new Date().toDateString();
    const dayMap = {};

    data.list.forEach(item => {
        const d = new Date(item.dt * 1000);
        const key = d.toDateString();
        if (key === today) return;                 // skip today
        if (!dayMap[key]) dayMap[key] = [];
        dayMap[key].push(item);
    });

    const days = Object.keys(dayMap).slice(0, 3);
    const container = document.querySelector('#forecast-container');
    container.innerHTML = '';

    days.forEach(day => {
        const items = dayMap[day];
        // Prefer the entry closest to 12:00
        const noon = items.reduce((best, item) => {
            const h = new Date(item.dt * 1000).getHours();
            return Math.abs(h - 12) < Math.abs(new Date(best.dt * 1000).getHours() - 12) ? item : best;
        });

        const date = new Date(noon.dt * 1000);
        const label = date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });

        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <p class="forecast-day">${label}</p>
            <img src="https://openweathermap.org/img/wn/${noon.weather[0].icon}.png" alt="${noon.weather[0].description}">
            <p class="forecast-temp">${Math.round(noon.main.temp)}°C</p>
            <p class="forecast-desc">${capitalise(noon.weather[0].description)}</p>
        `;
        container.appendChild(card);
    });
}

function capitalise(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

fetchWeather();

// ─── Spotlights ───────────────────────────────────────────────────────────────
const LEVEL_LABEL = { 3: 'Gold', 2: 'Silver', 1: 'Member' };

async function fetchSpotlights() {
    try {
        const res = await fetch('data/members.json');
        const data = await res.json();
        const eligible = data.members.filter(m => m.membership >= 2);  // Gold + Silver

        // Shuffle and pick 2 or 3
        const shuffled = eligible.sort(() => Math.random() - 0.5);
        const picks = shuffled.slice(0, Math.min(3, shuffled.length));

        renderSpotlights(picks);
    } catch (err) {
        console.error('Spotlight error:', err);
    }
}

function renderSpotlights(members) {
    const container = document.querySelector('#spotlight-container');
    container.innerHTML = '';

    members.forEach(m => {
        const level = LEVEL_LABEL[m.membership] || 'Member';
        const card = document.createElement('article');
        card.classList.add('spotlight-card', `level-${level.toLowerCase()}`);
        card.innerHTML = `
            <div class="spotlight-badge">${level}</div>
            <img src="${m.image}" alt="${m.name} logo" loading="lazy">
            <h3>${m.name}</h3>
            <p class="spotlight-category">${m.category}</p>
            <p class="spotlight-address">📍 ${m.address}</p>
            <p class="spotlight-phone">📞 ${m.phone}</p>
            <a href="${m.website}" target="_blank" rel="noopener" class="spotlight-link">Visit Website →</a>
        `;
        container.appendChild(card);
    });
}

fetchSpotlights();