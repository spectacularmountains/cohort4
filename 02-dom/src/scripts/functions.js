

const functions = {
           
        showChildren: () => {
            const c = document.querySelector("ol").children
            const text = "";
            for (let i=0; i < c.length; i++) {
                text += c[i].textContent + " ";
            }
            textOutput.textContent = text
        }, 

        addListItem: () => {
            const li = document.createElement("li");
            const liText = document.createTextNode("New list item");
            const ol = document.querySelector("ol");
            li.appendChild(liText); 
            ol.appendChild(li);
        }, 
        
        deleteListItem: () => {
            const c = document.querySelector("ol").children
            const ol = document.querySelector("ol");
            console.log(c, c.length)
            ol.removeChild(ol.childNodes[c.length]);
        }, 

};


export default functions;
