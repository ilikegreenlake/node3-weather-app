const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/787755fecb575b3d015fbc97863b821c/' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.statusCode !== 200) {
            callback('Unable to fetch forecast data: ' + response.statusMessage, undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(response.body.daily.data[0]);
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. Max temperature is ' +  response.body.daily.data[0].temperatureMax + 'F. '+'There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast