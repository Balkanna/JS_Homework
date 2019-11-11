//Задание 4-5

function Animal(name) {
    var foodAmount = 50;

    function formatFoodAmount() {
        return foodAmount + ' гр.';
    }

    this.dailyNorm = function(amount) {
        if (!arguments.length) return formatFoodAmount();

        if (amount < 50 || amount > 500) {
            return 'Недопустимое количество корма.';
        }

        foodAmount = amount;
    };

    this.name = name;
    var self = this;

    this.feed = function() {
        console.log( 'Насыпаем в миску ' + self.dailyNorm() + ' корма.' );
    };
}

function Cat() {
    Animal.apply(this, arguments);

    var animalFeed = this.feed;
    this.feed = function () {
        animalFeed();
        console.log( 'Кот доволен ^_^.' );
        return this;
    }

    this.stroke = function () {
        console.log( 'Гладим кота.' );
        return this;
    };
}

var barsik = new Cat( 'Barsik' );

console.log(barsik.name);
barsik.feed().stroke().feed().stroke();
barsik = null;




