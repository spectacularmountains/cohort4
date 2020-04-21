
const functions = {

    url: "https://jsonplaceholder.typicode.com/users",

    getFirstName(data) {
        return (data[0].name);
    },

    getAllFirstNames(data) {
        return data.map((d, i, x) => d.name);
    },

    showDelayProblem() {
        console.log('One');
        setTimeout(() => {          // Simulates a fetch
            console.log("Two");
        }, 1 * 1000);
        console.log('Three');       // We have a problem Huston
    },

    async showDelaySolution() {
        try {
            console.log('One');
            const value = await                 // Simulate fetch
                new Promise(
                    (resolve, reject) =>
                        setTimeout(() => resolve("Two"),
                            1 * 2000));
            // Now that we have the value we can use it.
            console.log(value);
            console.log('Three');
        } catch (error) {
            console.log(error);
        }
    },

    async getUsers() {
        try {
            const response = await fetch(functions.url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw (error);
        }
    },

    async workWithData() {
        const data = await functions.getUsers();
        console.log(functions.getFirstName(data));
        console.log(functions.getAllFirstNames(data));
    },

}


// const functions = {
//     async getFirstName () { 
//         const response = await fetch(url);
//         const data = await response.json();
//         const name = data[0].name; 
//         console.log(name)
//         return name;
//     },
    
//     async getAllFirstNames() { 
//         try {
//         const response = await fetch(url);
//         const data = await response.json();
//         const allNames = data.map(entry => entry.name); 
//         console.log(allNames)
//         return allNames;
//         } catch (error) {
//             console.log("This is the error logged: ", error);
//         }
//     },
// }



export default functions;
