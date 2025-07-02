// Lista de productos topográficos
const productos = [
  {
    id: 1,
    nombre: "Estación Total Leica TS03",
    precio: 75000,
    img: "https://www.topoequipos.com.pe/imagenes-productos/Leica_TS03.jpg"
  },
  {
    id: 2,
    nombre: "Nivel Automático Topcon AT-B4A",
    precio: 5200,
    img: "https://topconpositioning.com/sites/default/files/styles/media_crop/public/product-images/at-b-series_0.png"
  },
  {
    id: 3,
    nombre: "Receptor GNSS Trimble R12",
    precio: 180000,
    img: "https://surveyinggroup.com/wp-content/uploads/2022/02/trimble-r12i.png"
  },
  {
    id: 4,
    nombre: "Trípode de Aluminio Pesado",
    precio: 1500,
    img: "https://www.ada-instruments.com/uploads/images/products/large/ada-heavy-duty-tripod.jpg"
  },
  {
    id: 5,
    nombre: "Cinta métrica Fibra de vidrio 30m",
    precio: 450,
    img: "https://www.simetric.com.mx/imagenesproductos/cinta_fibra_30m.jpg"
  }
];

let carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("listaCarrito");
const total = document.getElementById("total");
const contador = document.getElementById("contador");
const carritoPanel = document.getElementById("carrito");
const toggleCarrito = document.getElementById("toggleCarrito");
const inputBuscador = document.getElementById("buscador");

// Mostrar productos al cargar
mostrarProductos();

// Evento para mostrar u ocultar carrito
toggleCarrito.onclick = () => {
  carritoPanel.style.display = carritoPanel.style.display === "block" ? "none" : "block";
};

// Búsqueda en tiempo real
inputBuscador.addEventListener("input", () => {
  const termino = inputBuscador.value.toLowerCase().trim();
  filtrarProductos(termino);
});

function mostrarProductos() {
  contenedorProductos.innerHTML = "";
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio.toLocaleString()} MXN</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

function filtrarProductos(termino) {
  contenedorProductos.innerHTML = "";
  const resultados = productos.filter(p => p.nombre.toLowerCase().includes(termino));

  if (resultados.length === 0) {
    contenedorProductos.innerHTML = `<p style="grid-column: 1 / -1; color: #FFD700;">No se encontraron productos.</p>`;
  } else {
    resultados.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <img src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio.toLocaleString()} MXN</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      `;
      contenedorProductos.appendChild(div);
    });
  }
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let totalCompra = 0;

  carrito.forEach((item, index) => {
    totalCompra += item.precio;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio.toLocaleString()} MXN
      <button onclick="eliminarProducto(${index})" style="margin-left: 10px; background:#ff4d4d; color:white;">Eliminar</button>
    `;
    listaCarrito.appendChild(li);
  });

  total.textContent = totalCompra.toLocaleString();
  contador.textContent = carrito.length;
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function pagarAhora() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const confirmacion = confirm("¿Deseas proceder al pago?");
  if (confirmacion) {
    alert("¡Gracias por tu compra! Recibirás un correo de confirmación.");
    vaciarCarrito();
  }
}
