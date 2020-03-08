const input = document.getElementById("input")
const ol = document.getElementById("list");

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
        
        deleteListItem: () => {
            const c = document.querySelector("ol").children
            const ol = document.querySelector("ol");
            console.log(c, c.length)
            ol.removeChild(ol.childNodes[c.length]);
        }, 

        strikeOutListItem: (strikeItem) => {
            console.log(strikeItem)
            ol.removeChild(strikeItem);
        }

};


export default functions;
