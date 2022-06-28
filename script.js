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

const init = (document) => {
    list = document.getElementById('faultyItems');
    pilot = document.querySelector('input[name="pilotName"]').value;
    copilot = document.querySelector('input[name="copilotName"]').value;
    fuelLevel = document.querySelector('input[name="fuelLevel"]').value;
    cargoLevel = document.querySelector('input[name="cargoMass"]').value;
    
    list.style.visibility = 'hidden';
    launchStatus.textContent = 'Awaiting Information Before Launch';
    fuelStatus.textContent = 'Fuel level high enough for launch';
    cargoStatus.textContent = 'Cargo mass low enough for launch';
}


window.addEventListener("load", function() {


    const form = document.querySelector('[data-testid="testForm"]');
    const inputs = Array.from(this.document.querySelectorAll('input[type="text"]'));
    form.addEventListener('submit', (event) => {
        event.preventDefault();  
        if(!isComplete(inputs)){ 
            alert("All fields are required ");
            event.preventDefault();
        } else {   
            if(!formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel)){ 
                alert('Make sure to enter valid information for each field!');    
                event.preventDefault();          
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