const request = require("request");

// Current Weather API Endpoint
const YOUR_ACCESS_KEY = `f9aadb7a27fb981a2248b5f440456084`;
const query = "Ho Chi Minh";
const url = `http://api.weatherstack.com/current?access_key=${YOUR_ACCESS_KEY}&query=${query}`;

// optional parameters:
// & units = m
// & language = en
// & callback = MY_CALLBACK

request({ url: url, json: true }, (error, response) => {
  console.log(
    `${query} weather: ${response.body.current.temperature}C ${response.body.current.weather_descriptions}`
  );
});
