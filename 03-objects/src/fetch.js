const url = ["https://jsonplaceholder.typicode.com/users"]; 

const functions = {
    async getFirstName () { 
        const response = await fetch(url);
        const data = await response.json();
        const name = data[0].name; 
        return name;
    },
    
    async getAllFirstNames() { 
        return "Here are all first names";
    },
}



export default functions;
