import React, { Component, useState } from 'react';
import './linkedlist.css';

let currentIndex = -1; 



class Node extends Component {
    constructor(value, prev, next) {
        super(); 
        this.value = value; 
        this.prev = prev || null;
        this.next = next || null;
    }
}


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

    getTotalOfValues() {
        let current = this.head;
        let total = 0;
        while(current) {
            total += Number(current.value);
            current = current.next;
        }
        return total; 
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

   
    add(value, currentIndex) {
        // create a new node
        const newNode = new Node(value);
        
        //special case: no items in the list yet
        if (this.head === null) {
            
            // just set the head to the new node
            this.head = newNode;
            return [null, this.head.value, null, 0]; 
        } else {
            
            // start out by looking at the first node
            let current = this.head;
            console.log("First node: " + current.value)
            
            // traverse the list until you reach either the end or the index
            let i = 0; 
            let storedCurrent = null;
            while ((current !== null) && (i < currentIndex)) {
                console.log(i, currentIndex)
                storedCurrent = current;
                current = current.next;
                i++;
            }
            let nodesToBeShiftedBack;
            let currentNode;
            if (storedCurrent.prev && storedCurrent.next) {
                console.log("Case 1: Insert somewhere in the middle")
                nodesToBeShiftedBack = storedCurrent.next || null;
                currentNode = new Node(value); 
                nodesToBeShiftedBack.prev = currentNode; 
                storedCurrent.next = currentNode; 
                currentNode.next = nodesToBeShiftedBack; 
                currentNode.prev = storedCurrent;

            } else if (!storedCurrent.prev && storedCurrent.next) {
                console.log("Case 2: Insert after first node")
                nodesToBeShiftedBack = storedCurrent.next || null;
                currentNode = new Node(value); 
                nodesToBeShiftedBack.prev = currentNode; 
                storedCurrent.next = currentNode; 
                currentNode.next = nodesToBeShiftedBack; 
                currentNode.prev = storedCurrent;
                this.head = storedCurrent; 

            } else {
                console.log("Case 3: Insert at the end")
                currentNode = new Node(value); 
                this.tail = currentNode;
                storedCurrent.next = currentNode; 
                currentNode.next = null; 
                currentNode.prev = storedCurrent;
            }

            console.log("Prev node: ", currentNode.prev)
            console.log("Current node: ", currentNode)
            console.log("Next node: ", currentNode.next)
           
            if (!currentNode.next) {
                return [currentNode.prev.value, currentNode.value, null, i]
            }
            return [currentNode.prev.value, currentNode.value, currentNode.next.value, i]
        }
    }
    
    get(index) {

        // the pointer to use for traversal
        let current = this.head;
        console.log("this.head ", current)
        
        // used to keep track of where in the list you are
        let i = 0;
        // traverse the list until you reach either the end or the index
        while ((current !== null) && (i < index)) {
            current = current.next;
            i++;          
        }
        console.log("Current node: ", current.value)
        console.log("Previous node: ", current.prev? current.prev.value : null)
        
        // return the data if `current` isn't null
        return ((current !== null) ? current : undefined);
    }
    
    remove(index) {
        
        // Special case: last node 
        if ((this.head === null) || (index < 0)) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }
        
        // special case: removing the first node
        if (index === 0) {
            
            // temporary store the data from the node
            const value = this.head.value;
            
            // just replace the head with the next node in the list
            this.head = this.head.next;
            if (this.head) {this.head.prev = null}; 

            let prevNode = null;
            let currentNode = this.head? this.head.value : null; 
            let nextNode = this.head? (this.head.next? this.head.next.value : null) : null; 
            index = this.head? 0 : -1;

            return [prevNode, currentNode, nextNode, value, index];
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
            console.log("boobbbbb", current.value, this.head.value, previous.value)

            let next = current.next
            previous.next = next
            if (next) {
                next.prev = previous
            }
            
            // // skip over the node to remove
            // if (previous.prev) {
            //     this.head.prev = previous.prev; 
            //     console.log(this.head.prev.value)
            //     console.log(this.head.value)
            // } else {
            //     this.head = previous;
            //     this.head.prev = null;
            //     previous.prev = this.head.prev 
            //     console.log("Previous.prev ", previous.prev)
            // }; 
            // previous.next = current.next;
            // console.log(previous.value)

            
            // return the value that was just removed from the list
        }
        let prevNode = previous.prev? previous.prev.value : null;
        console.log("Previous node after deletion: ", previous.prev? previous.prev.value : null)
        // let prevNode = current.prev.prev? current.prev.prev.value : null;
        let currentNode = previous.value; 
        console.log("Current node after deletion: ",previous.value)
        let nextNode = previous.next? previous.next.value : null; 
        console.log("Next node after deletion: ",previous.next? previous.next.value : null)

        return [prevNode, currentNode, nextNode, current.value, index-1];
    }
    
}


