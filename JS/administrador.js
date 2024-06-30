const crearTrabajo = infoTrabajo => {
    const $div = document.createElement('div');
    $div.className = 'trabajo';
    $div.innerHTML = 
`
    <h2>${infoTrabajo.producto}</h2>
    <p class="fechaCita">Este producto fue agendado el ${infoTrabajo.fechaCita}</p>
`;
    if(infoTrabajo.cancelado){
        $div.innerHTML += 
        `
            <p class="cancelacion">Esta cita fue cancelada</p>
            <p class="infoCancelacion">Motivo de la cancelación: ${infoTrabajo.motivoCancelacion}</p>
        `;
        return $div;
    }
    if(infoTrabajo.finalizado){
        $div.innerHTML += 
        `
            <p class="fechaFinalizacion">Este producto fue finalizado el ${infoTrabajo.fechaFinalizacion}</p>
            <img class="producto-finalizado" src="${infoTrabajo.img}" alt="${infoTrabajo.alt}">
        `;
        return $div;
    }
    $div.innerHTML += 
    `
        <p class="fechaFinalizacion">Este producto aún no se ha finalizado...</p>
    `;
    return $div;
};

document.addEventListener('DOMContentLoaded', () => {
    const tieneTrabajos = true;
    const $sectionTrabajos = document.getElementById('trabajos');
    if(!tieneTrabajos){
        $sectionTrabajos.innerHTML = `
            <div class="no-trabajos">
                <h2>
                    Por el momento no cuenta con trabajos para revisar.
                </h2>
            </div>
        `;
        return;
    }
    fetch('../JSON/citas.json')
    .then(response => response.json())
    .then(data => {
        Object.values(data).forEach(trabajos => {
            Object.values(trabajos).forEach(infoTrabajo => {
                $sectionTrabajos.appendChild(crearTrabajo(infoTrabajo));
            });
        });
    })
    .catch(error => console.error(`Ha ocurrido un error inesperado: ${error}`));
});