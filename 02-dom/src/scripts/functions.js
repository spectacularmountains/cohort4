let c = document.querySelector("ol").children
let text = "";

const functions = {
           
        showChildren: () => {

        for (let i=0; i < c.length; i++) {
            text += c[i].textContent + " ";
        }
        textOutput.textContent = text
    },

};


export default functions;
