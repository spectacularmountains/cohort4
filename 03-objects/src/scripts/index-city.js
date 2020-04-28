import {City, Controller} from './city.js'


// EVENTLISTENERS 

idButtonPopulate.addEventListener("click", City.populate);

idButtonClear.addEventListener("click", City.clear);

idButtonShow.addEventListener("click", City.showAll);

city.addEventListener("keyup", (e) => {
    let text = e.target.value.toLowerCase(); 
    City.search(text);
}); 

howBig.addEventListener("click", City.howBig);

totalPopulation.addEventListener("click", Controller.getPopulation);

cityForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    Controller.checkIfCityExists();
});

cityList.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete")) {
        Controller.deleteCity(e.target);
    } else { 
    Controller.selectCity(e.target);
    };
});

whichSphere.addEventListener("click", (() => {
    Controller.whichSphere(); 
}));
    
northernMost.addEventListener("click", Controller.getMostNorthern);
    
southernMost.addEventListener("click", Controller.getMostSouthern);

changePopulation.addEventListener("click", City.moved);