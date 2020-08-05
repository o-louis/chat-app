const socket = io('http://localhost:3000');

const messageInput = document.querySelector('#message');
const messageForm = document.querySelector('#send-container');
const messageContainer = document.querySelector('#message-container');

const name = prompt("what is your name?");
appendMessage("you joined");

// SOCKET MESSAGE
socket.emit("new-user", name);

socket.on('user-connected', name => {
    appendMessage(`${name} joined`);
});

socket.on('chat-message', data => {
    appendMessage(`${data.user}: ${data.message}`);
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
});

// EVENT
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`)
    socket.emit("send-chat-message", message);
    messageInput.value = '';
})

function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}