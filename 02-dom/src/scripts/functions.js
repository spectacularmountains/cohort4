const ol = document.getElementById("list");

const functions = {
           
        showChildren: () => {
            const c = document.querySelector("ol").children
						let text = "";
						let textOutput = [];
            for (let i=0; i < c.length; i++) {
                text += c[i].textContent + " ";
            }
            return textOutput.textContent = text
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
        }

};


export default functions;
