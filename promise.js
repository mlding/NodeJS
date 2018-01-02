function taskA() {
    console.log("Task A");
    return Promise.resolve('resolve A')
}
function taskB(info) {
    console.log("Task B ", info);
}
function onRejected(error) {
    console.log("Catch Error: ", error);
}
function finalTask() {
    console.log("Final Task");
    // Promise.reject("throw Error Final task")
}

//promise chain中，由于在 onRejected 和 finalTask 后面没有 catch 处理了，因此在这两个Task中如果出现异常的话将不会被捕获，这点需要注意一下
//promiseB 进入onRejected callback后，依旧会执行Task A, 并不会被 onRejected catch住
//taskA 发生error，不会执行taskB，会直接到 onRejected -> finalTask

var promiseB = new Promise((resolve, reject) => reject(new Error('BBBB error msg')))
var promiseC = new Promise((resolve, reject) =>reject(new Error('CCCC error msg')))
promiseB
.then(success => console.log('onfulfilled ', success), err => console.log('promiseB error ', err))
.then(() => taskA().then(res => res))
.then(res => taskB(res))
.then(() => {
    promiseC.then(res => {
        console.log('promiseC response ', res)
    })
    .catch(err => {
        console.log('promiseC error ', err)
    })
})
.catch(onRejected)
.then(finalTask);

//output: 
//onRejected Error: error msg
//Task A 
//Catch Error: Error: throw Error Task A ---并没有执行task B
//Final Task
//(node:83039) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): Error: throw Error Final task
//(node:83039) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