const list = new LinkedList(); // Instantiate a new Linked List



function UserInterface() {
    const [inputValue, setInputValue] = useState(""); 
    const [message, setMessage] = useState("Welcome!");
    const [prevNode, setPrevNode] = useState(null);
    const [currentNode, setCurrentNode] = useState(null);
    const [nextNode, setNextNode] = useState(null);
    const [total, setTotal] = useState(0);
    

    function getTotal() {
        if (!list.head) {
            setTotal(0);
            setMessage("List is empty!"); 
            return;
        }
        let sum = list.getTotalOfValues(); 
        setTotal(sum);
        return;
    }
    

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
        list.head = null;
        let wordNode = (counter === 1) ? "node" : "nodes";
        setMessage(`${counter} ${wordNode} deleted.`)
        
        // Reset STATE of nodes and current index 
        setPrevNode(null);
        setCurrentNode(null);
        setNextNode(null);
        setInputValue("");
        currentIndex = -1;
        setTotal(0);

        return;
    }
    
    function add(inputValue) {
        if (!inputValue) {
            setMessage(`Please enter a value!`);
            return;
        }        
        currentIndex++;
        // setCurrentIndex(newCurrentIndex);
        let result = list.add(inputValue, currentIndex);
        console.log("The added node has a value of: " + result[1]);
        console.log("The current index is: " + result[3]);
        setPrevNode(result[0])
        setCurrentNode(result[1]);
        setNextNode(result[2])
        setMessage(`You have added the following node: ${inputValue}.`);
        setInputValue("");

        // Calculate total of all values 
        getTotal();

        return;
    }

    function prev() {

        // First check if list exists 
        if (currentIndex === -1) {
            setMessage(`List does not exist!`);
            return;
            }

        // Check if beginning of list has been reached 
        if (currentIndex === 0) {
            setMessage(`At beginning of list!`);
            setPrevNode(null);
            return;
            }
        
        // If not, decrease current index by 1 and get all nodes 
        currentIndex--;
        let receivedNode = list.get(currentIndex)
        setPrevNode(!receivedNode.prev? null : receivedNode.prev.value);
        console.log(!receivedNode.prev? null : receivedNode.prev.value);
        setCurrentNode(receivedNode.value);
        setNextNode(!receivedNode.next? null : receivedNode.next.value);
        setMessage(`Moved to previous node.`);

        return;
    }

    function next() {

        // First check if list exists 
        if (currentIndex === -1) {
            setMessage(`List does not exist!`);
            return;
        }

        // Check if end of list has already been reached 
        let receivedNode = list.get(currentIndex)
        if (!receivedNode.next) {
        setMessage(`At end of list!`);
        setNextNode(null);
        return;
        }
        
        // If not, then increase current index by 1 and get all nodes (current, prev, and next)
        currentIndex = currentIndex + 1;
        receivedNode = list.get(currentIndex)

        setPrevNode(!receivedNode.prev? null : receivedNode.prev.value); 
        setCurrentNode(receivedNode.value); 
        setNextNode(!receivedNode.next? null : receivedNode.next.value); 
        setMessage(`Moved to next node.`);

        return;
    }
    
    function removeNode() {
        console.log("boo", currentIndex)
        if (currentIndex < 0) {
            setMessage(`List is empty!`);
            return;
        }
        
        let result = list.remove(currentIndex);

        setMessage(`The following node with index ${currentIndex} was deleted: ${result[3]}.`);
        setPrevNode(result[0]);
        setCurrentNode(result[1]);
        setNextNode(result[2]);
        setInputValue("");
        currentIndex = result[4];
        console.log(currentIndex)
        
        getTotal();

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
                    <button className="linkedListButton" onClick={() => removeNode()}>
                        Delete
                    </button>

                    <br/>

                    <button className="linkedListButton" onClick={() => prev()} style={{background: "grey"}}>
                        &#60; Prev Node ({prevNode})
                    </button>
                    <button disabled className="linkedListButton" style={{background: "red", cursor: "auto"}}>
                        Current Node ({currentNode})
                    </button>
                    <button className="linkedListButton" onClick={() => next()} style={{background: "grey"}}>
                        Next Node ({nextNode}) &#62; 
                    </button>
                </div>
                <div className="line">
                    
                </div>
            </div>
            <div className="seperate-line"></div>
            <div className="result line">
                <div>{message}</div>
                <div id="current-size" className="line">Total amount of all nodes: {total}</div>
                <div id="search-result"></div>
                <div id="list-look" className="line"></div>
            </div>
        </div>
    )
}


export default UserInterface; 
