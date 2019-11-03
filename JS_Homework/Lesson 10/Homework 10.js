/*Задание 1:

function filterNumbersArr(numbers) {
    var newArr = [];

    for (var i = 0; i < numbers.length; i++) {
        var el = numbers[i];

        if (el > 0) {
            newArr[newArr.length] = el;
        }
    }

    return newArr;
}

filterNumbersArr([-1, 0, 2, 34, -2]);*/

var arr = [-1, 0, 2, 34, -2];

var myArr = arr.filter(function(amount) {
    return amount > 0;
});

console.log(myArr);

/*Задание 2:
Написать функцию, принимающую массив чисел и возвращающую первое найденное положительное число.*/

var array = [-2, -44, 5, 6, -7];

var foundPositive = array.find(function(el) {
    return el > 0;
});

console.log(foundPositive); //5


/*Задание 3:
Написать функцию, которая будет определять, является ли переданное в нее слово палиндромом (напр. шалаш).
Регистр в словах учитываться не должен. Тестировать функцию можно только на одиночных словах (без фраз).

Функция должна работать следущим образом:
isPalindrome('шалаШ'); // true
isPalindrome('привет'); // false*/

function isPalindrome(item) {
    item = item.toLowerCase(item);
    return item ===  item.split('').reverse().join('');
};

console.log(isPalindrome('шалаШ')); //true
console.log(isPalindrome('привет')); //false


/*Задание 4:
Написать функцию, которая будет определять, являются ли переданные в нее слова анаграммами (напр. кот и отк).
Регистр в словах учитываться не должен.*/

function areAnagrams(el1, el2) {
    el1 = el1.toLowerCase();
    el2 = el2.toLowerCase();

    el1 = el1.split('').sort().join('');
    el2 = el2.split('').sort().join('');

    return el1 === el2;
}

console.log(areAnagrams('кот', 'отк')); //true
console.log(areAnagrams('кот', 'атк')); //false
console.log(areAnagrams('кот', 'отко')); //false


/*Задание 5:
Написать функцию, которая будет разбивать массив на подмассивы определенной длины.
Функция должна работать следущим образом:
divideArr([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]*/

function divideArr(array, amount) {
    var i = 0;
    var tempArr = [];

    for (i = 0; i < array.length; i += amount) {
        myArr = array.slice(i, i + amount);
        tempArr.push(myArr);
    }
    return tempArr;
}

console.log(divideArr([1, 2, 3, 4], 2)); // [[1, 2], [3, 4]]
console.log(divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3)); //[[1, 2, 3], [4, 5, 6], [7, 8]]


