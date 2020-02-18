/*
Практические задания по ES6:
  Задание 7:
    Написать функцию, принимающую массив объектов вида:
      [
          {name: 'Vasya Pupkin', age: 25},
          {name: 'Ivan Petrov', age: 30},
          {name: 'Fedor Ivanov', age: 42}
      ]
    и возвращающую объект вида:
      {
          Пользователи младше 40: [
              {name: 'Vasya Pupkin', age: 25},
              {name: 'Ivan Petrov', age: 30}
          ],
          Пользователь с именем Федор: {name: 'Fedor Ivanov', age: 42}
      }
    Для свойства "Пользователь с именем Федор" осуществлять поиск объекта по имени, которое начинается с подстроки Fedor.
 */

{
    const arr =  [
        {name: 'Vasya Pupkin', age: 25},
        {name: 'Ivan Petrov', age: 30},
        {name: 'Fedor Ivanov', age: 42}
    ];

    function showArr(arr) {
        let newArr = arr.filter(e => e.age < 40);
        let nameFedor = arr.find(e => e.name.startsWith('Fedor'));

        return {
            'Пользователи младше 40': newArr,
            'Пользователь с именем Федор': nameFedor
        };
    }

    console.log(showArr(arr));
}

/*Задание 8:
  Написать функцию, принимающую массив имен пользователей и возвращающую массив объектов вида:
    [
        {Пользователь 1: 'Вася'},
        {Пользователь 2: 'Петя'}
    ]*/
{
    const arrNames = ['Tom', 'Jon', 'Bob'];

    function showArrObj(arrNames) {
        return arrNames.map((e, i) => ({[`Пользователь ${i + 1}`]: e}));
    }

    console.log(showArrObj(arrNames));
}

  /*Задание 9:
    Написать функцию, принимающую массив объектов и объединяющую их в один новый объект. Например:
      [
          {name: 'Vasya'},
          {name: 'Piotr', age: 25},
          {salary: '2000$'}
      ]
    необходимо преобразовать в
      {
          name: 'Piotr',
          age: 25,
          salary: '2000$'
      }
    Spread-оператор не использовать. Использовать перебирающий метод массивов. Старые объекты не должны преобразовываться.*/

{
    function integrateIntoObject(array) {
        return array.reduce((acc, currValue) => Object.assign(acc, currValue));

    }

    integrateIntoObject([
        {name: 'Vasya'},
        {name: 'Piotr', age: 25},
        {salary: '2000$'}
    ]);
}

  /*Задание 10:
    Переписать последнее задание с ООП на новый синтаксис. Проверить работоспособность всех методов.*/

{
    class Animal {

        constructor(name) {
            this.name = name;
            this._foodAmount = 50;
        }

        _formatFoodAmount() {
            return `${this._foodAmount} гр.`;
        }

        dailyNorm(amount) {
            if (!arguments.length) return this._formatFoodAmount();

            if (amount < 50 || amount > 500) {
                throw new Error ('Недопустимое количество корма.');
            }

            this._foodAmount = amount;
        }

        feed() {
            console.log(`Насыпаем в миску ${this.dailyNorm()} корма.`);
        }
    }

    class Cat extends Animal {

        feed() {
            super.feed();
            console.log('Кот доволен ^_^');
            return this;
        }

        stroke() {
            console.log('Гладим кота.');
            return this;
        }
    }


    let barsik = new Cat('Barsik');

    console.log(barsik.feed().stroke());

    barsik = null;
}

/*Задание 11:
    Написать функцию-промис, которая принимает в себя 2 числа и выводит в консоль целые числа, входящие в диапазон,
    каждую секунду. После окончания работы интервала в консоль должно вывестись последнее запомненное число.
 */

{
    function showInterval (num1, num2) {

        return new Promise((resolve, reject) => {
            console.log('Промис запущен');
            if (Math.ceil(num1) && Math.floor(num2)) {

                let a = Math.ceil(num1);
                let b = Math.floor(num2) ;
                let counter = setInterval(() => {

                    if (a === b) {
                        console.log(b);
                        clearInterval(counter);
                        resolve(a);

                    } else if (a > b) {
                        console.log (a);
                        a--;

                    }else {
                        console.log (a);
                        a++;
                    }
                }, 1000);

            } else {
                reject('Введите корректные данные');
            }
        });
    }

    showInterval(3, 7)
        .then(result => console.log(`Последнее запомненное число : ${result}`))
        .catch(error => console.log(error))
        .finally(() => console.log('Работа промиса завершена'));
}