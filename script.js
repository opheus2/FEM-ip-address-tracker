const map = document.querySelector("#map")
const searchInput = document.querySelector(".searchInput")
const searchActionElement = document.querySelector("#search")
const ipaddressElement = document.querySelector("#ipaddress")
const locationElement = document.querySelector("#location")
const timezoneElement = document.querySelector("#timezone")
const ispElement = document.querySelector("#isp")

const ipApiKey = 'at_RAHs0H4kxTidkUnjr1AxMFj3Uq18S'
const geoIpUrl = `https://geo.ipify.org/api/v1?apiKey=${ipApiKey}`

const mapApiKey =
    "pk.eyJ1Ijoib3BoZXVzIiwiYSI6ImNpeGF5NjN1YzAwNmMyb29jMG4xenE0dnIifQ.DsyYT7XaF6qgKcB5kphFJQ"

let ipData;

async function json(url) {
    return fetch(url).then((res) => res.json());
}

function setIpData(ipaddress) {
    json(
        `${geoIpUrl}&ipAddress=${ipaddress ? ipaddress : ""}`
    ).then((data) => {
        console.log(data);
        ipData = data;

        if (ipData) {
            ipaddressElement.innerHTML = ipData.ip;
            locationElement.innerHTML = `${ipData.location.city ? ipData.location.city : ""}, ${
        ipData.location.region ? ipData.location.region : ""
      } ${ipData.location.postalCode ? ipData.location.postalCode : ""}`;
            timezoneElement.innerHTML = `UTC ${ipData.location.timezone}`;
            ispElement.innerHTML = ipData.isp;

            // L.latng
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

searchActionElement.addEventListener("click", (e) => {
    if (validateIpAddress(searchInput.value)) {
        setIpData(searchInput.value);
    }
});

var mymap = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapApiKey,
    }
).addTo(mymap);

var myIcon = L.icon({
    iconUrl: "images/icon-location.svg",
});

var marker = L.marker([51.505, -0.09], { icon: myIcon }).addTo(mymap);

setIpData();