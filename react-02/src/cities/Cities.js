import React, { Component } from 'react';
import {Button, Container, Row, Col, Form, Table} from 'react-bootstrap';


const url = 'http://localhost:5000/';
const cities = [
    {key:1, city:"Tokyo", population: 9273000, latitude: 35.6850, longitude: 139.7514},
    {key:2, city:"New York", population: 8399000, latitude: 40.6943, longitude: -73.9249},
    {key:3, city:"Mexico City", population: 8855000, latitude: 19.4424, longitude: -99.1310},
    {key:4, city:"Mumbai", population: 18410000, latitude: 19.0170, longitude: 72.8570},
    {key:5, city:"Sao Paulo", population: 12180000, latitude: -23.5587, longitude: -46.6250},
];


class Cities extends Component {
    constructor() {
        super(); 
        this.state = {
            data: [], 
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
    }

    // componentDidMount() {
    //     let data = this.state.data; 
    //     this.setState({data: cities});
    //     this.setState({message: `Database loaded. Currently ${data.length} entries in database.`});
    //     for (let i=0; i<cities.length; i++) {
    //         data = await postData(url + 'add', cities[i]);
    //         this.setState({message: `${cities[i].key}: ${cities[i].city}`});
    //     };

    //     this.props.onGetData(this.state.value);
    //     let message = `You have deposited $${this.state.value} into your ${this.props.currentAccount} account.`;
    //     this.props.onGetMessage(message);
    // }

    handleMessage(message) {
        this.setState({message: message});
    }

    loadData() {
        this.setState({data: cities})
        this.setState({message: "Data loaded."});
    }

    clearData() {
        this.setState({data: []})
        this.setState({message: "Data cleared."});
    }
    
    showAll() {
        if (!this.state.data.length) {
            this.setState({message: "No data in database!"});
            return;
        }
        this.setState({searchCity: ""})
        this.setState({message: "Showing all cities in database."});
    }

    getTotalPopulation() {
        let data = this.state.data; 
        if (!data.length) {
            this.setState({message: "No data in database!"});
            return;
        }
        let totalPopulation = 0;
        for (let i=0;i<data.length;i++) {
            totalPopulation += data[i].population; 
        }
        this.setState({message: `The total population of all cities is ${totalPopulation}.`});
    }

    howBig() {
        if (!this.state.currentCity) {
            this.setState({message: "Please select a place!"}); 
            return;
        }
        let data = this.state.data; 
        let placeType = ""; 
        for (let i=0; i<data.length; i++) {
            if (data[i].city === this.state.currentCity) { 
                
                if (data[i].population > 100000) { placeType = "city"}
                else if (data[i].population > 20000) { placeType = "large town"}
                else if (data[i].population > 1000) { placeType = "town"}
                else if (data[i].population > 100) { placeType = "village"}
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
        let data = this.state.data; 
        for (let i=0; i<data.length; i++) {

            if (data[i].city === this.state.currentCity) { 
                if (data[i].latitude > 0) {
                    this.setState({message: "Northern hemisphere"});
                return 
            };
            this.setState({message: "Southern hemisphere"});
            return; 
            }; 
        }; 
    };

    getMostNorthern() {
        let data = this.state.data;
        if (!data.length) {
            this.setState({message: "No data in database!"});
            return;
        }
        // Reduce array of objects to find object with highest latitude
        const max = data.reduce(function(prev, current) {
            return (prev.latitude > current.latitude) ? prev : current
        });
        this.setState({message: `The northernmost place is ${max.city}.`});
    };

    getMostSouthern() {
        let data = this.state.data;
        if (!data.length) {
            this.setState({message: "No data in database!"});
            return;
        }
        // Reduce array of objects to find object with lowest latitude
        const min = data.reduce(function(prev, current) {
            return (prev.latitude < current.latitude) ? prev : current
        });
        this.setState({message: `The southernmost place is ${min.city}.`});
    };

	changePopulation() {
        let updatedData = this.state.data.map((city) => {
            if (city.city === this.state.currentCity) {
                let updatedCity = {...city, population: city.population + Number(this.state.delta)};
                return updatedCity
            }
            return city;
        });
        console.log(updatedData)
        this.setState({data: updatedData});
        this.setState({message: `The population of ${this.state.currentCity} has changed by ${this.state.delta}.`}); 
        this.setState({currentCity: ""}); 
        this.setState({delta: ""});
    };
    
    deleteCity(cityToBeDeleted) {
        let updatedData = [...this.state.data]

        updatedData.map((city, i) => {
            if (city.city === cityToBeDeleted) {
                updatedData.splice(i,1)
                return null;
            }
            return null;
        });

        this.setState({data: updatedData});
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
        let text = event.target.value
        this.setState({inputPopulation: text})
    }

    handleLatitudeInput(event) {
        let text = event.target.value
        this.setState({inputLatitude: text})
    }

    handleLongitudeInput(event) {
        let text = event.target.value
        this.setState({inputLongitude: text})
    }
    
    handleDelta(event) {
        let delta = event.target.value
        this.setState({delta: delta})
    }

    handleSubmit(event) {
        event.preventDefault(); // Prevent complete page refresh (default behaviour of submit button)

        // Check first if all fields have values in them 
        if (this.state.searchCity === "" || this.state.inputPopulation === "" || this.state.inputLatitude === "" || this.state.inputLongitude === "") {
            this.setState({message: "Please enter all fields!"});
            return;
        };

                
        let cities = this.state.data; 
        let cityName = this.state.searchCity;
        if(!isNaN(cityName[0]) || cityName[0] == " ") { //Make sure first character is not a number or space
            let message = `First character must be a letter!`;
            this.setState({message: message});
            this.setState({searchCity: "", inputPopulation: "", inputLatitude: "", inputLongitude: ""});
            return;
        }
        let newCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1); // Capitalize first letter of newly created city 
        for (let i=0; i<cities.length; i++) { // Check if city exists in database 
                if (cities[i].city === newCityName) {
                    this.setState({message: `${cities[i].city} already exists in database.`});
                    return; 
                }
        }

        // Add new city data to STATE 
        let newCityData = {
            key: (cities.length + 1), //     CREATE UUID??
            city: newCityName, 
            population: this.state.inputPopulation, 
            latitude: this.state.inputLatitude, 
            longitude: this.state.inputLongitude, 
        }
        this.setState({data: [...this.state.data, newCityData]})

        let message = `You created a new city named ${newCityName}.`;
        this.setState({message: message});
        this.setState({searchCity: "", inputPopulation: "", inputLatitude: "", inputLongitude: ""});
        return;
    }

    render() {
        return (
            <React.Fragment>
                <Container className="mt-4" style={{width: "850px"}}>
                    <Container>
                        <h1 className="display-4 text-center"><i className="fas fa-city text-primary"></i><span className="text-primary"> Cities</span> of the World</h1>
                        <hr/>
                        <div className="text-center">
                            <Populate data={this.state.data} getMessage={this.handleMessage} loadData={this.loadData}/>
                            <Clear data={this.state.data} getMessage={this.handleMessage} clearData={this.clearData}/>
                            <Button onClick={this.showAll} variant="secondary" size="sm" className="btn-sm btn-secondary mr-4">Show all cities</Button>
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

                                        <Move data={this.state.data} getMessage={this.handleMessage} changePopulation={this.changePopulation} delta={this.state.delta} currentCity={this.state.currentCity}/>

                                    </Form.Group>
                                </Form>
                            </Container>
                        </Col>

                        <Col lg="7">
                            <Container style={{width: "480px"}} >
                                    <div className="table-responsive-sm">

                                        <Table className="table table-striped">
                                            <thead className="thead-light" style={{lineHeight: "10px", padding: "0"}}> 
                                                <tr>
                                                    <th>City</th>
                                                    <th>Population</th>
                                                    <th>Latitude</th>
                                                    <th>Longitude</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <CityList data={this.state.data} searchCity={this.state.searchCity} currentCity={this.state.currentCity} handleClick={this.changeCurrentCity} handleDeleteButton={this.deleteCity}/>

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
        return (city === this.props.currentCity)? {color: "white", backgroundColor: "red", cursor: "crosshair"} : {color: "black", backgroundColor: "white", cursor: "crosshair"}
    }

    render() {
        let data = this.props.data;
        const filteredCities = data.filter(city => {
            return city.city.toLowerCase().includes(this.props.searchCity.toLowerCase())
        })
        let list = filteredCities.map((city) => {
            return (
                    <tr key={city.key} onClick={() => this.handleClick(city.city)} style={this.getStyle(city.city)}>
                        <td className="align-middle" style={{lineHeight: "15px", padding: "5px"}}>{city.city}</td>
                        <td className="align-middle" style={{lineHeight: "15px", padding: "5px"}}>{city.population}</td>
                        <td className="align-middle" style={{lineHeight: "15px", padding: "5px"}}>{city.latitude}</td>
                        <td className="align-middle" style={{lineHeight: "15px", padding: "5px"}}>{city.longitude}</td>
                        <td className="align-middle" style={{lineHeight: "15px", padding: "5px"}}><a onClick={() => this.handleDeleteButton(city.city)} className="btn btn-danger btn-sm delete">X</a></td>
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
       let data = this.props.data; 
       if (data.length) {
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
       let data = this.props.data; 
       if (data.length === 0) {
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

export default Cities;