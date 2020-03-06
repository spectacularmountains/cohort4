import functions from './functions.js';

let c = document.querySelector("ol").children
let text = "";
let ol = document.querySelector("ol");

// Event listener for SIZE app

// mainDiv.addEventListener('click', ((e) => {
//     console.log(e.target);
// }));

show.addEventListener('click', (() => {
    functions.showChildren();
}));

add.addEventListener('click', (() => {
    functions.addListItem();
}));

del.addEventListener('click', (() => {
    functions.deleteListItem();
}));