import React, { Component } from 'react';
import {Button, Container, Row, Col, Form, Table} from 'react-bootstrap';
import './cities.css';


const url = 'http://localhost:5000/';
const cities = [
    {key:1, city:"Tokyo", population: 9273000, latitude: 35.6850, longitude: 139.7514},
    {key:2, city:"New York", population: 8399000, latitude: 40.6943, longitude: -73.9249},
    {key:3, city:"Mexico City", population: 8855000, latitude: 19.4424, longitude: -99.1310},
    {key:4, city:"Mumbai", population: 18410000, latitude: 19.0170, longitude: 72.8570},
    {key:5, city:"Sao Paulo", population: 12180000, latitude: -23.5587, longitude: -46.6250},
];

let descendingOrder = false; 


class Cities extends Component {
    constructor() {
        super(); 
        this.state = {
            cityData: [], 
            nightVision: false,
            message: "Welcome!",
            searchCity: "",
            inputPopulation: "", 
            inputLatitude: "",
            inputLongitude: "",
            delta: "",
            currentCity: "", 
        }
        this.handleCitySearch = this.handleCitySearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePopulationInput = this.handlePopulationInput.bind(this);
        this.handleLatitudeInput = this.handleLatitudeInput.bind(this);
        this.handleLongitudeInput = this.handleLongitudeInput.bind(this);
        this.handleDelta = this.handleDelta.bind(this); 
        this.changeCurrentCity = this.changeCurrentCity.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.loadData = this.loadData.bind(this);
        this.clearData = this.clearData.bind(this);
        this.showAll = this.showAll.bind(this);
        this.getTotalPopulation = this.getTotalPopulation.bind(this);
        this.howBig = this.howBig.bind(this);
        this.whichSphere = this.whichSphere.bind(this);
        this.getMostNorthern = this.getMostNorthern.bind(this);
        this.getMostSouthern = this.getMostSouthern.bind(this);
        this.changePopulation = this.changePopulation.bind(this); 
        this.deleteCity = this.deleteCity.bind(this); 
        this.getRandomCity = this.getRandomCity.bind(this); 
        this.onSort = this.onSort.bind(this); 
    }

    async componentDidMount() {
        try {
            for (let i=0; i<cities.length; i++) {
                await postData(url + 'add', cities[i]);
                this.setState({message: `${cities[i].key}: ${cities[i].city}`});
            };
            this.setState({cityData: cities});
            this.setState({message: `Database loaded. Currently ${cities.length} entries in database.`});
            console.log("data loaded")
            return;
        } 
        catch(err) {
            this.setState({message: `Server ERROR (${err}). Please try again.`}); 
            return;
        }
    }

    handleMessage(message) {
        this.setState({message: message});
    }

    async loadData() {
        try {
            for (let i=0; i<cities.length; i++) {
                await postData(url + 'add', cities[i]);
                this.setState({message: `${cities[i].key}: ${cities[i].city}`});
            };
            this.setState({cityData: cities});
            this.setState({message: `Database loaded. Currently ${cities.length} entries in database.`});
            console.log("data loaded")
            return;
        } 
        catch(err) {
            this.setState({message: `Server ERROR (${err}). Please try again.`}); 
            return;
        }
    }

    async clearData() {
        let data = await postData(url + 'clear');
        if (data.status > 200) { this.setState({message: `Server ERROR. Please try again.`}); return}
        this.setState({cityData: []})
        this.setState({currentCity: ""}); 
        data = false;
        this.setState({message: "Data cleared."});
    }
    
    showAll() {
        if (!this.state.cityData.length) {
            this.setState({message: "No data in database!"});
            return;
        }
        this.setState({searchCity: "", inputPopulation: "", inputLatitude: "", inputLongitude: ""})
        this.setState({message: "Showing all cities in database."});
    }

    getTotalPopulation() {
        let cityData = this.state.cityData; 
        if (!cityData.length) {
            this.setState({message: "No data in database!"});
            return;
        }
        let totalPopulation = 0;
        for (let i=0;i<cityData.length;i++) {
            totalPopulation += cityData[i].population; 
        }
        this.setState({message: `The total population of all cities is ${totalPopulation}.`});
    }

