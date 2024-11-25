let productos = [
    {
    id: 1,
    nombre: "Acido Glicolico",
    img: "./assets/acidoglicolico.jpg",
    precio: 10000,
    cantidad: 1,
    },
    {
    id: 2,
    nombre: "Acido Hialuronico",
    img: "./assets/acidohialuronico.jpg",
    precio: 8900,
    cantidad: 1,
    },
    {
    id: 3,
    nombre: "Acido Salicilico",
    img: "./assets/acidosalicilico.jpg",
    precio: 12000,
    cantidad: 1,
    },
];

const contenedorAcidos = document.getElementById("contenedorAcidos");
const numeroDelCarrito = document.getElementById("numeroDeCarrito");




export const renderizacionDeProductos = ()=>{


    productos.forEach((producto)=>{
        const divDeProducto = document.createElement("div");
        divDeProducto.classList.add("producto");
        divDeProducto.setAttribute("data-id", producto.id);

        divDeProducto.innerHTML = `
                <h2 class="tituloProducto">${producto.nombre}</h2>
                    <div class="imagenProducto">
                        <img src="${producto.img}" alt="${producto.nombre}">
                    </div>
                <button class="botonComprar" data-id="${producto.id}">Comprar</button>
                <p class="precioProducto"> $ ${producto.precio}</p>
        `;
        contenedorAcidos.append(divDeProducto);


        const botonComprar = divDeProducto.querySelector(".botonComprar");
        botonComprar.addEventListener("click", agregarAlCarrito);
    });
    
};




let carrito;
const carritoConProductosLS = JSON.parse(localStorage.getItem("carritoConProductos"));

if(carritoConProductosLS){
    carrito = carritoConProductosLS;
    actualizarNumeroDelCarrito ()
}else{
    carrito = [];
};





function agregarAlCarrito (evento){
    const id = parseInt(evento.currentTarget.getAttribute("data-id"));
    const productoAgregado= productos.find(producto => producto.id === id);

    if(carrito.some(producto => producto.id === id)){
        const index= carrito.findIndex(producto => producto.id ===id);
        carrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
    }
    actualizarNumeroDelCarrito ()

    localStorage.setItem("carritoConProductos", JSON.stringify(carrito));
};

function actualizarNumeroDelCarrito (){
    let numeroActualizado = carrito.reduce ((acumulador , producto) => acumulador + producto.cantidad, 0);
    numeroDelCarrito.innerText = numeroActualizado;
};


renderizacionDeProductos();







