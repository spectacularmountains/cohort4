import React, { Component, useState, useEffect } from 'react';
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
        return [this.size, this.storage]
    }

    pop() {
        delete this.storage[this.size]; 
        this.size--;
        return [this.size, this.storage]; 
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
        return [this.storage]
    }

    dequeue() {
        delete this.storage[this.head];
        this.head++; 
        return [this.storage]; 
    }
}

const queue = new Queue() // Instantiate a new queue object called "queue"


// -------------------------- UI --------------------------

function FifoLifoController() {
    const [message, setMessage] = useState("Welcome!"); 
    const [stackSize, setStackSize] = useState(0); 
    const [stackArray, setStackArray] = useState([]); 
    const [queueArray, setQueueArray] = useState([]); 
    const [justRemoved, setJustRemoved] = useState(false); // To keep track of whether an item was just removed (true) or added (false)
    const [headerStyle, setHeaderStyle] = useState(null);


    useEffect(() => {
        let wait = setInterval(() => {setHeaderStyle(null)}, 150)
        return () => {
            setHeaderStyle({color: "rgb(217, 252, 255)", fontWeight: "bold"});
            clearInterval(wait);
        };
    }, [stackSize]); 
    
  
    function handleAdd() {
        if (stackSize === 10) {
            setMessage("Maximum size reached!");
            return;
        }
        let counter = stackSize + 1;
        let resultS = stack.push(counter); let resultQ = queue.enqueue(queue.tail + 1);
        setStackSize(resultS[0]); // Same as Queue Size 

        // Add values of STACK objects into array (for display in UI)
        let arrayS = [];
        for (const element in resultS[1]) {
            arrayS.unshift(resultS[1][element]);
        }
        setStackArray(arrayS);

        // Add values of QUEUE objects into array (for display in UI)
        let arrayQ = [];
        for (const element in resultQ[0]) {
            arrayQ.push(resultQ[0][element]);
        }
        setQueueArray(arrayQ);

        setJustRemoved(false);
        setMessage("Added one item to the stack and queue.");
        return;
    }
    
    function handleRemove() {
        if (!stackSize) {
            setJustRemoved(false);
            setMessage("All data removed.")
            return;
        }  
        
        let resultS = stack.pop(); let resultQ = queue.dequeue()
        setStackSize(resultS[0]);
        
        let arrayS = [];
        for (const element in resultS[1]) {
            arrayS.unshift(resultS[1][element]);
        }
        setStackArray(arrayS);

        let arrayQ = [];
        for (const element in resultQ[0]) {
            arrayQ.push(resultQ[0][element]);
        }
        setQueueArray(arrayQ);


        setJustRemoved(true);
        setMessage("Removed one item from the stack and queue.");
        
        return;
    }

    function handleClear() {
        stack.storage = {};
        stack.size = 0;
        setStackSize(0);
        setStackArray([]); 
        
        queue.storage = {}; 
        queue.head = queue.tail = 0; 
        setQueueArray([]); 

        setJustRemoved(false);
        setMessage("All data cleared.");

        return;
    }

    function getStyleStack(item) {
        if (justRemoved) {
            return {backgroundColor: "lightgrey"}; 
        }
        if (item===stack.size) {
            return {backgroundColor: "darkgrey"};
        } else {
            return {backgroundColor: "lightgrey"};
        }
    }

    function getStyleQueue(item) {
        if (justRemoved) {
            return {backgroundColor: "lightgrey"};
        }
        if (item===queue.tail) {
            return {backgroundColor: "darkgrey"};
        } else {
            return {backgroundColor: "lightgrey"};
        }
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
                            <Button onClick={() => handleClear()} className="btn btn-primary mr-4">
                                    Clear
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
                                <h1 style={headerStyle}>STACK</h1>
                            </div>
                            <br/>
                            <div><strong>Stack size: </strong><span style={headerStyle}>{stackSize}</span></div>
                            <Container className="border border-grey rounded bg-light text-primary mb-2" style={{width: "200px", height: "300px"}}>
                            <div className="stack">
                                <StackComponent />
                            </div>
                            </Container>
                        </Col>

                        <Col lg={1}></Col>

                        <Col className=" border border-grey rounded text-center"> 
                            <div>
                                <h1 style={headerStyle}>QUEUE</h1>
                            </div>
                            <br/>
                            <div><strong>Queue size: </strong><span style={headerStyle}>{stackSize}</span></div>
                            <Container className="border border-grey rounded bg-light text-primary mb-2" style={{width: "200px", height: "300px"}}>
                            <div className="queue">
                                <QueueComponent />
                            </div>
                            </Container>
                        </Col>

                    </Row>
                 </Container>
            </React.Fragment>
    )

    function StackComponent() {
        let stackList = stackArray.map((item) => {
            return (
                <div className="regularBar" key={item} style={getStyleStack(item)}><span>{item}</span><br/></div> 
            )
        })
        if (justRemoved) {
            let removedBar = <div key={stack.size+1} className="fadingBar"><span>{stack.size+1}</span><br/></div>
            stackList.unshift(removedBar);
        }
        return (
            <React.Fragment>
                {stackList}
            </React.Fragment>
        )
    }

    function QueueComponent() {
        let queueList = queueArray.map((item) => { 
            return (
                <div className="regularBar" key={item} style={getStyleQueue(item)}><span>{item}</span><br/></div> 
            )
        });
        if (justRemoved) {
            let removedBar = <div key={queue.head} className="fadingBar"><span>{queue.head}</span><br/></div>
            queueList.unshift(removedBar);
        }
        return (
            <React.Fragment >
                {queueList}
            </React.Fragment>
        )
    }

}


export default FifoLifoController; 