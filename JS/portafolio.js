const crearElemento = información => {
    const $div = document.createElement('div');
    $div.innerHTML = `
    <img src="${información.img}">
    <div class="caption">
        <h4>
            ${información.nombre}
            <small>Colección</small>
            ${información.colección}
        </h4>
    </div>
`;
    return $div;
};

document.addEventListener('DOMContentLoaded' , () => {
    const $portafolio = document.getElementById('portafolio');
    fetch('../JSON/portafolio.json')
    .then(response => response.json())
    .then(data => {
        Object.values(data).map(elemento => {
            Object.values(elemento).map(información => {
                $portafolio.appendChild(crearElemento(información));
            });
        });
    })
    .catch(error => console.log(`Error inesperado: ${error}`));
});