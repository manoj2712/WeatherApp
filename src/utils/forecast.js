const request = require('request')
 
const forecast = (latitude,longitude, callback) => {
    const url =
      "http://api.weatherstack.com/current?access_key=54d568ebc07c113cdd96350fa095b096&query="+ latitude+ ','+longitude+"&units=f";
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect',undefined)
        } else if (body.error) { 
            callback('coordintes are not correct, please try with correct coordinate',undefined)
        } else {
            callback(undefined, "It is currently "+body.current.temperature+" degree out. It feels like "+body.current.feelslike+" degree out.");
        }
    })
}

module.exports = forecast;