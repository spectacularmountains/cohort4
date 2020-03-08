import functions from './functions.js';


// Event listener for SIZE app

// mainDiv.addEventListener('click', ((e) => {
//     console.log(e.target);
// }));

show.addEventListener('click', (() => {
    functions.showChildren();
}));

add.addEventListener('click', functions.addClick);
add.addEventListener('keypress', functions.addEnter);

list.addEventListener('click', ((e) => {
    const strikeItem = e.target; 
    console.log(strikeItem)
    functions.strikeOutListItem(strikeItem);
}));