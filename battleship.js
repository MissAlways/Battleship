let sea = new Array(10);
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

for (let i = 0; i < characters.length; i++) {
    sea[i] = new Array(10);
}

for (let x = 0; x < characters.length; x++) {
    for (let y = 0; y < numbers.length; y++) {
        sea[x][y] = characters[x] + numbers[y];
    }
}

console.log(sea);

const game_div = document.getElementById('game');
const game_table = document.createElement("table");
const game_table_body = document.createElement("tbody");

//Create Character row
const first_row = document.createElement("tr");
const empty_cell = document.createElement("td");
first_row.appendChild(empty_cell);
for (let i = 0; i < characters.length; i++) {
    const cell = document.createElement("td");
    const cellText = document.createTextNode(characters[i]);
    cell.appendChild(cellText);
    first_row.appendChild(cell);
}
game_table_body.append(first_row);

// Create sea
for (let y = 0; y < numbers.length; y++) {
    const row = document.createElement("tr");
    //Create number column
    const number_cell = document.createElement("td");
    const number_cellText = document.createTextNode(numbers[y]);
    number_cell.appendChild(number_cellText);
    row.appendChild(number_cell);
    //Add sea buttons
    for (let x = 0; x < characters.length; x++) {
        const cell = document.createElement("td");
        const cell_button = document.createElement("button");
        cell_button.textContent = sea[x][y];
        cell.appendChild(cell_button);
        row.appendChild(cell);
    }
    game_table_body.append(row);
}

game_table.appendChild(game_table_body);
game_div.appendChild(game_table)