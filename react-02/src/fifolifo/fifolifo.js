import React, { Component, useState } from 'react';
import {Button, Container, Row, Col } from 'react-bootstrap';
import './fifolifo.css';



class Stack extends Component { // FIFO
    constructor() {
        super();
        this.storage = {}; 
        this.size = 0; 
    }

    push(element) {
        this.size++; 
        this.storage[this.size] = element; 
        console.log("Storage: ", this.storage)
        return [this.size, this.storage]
    }

    pop() {
        let deletedElement = this.storage[this.size]; 
        delete this.storage[this.size]; 
        this.size--;
        return [this.size, this.storage]; 
    }

    peek() {
        return this.storage[this.size]; 
    }
}

const stack = new Stack(); // Instantiate a new stack object called "stack"


class Queue extends Component { //LIFO 
    constructor() {
        super(); 
        this.storage = {}; 
        this.head = 0;
        this.tail = 0; 
    }

    enqueue(element) {
        this.storage[this.tail] = element; 
        this.tail++;
    }

    dequeue(element) {
        let deletedElement = this.storage[this.head];
        delete this.storage[this.head];
        this.head++; 
        return deletedElement; 
    }
}

const queue = new Queue() // Instantiate a new queue object called "queue"


// -------------------------- UI --------------------------

function FifoLifoController() {
    const [message, setMessage] = useState("Welcome!"); 
    const [stackSize, setStackSize] = useState(0); 
    const [stackArray, setStackArray] = useState([]); 

    function handleAdd() {
        let counter = stackSize + 1;
        let result = stack.push(counter);
        setStackSize(result[0]);

        let array = [];
        for (const element in result[1]) {
            array.unshift(result[1][element]);
        }
        setStackArray(array);
        setMessage("Added one item to the stack and queue.");
        return;
    }

    function handleRemove() {
        if (!stackSize) return; 

        let result = stack.pop()
        setStackSize(result[0]);

        let array = [];
        for (const element in result[1]) {
            array.unshift(result[1][element]);
        }
        setStackArray(array);
        setMessage("Removed one item from the stack and queue.");

        return;
    }

    return (
        <React.Fragment>
                <Container className="mt-4">
                    <Container>
                        <p className="display-3 text-center"><i className="fas fa-layer-group text-primary"></i><span className="text-primary"> Stacks</span> and <span className="text-primary"> Queues</span></p>
                        
                        <div className="text-center mt-1 mb-1">
                            <Button onClick={() => handleAdd()} className="btn btn-primary mr-4">
                                    Add
                            </Button>
                            <Button onClick={() => handleRemove()} className="btn btn-primary mr-4">
                                    Remove
                            </Button>
                        </div>
                    </Container>

                    <Container  className="border border-grey rounded p-2 bg-light text-primary" style={{width: "500px", height: "40px"}}>
                        <p id="textOutput" style={{fontWeight: "bold"}}>{message}</p>
                    </Container>
                    <hr/>
                </Container>

                <Container >
                    <Row>
                        <Col className="border border-grey rounded text-center">
                            <div>
                                <h1>STACK</h1>
                            </div>
                            <br/>
                            <div><strong>Stack size: </strong>{stackSize}</div>
                            <Container className="border border-grey rounded bg-light text-primary mb-2" style={{width: "200px", height: "300px"}}>
                            <div className="stack">
                                <StackComponent />
                            </div>
                            </Container>
                        </Col>

                        <Col lg={1}></Col>

                        <Col className=" border border-grey rounded text-center"> 
                            <div>
                                <h1>QUEUE</h1>
                            </div>
                            <Container className="border border-grey rounded bg-light text-primary mb-2" style={{width: "200px", height: "300px"}}>
                                <QueueComponent />
                            </Container>
                        </Col>

                    </Row>
                 </Container>
            </React.Fragment>
    )

    function StackComponent() {
        let stackList = stackArray.map((item) => {
            return (
                <div className="regularBar" style={item===stackSize? {backgroundColor: "darkgrey"} : {backgroundColor: "lightgrey"}}><span>{item}</span><br/></div> 
            )
        })
        return (
            <React.Fragment>
                {stackList}
            </React.Fragment>
        )
    }

    function QueueComponent() {
        let stackList = stackArray.map((item) => {
            return (
                <div className="regularBar" style={item===stackSize? {backgroundColor: "darkgrey"} : {backgroundColor: "lightgrey"}}><span>{item}</span><br/></div> 
            )
        })
        return (
            <React.Fragment>
                <div>Stack size: {stackSize}</div>
                <div>Stack content: {stackList}</div>
            </React.Fragment>
        )
    }
}


export default FifoLifoController; 