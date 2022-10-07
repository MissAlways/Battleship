const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const ships = [5, 4, 3, 3, 2, 1];

let player_attack_sea = create_empty_sea();
let enemy_ship_sea = create_empty_sea();

let is_marking = false
let times_attacked = 0;

function create_empty_sea() {
    let empty_sea = new Array(10);
    for (let i = 0; i < characters.length; i++) {
        empty_sea[i] = new Array(10);
    }
    return empty_sea;
}

for (let x = 0; x < characters.length; x++) {
    for (let y = 0; y < numbers.length; y++) {
        player_attack_sea[x][y] = characters[x] + numbers[y];
    }
}

for (let x = 0; x < characters.length; x++) {
    for (let y = 0; y < numbers.length; y++) {
        enemy_ship_sea[x][y] = "empty";
    }
}
put_enemy_ships_to_sea();

//Put enemy ships to positions
//Todo randomization
function put_enemy_ships_to_sea() {
    let success = use_cells(0, 0, 5, true, enemy_ship_sea);
    if (success !== false) {
        enemy_ship_sea = success;
    }
    success = use_cells(0, 4, 4, false, enemy_ship_sea);
    if (success !== false) {
        enemy_ship_sea = success;
    }
    success = use_cells(4, 6, 3, true, enemy_ship_sea);
    if (success !== false) {
        enemy_ship_sea = success;
    }
    success = use_cells(7, 4, 3, true, enemy_ship_sea);
    if (success !== false) {
        enemy_ship_sea = success;
    }
    success = use_cells(4, 4, 2, true, enemy_ship_sea);
    if (success !== false) {
        enemy_ship_sea = success;
    }
    success = use_cells(9, 0, 1, true, enemy_ship_sea);
    if (success !== false) {
        enemy_ship_sea = success;
    }
}
// starting coordinates, length of ship and is it horizontally
function use_cells(x, y, l, is_horizontally, list) {
    let is_placable = true
    x = parseInt(x);
    y = parseInt(y);
    if (is_horizontally) {
        for (let i = x; i < x + l; i++) {
            if (list[i][y] !== "empty") {
                is_placable = false;
                console.log("failed to place");
                return false
            }
        }
        if (is_placable) {
            for (let i = x; i < x + l; i++) {
                list[i][y] = "RESERVED"
            }
        }
    } else {
        for (let i = y; i < y + l; i++) {
            if (list[x][i] !== "empty") {
                is_placable = false;
                console.log("failed to place");
                return false;
            }
        }
        if (is_placable) {
            for (let i = y; i < y + l; i++) {
                list[x][i] = "RESERVED";
            }
        }

    }

    return list;
}

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
        cell_button.textContent = player_attack_sea[x][y];
        cell_button.style.backgroundColor = "#8bade1" // light blue
        cell_button.addEventListener('click', () => {
            on_cell_button_click(x, y, cell_button);
        });
        cell.appendChild(cell_button);
        row.appendChild(cell);
    }
    game_table_body.append(row);
}

game_table.appendChild(game_table_body);
game_div.appendChild(game_table);

function on_cell_button_click(x, y, btn) {
    if (is_marking) {
        btn.style.backgroundColor = "#57423f"; //brown
        return;
    }
    times_attacked++;
    if (enemy_ship_sea[x][y] === "RESERVED") {
        btn.style.backgroundColor = "#d13035"; //red
        btn.textContent = "";
        enemy_ship_sea[x][y] = "BROKEN";
        if (is_won()) {
            document.getElementById("game_won1").textContent = "Congratulations!";
            document.getElementById("game_won2").textContent = "Needed " + times_attacked + " to win game!";
            game_div.remove(game_table);
        }
    }
    else {
        btn.style.backgroundColor = "#647899"; //dark blue
        btn.textContent = "";
    }
    btn.disabled = true;
}

function is_won() {
    for (let x = 0; x < characters.length; x++) {
        for (let y = 0; y < numbers.length; y++) {
            if (enemy_ship_sea[x][y] === "RESERVED") {
                return false;
            }
        }
    }
    return true;
}

const toggle_marks_button = document.getElementById('toggle_marks_button');

toggle_marks_button.addEventListener('click', () => {
    is_marking = !is_marking
    if (is_marking) {
        toggle_marks_button.textContent = "Attack mode";
    }
    else {
        toggle_marks_button.textContent = "Own Marks mode";
    }
})

const color_description = document.getElementById('color_description');

const red_color_button = document.createElement("button");
red_color_button.textContent = "Ship was hit";
red_color_button.style.backgroundColor = "#d13035"

const sea_color_button = document.createElement("button");
sea_color_button.textContent = "Sea where might be enemy ships";
sea_color_button.style.backgroundColor = "#8bade1"

const dark_sea_color_button = document.createElement("button");
dark_sea_color_button.textContent = "Sea where is no enemy ships";
dark_sea_color_button.style.backgroundColor = "#647899"

const own_mark_color_button = document.createElement("button");
own_mark_color_button.textContent = "Own marks";
own_mark_color_button.style.backgroundColor = "#57423f"
own_mark_color_button.style.color = "white"


color_description.appendChild(red_color_button);
color_description.appendChild(sea_color_button);
color_description.appendChild(dark_sea_color_button);
color_description.appendChild(own_mark_color_button);
