let c = 3; // Initial number of cards on display

const functions = {
           
        showChildren: () => {
            const c = document.querySelector("ol").children
            const text = "";
            for (let i=0; i < c.length; i++) {
                text += c[i].textContent + " ";
            }
            textOutput.textContent = text
        }, 

        addClick: () => {
            if (input.value.length > 0) {
                functions.createListItem();
            }
        }, 
        
        addEnter: () => {
            if (input.value.length > 0 && event.keyCode === 13) {
                functions.createListItem();
            }
        }, 

        createListItem: () => {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(input.value)); 
            ol.appendChild(li);
            input.value = "";
        },
        
        deleteListItem: (delItem) => {
            ol.removeChild(delItem);
        }, 

        strikeOutListItem: (strikeItem) => {
            strikeItem.classList.toggle("strike");
        },

        // ----------

        deleteCard: (delItem) => {
            // c -= 1; 
            const card = delItem.parentNode;
            const cardsList = delItem.parentNode.parentNode;
            cardsList.removeChild(card);
        }, 
        
        addCard: (clickedItem) => {
            c += 1;
            const cardsList = clickedItem.parentNode.parentNode;
            
            const newAddBeforeButton = document.createElement("button")
            const newAddBeforeButtonText = document.createTextNode("Add Before")
            newAddBeforeButton.appendChild(newAddBeforeButtonText)
            newAddBeforeButton.classList.add("addBefore")
            newAddBeforeButton.addEventListener('click', e => {
                functions.addCardBefore(e.target);
            })
            
            const newAddAfterButton = document.createElement("button")
            const newAddAfterButtonText = document.createTextNode("Add After")
            newAddAfterButton.appendChild(newAddAfterButtonText)
            newAddAfterButton.classList.add("addAfter")
            newAddAfterButton.addEventListener('click', e => {
                functions.addCardAfter(e.target);
            })
            
            const newDeleteButton = document.createElement("button")
            const newDeleteButtonText = document.createTextNode("Delete")
            newDeleteButton.appendChild(newDeleteButtonText)
            newDeleteButton.classList.add("del")
            newDeleteButton.addEventListener('click', e => {
                functions.deleteCard(e.target);
            })

            const newH2 = document.createElement("h2");
            const newH2Text = document.createTextNode(`Card ${c}`);
            newH2.appendChild(newH2Text)

            const br = document.createElement('br');

            const newDiv = document.createElement("div")
            newDiv.classList.add("card");
            newDiv.appendChild(newH2)
            newDiv.appendChild(newAddBeforeButton)
            newDiv.appendChild(newAddAfterButton)
            newDiv.appendChild(br)
            newDiv.appendChild(newDeleteButton)

            return newDiv
            // cardsList.insertBefore(newDiv, card);
        }, 
        
        addCardBefore: (clickedItem) => {
            const card = clickedItem.parentNode;
            let newDiv = functions.addCard(clickedItem);
            cardsList.insertBefore(newDiv, card);
        },
        
        addCardAfter: (clickedItem) => {
            const card = clickedItem.parentNode;
            let newDiv = functions.addCard(clickedItem);
            card.parentNode.insertBefore(newDiv, card.nextSibling);
        },


};


export default functions;
const newH2 = document.createElement('h2')