    howBig() {
        if (!this.state.currentCity) {
            this.setState({message: "Please select a place!"}); 
            return;
        }
        let cityData = this.state.cityData; 
        let placeType = ""; 
        for (let i=0; i<cityData.length; i++) {
            if (cityData[i].city === this.state.currentCity) { 
                
                if (cityData[i].population > 100000) { placeType = "city"}
                else if (cityData[i].population > 20000) { placeType = "large town"}
                else if (cityData[i].population > 1000) { placeType = "town"}
                else if (cityData[i].population > 100) { placeType = "village"}
                else {placeType = "hamlet"}
            };
        }; 
        this.setState({message: `This place is a ${placeType}.`}); 
    }; 

    whichSphere() {
        if (!this.state.currentCity) {
            this.setState({message: "Please select a place!"}); 
            return;
        }
        let cityData = this.state.cityData; 
        for (let i=0; i<cityData.length; i++) {

            if (cityData[i].city === this.state.currentCity) { 
                if (cityData[i].latitude > 0) {
                    this.setState({message: "Northern hemisphere"});
                return 
            };
            this.setState({message: "Southern hemisphere"});
            return; 
            }; 
        }; 
    };

    getMostNorthern() {
        let cityData = this.state.cityData;
        if (!cityData.length) {
            this.setState({message: "No data in database!"});
            return;
        }
        // Reduce array of objects to find object with highest latitude
        const max = cityData.reduce(function(prev, current) {
            return (prev.latitude > current.latitude) ? prev : current
        });
        this.setState({message: `The northernmost place is ${max.city}.`});
    };

    getMostSouthern() {
        let cityData = this.state.cityData;
        if (!cityData.length) {
            this.setState({message: "No data in database!"});
            return;
        }
        // Reduce array of objects to find object with lowest latitude
        const min = cityData.reduce(function(prev, current) {
            return (prev.latitude < current.latitude) ? prev : current
        });
        this.setState({message: `The southernmost place is ${min.city}.`});
    };

	async changePopulation() {
        let updatedData = this.state.cityData.map((city) => {
            if (city.city === this.state.currentCity) {
                let updatedCity = {...city, population: city.population + Number(this.state.delta)};
                return updatedCity
            }
            return city;
        });
        let data = this.state.cityData; 
        for (let i=0; i<data.length; i++) {
            if (data[i].city === this.state.currentCity) { 
                data[i].population += Number(this.state.delta); 
                await postData(url + 'update', {key: data[i].key, city: data[i].city, population: data[i].population, latitude: data[i].latitude, longitude: data[i].longitude});
                break;
            };
        }; 
        this.setState({cityData: updatedData});
        this.setState({message: `The population of ${this.state.currentCity} has changed by ${this.state.delta}.`}); 
        this.setState({delta: ""});
    };
    
    async deleteCity(cityToBeDeleted) {
        let updatedData = [...this.state.cityData]

        updatedData.map((city, i) => {
            if (city.city === cityToBeDeleted) {
                updatedData.splice(i,1)
                return null;
            }
            return null;
        });

        let data = this.state.cityData; 
        for (let i=0; i<data.length; i++) {
            if (data[i].city === cityToBeDeleted) {
                await postData(url + 'delete', {key: data[i].key});
                break; 
            }; 
        }

        this.setState({cityData: updatedData});
        this.setState({message: `You have deleted ${cityToBeDeleted}.`}); 
        this.setState({currentCity: ""}); 
    }
   
    changeCurrentCity(city) {
        if (this.state.currentCity === "") {
            this.setState({currentCity: city});
            return;
        } else if (city === this.state.currentCity) {
        this.setState({currentCity: ""})
        this.setState({message: ""});
        } else {
            this.setState({currentCity: city});
        }
    }

    handleCitySearch(event) {
        let text = event.target.value
        this.setState({searchCity: text})
    }

    handlePopulationInput(event) {
        let population = Number(event.target.value)
        if (population < 0 || !Number.isInteger(population)) {
            this.setState({message: "Please enter a valid number!"});
            return;
        }
        this.setState({message: ""});
        this.setState({inputPopulation: population})
    }

    handleLatitudeInput(event) {
        let latitude = event.target.value
        if (latitude < -90 || latitude > 90) {
            this.setState({message: "Latitudes range from -90 to +90."});
            return;
        }
        this.setState({message: ""});
        this.setState({inputLatitude: latitude})
    }

