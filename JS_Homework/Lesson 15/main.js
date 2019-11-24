var table = document.getElementsByClassName('table')[0];
var btnAdd = document.getElementsByTagName('button')[0];

btnAdd.addEventListener('click', function () {
    var tableTrFirst = document.querySelector('.table tr:first-child');
    tableTrFirst.insertAdjacentHTML('beforebegin', '<tr><td></td><td></td><td></td></tr>')
});

table.addEventListener('click', function (event) {

    if (event.target.tagName === 'TD' && !event.target.hasAttribute('colspan')) {
        var input = document.createElement('input');
        input.value = event.target.innerHTML;
        event.target.innerHTML = '';

        input.onblur = function () {
            event.target.innerHTML = this.value;
        }

        input.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                this.onblur = null;
                event.target.innerHTML = this.value;
                this.remove();
            }
        })

        event.target.appendChild(input);
        input.focus();

    }

});


