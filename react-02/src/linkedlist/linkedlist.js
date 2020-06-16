import React, { useState, useEffect } from 'react';
import './linkedlist.css';


function LinkedList() {
    const [value, setValue] = useState(undefined); 

    return (
        <div> 
            <h1>Linked List</h1>
            <br/>
            <div className="line">
                    <div className="Insert">
                    <input className="input-field" value={{setValue}} placeholder="Enter a value" type="number"/>
                    <button className="linkedListButton" onClick="perform('insert')">
                        Insert
                    </button>
                    <button className="linkedListButton" onClick="perform('delete')">
                        Delete
                    </button>
                    <button className="linkedListButton" onClick="perform('search')">
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LinkedList; 
