// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById('missionTarget');
    // Here is the HTML formatting for our mission target div.
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
    return (testInput.length == 0)? 'Empty'
    : (isNaN(testInput))? 'Not a Number'
    : 'Is a Number';   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const validateForm = (pilot, copilot, fuelLevel, cargoLevel) => {
        const inputTypeMap = {
            pilot: 'Not a Number',
            copilot: 'Not a Number',
            fuelLevel: 'Is a Number',
            cargoLevel: 'Is a Number'
        };

        return (validateInput(pilot) == inputTypeMap.pilot)
        && (validateInput(copilot) == inputTypeMap.copilot)
        && (validateInput(fuelLevel) == inputTypeMap.fuelLevel)
        && (validateInput(cargoLevel) == inputTypeMap.cargoLevel);
    }
    if(!validateForm(pilot, copilot, fuelLevel, cargoLevel)){        
        return false;
    }

    const pilotStatus = document.getElementById('pilotStatus');
    const copilotStatus = document.getElementById('copilotStatus');
    const fuelStatus = document.getElementById('fuelStatus');
    const cargoStatus = document.getElementById('cargoStatus');
    const launchStatus = document.getElementById('launchStatus');

    pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;
    copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`;    

    // initial state:    
    launchStatus.textContent = 'Awaiting Information Before Launch';
    launchStatus.style.color = 'black';
    fuelStatus.textContent = 'Fuel level high enough for launch';
    cargoStatus.textContent = 'Cargo mass low enough for launch';

    const isLowFuel = fuelLevel < 10000;
    const isTooHeavy = cargoLevel > 10000;
    const isFaulty = isLowFuel || isTooHeavy;
    if(isFaulty){
        list.style.visibility = 'visible';
        launchStatus.textContent = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)';        
        if(isLowFuel) { fuelStatus.textContent = 'Fuel level too low for launch'; }
        if(isTooHeavy) { cargoStatus.textContent = 'Cargo mass too heavy for launch'; }

    } else {
        launchStatus.textContent = 'Shuttle is Ready for Launch';
        launchStatus.style.color = 'rgb(65, 159, 106)';        
    }

    return true;
}

async function myFetch() {
    await fetch('https://handlers.education.launchcode.org/static/planets.json')
    .then(response => response.json())
    .then(data => {
        planetsReturned = data;
    });  
    return planetsReturned;  
}

function pickPlanet(planets) {
    return planets[random(0, planets.length - 1)];
}
function random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
