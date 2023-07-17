const socket = io()

const getProducts = document.querySelector('#mostrarProductos')
const getError = document.querySelector('.errorForm')

socket.on('products', docs => {

  let html = ''

  if(Array.isArray(docs)) {

    docs.forEach((item) => {
      html += `
      <div id="cart">
        <p><span class="keyDer"> ID: </span> ${item._id}</p>
        <p><span class="keyDer"> TITULO: </span> ${item.title}</p>
        <p><span class="keyDer"> DESCRIPCION: </span> ${item.description}</p>
        <p><span class="keyDer"> PRECIO: </span> $${item.price}</p>
        <p><span class="keyDer"> THUMBNAIL: </span> ${item.thumbnail} </p>
        <p><span class="keyDer"> CODIGO: </span> ${item.code}  </p>
        <p><span class="keyDer"> STOCK: </span> ${item.stock}</p>
        <p><span class="keyDer"> CATEGORIA: </span> ${item.category}</p>
        <p><span class="keyDer"> STATUS: </span> ${item.status} </p>
        <button class="buttonEliminar" id="${item._id}">Eliminar</button>        
      </div>
      `
    })
  
    getProducts.innerHTML = html
  
    const botonEliminar = document.querySelectorAll('#mostrarProductos button')
  
    botonEliminar.forEach(element => {
      element.onclick = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        socket.emit('deleteProduct', e.target.id)
      }
    })
  }
})


const valorInput = document.querySelector('#formulario')
valorInput.addEventListener('submit', (e) => {

  e.preventDefault()
  const product = Object.fromEntries(new FormData(e.target))

  for (const key in product) {
    if (Object.hasOwnProperty.call(product, key)) {
      product[key] = product[key].toLowerCase()
    }
  }
  
  socket.emit('newProduct', product)
  valorInput.reset()
})

socket.on('dataEvent', docs => {
  Swal.fire(
    docs
  )
})