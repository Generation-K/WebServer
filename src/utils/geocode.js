const request = require('request')

const geocode = (address,callback) => {
    const url='http://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZ2VuLWsiLCJhIjoiY2tjNjNmdGd6MG54cTJ2bG04amFnMzVqciJ9.BawJ5T5gx_Tyizh9MIK9Qg&limit=1'
    request({ url:url , json:true }, (error,response) =>{
        if(error){
            callback('Unable to connect to location server!',undefined)
        } else if(!response.body.features.length){
            callback('Unable to find location!',undefined)
        } else {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode