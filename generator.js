function* ticketGenerator() {
    console.log(0)
    yield 1;
    yield 2;
    yield 3;
    //yield,return有些像，都能返回紧跟语句后面的表达式的值，
    //区别是每次遇到yield,函数是暂停执行，下一次再从该位置继续向后执行
    //而return不具备位置记忆功能，只能执行一次，所以一个函数只能返回一个值
    return 4; //yield 4; {value: 4, done: false}
}

const takeANumber = ticketGenerator();

console.log(takeANumber.next())

// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: 4, done: true }
