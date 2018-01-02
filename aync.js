var i = 0;

function print() {
    console.log(i);
}

function plus(callback) {
    setTimeout(function() {
        i += 1;
        callback();
    }, 1000)
}

plus(print)
