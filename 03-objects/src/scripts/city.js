// CREATE CLASS "CITY"

class City {
	constructor (name, latitude, longitude, population) {
		this.name = name;
		this.latitude = latitude; 
		this.longitude = longitude; 
		this.population = population; 
	};

	show () {
        let string = this.name + this.latitude + this.longitude + this.population; 
        return string;
	}; 

	movedIn (number) {
		this.population += number;
		return this.population;
	};

	movedOut (number) {
		this.population -= number;
		return this.population;
	};

	howBig (inhabitants) {
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

    getPopulation () {
        return "7200000000"; // Placeholder for now! 
    };

    createCity (cityName) {
        return "This city has been created: " + cityName;  
    }; 

    deleteCity (cityName) {
        return "This city has been deleted: " + cityName; 
    }
}



export {City, Controller}
