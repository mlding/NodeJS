function clickIt(e) {
    window.alert('button is clicked')
}

var button = document.getElementById('#button')

button.addEventListener('click', clickIt)
