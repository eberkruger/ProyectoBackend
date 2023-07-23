const form = document.getElementById('loginForm')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => (obj[key] = value))

  const response = await fetch('/api/sessions/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const responseData = await response.json()
  if (responseData.status == "success") {
    console.log("estas adentro")
    window.location.replace('/')
  }
  else {
    alert('Contraseña Incorrecta')
    console.log("estas afuera")
  }

})