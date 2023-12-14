let fetchedData = [];
const url = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        fetchedData = data;
        const select = document.createElement('select');
        const searchAndSortDiv = document.getElementById('searchAndSort');

        //styling
        searchAndSortDiv.style.display = "flex";
        select.setAttribute("class", "form-select form-select-sm m-2");
        select.style.maxWidth = "100px";
        select.style.maxHeight = "50px";

        select.innerHTML = `
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="50">50</option>
    <option value="100">100</option>
    <option value="all">All</option>
   `;
        select.value = '20';
        searchAndSortDiv.appendChild(select);

        const table = document.createElement('table');
        table.setAttribute("class", "table table-bordered border-grey table-sm table-dark table-responsive thead-dark");
        document.body.appendChild(table);

        // Convert pageSize to a number
        const pageSize = select.value === 'all' ? fetchedData.length : Number(select.value);
        updateTable(pageSize);
    })
    .catch((error) => console.error('Error:', error));


document.getElementById('searchAndSort').addEventListener('change', (event) => {
    if (event.target.tagName.toLowerCase() === 'select') {
        const pageSize = event.target.value === 'all' ? fetchedData.length : Number(event.target.value);
        currentPage = 1;
        updateTable(pageSize);
    }
});


document.getElementById('searchInput').addEventListener('keyup', filterTable);

