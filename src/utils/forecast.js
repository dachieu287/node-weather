const request = require('request');

const forecast = function (country, callback) {
  const url = `http://api.weatherstack.com/current?access_key=aecd128bed9213de9ddd3ddf5176fec6&query=${country}`;

  request({
    url,
    json: true
  }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      const data = response.body;
      callback(undefined, `It is currently ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degress out`);
    }
  });
}

module.exports = forecast;