    handleLongitudeInput(event) {
        let longitude = event.target.value
        if (longitude < -180 || longitude > 180) {
            this.setState({message: "Longitudes range from -180 to +180."});
            return;
        }
        this.setState({message: ""});
        this.setState({inputLongitude: longitude})
    }
    
    handleDelta(event) {
        let delta = Number(event.target.value)
        if (!Number.isInteger(delta)) {
            this.setState({message: "Please enter whole numbers only."});
            return;
        }
        this.setState({message: ""});
        this.setState({delta: delta})
    }

    async handleSubmit(event) {
        event.preventDefault(); // Prevent complete page refresh (default behaviour of submit button)

        // Check first if all fields have values in them 
        if (this.state.searchCity === "" || this.state.inputPopulation === "" || this.state.inputLatitude === "" || this.state.inputLongitude === "") {
            this.setState({message: "Please enter all fields!"});
            return;
        };

                
        let cityData = this.state.cityData; 
        let cityName = this.state.searchCity;
        if(!isNaN(cityName[0]) || cityName[0] === " ") { //Make sure first character is not a number or space
            let message = `First character must be a letter!`;
            this.setState({message: message});
            this.setState({searchCity: "", inputPopulation: "", inputLatitude: "", inputLongitude: ""});
            return;
        }
        let newCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1); // Capitalize first letter of newly created city 
        for (let i=0; i<cityData.length; i++) { // Check if city exists in database 
                if (cityData[i].city === newCityName) {
                    this.setState({message: `${cityData[i].city} already exists in database.`});
                    return; 
                }
        }

        // Add new city data to STATE 
        let newCityData = {
            key: (cityData.length + 1), //     CREATE UUID??
            city: newCityName, 
            population: Number(this.state.inputPopulation), 
            latitude: this.state.inputLatitude, 
            longitude: this.state.inputLongitude, 
        }
        this.setState({cityData: [...this.state.cityData, newCityData]});
        await postData(url + 'add', newCityData);

