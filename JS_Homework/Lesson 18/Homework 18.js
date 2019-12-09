/*Задание 1:
Написать регулярное выражение, которое будет тестировать на соответствие строки вида - name_surname-1234@gmail.com :
- имя и фамилия должны состоять только из англ. букв и быть длиной от 3 до 10 символов, между ними _ обязательно
- далее опциональная часть, начинающаяся с тире и состоящая из 4-х цифр
- затем обязательный знак @
- название почтового сервиса должно быть длиной от 2-х до 20-ти символов, может состоять из букв английского
алфавита и цифр, а также опционально может содержать внутри себя одно тире или одну точку
- обязательная часть .com
Хорошо протестировать регулярное выражение.*/

var emailValidation = /^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@([a-z\d]{1,10}(\.|-)?[a-z\d]{1,10})\.com$/;
console.log(emailValidation.test('name_surname@gmail.com')); //true
console.log(emailValidation.test('name_surname-1234@gmail.com')); //true
console.log(emailValidation.test('name_surname-5678@gmail.com')); //true
console.log(emailValidation.test('name_surname-1@gmail.com')); //false
console.log(emailValidation.test('name_surname-1234@g-m.ail.com')); //false
console.log(emailValidation.test('name_surname-1234@gmail.co')); //false
console.log(emailValidation.test('name_surname-1234@g.m-ail.com')); //false


/*Задание 2:
Написать функцию, которая с помощью регулярного выражения будет тестировать на соответствие строки вида:
+375-25-777-77-77
375299999999
8-044-444-44-44
8033-6666666
и возвращать boolean.*/

function isPhoneNumber(phoneNumber) {

    return /^(\+?375|8-?0)-?(25|29|33|44|17)\-?[1-9]\d{2}(\-?\d{2}){2}$/.test(phoneNumber);
}

console.log(isPhoneNumber("+375-25-777-77-77")); // true
console.log(isPhoneNumber("375299999999")); // true
console.log(isPhoneNumber("8-044-444-44-44")); // true
console.log(isPhoneNumber("8033-6666666")); // true
console.log(isPhoneNumber("+375-25-077-77-77")); // false
console.log(isPhoneNumber("8033-666666")); // false
console.log(isPhoneNumber("+8-044-444-44-44")); // false
console.log(isPhoneNumber("8044444444")); // false

/*Задание 3:
Переписать решение задачи с поиском гласных с использованием регулярного выражения. Протестировать ситуацию, когда
    гласных в переданном тексте будет 0. По возможности придумать несколько вариантов решения.

    function countVowelLetters(text) {
        text = text.toLowerCase().split('');

        var vowelLetters = ['а', 'я', 'ы', 'и', 'о', 'ё', 'у', 'ю', 'э', 'е', 'a', 'e', 'i', 'o', 'u', 'y'],
            counter = 0;

        text.forEach(function(letter) {
            vowelLetters.indexOf(letter) !== -1 && counter++;
        });

        return counter;
    }

    countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12*/

function countVowelLetters(text) {
    var value = text.match(/[ауоыиэяюёеaeiouy]/igm);
    return (value === null) ? 0 : value.length;
}
console.log(countVowelLetters('Шла Саша по шоссе И сосала сУшку')); // 12
console.log(countVowelLetters('HTML')); // 0