function filterTable() {
    const input = document.getElementById('searchInput');
    // input.style.margin - right = "100px";
    input.setAttribute("class", "input-group");
    const filter = input.value.toUpperCase();
    const table = document.querySelector('table');
    table.innerHTML = ''; // clear the table

    let data = fetchedData.filter(hero => hero.name.toUpperCase().includes(filter));
    // Create a header row
    const headerRow = document.createElement('tr')
    const headers = ['Icon', 'Name', 'Full Name', 'Powerstats', 'Race', 'Gender', 'Height', 'Weight', 'Place Of Birth', 'Alignment']
    headers.forEach((header) => {
        const headerCell = document.createElement('th')
        headerCell.textContent = header
        headerCell.style.textAlign = 'center' // center-align the header cell
        headerRow.appendChild(headerCell)
    })
    table.appendChild(headerRow)
    data.forEach((hero) => {
        const row = document.createElement('tr');
        row.style.textAlign = 'center'; // center-align the row

        const iconCell = document.createElement('td')
        const icon = document.createElement('img')
        icon.src = hero.images.xs
        iconCell.appendChild(icon)
        iconCell.style.textAlign = 'center' // center-align the icon cell
        row.appendChild(iconCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = hero.name
        nameCell.style.textAlign = 'center' // center-align the name cell
        row.appendChild(nameCell)

        const fullNameCell = document.createElement('td')
        fullNameCell.textContent = hero.biography.fullName
        fullNameCell.style.textAlign = 'center' // center-align the full name cell
        row.appendChild(fullNameCell)

        const powerstatsCell = document.createElement('td')
        let powerstats = hero.powerstats;
        let formattedStats = Object.keys(powerstats)
            .map((key, index) => {
                let span = document.createElement('span');
                span.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${powerstats[key]}`;
                span.className = `color${index + 1}`; // Assign a unique class to each span
                return span.outerHTML;
            })
            .join(', ');

        powerstatsCell.innerHTML = formattedStats;
        powerstatsCell.style.textAlign = 'center' // center-align the powerstats cell
        row.appendChild(powerstatsCell)

        const raceCell = document.createElement('td')
        raceCell.textContent = hero.appearance.race
        raceCell.style.textAlign = 'center' // center-align the race cell
        row.appendChild(raceCell)

        const genderCell = document.createElement('td')
        genderCell.textContent = hero.appearance.gender
        genderCell.style.textAlign = 'center' // center-align the gender cell
        row.appendChild(genderCell)

        const heightCell = document.createElement('td')
        heightCell.textContent = hero.appearance.height
        heightCell.style.textAlign = 'center' // center-align the height cell
        row.appendChild(heightCell)

        const weightCell = document.createElement('td')
        weightCell.textContent = hero.appearance.weight
        weightCell.style.textAlign = 'center' // center-align the weight cell
        row.appendChild(weightCell)

        const placeOfBirthCell = document.createElement('td')
        placeOfBirthCell.textContent = hero.biography.placeOfBirth
        placeOfBirthCell.style.textAlign = 'center' // center-align the place of birth cell
        row.appendChild(placeOfBirthCell)

        const alignmentCell = document.createElement('td')
        alignmentCell.textContent = hero.biography.alignment
        alignmentCell.style.textAlign = 'center' // center-align the alignment cell
        row.appendChild(alignmentCell)

        table.appendChild(row)
    })
}

function ceil(int) {
    if (!int) return 0
    let isNegative = false
    if (int < 0) {
        isNegative = true
        int = -int
    }
    let intCopy = int
    let num = 0
    while (!(intCopy < 1 && intCopy >= 0)) {
        intCopy -= 1
        num++
    }
    if (isNegative) {
        return -num
    } else {
        return num + 1
    }
}

let currentPage = 1

function updateTable(pageSize) {
    const table = document.querySelector('table');
    table.style.textAlign = 'center'; // center-align the table
    table.innerHTML = ''; // clear the table

    // Calculate the total number of pages
    const totalPages = ceil(fetchedData.length / pageSize);

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Create the table rows for the current page
    let data = fetchedData.slice(startIndex, endIndex);

    // Create the header row
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Icon', 'Name', 'Full Name', 'Powerstats', 'Race', 'Gender', 'Height', 'Weight', 'Place Of Birth', 'Alignment'];
    headers.forEach((header) => {
        const headerCell = document.createElement('th');
        headerCell.className = 'table-header';
        headerCell.textContent = header;
        headerCell.style.textAlign = 'center'; // center-align the header cell
        headerRow.appendChild(headerCell);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach((hero) => {
        const row = document.createElement('tr');
        row.style.textAlign = 'center'; // center-align the row

        const iconCell = document.createElement('td');
        const icon = document.createElement('img');
        icon.src = hero.images.xs;
        iconCell.appendChild(icon);
        iconCell.style.textAlign = 'center'; // center-align the icon cell
        row.appendChild(iconCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = hero.name;
        nameCell.style.textAlign = 'center'; // center-align the name cell
        row.appendChild(nameCell);

        const fullNameCell = document.createElement('td');
        fullNameCell.textContent = hero.biography.fullName;
        fullNameCell.style.textAlign = 'center'; // center-align the full name cell
        row.appendChild(fullNameCell);

        const powerstatsCell = document.createElement('td');
        let powerstats = hero.powerstats;
        let formattedStats = Object.keys(powerstats)
            .map((key, index) => {
                let span = document.createElement('span');
                span.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${powerstats[key]}`;
                span.className = `color${index + 1}`; // Assign a unique class to each span
                return span.outerHTML;
            })
            .join(', ');

        powerstatsCell.innerHTML = formattedStats;
        powerstatsCell.style.textAlign = 'center'; // center-align the powerstats cell
        row.appendChild(powerstatsCell);

        const raceCell = document.createElement('td');
        raceCell.textContent = hero.appearance.race;
        raceCell.style.textAlign = 'center'; // center-align the race cell
        row.appendChild(raceCell);

        const genderCell = document.createElement('td');
        genderCell.textContent = hero.appearance.gender;
        genderCell.style.textAlign = 'center'; // center-align the gender cell
        row.appendChild(genderCell);

        const heightCell = document.createElement('td');
        heightCell.textContent = hero.appearance.height;
        heightCell.style.textAlign = 'center'; // center-align the height cell
        row.appendChild(heightCell);

        const weightCell = document.createElement('td');
        weightCell.textContent = hero.appearance.weight;
        weightCell.style.textAlign = 'center'; // center-align the weight cell
        row.appendChild(weightCell);

        const placeOfBirthCell = document.createElement('td');
        placeOfBirthCell.textContent = hero.biography.placeOfBirth;
        placeOfBirthCell.style.textAlign = 'center'; // center-align the place of birth cell
        row.appendChild(placeOfBirthCell);

        const alignmentCell = document.createElement('td');
        alignmentCell.textContent = hero.biography.alignment;
        alignmentCell.style.textAlign = 'center'; // center-align the alignment cell
        row.appendChild(alignmentCell);

        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    // Create the pagination buttons
    if (pageSize === fetchedData.length) {
        // Remove the pagination buttons
        const paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = '';
    } else {
        // Create the pagination buttons
        const paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.addEventListener('click', () => {
                currentPage = i;
                updateTable(pageSize);
            });
            paginationDiv.appendChild(button);
        }
    }


    makeTableSortable();
}

function makeTableSortable() {
    let lastSortedColumn = -1;
    let lastSortAscending = true;
    document.querySelectorAll('th').forEach((header, index) => {
        if (header.innerText === 'Icon') {
            // Skip adding event listener if the header is "Icon"
            return;
        }
        header.addEventListener('click', () => {

            const table = header.closest('table');
            const rows = Array.from(table.querySelectorAll('tr')).slice(1);
            const isAscending = lastSortedColumn !== index ? true : !lastSortAscending;
            lastSortedColumn = index;
            lastSortAscending = isAscending;
            rows.sort((rowA, rowB) => {
                let cellA = rowA.children[index].innerText;
                let cellB = rowB.children[index].innerText;
                const missingValues = ['', '-', '-,0 cm', '- lb,0 kg', 'Shaker Heights, Ohio'];
                let comparison;
                if (header.innerText === 'Weight') {
                    // Check if cell value is '- lb,0 kg' before parsing into a number
                    if (cellA !== '- lb,0 kg') {
                        cellA = parseFloat(cellA.split(',')[0].replace(/[^\d.-]/g, ''));
                    }
                    if (cellB !== '- lb,0 kg') {
                        cellB = parseFloat(cellB.split(',')[0].replace(/[^\d.-]/g, ''));
                    }
                }

                if (missingValues.includes(cellA) || missingValues.includes(cellB)) {
                    // If one of the values is missing, sort it last
                    comparison = missingValues.includes(cellA) ? 1 : -1;
                } else if (!isNaN(+cellA) && !isNaN(+cellB)) {
                    comparison = +cellA - +cellB;
                } else {
                    comparison = String(cellA).localeCompare(String(cellB));
                }
                // Adjust comparison for missing values when sorting in descending order
                if (!isAscending && (missingValues.includes(cellA) || missingValues.includes(cellB))) {
                    comparison = -comparison;
                }
                return isAscending ? comparison : -comparison;
            });
            rows.forEach(row => table.appendChild(row));
            lastSortedColumn = index;
        });
    });

}