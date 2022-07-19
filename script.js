// Write your JavaScript code here!
let list;
let pilot;
let copilot;
let fuelLevel;
let cargoLevel;


const isComplete = (inputs) => {
    return inputs.reduce((aggregate, current) => {            
        return  aggregate && (current.value.length != 0)
    }, true);
}

const getAllInputs = (document) => {
    list = document.getElementById('faultyItems');
    pilot = document.querySelector('input[name="pilotName"]');
    copilot = document.querySelector('input[name="copilotName"]');
    fuelLevel = document.querySelector('input[name="fuelLevel"]');
    cargoLevel = document.querySelector('input[name="cargoMass"]');
}
const initializeView = () => {
    list.style.visibility = 'hidden';
    launchStatus.textContent = 'Awaiting Information Before Launch';
    launchStatus.style.color = 'rgb(0, 0, 0)';
    fuelStatus.textContent = 'Fuel level high enough for launch';
    cargoStatus.textContent = 'Cargo mass low enough for launch';
}

const init = (document) => {
    getAllInputs(document);
    initializeView();   
}


window.addEventListener("load", function() {
    init(document);

    const form = document.querySelector('[data-testid="testForm"]');
    const inputs = Array.from(this.document.querySelectorAll('input[type="text"]'));
    form.addEventListener('submit', (event) => {
        event.preventDefault();  
        
        if(!isComplete(inputs)){ 
            initializeView(); 
            alert("All fields are required ");            

        } else {   
            if(!formSubmission(document, list, pilot.value, copilot.value, fuelLevel.value, cargoLevel.value)){ 
                initializeView();
                alert('Make sure to enter valid information for each field!');                              
            }
        }
    });

    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        console.log(result);                
        const targetPlanet = pickPlanet(result);
        addDestinationInfo(
            document, 
            targetPlanet.name, 
            targetPlanet.diameter, 
            targetPlanet.star, 
            targetPlanet.distance, 
            targetPlanet.moons, 
            targetPlanet.image
        );
    });
   
});