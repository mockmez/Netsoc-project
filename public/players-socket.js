const socket = io()
socket.emit('chat message', "This is a test message")
console.log('frontend')