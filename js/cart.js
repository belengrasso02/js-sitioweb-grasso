
let carritoConProductos = JSON.parse(localStorage.getItem("carritoConProductos"));
const contenedorProductos = document.getElementById("contenedorProductos");





function cargarProductosCarrito (){
    if(carritoConProductos){

        
        carritoConProductos.forEach(productos => {
            const div = document.createElement("div");
            div.classList.add("productoEnCarrito");
            div.innerHTML = `
                <div class="imagenProductoEnCarrito">
                    <img src="${productos.img}" alt="">
                </div>
                    <h2 class="tituloProductoEnCarrito">${productos.nombre}</h2>
                    <button class="aumentarCantidad"> Cantidad: <br>${productos.cantidad}</button>
                    <p class="totalProductoEnCarrito"> Subtotal <br> $ ${productos.precio * productos.cantidad} </p>
                    <button class="botonEliminar" data-id="${productos.id}"> <img src="./assets/basura.png" alt="Tacho de Basura"></button>
            `;
            contenedorProductos.append(div);
        });
    };


    
};

function actualizarTotalAAbonar(){
    const totalAPagar = document.getElementById("total");

    const total = carritoConProductos.reduce ((acumulador, productos) => acumulador + productos.precio * productos.cantidad, 0);
    totalAPagar.innerText= `
        Total : $ ${total} 
    `;
};
actualizarTotalAAbonar();


cargarProductosCarrito();


let eliminarProducto = (event) => {

    let idDelProducto = parseInt(event.target.getAttribute("data-id"));


    if (isNaN(idDelProducto)) {
        console.log("ID no válido:", event.target.getAttribute("data-id"));
        return;  
    }

    console.log("ID del producto a eliminar:", idDelProducto); 

    let encontrarid = carritoConProductos.find(producto => producto.id === idDelProducto);
    if (encontrarid) {
        carritoConProductos = carritoConProductos.filter(producto => producto.id !== idDelProducto);
        console.log("Producto eliminado:", encontrarid);
    } else {
        console.log("Producto no encontrado con id:", idDelProducto);
    }

};


let botonesEliminar = document.querySelectorAll(".botonEliminar");  
botonesEliminar.forEach(boton => {
    boton.addEventListener("click", eliminarProducto);
});

