const url = 'http://localhost:5000/';
let data; 


// CREATE CLASS "CITY"

class City {
	constructor (key, city, population, latitude, longitude) {
		this.key = key;
		this.city = city;
		this.population = population; 
		this.latitude = latitude; 
		this.longitude = longitude; 
	};

	static async show (city) {
        const cityList = document.querySelector("#cityList");
        const row = document.createElement("tr"); 
        row.innerHTML = `
            <td>${city.city}</td>
            <td>${city.population}</td>
            <td>${city.latitude}</td>
            <td>${city.longitude}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `
        cityList.appendChild(row); 
        console.log(1000)

        return;
	}; 

	movedIn (number) {
		this.population += number;
		return this.population;
	};

	movedOut (number) {
		this.population -= number;
		return this.population;
	};

	static howBig (inhabitants) {
        if (inhabitants > 100000) { return "City"; };
        if (inhabitants > 20000) { return "Large town"; };
        if (inhabitants > 1000) { return "Town"; };
        if (inhabitants > 100) { return "Village"; };
		return "Hamlet";
	}; 

}


// CREATE CLASS "CONTROLLER"

class Controller {

	whichSphere (latitude) {
        if (latitude > 0) { return "Northern Hemisphere" };
        return "Southern Hemisphere";
    };
    
    getMostNorthern () {
        return "Alert"; // Placeholder for now! 
    };

    getMostSouthern () {
        return "Ushuaia"; // Placeholder for now! 
    };

    static async getPopulation () {
        let totalPopulation = 0;
        let numberOfCities = (await postData(url + 'all')).length; 
        for (let i=1; i<numberOfCities; i++) {
        data = await postData(url + 'read', {key: i});
        totalPopulation += data[0].population;
        }
    textOutput.innerHTML = totalPopulation;
    };

    static async createCity () {
        cityList.innerHTML = "";
        const city = document.getElementById("city").value; 
        const population = Number(document.getElementById("population").value); 
        const latitude = Number(document.getElementById("latitude").value); 
        const longitude = Number(document.getElementById("longitude").value); 
        const key = (await postData(url + 'all')).length + 1; 
        
        const newCity = new City(key, city, population, latitude, longitude); // Instantiate new City 
        data = await postData(url + 'add', newCity);
        City.show(newCity);
    }; 

    deleteCity (cityName) {
        return "This city has been deleted: " + cityName; 
    }
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
