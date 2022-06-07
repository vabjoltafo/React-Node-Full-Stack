const axios = require("axios");
const HttpError = require("../models/http-error");
const API_KEY = "pk.cd167999c9bf4c83e3aa4f62fca8c814";

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://eu1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
      address
    )}&format=json`
  );

  const data = response.data[0];

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coorLat = data.lat;
  const coorLon = data.lon;
  const coordinates = {
    lat: coorLat,
    lng: coorLon,
  };

  return coordinates;
}

module.exports = getCoordsForAddress;