const url = 'http://localhost:5000/';
let highlightedRow = false;
let numberOfCities;
let data; 
let selectedCity = ""; 
let loadedData = []; 

const cities = [
    {key:1, city:"Tokyo", population: 9273000, latitude: 35.6850, longitude: 139.7514},
    {key:2, city:"New York", population: 8399000, latitude: 40.6943, longitude: -73.9249},
    {key:3, city:"Mexico City", population: 8855000, latitude: 19.4424, longitude: -99.1310},
    {key:4, city:"Mumbai", population: 18410000, latitude: 19.0170, longitude: 72.8570},
    {key:5, city:"Sao Paulo", population: 12180000, latitude: -23.5587, longitude: -46.6250},
]

// Load all data currently on server into CACHE 
async function loadAll() {
    data = await postData(url + 'all');
    numberOfCities = data.length;
    for (let i=0; i<data.length; i++) {
        loadedData.push(new City(data[i].key, data[i].city, data[i].population, data[i].latitude, data[i].longitude));
        console.log(loadedData)
        };
        textOutput.textContent = `Currently ${data.length} entries on server.`;
return;
}
loadAll();
console.log(loadedData)


// CREATE CLASS "CITY"

class City {
	constructor (key, city, population, latitude, longitude) {
		this.key = key;
		this.city = city;
		this.population = population; 
		this.latitude = latitude; 
		this.longitude = longitude; 
	};

	static show (city) {
        textOutput.textContent = " "; 
        const cityList = document.querySelector("#cityList");
        const row = document.createElement("tr"); 
        row.style.height = "15px";
        row.innerHTML = `
            <td>${city.city}</td>
            <td>${city.population}</td>
            <td>${city.latitude}</td>
            <td>${city.longitude}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `
        cityList.appendChild(row); 

        return;
    }; 
        
    static showAll() {
        cityList.innerHTML = "";
        numberOfCities = loadedData.length; 
        if (numberOfCities === 0) {
            textOutput.innerHTML = `No data loaded on server!`; 
            return;
        } else {
        for (let i=0; i<numberOfCities; i++) {
            City.show(loadedData[i]);
            };
        return;
        // data = await postData(url + 'all');
        // numberOfCities = data.length; 
        // if (numberOfCities === 0) {
        //     textOutput.innerHTML = `No data loaded on server!`; 
        //     return;
        // } else {
        // for (let i=0; i<numberOfCities; i++) {
        //     City.show(data[i]);
        //     };
        // return;
        };
    };

    static async populate() { 
        if (loadedData.length) {
            textOutput.textContent = `Database has been loaded already. Currently ${loadedData.length} entries in database.`;
            return;
        } 
        for (let i=0; i<cities.length; i++) {
        data = await postData(url + 'add', cities[i]);
        loadedData.push(new City(cities[i].key, cities[i].city, cities[i].population, cities[i].latitude, cities[i].longitude));
        console.log(loadedData)
        textOutput.textContent = `${cities[i].key}: ${cities[i].city}`;
        };
        textOutput.textContent = `Added ${cities.length} entries to the database.`;
    };

    static async clear() {
        data = await postData(url + 'clear');
        if (data.status > 200) { console.log("ERROR!")}
        loadedData = [];
        cityList.textContent = "";
        textOutput.textContent = `Database cleared.`;
    };
        
    static async search(text) {
        cityList.innerHTML = "";
        numberOfCities = data.length; 
        if (numberOfCities === 0) {
            textOutput.textContent = `No data loaded on server!`; 
            return;
        } else {
        for (let i=0; i<numberOfCities; i++) {
            if (data[i].city.toLowerCase().indexOf(text) !== -1) {
                City.show(data[i]);
            }
        };
        };
    };

    //     for (let i=0; i<numberOfCities; i++) {
    //         data = await postData(url + 'read', cities[i]);
    //         if (cities[i].city.toLowerCase().indexOf(text) != -1) {
    //             textOutput.innerHTML = `<h3>${cities[i].key}: ${cities[i].city}</h3>
    //                                     <ul>
    //                                         <li>Latitude: ${cities[i].latitude}</li>
    //                                         <li>Longitude: ${cities[i].longitude}</li>
    //                                         <li>Population: ${cities[i].population}</li>
    //                                     </ul>`;
    //             return; 
    //         } else {
    //             textOutput.innerHTML = "This city is not in the database.";
    //         }
    //     }
    // };


