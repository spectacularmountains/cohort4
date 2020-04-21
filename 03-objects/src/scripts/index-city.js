import {City, Controller} from './city.js'


const url = 'http://localhost:5000/';
let data; 



const cities = [
    {key:1, city:"Tokyo", latitude: 35.6850, longitude: 139.7514, population: 9273000},
    {key:2, city:"New York", latitude: 40.6943, longitude: -73.9249, population: 8399000},
    {key:3, city:"Mexico City", latitude: 19.4424, longitude: -99.1310, population: 8855000},
    {key:4, city:"Mumbai", latitude: 19.0170, longitude: 72.8570, population: 18410000},
    {key:5, city:"Sao Paulo", latitude: -23.5587, longitude: -46.6250, population: 12180000},
]

    // Check that the server is running and clear any data
const clear = async () => {
    data = await postData(url + 'clear');
    if (data.status > 200) { console.log("ERROR!")}
    textOutput.innerHTML = `<h3>Database cleared.<h3>`;
};

const populate = async () => {
    for (let i=0; i<cities.length; i++) {
    data = await postData(url + 'add', cities[i]);
    textOutput.innerHTML = `<h3>${cities[i].key}: ${cities[i].city}</h3>`;
    };
    textOutput.innerHTML = `<h3>Added ${cities.length} entries to the database.</h3>`;
};

const show = async () => {
    let output = ""; 
    for (let i=0; i<cities.length; i++) {
        data = await postData(url + 'read', cities[i]);
        if (data === false) {textOutput.innerHTML = `<h3>No data loaded on server!</h3>`; return} 
        
        output +=   `<h3>${cities[i].key}: ${cities[i].city}</h3>
                    <ul>
                        <li>Latitude: ${cities[i].latitude}</li>
                        <li>Longitude: ${cities[i].longitude}</li>
                        <li>Population: ${cities[i].population}</li>
                    </ul>`
    }; 
    textOutput.innerHTML = output;
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

/*
    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toBe(0);

    data = await postData(url + 'add', clients[0]);
    expect(data.status).toEqual(200);

    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Larry");

    // add a second with the same key which should be an error
    data = await postData(url + 'add', clients[0]);
    expect(data.status).toEqual(400);

    // add a second which should be ok
    data = await postData(url + 'add', clients[1]);
    expect(data.status).toEqual(200);

    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toBe(2);
    expect(data[1].name).toBe("Lorraine");

    data = await postData(url + 'read', {key:1});
    expect(data.status).toEqual(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Larry");

    data = await postData(url + 'update', {key:1, name:"George"});
    expect(data.status).toEqual(200);

    data = await postData(url + 'read', {key:1});
    expect(data.status).toEqual(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("George");

    data = await postData(url + 'delete', {key:1});
    expect(data.status).toEqual(200);

    data = await postData(url + 'read', {key:1});
    expect(data.status).toEqual(400);
};
*/ 

async function postData(url = '', data = {}) {
    // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST',     // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',       // no-cors, *cors, same-origin
            cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',         // manual, *follow, error
            referrer: 'no-referrer',    // no-referrer, *client
            body: JSON.stringify(data)  // body data type must match "Content-Type" header
        });

        const json = await response.json();    // parses JSON response into native JavaScript objects
        json.status = response.status;
        json.statusText = response.statusText;
        // console.log(json, typeof(json));
        if (response.status > 200) {return false};
        return json;
}


// EVENTLISTENERS 

idButtonPopulate.addEventListener("click", populate);

idButtonClear.addEventListener("click", clear);

idButtonShow.addEventListener("click", show);

idInputCity.addEventListener("keyup", search); 

idButtonAdd.addEventListener("click", checkIfCityExists);

idInputAdd.addEventListener("keyup", (e) => {
    if(e.keyCode === 13) {
        checkIfCityExists();
    }
});
