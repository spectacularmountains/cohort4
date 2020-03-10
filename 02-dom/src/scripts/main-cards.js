import functions from './functions-cards.js';


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
			console.log(e.target)
        functions.deleteCard(e.target);
    })
})