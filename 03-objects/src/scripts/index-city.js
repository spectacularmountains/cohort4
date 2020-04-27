import {City, Controller, postData} from './city.js'


const url = 'http://localhost:5000/';
let numberOfCities; 
let data; 


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

idButtonPopulate.addEventListener("click", City.populate);

idButtonClear.addEventListener("click", City.clear);

idButtonShow.addEventListener("click", City.showAll);

city.addEventListener("keyup", (e) => {
    let text = e.target.value.toLowerCase(); 
    City.search(text);
}); 

idButtonAdd.addEventListener("click", checkIfCityExists);

idInputAdd.addEventListener("keyup", (e) => {
    if(e.keyCode === 13) {checkIfCityExists()}
});

idButtonHowBig.addEventListener("click", howBig);

idInputHowBig.addEventListener("keyup", (e) => {
    if(e.keyCode === 13) {howBig()}
});

totalPopulation.addEventListener("click", (() => {
Controller.getPopulation(); 
}));

cityForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    Controller.createCity();
});

cityList.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete")) {
        Controller.deleteCity(e.target);
    } else { 
    Controller.selectCity(e.target);
    };
});

whichSphere.addEventListener("click", (() => {
    Controller.whichSphere(); 
}));
    
northernMost.addEventListener("click", (() => {
    Controller.getMostNorthern ();
}));
    
southernMost.addEventListener("click", (() => {
    Controller.getMostSouthern ();
}));