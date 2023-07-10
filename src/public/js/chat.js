const socket = io()

let user
const chatBox = document.getElementById('chatBox')

swal.fire({
  title: 'Identificate',
  input: 'text',
  text: 'Ingresa el usuario para identificarte en el chat',
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre de usuario"
  },
  allowOutsideClick: false,
  allowEscapeKey: false
}).then(result => {
  user = result.value
  console.log(user)
  socket.emit('authenticated', user)
})

chatBox.addEventListener('keyup', evt => {
  if (evt.key === 'Enter') {
    if (chatBox.value.trim().length > 0) {
      socket.emit('newMessage', { user, message: chatBox.value })
      chatBox.value = ""
    }
  }
})


socket.on('messages', (data) => {
  let log = document.getElementById('messageLogs')
  log.innerHTML = ''

  data.forEach((message) => {
    let div = document.createElement('div')
    div.classList.add('mensajes')
    div.innerHTML = `
    ${message.user} dice: ${message.message}<br/>
    `

    log.appendChild(div)
  })
})


/* socket.on('messages', (data) => {
  let log = document.getElementById('messageLogs')
  let messages
  data.forEach((message) => {
    messages += `${message.user} dice: ${message.message}<br/>`
  })
  log.innerHTML = messages
}) */