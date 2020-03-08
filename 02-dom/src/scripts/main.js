import functions from './functions.js';


// Event listener for SIZE app

// mainDiv.addEventListener('click', ((e) => {
//     console.log(e.target);
// }));

// show.addEventListener('click', (() => {
//     functions.showChildren();
// }));

add.addEventListener('click', functions.addClick);
input.addEventListener('keypress', functions.addEnter);

list.addEventListener('click', ((e) => {
    functions.strikeOutListItem(e.target);
}));

list.addEventListener('dblclick', ((e) => {
    functions.deleteListItem(e.target);
}));