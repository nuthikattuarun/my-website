

const apiKey = "59a25a9319402fa372307128b83a5892";

const menuBtn = document.getElementById("menuBtn");
const menuList = document.getElementById("menuList");

menuBtn.addEventListener("click", () => {
  menuList.classList.toggle("hidden");
});

// Elements
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const toggleDark = document.getElementById("toggleDark");
const message = document.getElementById("message");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const icon = document.getElementById("icon");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const feels = document.getElementById("feels");

// Weather Icons Mapping
function getIcon(cond) {
  if (cond.includes("Cloud")) return "https://cdn-icons-png.flaticon.com/512/414/414825.png";
  if (cond.includes("Rain")) return "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
  if (cond.includes("Clear")) return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
  return "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
}

// Fetch by city
async function getWeather(cityName) {
  try {
    message.textContent = "⏳ Loading...";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) throw new Error();

    const data = await res.json();
    updateUI(data);
    message.textContent = "Updated.";
  } catch {
    message.textContent = " City not found!";
  }
}

// Fetch by location
function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();
    updateUI(data);
  });
}

// Update UI
function updateUI(data) {
  city.textContent = data.name;
  temp.textContent = Math.round(data.main.temp) + "°C";
  condition.textContent = data.weather[0].main;

  icon.src = getIcon(data.weather[0].main);

  humidity.textContent = data.main.humidity + "%";
  wind.textContent = data.wind.speed + " km/h";
  pressure.textContent = data.main.pressure + " hPa";
  feels.textContent = Math.round(data.main.feels_like) + "°C";
}

// Events
searchBtn.addEventListener("click", () => {
  const input = document.querySelector("input").value.trim();
  if (!input) {
    message.textContent = "⚠️ Enter city!";
    return;
  }
  getWeather(input);
});

locationBtn.addEventListener("click", getLocationWeather);

// Dark Mode
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("bg-gray-900");
  document.body.classList.toggle("text-white");
});