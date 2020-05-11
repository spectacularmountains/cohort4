import React from 'react';

function Greeting() {
    const date = new Date(); 
    const hours = date.getHours(); 
    let timeOfDay;

    if (hours < 12) {
        timeOfDay = "Morning"
    } else if (hours >=12 && hours <18) {
        timeOfDay = "Afternoon"
    } else { timeOfDay = "Evening"}
    
    return  <p>
              Hello and Good {timeOfDay}!
            </p>
}

export default Greeting; 