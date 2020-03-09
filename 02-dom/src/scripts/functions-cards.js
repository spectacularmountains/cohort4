
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
            const card = delItem.parentNode;
            const cardsList = delItem.parentNode.parentNode;
            cardsList.removeChild(card);
        }, 
        
        addCardBefore: (clickedItem) => {
            const card = clickedItem.parentNode;
            const cardsList = clickedItem.parentNode.parentNode;
            
            const newAddBeforeButton = document.createElement("button")
            const newAddBeforeButtonText = document.createTextNode("Add Before")
            newAddBeforeButton.appendChild(newAddBeforeButtonText)
            newAddBeforeButton.classList.add("addBefore")

            const newH2 = document.createElement("h2");
            const newH2Text = document.createTextNode("Card 4");
            newH2.appendChild(newH2Text)

            const newDiv = document.createElement("div")
            newDiv.classList.add("card");
            newDiv.appendChild(newH2)
            newDiv.appendChild(newAddBeforeButton)

            cardsList.insertBefore(newDiv, card);

            console.log(newH2, newH2Text, newDiv); 
        }, 


};


export default functions;
const newH2 = document.createElement('h2')
