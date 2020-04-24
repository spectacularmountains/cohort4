import {City, Controller, postData} from './city.js'


const url = 'http://localhost:5000/';
let data; 
let totalPopulation = 0;



const cities = [
    {key:1, city:"Tokyo", population: 9273000, latitude: 35.6850, longitude: 139.7514},
    {key:2, city:"New York", population: 8399000, latitude: 40.6943, longitude: -73.9249},
    {key:3, city:"Mexico City", population: 8855000, latitude: 19.4424, longitude: -99.1310},
    {key:4, city:"Mumbai", population: 18410000, latitude: 19.0170, longitude: 72.8570},
    {key:5, city:"Sao Paulo", population: 12180000, latitude: -23.5587, longitude: -46.6250},
]

    // Check that the server is running and clear any data
const clear = async () => {
    data = await postData(url + 'clear');
    if (data.status > 200) { console.log("ERROR!")}
    cityList.innerHTML = "";
    textOutput.innerHTML = `<h3>Database cleared.<h3>`;
};

const populate = async () => {
    for (let i=0; i<cities.length; i++) {
    data = await postData(url + 'add', cities[i]);
    textOutput.innerHTML = `<h3>${cities[i].key}: ${cities[i].city}</h3>`;
    };
    textOutput.innerHTML = `<h3>Added ${cities.length} entries to the database.</h3>`;
};

const showAll = async () => {
    cityList.innerHTML = "";
    const numberOfCities = (await postData(url + 'all')).length; 

    for (let i=0; i<numberOfCities; i++) {
        data = await postData(url + 'read', {key: i+1});
        if (data === false) {
            textOutput.innerHTML = `<h3>No data loaded on server!</h3>`; 
            return;
        } 
        else {
            console.log(data[0])
        City.show(data[0]);
        };
    };

    //     output +=   `<h3>${cities[i].key}: ${cities[i].city}</h3>
    //                 <ul>
    //                     <li>Latitude: ${cities[i].latitude}</li>
    //                     <li>Longitude: ${cities[i].longitude}</li>
    //                     <li>Population: ${cities[i].population}</li>
    //                 </ul>`
    // }; 
    // textOutput.innerHTML = output;
};

const search = async (e) => {
    let text = e.target.value.toLowerCase(); 
    for (let i=0; i<cities.length; i++) {
        data = await postData(url + 'read', cities[i]);
        if (data === false) {textOutput.innerHTML = `<h3>No data loaded on server!</h3>`; return} 
        else if (cities[i].city.toLowerCase().indexOf(text) != -1) {
            textOutput.innerHTML = `<h3>${cities[i].key}: ${cities[i].city}</h3>
                                    <ul>
                                        <li>Latitude: ${cities[i].latitude}</li>
                                        <li>Longitude: ${cities[i].longitude}</li>
                                        <li>Population: ${cities[i].population}</li>
                                    </ul>`;
            return; 
        } else {
            textOutput.innerHTML = "This city is not in the database.";
        }
    }
};

const checkIfCityExists = async (e) => {
    textOutput.textContent = ""; 
    let text = idInputAdd.value.toLowerCase(); 
    for (let i=0; i<cities.length; i++) {
        data = await postData(url + 'read', cities[i]);
        if (data === false) {textOutput.innerHTML = `<h3>No data loaded on server!</h3>`; return} 
        else if (cities[i].city.toLowerCase() === text) {
            textOutput.innerHTML = `<h3>${cities[i].city} already exists in database.</h3>`
            return; 
        }; 
    }
    add();
};

const add = () => {
    console.log("Add new city")
};

const howBig = () => {
    let pop = Number(idInputHowBig.value);
    let cityType = City.howBig(pop); 
    textOutput.innerHTML = cityType;
};


// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//         const response = await fetch(url, {
//             method: 'POST',     // *GET, POST, PUT, DELETE, etc.
//             mode: 'cors',       // no-cors, *cors, same-origin
//             cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
//             credentials: 'same-origin', // include, *same-origin, omit
//             headers: {
//                 'Content-Type': 'application/json'
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             redirect: 'follow',         // manual, *follow, error
//             referrer: 'no-referrer',    // no-referrer, *client
//             body: JSON.stringify(data)  // body data type must match "Content-Type" header
//         });

//         const json = await response.json();    // parses JSON response into native JavaScript objects
//         json.status = response.status;
//         json.statusText = response.statusText;
//         // console.log(json, typeof(json));
//         if (response.status > 200) {return false};
//         return json;
// }


// EVENTLISTENERS 

// document.addEventListener("DOMContentLoaded", showAll);

idButtonPopulate.addEventListener("click", populate);

idButtonClear.addEventListener("click", clear);

idButtonShow.addEventListener("click", showAll);

city.addEventListener("keyup", search); 

idButtonAdd.addEventListener("click", checkIfCityExists);

idInputAdd.addEventListener("keyup", (e) => {
    if(e.keyCode === 13) {checkIfCityExists()}
});

idButtonHowBig.addEventListener("click", howBig);

idInputHowBig.addEventListener("keyup", (e) => {
    if(e.keyCode === 13) {howBig()}
});

idButtonTotalPopulation.addEventListener("click", (() => {
Controller.getPopulation(); 
}));

cityForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    Controller.createCity();
})