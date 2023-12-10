function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching && n < 2) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (compare(x, y) > 0) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (compare(x, y) < 0) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
    switchcount = rows.length
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = (rows.length - 1); i > 1; i--) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i - 1].getElementsByTagName("td")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (compare(x, y) > 0) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (compare(x, y) < 0) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i - 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount--;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == rows.length && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function compare(x, y, isNumeric) {
    if (isNumeric) {
        // Convert the innerHTML of x and y to their actual values as numbers
        var xValue = Number(x.innerHTML);
        var yValue = Number(y.innerHTML);
        // If either value is NaN, sort it last
        if (isNaN(xValue)) return 1;
        if (isNaN(yValue)) return -1;
        // Compare the values and return the result
        if (xValue < yValue) return -1;
        if (xValue > yValue) return 1;
        return 0;
    } else {
        // If isNumeric is false, compare the innerHTML strings directly
        var xText = x.innerHTML.toLowerCase();
        var yText = y.innerHTML.toLowerCase();
        if (xText < yText) return -1;
        if (xText > yText) return 1;
        return 0;
    }
}


function getValue(str) {
    // Extract the numeric value from the string (e.g. "78 kg" => 78)
    return Number(str.match(/\d+/));
}

document.addEventListener("DOMContentLoaded", () => {


    const url = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json'; //url to fetch data from


    async function getHeroes(url, limit) {
        try {
            const response = await fetch(`${url}?limit=${limit}`);
            const data = await response.json()
            loadData(data)
        } catch (error) {
            console.log("error!")
            console.log(error)
        }
    };


    getHeroes(url);



    const loadData = heroes => {
        const heroData = heroes.map(hero => {
            return {
                icon: hero.images.xs,
                name: hero.name,
                fullName: hero.biography.fullName,
                powerstats: hero.powerstats,
                race: hero.appearance.race,
                gender: hero.appearance.gender,
                height: hero.appearance.height,
                weight: hero.appearance.weight,
                placeOfBirth: hero.biography.placeOfBirth,
                alignment: hero.biography.alignment
            };
        });
        renderDataInTheTable(heroData)
    };







    // Add an event listener to each column header
    // var headers = document.getElementsByTagName("th");
    // for (var i = 0; i < headers.length; i++) {
    //     headers[i].addEventListener("click", function() {
    //         // Get the index of the clicked column header
    //         var index = this.cellIndex;
    //         sortTable(index);
    //     });
    // }
});

function sortTableByNumber(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    table = document.getElementById("table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            var xContent = parseInt(x.innerHTML)
            var yContent = parseInt(y.innerHTML)
            console.log(xContent, yContent)
            if (dir == "asc") {
                if (xContent > yContent) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (xContent < yContent) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


function sortTableByString(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    table = document.getElementById("table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            var xContent = ((x.innerHTML.toLowerCase() == '' || x.innerHTML.toLowerCase() == '-') && dir == 'asc') ?
                'zzzzzzzzzzzzzzzzz' : x.innerHTML.toLowerCase();
            var yContent = ((y.innerHTML.toLowerCase() == '' || y.innerHTML.toLowerCase() == '-') && dir == 'asc') ?
                'zzzzzzzzzzzzzzzzz' : y.innerHTML.toLowerCase();
            if (dir == "asc") {
                if (xContent > yContent) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (xContent < yContent) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            console.log(switchcount == 0 && dir == "asc")
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}




function renderDataInTheTable(heroes) {
    const mytable = document.getElementById("table");
    const tableBody = document.createElement("tbody");
    const selectElement = document.getElementById("limit-selector");

    // Set the default value of the select element to 20
    selectElement.value = "20";

    // Add an event listener to the select element
    selectElement.addEventListener('change', () => {
        const selectedLimit = selectElement.value;
        const filteredHeroes = selectedLimit === "All" ? heroes : heroes.slice(0, selectedLimit);
        // Re-render the table with the filtered heroes
        tableBody.innerHTML = ''; // Clear the previous table rows
        filteredHeroes.forEach(hero => {
            // Create a table row for the hero and add it to the table body
            const heroRow = document.createElement("tr");
            heroRow.innerHTML = `
        <td><img src="${hero.icon}" alt="${hero.name}"></td>
        <td>${hero.name}</td>
        <td>${hero.fullName}</td>

      

        <td>${hero.powerstats.intelligence}</td>
        <td>${hero.powerstats.strength}</td>
        <td>${hero.powerstats.speed}</td>
        <td>${hero.powerstats.power}</td>
        <td>${hero.powerstats.durability}</td>
        <td>${hero.powerstats.combat}</td>
     

        <td>${hero.race}</td>
        <td>${hero.gender}</td>
        <td>${hero.height}</td>
        <td>${hero.weight}</td>
        <td>${hero.placeOfBirth}</td>
        <td>${hero.alignment}</td>
      `;
            tableBody.appendChild(heroRow);
        });
    });

    // Render the initial table with 20 heroes
    const defaultLimit = 20;
    const defaultHeroes = heroes.slice(0, defaultLimit);
    defaultHeroes.forEach(hero => {
        const heroRow = document.createElement("tr");
        heroRow.innerHTML = `
      <td><img src="${hero.icon}" alt="${hero.name}"></td>
      <td>${hero.name}</td>
      <td>${hero.fullName}</td>

   
    
      <td>${hero.powerstats.intelligence}</td>
      <td>${hero.powerstats.strength}</td>
      <td>${hero.powerstats.speed}</td>
      <td>${hero.powerstats.power}</td>
      <td>${hero.powerstats.durability}</td>
      <td>${hero.powerstats.combat}</td>
   


      <td>${hero.race}</td>
      <td>${hero.gender}</td>
      <td>${hero.height}</td>
      <td>${hero.weight}</td>
      <td>${hero.placeOfBirth}</td>
      <td>${hero.alignment}</td>
    `;
        tableBody.appendChild(heroRow);
    });

    // Insert the table body into the table
    mytable.appendChild(tableBody);
};

// Get the input field
var input = document.getElementById("filter");

// Add an event listener to the input field
input.addEventListener("keyup", searchTable);


function searchTable() {

    // Get the input field
    var input = document.getElementById("filter");

    // Add an event listener to the input field
    input.addEventListener("input", searchTable);

    function searchTable() {
        let filter = input.value.toUpperCase();
        let table = document.getElementById('table');
        let tr = table.getElementsByTagName('tr');

        // Loop through all table rows, and hide those that don't match the search query
        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td')[1];
            if (td) {
                let textValue = td.textContent || td.innerText;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

}