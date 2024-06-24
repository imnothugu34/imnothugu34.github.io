const crearProducto = información => {
    const $div = document.createElement('div');
    $div.innerHTML = 
`
    <img src="${información.img}" alt="${información.alt}">
    <h2 class="nombre-producto">${información.nombre}</h2>
    <p class="descripcion-producto">Haz click aquí para ver más información</p>
`;
    $div.addEventListener('click', () => {
        Swal.fire({
            html: 
            `
<h1>${información.nombre}
<img src="${información.img}" alt="${información.alt}">
<p>${información.descripción}</p>
            `,
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
                `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
                `
            }
        })
    });
    return $div;
};

document.addEventListener('DOMContentLoaded', () => {
    const $productos = document.getElementById('productos');
    fetch('../JSON/productos.json')
    .then(response => response.json())
    .then(data => {
        Object.values(data).map(producto => {
            Object.values(producto).map(información => {
                $productos.appendChild(crearProducto(información));
            });
        });
    })
    .catch(error => console.log(`Error inesperado: ${error}`));
});