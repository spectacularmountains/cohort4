import functions from './functions.js';



// Event listener for SIZE app

// mainDiv.addEventListener('click', ((e) => {
//     console.log(e.target);
// }));

show.addEventListener('click', (() => {
    // console.log(document.getElementsByTagName("li").textContent)
    functions.showChildren()
}));
