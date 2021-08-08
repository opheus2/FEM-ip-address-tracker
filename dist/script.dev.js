"use strict";

var map = document.querySelector("#map");
var searchInput = document.querySelector(".searchInput");
var searchActionElement = document.querySelector("#search");
var ipaddressElement = document.querySelector("#ipaddress");
var locationElement = document.querySelector("#location");
var timezoneElement = document.querySelector("#timezone");
var ispElement = document.querySelector("#isp");
var ipApiKey = 'at_RAHs0H4kxTidkUnjr1AxMFj3Uq18S';
var geoIpUrl = "https://geo.ipify.org/api/v1?apiKey=".concat(ipApiKey);
var mapApiKey = "pk.eyJ1Ijoib3BoZXVzIiwiYSI6ImNpeGF5NjN1YzAwNmMyb29jMG4xenE0dnIifQ.DsyYT7XaF6qgKcB5kphFJQ";
var ipData;

function json(url) {
  return regeneratorRuntime.async(function json$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", fetch(url).then(function (res) {
            return res.json();
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function setIpData(ipaddress) {
  json("".concat(geoIpUrl, "&ipAddress=").concat(ipaddress ? ipaddress : "")).then(function (data) {
    console.log(data);
    ipData = data;

    if (ipData) {
      ipaddressElement.innerHTML = ipData.ip;
      locationElement.innerHTML = "".concat(ipData.location.city ? ipData.location.city : "", ", ").concat(ipData.location.region ? ipData.location.region : "", " ").concat(ipData.location.postalCode ? ipData.location.postalCode : "");
      timezoneElement.innerHTML = "UTC ".concat(ipData.location.timezone);
      ispElement.innerHTML = ipData.isp; // L.latng

      var lat = ipData.location.lat;
      var lng = ipData.location.lng;
      marker.setLatLng([lat, lng]);
      mymap.setView([lat, lng], 13);
    }
  });
}

function validateIpAddress(ipaddress) {
  if (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(ipaddress)) {
    return true;
  }

  return false;
}

searchActionElement.addEventListener("click", function (e) {
  if (validateIpAddress(searchInput.value)) {
    setIpData(searchInput.value);
  }
});
var mymap = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: mapApiKey
}).addTo(mymap);
var myIcon = L.icon({
  iconUrl: "images/icon-location.svg"
});
var marker = L.marker([51.505, -0.09], {
  icon: myIcon
}).addTo(mymap);
setIpData();