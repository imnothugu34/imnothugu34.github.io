const crearCita = infoCita => {
    const $div = document.createElement('div');
    $div.className = "cita";
    const $botonEliminar = crearBotónEliminar(infoCita.cancelado, infoCita.finalizado);
    $div.appendChild($botonEliminar);
    $div.innerHTML += `
        <h2>${infoCita.producto}</h2>
        <p class="fechaCita">Este producto fue agendado el ${infoCita.fechaCita}</p>
    `;
    if(infoCita.cancelado){
        $div.innerHTML += 
        `
            <p class="cancelacion">Esta cita fue cancelada</p>
            <p class="infoCancelacion">Motivo de la cancelación: ${infoCita.motivoCancelacion}</p>
        `;
        return $div;
    }
    if(infoCita.finalizado){
        $div.innerHTML += 
        `
            <p class="fechaFinalizacion">Este producto fue finalizado el ${infoCita.fechaFinalizacion}</p>
            <img class="producto-finalizado" src="${infoCita.img}" alt="${infoCita.alt}">
        `;
        return $div;
    }
    $div.innerHTML += 
    `
        <p class="fechaFinalizacion">Este producto aún no se ha finalizado...</p>
    `;
    return $div;
};

const crearBotónEliminar = (cancelado, finalizado) => {
    const $botón = document.createElement('button');
    $botón.className = "no-select";
    $botón.innerHTML = 
`
    <span class="text">${cancelado || finalizado ? 'Eliminar de la lista' : 'Cancelar cita'}</span>
    <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
        </svg>
    </span>
`;
    $botón.addEventListener('click', () => {
        Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro de lo que haces?',
            text: `Recuerda que si ${cancelado || finalizado ? 'borras' : 'cancelas'} este elemento no podrás revertir la acción`,
            showCancelButton: true,
            confirmButtonText: 'Sí, sé lo que hago',
            cancelButtonText: 'No estoy seguro...'
        })
        .then(result => {
            if(result.isConfirmed && (finalizado || cancelado)){
                Swal.fire({
                    title: 'Elemento borrado',
                    text: 'Esta acción ya no se podrá revertir',
                    icon: 'success'
                });
            }else if(result.isConfirmed && finalizado){

            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: "Acción cancelada",
                    text: 'Tranquilo, tómate tu tiempo'
                });
            }
        });
    });
    return $botón;
};

document.addEventListener('DOMContentLoaded', () => {
    const tieneCitas = true;
    const $secciónCitas = document.getElementById('citas');
    if(!tieneCitas){
        $secciónCitas.innerHTML = `
            <div class="no-citas">
                <h2>
                    Por el momento no cuenta con una cita, <a href="../agendarCita.html">agende una cita aquí</a>. <br>
                    En caso de que sí haya agendado una cita y no aparezca <a href="">haga clic aquí</a>.
                </h2>
            </div>
        `;
        return;
    }
    fetch('../JSON/citas.json')
    .then(response => response.json())
    .then(data => {
        Object.values(data).forEach(citas => {
            Object.values(citas).forEach(infoCita => {
                $secciónCitas.appendChild(crearCita(infoCita));
            });
        });
    })
    .catch(error => console.error(`Ha ocurrido un error inesperado: ${error}`));
});