        let message = `You created a new city named ${newCityName}.`;
        this.setState({message: message});
        this.setState({searchCity: "", inputPopulation: "", inputLatitude: "", inputLongitude: ""});
        return;
    }

    async getRandomCity() {
        let randomID = getRndInteger(100, 125000); // Generate a random whole number between 100 and 125000 (this is the range of city IDs in the GeoDB API)

        const response = await fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities/" + randomID, {
            "method": "GET",
            "headers": {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": "3621e108a9msh885bc7ed5553885p1ed7dfjsnf8b75611f536",
	        }
        });
        const json = await response.json();    // parses JSON response into native JavaScript objects
        json.status = response.status;
        json.statusText = response.statusText;
        if (response.status > 200) {return false};

        this.setState({searchCity: json.data.city})
        this.setState({inputPopulation: json.data.population})
        this.setState({inputLatitude: json.data.latitude})
        this.setState({inputLongitude: json.data.longitude})

        // Add new city data to STATE 
        let cityData = this.state.cityData; 
        let newCityData = {
            key: (cityData.length + 1), //     CREATE UUID??
            city: this.state.searchCity, 
            population: Number(this.state.inputPopulation), 
            latitude: this.state.inputLatitude, 
            longitude: this.state.inputLongitude, 
        }
        this.setState({cityData: [...this.state.cityData, newCityData]});
        await postData(url + 'add', newCityData);

        let message = `You created a new city named ${this.state.searchCity}.`;
        this.setState({message: message});
        return;
    }

    // Sort values in table columns: a-b for numbers, and strings (localeCompare) for city names
    onSort(sortKey){  
        descendingOrder = !descendingOrder; 
        const data = this.state.cityData;
        if (descendingOrder) {
            data.sort((a,b) => {
                return a[sortKey]-b[sortKey] || a[sortKey].localeCompare(b[sortKey]);
                }
            )
            this.setState({data}); 
            return;
        }
        data.sort((a,b) => {
            return b[sortKey]-a[sortKey] || b[sortKey].localeCompare(a[sortKey]);
            }
        )
        this.setState({data}); 
        return;
      }

    render() {
        return (
            <React.Fragment>
                <Container className="mt-4" style={{width: "850px"}}>
                    <Container>
                        <p className="display-3 text-center"><i className="fas fa-city text-primary"></i><span className="text-primary"> Cities</span> of the World</p>
                        <hr/>
                        <div className="text-center">
                            <Populate data={this.state.cityData} getMessage={this.handleMessage} loadData={this.loadData}/>
                            <Clear data={this.state.cityData} getMessage={this.handleMessage} clearData={this.clearData}/>
                            <Button onClick={this.showAll} variant="secondary" size="sm" className="btn-sm btn-secondary mr-4">Show all cities</Button>
                            <Button onClick={this.getRandomCity} variant="secondary" size="sm" className="btn-sm btn-danger mr-4">RANDOMIZE!</Button>
                        </div>
                        <div className="text-center mt-2">
                            <Button onClick={this.getTotalPopulation} id="totalPopulation" className="btn btn-primary mr-4">Total population</Button>
                            <Button onClick={this.howBig} id="howBig" className="btn btn-primary mr-4">How big?</Button>
                            <Button onClick={this.whichSphere} id="whichSphere" className="btn btn-primary mr-4">Sphere</Button>
                            <Button onClick={this.getMostNorthern} id="northernMost" className="btn btn-primary mr-4">Northernmost</Button>
                            <Button onClick={this.getMostSouthern} id="southernMost" className="btn btn-primary mr-4">Southernmost</Button>
                        </div>
                        <hr/>
                    </Container>

                    <Container  className="border border-grey rounded p-2 bg-light text-primary" style={{width: "500px", height: "40px"}}>
                        <p id="textOutput" style={{fontWeight: "bold"}}>{this.state.message}</p>
                    </Container>
                    <hr/>
                </Container>

                <Container fluid>
                    <Row>
                        <Col lg="5">
                            <Container className="mt-1 mb-4" style={{width: "480px"}}>
                                <Form id="cityForm">
                                    <Form.Group className="mb-2">
                                        <Form.Label htmlFor="city" className="mb-1"><b>City</b></Form.Label>
                                        <Form.Control onChange={this.handleCitySearch} value={this.state.searchCity} type="text" id="city"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label htmlFor="population" className="mb-1"><b>Population</b></Form.Label>
                                        <Form.Control onChange={this.handlePopulationInput} value={this.state.inputPopulation} type="number" id="population" className="form-control"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label htmlFor="latitude" className="mb-1"><b>Latitude</b></Form.Label>
                                        <Form.Control onChange={this.handleLatitudeInput} value={this.state.inputLatitude} type="number" id="latitude" className="form-control"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label htmlFor="longitude" className="mb-1"><b>Longitude</b></Form.Label>
                                        <Form.Control onChange={this.handleLongitudeInput} value={this.state.inputLongitude} type="number" id="longitude" className="form-control"></Form.Control>
                                    </Form.Group>
                                    <Form.Control onClick={this.handleSubmit} type="submit" value="Create" className="btn btn-primary btn-block"></Form.Control>
                                </Form>
                                <br/>
                            
                                <Form >
                                    <Form.Group className="text-center mb-5 d-flex align-items-center">
                                        <Form.Control onChange={this.handleDelta} value={this.state.delta} type="number" id="delta" placeholder="Enter a pos. or neg. number" style={{width: "250px"}}></Form.Control>

                                        <Move data={this.state.cityData} getMessage={this.handleMessage} changePopulation={this.changePopulation} delta={this.state.delta} currentCity={this.state.currentCity}/>

                                    </Form.Group>
                                </Form>
                            </Container>
                        </Col>

                        <Col lg="7">
                            <Container style={{width: "480px"}} >
                                    <div className="table-responsive-sm">

                                        <Table className="table table-striped">
                                            <thead className="thead-light" style={{padding: "0", cursor: "default"}}> 
                                                {/* style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} */}
                                                <tr>
                                                    <th onClick={() => this.onSort('city')}><div className="th-cities">City  <i className="material-icons" style={{fontSize: "1.1em"}}>unfold_more</i></div></th>
                                                    <th onClick={() => this.onSort('population')}><div className="th-cities">Population  <i className="material-icons" style={{fontSize: "1.1em"}}>unfold_more</i></div></th>
                                                    <th onClick={() => this.onSort('latitude')}><div className="th-cities">Latitude  <i className="material-icons" style={{fontSize: "1.1em"}}>unfold_more</i></div></th>
                                                    <th onClick={() => this.onSort('longitude')}><div className="th-cities">Longitude  <i className="material-icons" style={{fontSize: "1.1em"}}>unfold_more</i></div></th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <CityList data={this.state.cityData} searchCity={this.state.searchCity} currentCity={this.state.currentCity} handleClick={this.changeCurrentCity} handleDeleteButton={this.deleteCity}/>

                                        </Table>
                                    </div> 
                            </Container>
                        </Col>

                    </Row>
                 </Container>
            </React.Fragment>
        )
    }
}

