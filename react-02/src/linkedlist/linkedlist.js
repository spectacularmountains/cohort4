import React, { Component, useState, useEffect } from 'react';
import './linkedlist.css';

class Node extends Component {
    constructor(value, prev, next) {
        super(); 
        this.value = value; 
        this.prev = prev || null;
        this.next = next || null;
    }

    // constructor(data) {
    //     super(); 
    //     this.data = data;
    //     this.next = null;
    // }
}


// const head = Symbol("head");

class LinkedList extends Component {
    constructor() {
        super(); 
        this.head = this.tail = null; 
    }

    append(value) {
        if (!this.tail) {
            this.head = this.tail = new Node(value); 
        } else {
            let oldTail = this.tail; 
            this.tail = new Node(value); 
            oldTail.next = this.tail; 
            this.tail.prev = oldTail; 
        }
    }

    prepend(value) {
        if (!this.tail) {
            this.head = this.tail = new Node(value);
        } else {
            let oldHead = this.head; 
            this.head = new Node(value);
            oldHead.prev = this.head; 
            this.head.next = oldHead; 
        }
    }

    deleteHead() {
        if (!this.tail) {
            return null;
        } else {
            let deletedHead = this.head; 
            if (this.head === this.tail) {
                this.head = this.tail = null; 
            } else {
                this.head = this.head.next; 
                this.head.prev = null; 
            }
            return deletedHead.value
        }
    }

    deleteTail() {
        if (!this.tail) {
            return null;
        } else {
            let deletedTail = this.tail; 
            if (this.head === this.tail) {
                this.head = this.tail = null; 
            } else {
                this.tail = deletedTail.prev; // or: this.tail = this.tail.prev 
                this.tail.next = null; 
            }
            return deletedTail.value;
        } 
    }

    search(value) {
        if (!this.tail) {
            return null;
        } else {
            let current = this.head;
            while(current) {
                if (current.value === value) {
                    return current;
                }
                current = current.next;
            }
            return null; 
        }
            
    }

    // constructor() {
    //     super(); 
    //     this[head] = null;
    // }
    
    add(value) {
        
        // create a new node
        const newNode = new Node(value);
        
        //special case: no items in the list yet
        if (this.head === null) {
            
            // just set the head to the new node
            this.head = newNode;
        } else {
            
            // start out by looking at the first node
            let current = this.head;
            
            // follow `next` links until you reach the end
            while (current.next !== null) {
                current = current.next;
            }
           
            // assign the node into the `next` pointer
            current.next = newNode;            
        }
    }
    
    get(index) {
    
        // ensure `index` is a positive value
        if (index > -1) {
            
            // the pointer to use for traversal
            let current = this.head;
            
            // used to keep track of where in the list you are
            let i = 0;
            
            // traverse the list until you reach either the end or the index
            while ((current !== null) && (i < index)) {
                current = current.next;
                i++;          
            }
            
            // return the data if `current` isn't null
            return current !== null ? current.value : undefined;
        } else {
            return undefined;
        }
    }
    
    remove(index) {
        
        // special cases: empty list or invalid `index`
        if ((this.head === null) || (index < 0)) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }
        
        // special case: removing the first node
        if (index === 0) {
            
            // temporary store the data from the node
            const value = this.head.value;
            
            // just replace the head with the next node in the list
            this.head = this.head.next;

            // return the data at the previous head of the list
            return value;
        }
        
        // pointer use to traverse the list
        let current = this.head;
        
        // keeps track of the node before current in the loop
        let previous = null;
        
        // used to track how deep into the list you are
        let i = 0;
        
        // same loops as in `get()`
        while ((current !== null) && (i < index)) {
            
            // save the value of current
            previous = current;
            
            // traverse to the next node
            current = current.next;
            
            // increment the count
            i++;
        }
        
        // if node was found, remove it
        if (current !== null) {
            
            // skip over the node to remove
            previous.next = current.next;
            
            // return the value that was just removed from the list
            return current.value;
        }
        
