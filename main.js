"use strict";

function renderCoffee(coffee) {
    var html = '<ul class="coffee list-group">';
    html += '<li class="d-none">' + coffee.id + '</li>';
    html += '<li class="list-group-item d-flex justify-content-between align-items-center cta-item item-text font-weight-bold">' + coffee.name ;

    switch(coffee.roast) {
        case 'light':
            html += '<img src="img/light-roast.png" style="height: 16px">';
            break;
        case 'medium':
            html += '<img src="img/medium-roast.png" style="height: 16px">';
            break;
        case 'dark':
            html += '<img src="img/dark-roast.png" style="height: 16px">';
    }
    // html += '<span class="badge badge-primary badge-pill">' + coffee.roast + '</span>'+ '</li>';
    html += '</ul>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// Select option filter
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];

    if(selectedRoast !== 'all') {
        coffees.filter(function(coffee) {
            if(coffee.roast.match(selectedRoast)) {
                filteredCoffees.push(coffee);
            }
        });

        tbody.innerHTML = renderCoffees(filteredCoffees);
    } else {
        tbody.innerHTML = renderCoffees(coffees);
    }
}

// Input filter
function updateInputCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = inputSelection.value.toLowerCase();
    var filteredCoffees = [];
    coffees.filter(function(coffee) {
        if(coffee.name.toLowerCase().match(selectedRoast) || coffee.roast.toLowerCase().match(selectedRoast)) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

function addToCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var addCoffeeName = document.querySelector('#add-coffee-name').value;
    var addCoffeeRoast = document.querySelector('#add-coffee-roast').value;

    coffees.push({
        id: coffees.length + 1,
        name: addCoffeeName,
        roast: addCoffeeRoast
    });

    localStorage.setItem('coffees', JSON.stringify(coffees));
    coffeesArray = JSON.parse(localStorage.getItem('coffees'));

    tbody.innerHTML = renderCoffees(coffeesArray);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var tbody = document.querySelector('#coffees');
var roastSelection = document.querySelector('#roast-selection');
var inputSelection = document.querySelector('#input-selection');
var addCoffee = document.querySelector('#add-coffee');

roastSelection.addEventListener('change', updateCoffees);
inputSelection.addEventListener('keyup', updateInputCoffees);
addCoffee.addEventListener('click', addToCoffees);


// tbody.innerHTML = renderCoffees(coffees);
var coffeesArray = localStorage.getItem('coffees') ? tbody.innerHTML = renderCoffees(JSON.parse(localStorage.getItem('coffees'))) : tbody.innerHTML = renderCoffees(coffees);


