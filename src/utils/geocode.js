const request= require('request')
 
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWFub2ptYXBib3gxMjMiLCJhIjoiY2t5d2xuYno5MDlsbzJwczc5aXh6ZHNvdCJ9.zNLgZjtz5mzD8uL6gml9Bg&limit=1";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect, please try again later", undefined);
    } else if (response.body.features.length === 0) {
      callback(
        "location address is not available, please enter correct location",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports =geocode;