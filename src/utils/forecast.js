const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=564f436e12f809982ff4c83cc7f6f7be&query='+latitude+','+longitude
    request( {url: url, json: true} , (error,response) => {
        if(error){
            callback('Unable to connect to network!',undefined)
        } else if(response.body.error) {
            callback('Unable to find location!',undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    })
}

module.exports = forecast