        // if node wasn't found, throw an error
        throw new RangeError(`Index ${index} does not exist in the list.`);
    }
    
    
    // The code below makes the list iterable 

    *values(){
        
        let current = this.head;
        
        while (current !== null) {
            yield current.value;
            current = current.next;
        }
    }
    
    [Symbol.iterator]() {
        return this.values();
    }    
}


const list = new LinkedList(); // Instantiate a new Linked List



function UserInterface() {
    const [inputValue, setInputValue] = useState(""); 
    const [message, setMessage] = useState("Welcome!");
    const [listArray, setListArray] = useState([]);
    const [listDisplay, setListDisplay] = useState([]);
    const [currentNode, setCurrentNode] = useState("");
    
    function deleteList() {
        if (!list.head) {
            setMessage("List is empty!"); 
            return;
        }

        // Delete actual nodes 
        let counter = 0;
        while (list.head) {
            list.remove(0);
            counter++;
        }
        let wordNode = (counter === 1) ? "node" : "nodes";
        setMessage(`${counter} ${wordNode} deleted.`)
        setCurrentNode("");

        // Delete array of nodes in STATE 
        setListArray([]);

        // Delete array to be displayed (with arrows) in STATE 
        setListDisplay([]);
        return;
    }
    
    function add(inputValue) {
        if (!inputValue) return;
        setCurrentNode(inputValue);
        list.add(inputValue);
        
        const array = [...list.values()];
        setListArray(array);
        
        let arrayWithArrows = [];
        for (let item of list) {
            arrayWithArrows.push(item, "  ->  ");
        }
        setListDisplay(arrayWithArrows);
        setMessage(`You have added the following node: ${inputValue}.`);
        setInputValue("");

        return;
    }

    function get(index) {
        if (!index || index > listArray.length) return;

        let receivedNode = list.get(index)
        setCurrentNode(receivedNode);

        setMessage(`The node with index ${index} is: ${receivedNode}.`);
        setInputValue("");

        return;
    }
    
    function removeNode(index) {
        if (!index) {
            setMessage(`Please enter a value!`);
            return;
        }
        index = Number(index);
        if (index >= listArray.length) {
            setInputValue("");
            setMessage(`This node does not exist!`);
            return;
        }

        let removedNode = list.remove(index)

        setMessage(`The following node with index ${index} was deleted: ${removedNode}.`);
        setInputValue("");

        const array = [...list.values()];
        setListArray(array);
        
        let arrayWithArrows = [];
        for (let item of list) {
            arrayWithArrows.push(item, "  ->  ");
        }
        setListDisplay(arrayWithArrows);

        return;
    }

      
    return (
        <div> 
            <h1>Linked List</h1>
            <br/>
            <div className="line">
                <div className="Insert">
                    <input className="input-field" onChange={(event) => setInputValue(event.target.value)} placeholder="Enter a number" type="number" value={inputValue}/>
                    <button className="linkedListButton" onClick={() => deleteList()}>
                        Delete list
                    </button>
                    <button className="linkedListButton" onClick={() => add(inputValue)}>
                        Insert
                    </button>
                    <button className="linkedListButton" onClick={() => get(inputValue)}>
                        Get (index)
                    </button>
                    <button className="linkedListButton" onClick={() => removeNode(inputValue)}>
                        Delete
                    </button>
                    <button className="linkedListButton" onClick="perform('search')">
                        Search
                    </button>
                </div>
                <div className="line">
                    
                </div>
            </div>
            <div className="seperate-line"></div>
            <div className="result line">
                <div>{message}</div>
                <div id="current-size" className="line"></div>
                <div id="search-result"></div>
                <div id="list-look" className="line"></div>
            </div>
                    <ShowList listArray={listArray} listDisplay={listDisplay} currentNode={currentNode}/>
        </div>
    )
}

function ShowList(props) {

    const { listArray, listDisplay, currentNode } = props;

    
    return (
        <div>
            <div>
            {listDisplay}
            </div>
            <br/>
            <div id="current-status" className="line">Current node: {currentNode}</div>
            <div>Length of list: {listArray.length} nodes.</div>
            <div>Head (first node): {listArray[0]}</div>
            <div>Tail (last node): {listArray[listArray.length-1]}</div>
        </div>
        );
}


export default UserInterface; 