// -------------------------------------------------------------------------------------------------

class CityList extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this); 
        this.getStyle = this.getStyle.bind(this); 
        this.handleDeleteButton = this.handleDeleteButton.bind(this); 
    }

    handleClick(city) {
        this.props.handleClick(city)
    }
    
    handleDeleteButton(city) {
        this.props.handleDeleteButton(city)
    }

    getStyle(city) {
        return (city === this.props.currentCity)? {color: "white", backgroundColor: "rgb(73, 91, 170)", cursor: "crosshair"} : {color: "black", backgroundColor: "white", cursor: "crosshair"}
    }

    render() {
        let cityData = this.props.data;
        const filteredCities = cityData.filter(city => {
            return city.city.toLowerCase().includes(this.props.searchCity.toLowerCase())
        })
        let list = filteredCities.map((city) => {
            return (
                    <tr key={city.key} onClick={() => this.handleClick(city.city)} style={this.getStyle(city.city)}>
                        <td className="align-middle" style={{lineHeight: "15px", padding: "5px"}}>{city.city}</td>
                        <td className="align-middle" style={{lineHeight: "15px", padding: "5px"}}>{city.population}</td>
                        <td className="align-middle" style={{lineHeight: "15px", padding: "5px"}}>{city.latitude}</td>
                        <td className="align-middle" style={{lineHeight: "15px", padding: "5px"}}>{city.longitude}</td>
                        <td className="align-middle" style={{lineHeight: "15px", padding: "5px"}}><span style={{cursor: "pointer"}} onClick={() => this.handleDeleteButton(city.city)} className="btn btn-danger btn-sm delete">X</span></td>
                    </tr>
            )
        })
        return (
            <React.Fragment>
                <tbody id="cityList">
                    {list}
                </tbody>

            </React.Fragment>
        )
    }
}

class Populate extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this); 
    }

   handleClick() {
       let cityData = this.props.data; 
       if (cityData.length) {
           let message = "Data has already been loaded!"; 
           this.props.getMessage(message); 
           return;
       }
       this.props.loadData(); 
   }


    render() {
        return (
            <Button onClick={this.handleClick} variant="secondary" size="sm" className="btn-sm btn-secondary mr-4">Populate database</Button>
        )
    }
}

class Clear extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this); 
    }

   handleClick() {
       let cityData = this.props.data; 
       if (cityData.length === 0) {
           let message = "Database empty!"; 
           this.props.getMessage(message); 
           return;
       }
       this.props.clearData(); 
   }


    render() {
        return (
            <Button onClick={this.handleClick} variant="secondary" size="sm" className="btn-sm btn-secondary mr-4">Clear database</Button>
        )
    }
}

class Move extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this); 
    }

    handleClick() {
        if (!this.props.currentCity) {
            let message = "Please select a place!"; 
            this.props.getMessage(message); 
            return;
        }
        let delta = this.props.delta; 
        if (!delta) {
            let message = "Please enter a number!";
            this.props.getMessage(message); 
            return;
        };
       
       this.props.changePopulation(); 
   }


    render() {
        return (
            <Button onClick={this.handleClick} id="changePopulation" className="btn-sm btn-info ml-4">+/- Population</Button>
        )
    }
}




// --------------- FETCH API FUNCTION TO GET/UPDATE/DELETE/POST DATA ON SERVER -----------------

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


// --------- FUNCTION TO GENERATE A RANDOM INTEGER BETWEEN MIN AND MAX (INCLUSIVE) -------- 
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


export default Cities;