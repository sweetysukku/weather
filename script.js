document.getElementById('searchBtn').addEventListener('click', fetchWeather);

function fetchWeather() {
  const location = document.getElementById('location').value.trim();
  const apiKey = '056f3e97c0114d788d9221500241610'; // Your working API key

  if (location === '') {
    alert('Please enter a location');
    return;
  }

  const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

  document.getElementById('loading').style.display = 'block';
  document.querySelector('.weather-info').style.display = 'none';

  // Log the API request URL
  console.log(`Fetching weather data from: ${weatherApiUrl}`);

  fetch(weatherApiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Received weather data:', data); // Log the received data

      if (data && data.current) {
        const city = data.location.name;
        const temp = data.current.temp_c;
        const weather = data.current.condition.text;
        const humidity = data.current.humidity;
        const icon = data.current.condition.icon;

        document.getElementById('city-name').innerText = `City: ${city}`;
        document.getElementById('temperature').innerText = `Temperature: ${temp}°C`;
        document.getElementById('weather').innerText = `Weather: ${weather}`;
        document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
        document.getElementById('weather-icon').src = `https:${icon}`;

        document.querySelector('.weather-info').style.display = 'block';
      } else {
        alert('Location not found. Please enter a valid location.');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error); // Log any errors
      alert('Error fetching weather data. Please check the location or try again later.');
    })
    .finally(() => {
      document.getElementById('loading').style.display = 'none';
    });
}
