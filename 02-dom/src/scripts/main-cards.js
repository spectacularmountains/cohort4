import functions from './functions-cards.js';


// Event listener for SIZE app

// mainDiv.addEventListener('click', ((e) => {
//     console.log(e.target);
// }));

// show.addEventListener('click', (() => {
//     functions.showChildren();
// }));

document.querySelectorAll('.addBefore').forEach(item => {
    item.addEventListener('click', e => {
        functions.addCardBefore(e.target);
    })
})

document.querySelectorAll('.addAfter').forEach(item => {
    item.addEventListener('click', e => {
        functions.addCardAfter(e.target);
    })
})
  
document.querySelectorAll('h2').forEach(item => {
    item.addEventListener('click', e => {
        console.log(e.target)
    })
})

document.querySelectorAll('.del').forEach(item => {
    item.addEventListener('click', e => {
        functions.deleteCard(e.target);
    })
})