	movedIn (number) {
		this.population += number;
		return this.population;
	};

	movedOut (number) {
		this.population -= number;
		return this.population;
	};

	static howBig () {
        if (!selectedCity) {
            textOutput.textContent = "Please select a city"
        }

        // data = await postData(url + 'all');
        numberOfCities = loadedData.length; 

        for (let i=0; i<numberOfCities; i++) {

            if (loadedData[i].city === selectedCity) { 
                if (loadedData[i].population > 100000) { placetype = "City"; };
                if (loadedData[i].population > 20000) { placetype = "Large town"; };
                if (loadedData[i].population > 1000) { placetype = "Town"; };
                if (loadedData[i].population > 100) { placetype = "Village"; };
                placetype = "Hamlet";
            };
            textOutput.textContent = placeType; 
        }; 
    }; 
};


// CREATE CLASS "CONTROLLER"

class Controller {

	static async whichSphere () {
        if (!selectedCity) {
            textOutput.textContent = "Please select a city"
        }

        data = await postData(url + 'all');
        numberOfCities = data.length; 

        for (let i=0; i<numberOfCities; i++) {

            if (data[i].city === selectedCity) { 
                if (data[i].latitude > 0) {
                textOutput.textContent = "Northern hemisphere"
                return 
            };
            textOutput.textContent = "Southern hemisphere"
            return; 
            }; 
        }; 
    };
    
    getMostNorthern () {
        return "Alert"; // Placeholder for now! 
    };

    getMostSouthern () {
        return "Ushuaia"; // Placeholder for now! 
    };

    static async getPopulation () {
        let totalPopulation = 0;
        data = await postData(url + 'all')
        numberOfCities = data.length; 

        for (let i=1; i<numberOfCities; i++) {
            totalPopulation += data[i].population; 
        // data = await postData(url + 'read', {key: i});
        // totalPopulation += data[0].population;
        }
    textOutput.innerHTML = `The total population of all cities is ${totalPopulation}`;
    };

    static async createCity () {
        cityList.innerHTML = "";
        const city = document.getElementById("city").value; 
        const population = Number(document.getElementById("population").value); 
        const latitude = Number(document.getElementById("latitude").value); 
        const longitude = Number(document.getElementById("longitude").value); 
        const key = (await postData(url + 'all')).length + 1; 
        
        const newCity = new City(key, city, population, latitude, longitude); // Instantiate new City 
        loadedData.push(newCity);
        console.log(loadedData)
        data = await postData(url + 'add', newCity);
        Controller.clearFields();
        City.show(newCity);
    }; 

    static deleteCity (el) {
        const cityToBeDeleted = el.parentElement.parentElement.firstElementChild.textContent;
        el.parentElement.parentElement.remove(); 
        Controller.deleteCityFromServer(cityToBeDeleted); 
    }; 

    static selectCity (el) {
        if (highlightedRow === false) {
            highlightedRow = el.parentElement; 
            highlightedRow.classList.toggle("bg-info");
            
        }
        else if (highlightedRow === el.parentElement) {
            highlightedRow.classList.toggle("bg-info");
            highlightedRow = false;
            textOutput.textOutput = "No city selected";
            selectedCity = ""; 
            return;
        } else {
            highlightedRow.classList.toggle("bg-info");
            highlightedRow = el.parentElement; 
            highlightedRow.classList.toggle("bg-info");
        };
        selectedCity = highlightedRow.firstElementChild.textContent;
        console.log(selectedCity)
        return selectedCity;
    }; 

    static async deleteCityFromServer (cityToBeDeleted) {
        data = await postData(url + 'all')
        numberOfCities = data.length; 

        for (let i=0; i<numberOfCities; i++) {
            if (data[i].city === cityToBeDeleted) {
                let x = data[i].key; 
                await postData(url + 'delete', {key: x});
                return; 
            };
        };
    };

    static clearFields() {
        city.value = ""; 
        population.value = ""; 
        latitude.value = ""; 
        longitude.value = ""; 
    };
}


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

export {City, Controller, postData}
