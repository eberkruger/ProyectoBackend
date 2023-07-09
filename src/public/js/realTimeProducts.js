const socket = io()

const getProducts = document.querySelector('#mostrarProductos')
const getError = document.querySelector('.errorForm')

socket.on('products', data => {

  const html = ``

  data.forEach(item => {
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
      <button id="${item._id}">Eliminar</button>        
    </div>
    `
  })

  getProducts.innerHTML = html

  const botonEliminar = document.querySelectorAll('#mostrarProductos button')

  botonEliminar.forEach(element => {
    element.onclick = (e) => {
      e.prevenDefault()
      socket.emit('deleteProduct', e.target.value)
    }
  })
})

const valorInput = document.querySelector('#formulario')

valorInput.addEventListener('submit', (e) => {
  e.preventDefault()

  const title = e.target.title.value
  const description = e.target.description.value
  const price = e.target.price.value
  const thumbnail = e.target.thumbnail.value
  const code = e.target.code.value
  const stock = e.target.stock.value
  const category = e.target.category.value
  const status = e.target.status.value

  if (title && description && price && thumbnail && code && stock && category && status) {

    const productForm = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status
    }
    console.log(productForm)

    socket.emit('newProduct', productForm)

    getError.style.display = 'none'
  }
  else {
    if (!title) {
      throw new Error(`Falta el title del producto.`);
    } else if (!description) {
      throw new Error(`Falta la descripcion del producto.`);
    } else if (!price) {
      throw new Error(`Falta el precio del producto.`);
    } else if (!stock) {
      throw new Error(`Falta el stock del producto.`);
    } else if (!category) {
      throw new Error(`Falta la categoria del producto.`)
    }
    getError.style.display = 'block'
  }
})

socket.on('dataEvent', data => {
  Swal.fire(
    data
  )
})