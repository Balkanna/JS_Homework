var inputX = document.getElementById('input_x');
var inputY = document.getElementById('input_y');
var btn = document.getElementsByClassName('btn-submit')[0];

inputX.addEventListener('keyup', handleKeyup);
inputY.addEventListener('keyup', handleKeyup);
btn.addEventListener('click', handleClick);

function handleKeyup(e) {
    var x = inputX.value;
    var y = inputY.value;

    if (x !== "" && y !== "") {
        btn.removeAttribute("disabled");
    } else {
        btn.setAttribute("disabled", null);
    }
}

function handleClick(e) {
    var x = inputX.value;
    var y = inputY.value;

    if (isNaN(x)) {
        return;
    }

    if (isNaN(y)) {
        return;
    }

}

btn.addEventListener('click', function (event) {
    var x = +inputX.value;
    var y = +inputY.value;

    drawField(x, y)
})

function drawField(x, y) {
    if (x < 1 || x > 10 || x % 1 !== 0) {
        alert('Value is invalid. Please type an integer value from 1 to 10.')
        return;
    }

    if (y < 1 || y > 10 || y % 1 !== 0) {
        alert('Value is invalid. Please type an integer value from 1 to 10.')
        return;
    }

    var oldField = document.getElementsByClassName('field')[0];
    if (oldField) {
        oldField.remove()
    };

    var field = document.createElement("div");
    field.classList.add("field");
    field.addEventListener('click', function (event) {
        var cells = document.querySelectorAll('.field__cell');
        cells.forEach(function (element) {
            element.classList.toggle('black')
        })
    })

    for (var fieldRow = 1; fieldRow <= y; fieldRow++) {
        var row = document.createElement("div");
        row.classList.add("field__row");

        for (var fieldCell = 1; fieldCell <= x; fieldCell++) {
            var cell = document.createElement("div");
            cell.classList.add("field__cell");
            if ((fieldRow + fieldCell) % 2 !== 0) {
                cell.classList.add("black");
            }
            row.appendChild(cell);
        }

        field.appendChild(row);
    }

    document.body.appendChild(field);
}
