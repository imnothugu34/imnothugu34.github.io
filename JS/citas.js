document.addEventListener('DOMContentLoaded', () => {
    const tieneCitas = false;
    const $secciónCitas = document.getElementById('citas');
    if(!tieneCitas){
        $secciónCitas.innerHTML = `
            <h2>
                Por el momento no cuenta con una cita, <a href="../agendarCita.html">agende una cita aquí</a>. <br>
                En caso de que sí haya agendado una cita y no aparezca <a href="">haga clic aquí</a>.
            </h2>
        `;
        return;
    }

});