var socket = io.connect("http://localhost:4000")

//Query DOM
var handle = document.getElementById('handle')
var message = document.getElementById('message')
var btn = document.getElementById('send')
var output = document.getElementById('output')
var feedback = document.getElementById('feedback')


// Emit Events
btn.addEventListener("click", () => {
    socket.emit('chat-message', {
        message: message.value,
        handle: handle.value
    })
})

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value)
})


//Listen Events
socket.on('chat', data => {
    feedback.innerHTML = ""
    handle.value = ""
    message.value = ""
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
})

socket.on('typing', data => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message... </em></p>'
})