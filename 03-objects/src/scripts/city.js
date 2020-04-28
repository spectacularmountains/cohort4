const url = 'http://localhost:5000/';
let highlightedRow = false;
let data; 
let selectedCity = ""; 
let placeType; 

const cities = [
    {key:1, city:"Tokyo", population: 9273000, latitude: 35.6850, longitude: 139.7514},
    {key:2, city:"New York", population: 8399000, latitude: 40.6943, longitude: -73.9249},
    {key:3, city:"Mexico City", population: 8855000, latitude: 19.4424, longitude: -99.1310},
    {key:4, city:"Mumbai", population: 18410000, latitude: 19.0170, longitude: 72.8570},
    {key:5, city:"Sao Paulo", population: 12180000, latitude: -23.5587, longitude: -46.6250},
]

// Load all data currently on server into CACHE "data"
async function loadAll() {
    data = await postData(url + 'all');
    textOutput.textContent = `Currently ${data.length} entries on server.`;
return;
};
loadAll();


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
        if (!Controller.checkDataOnServer()) return; 
        for (let i=0; i<data.length; i++) {
            City.show(data[i]);
        };
        selectedCity = ""; 
        return;
    };

    static async populate() { 
        if (data.length) {
            textOutput.textContent = `Database has been loaded already. Currently ${data.length} entries in database.`;
            return;
        } 
        for (let i=0; i<cities.length; i++) {
            data = await postData(url + 'add', cities[i]);
            textOutput.textContent = `${cities[i].key}: ${cities[i].city}`;
        };
        textOutput.textContent = `Added ${cities.length} entries to the database.`;
        selectedCity = ""; 
        data = await postData(url + 'all'); // Put all data from server into CACHE "data"
    };

    static async clear() {
        if (data === false || data.length === 0) {textOutput.textContent = `Database already cleared.`; return} 
        data = await postData(url + 'clear');
        if (data.status > 200) { textOutput.textContent = `Server ERROR. Please try again.`; return}
        cityList.textContent = "";
        textOutput.textContent = `Database cleared.`;
        selectedCity = ""; 
        data = false;
    };
        
    static async search(text) {
        cityList.textContent = "";
        if (!Controller.checkDataOnServer()) return; 
        for (let i=0; i<data.length; i++) {
            if (data[i].city.toLowerCase().indexOf(text) !== -1) {
                City.show(data[i]);
            }
        };
    };

	static async moved() {
        if (!selectedCity) {
            textOutput.textContent = "Please select a place"; 
            return;
        };

        if (!delta.value) {
            textOutput.textContent = `Please enter a number`;
            return;
        };

        for (let i=0; i<data.length; i++) {
            if (data[i].city === selectedCity) { 
                data[i].population += Number(delta.value); 
                await postData(url + 'update', {key: data[i].key, city: data[i].city, population: data[i].population, latitude: data[i].latitude, longitude: data[i].longitude});
                selectedCity = ""; 
                City.showAll();
                textOutput.textContent = `The population of ${data[i].city} has changed by ${delta.value}.`; 
                delta.value = ""; 
                return;
            };
        }; 
	};

	static howBig () {
        if (!Controller.checkDataOnServer()) return; 

        if (!selectedCity) {
            textOutput.textContent = "Please select a place"; 
            return;
        }
        for (let i=0; i<data.length; i++) {
            if (data[i].city === selectedCity) { 
                
                if (data[i].population > 100000) { placeType = "city"}
                else if (data[i].population > 20000) { placeType = "large town"}
                else if (data[i].population > 1000) { placeType = "town"}
                else if (data[i].population > 100) { placeType = "village"}
                else {placeType = "hamlet"}
            };
        }; 
        textOutput.textContent = `This place is a ${placeType}.`; 
    }; 
};


// CREATE CLASS "CONTROLLER"

class Controller {

    // Check if there is data on server 
    static checkDataOnServer() {
        if (data.length) {
            textOutput.textContent = ""; 
            return true; 
        };
        textOutput.textContent = `No data loaded on server!`;
        return false;  
    };

	static whichSphere () {
        if (!Controller.checkDataOnServer()) return; 

        if (!selectedCity) {
            textOutput.textContent = "Please select a city"
        }

        for (let i=0; i<data.length; i++) {

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

    
    static getMostNorthern () {
        if (!Controller.checkDataOnServer()) return; 
        // Reduce array of objects to find object with highest latitude
        const max = data.reduce(function(prev, current) {
            return (prev.latitude > current.latitude) ? prev : current
        });
        textOutput.textContent = `The northernmost place is ${max.city}.`;
    };

    static getMostSouthern () {
        if (!Controller.checkDataOnServer()) return; 
        // Reduce array of objects to find object with lowest latitude
        const min = data.reduce(function(prev, current) {
            return (prev.latitude < current.latitude) ? prev : current
        });
        textOutput.textContent = `The southernmost place is ${min.city}.`;
    };

    static getPopulation () {
        if (!Controller.checkDataOnServer()) return; 
        let totalPopulation = 0;
        for (let i=0; i<data.length; i++) {
            totalPopulation += data[i].population; 
        }
        textOutput.textContent = `The total population of all cities is ${totalPopulation}`;
    };
    
    static checkIfCityExists () {
        if (city.value === "" || population.value === "" || latitude.value === "" || longitude.value === "") {
            textOutput.textContent = `Please enter all fields`;
            return;
        };
        textOutput.textContent = ""; 
        let text = city.value.toLowerCase(); 
        for (let i=0; i<data.length; i++) {
            if (data[i].city.toLowerCase() === text) {
                textOutput.textContent = `${data[i].city} already exists in database.`;
                return; 
            }; 
        }
        Controller.createCity();
    };

    static async createCity () {
        cityList.innerHTML = "";
        const city = document.getElementById("city").value; 
        const population = Number(document.getElementById("population").value); 
        const latitude = Number(document.getElementById("latitude").value); 
        const longitude = Number(document.getElementById("longitude").value); 
        const key = data.length + 1; 
        
        const newCity = new City(key, city, population, latitude, longitude); // Instantiate new City 
        await postData(url + 'add', newCity);
        data.push(newCity) // Add newly created city to CACHE
        selectedCity = city; 
        Controller.clearFields();
        City.show(newCity);
    }; 

    static async deleteCity (el) {
        const cityToBeDeleted = el.parentElement.parentElement.firstElementChild.textContent;
        if (cityToBeDeleted === selectedCity) {selectedCity = ""};
        el.parentElement.parentElement.remove(); 

        for (let i=0; i<data.length; i++) {
            if (data[i].city === cityToBeDeleted) {
                textOutput.textContent = `${data[i].city} has been deleted.`;
                await postData(url + 'delete', {key: data[i].key});
                data.splice(i, 1);
                return; 
            }; 
        }
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
        return selectedCity;
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
