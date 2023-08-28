const form = document.getElementById('registerForm')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => (obj[key] = value))

  const jsonData = JSON.stringify(obj)

  const response = await fetch('/api/sessions/register', {
    method: 'POST',
    body: jsonData,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const responseData = await response.json()
  console.log(responseData)

  if (responseData.status == 'success') {
    window.location.replace('/login')
  } else {
    alert('Usuario ya registrado')
  }

  form.reset()
})