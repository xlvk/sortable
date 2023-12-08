- All that data can be found here in all.json (https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json)
- You are not allowed to rely on libraries like React, Vue, Svelte etc.


# Fetching the data
- In order to get the information, you should use 'fetch'
    // Request the file with fetch, the data will downloaded to your browser cache.
    fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then((response) => response.json()) // parse the response from JSON
    .then(loadData) // .then will call the `loadData` function with the JSON value.
    
    // This function is called only after the data has been fetched, and parsed.
    const loadData = heroes => {
    console.log(heroes)
    }


# Display
- We will only show some of the fields in a <table> element. 
- The necessary data will be:
    1. Icon (.images.xs, should be displayed as images and not as a string)
    2. Name (.name)
    3. Full Name (.biography.fullName)
    4. Powerstats (each entry of .powerstats)
    5. Race (.appearance.race)
    6. Gender (.appearance.gender)
    7. Height (.appearance.height)
    8. Weight (.appearance.weight)
    9. Place Of Birth (.biography.placeOfBirth)
    10. Alignment (.biography.alignment)

- The information must be displayed in multiple pages
- Use a <select> input to chose the page size from 10, 20,50, 100 or all results.
- The default page size selected option must be 20.


# Search
- Filter information by searching the name as a string.
    For example, searching "man" should find all superheros with "man" in their name.
- The results should be filtered after every keystroke. So we don't need a "search" button.

# Search
- Aort the information in the table by any of its columns
- Results should be sortable alphabetically or numerically.

- Initially all rows should be sorted by the column 'name' by 'ascending' order.
- The first click on a column heading will sort the table by the data in that column in 'ascending' order.
- Consecutive clicks on a column heading will toggle between 'ascending' and 'descending'
- Missing values should always be sorted last, irrespective of ascending or descending.
- Some of the columns are composed of strings, but represent numerical values. 
    For example, when the 'weight' column is sorted in ascending order, then "78 kg" must be displayed before "100 kg".