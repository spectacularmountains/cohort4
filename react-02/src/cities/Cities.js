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
        this.state = [
            { cities: cities}, 
            { nightVision: false},
        ]
    }

    render() {
        return (
            <React.Fragment>
                <Container className="mt-4" style={{width: "850px"}}>
                    <Container>
                        <h1 className="display-4 text-center"><i className="fas fa-city text-primary"></i><span className="text-primary"> Cities</span> of the World</h1>
                        <hr/>
                        <div className="text-center">
                            <Button variant="secondary" size="sm" className="btn-sm btn-secondary mr-4">Populate database</Button>
                            <Button variant="secondary" size="sm" className="btn-sm btn-secondary mr-4">Clear database</Button>
                            <Button variant="secondary" size="sm" className="btn-sm btn-secondary mr-4">Show all cities</Button>
                        </div>
                        <div className="text-center mt-2">
                            <Button id="totalPopulation" className="btn btn-primary mr-4">Total population</Button>
                            <Button id="howBig" className="btn btn-primary mr-4">How big?</Button>
                            <Button id="whichSphere" className="btn btn-primary mr-4">Sphere</Button>
                            <Button id="northernMost" className="btn btn-primary mr-4">Northernmost</Button>
                            <Button id="southernMost" className="btn btn-primary mr-4">Southernmost</Button>
                        </div>
                        <hr/>
                    </Container>

                    <Container  className="border border-grey rounded p-2 bg-light text-primary" style={{width: "500px", height: "40px"}}>
                        <p id="textOutput" style={{fontWeight: "bold"}}></p>
                    </Container>
                    <hr/>
                </Container>
                
                <Container fluid>
                    <Row>
                        <Col lg="5">
                            <Container className="mt-1 mb-4" style={{width: "480px"}}>
                                <Form id="cityForm">
                                    <Form.Group className="mb-2">
                                        <Form.Label for="city" className="mb-1"><b>City</b></Form.Label>
                                        <Form.Control type="text" id="city"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label for="population" className="mb-1"><b>Population</b></Form.Label>
                                        <Form.Control type="number" id="population" className="form-control"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label for="latitude" className="mb-1"><b>Latitude</b></Form.Label>
                                        <Form.Control type="number" id="latitude" className="form-control"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label for="longitude" className="mb-1"><b>Longitude</b></Form.Label>
                                        <Form.Control type="number" id="longitude" className="form-control"></Form.Control>
                                    </Form.Group>
                                    <Form.Control type="submit" value="Create" className="btn btn-primary btn-block"></Form.Control>
                                </Form>
                                <br/>
                            
                                <Form >
                                    <Form.Group className="text-center mb-5 d-flex align-items-center">
                                        <Form.Control type="number" id="delta" placeholder="Enter a pos. or neg. number" style={{width: "250px"}}></Form.Control>
                                        <Button id="changePopulation" className="btn-sm btn-info ml-4">+/- Population</Button>
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Col>

                        <Col lg="7">
                            <Container style={{width: "480px"}}>
                                    <div className="table-responsive-sm">
                                        <Table className="table table-striped" style={{fontSize: "1em"}}>
                                            <thead className="thead-light"> 
                                                <tr>
                                                    <th>City</th>
                                                    <th>Population</th>
                                                    <th>Latitude</th>
                                                    <th>Longitude</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody id="cityList"></tbody>
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

export default Cities;