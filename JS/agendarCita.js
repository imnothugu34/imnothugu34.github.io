const modificarValorCheckboxesMétodoPago = checkboxesMétodoPago => {
    checkboxesMétodoPago.map($checkboxMétodoPago => {
        $checkboxMétodoPago.addEventListener('click', element => {
            checkboxesMétodoPago.map($otroCheckboxMétodoPago => {
                if($otroCheckboxMétodoPago !== element.target){
                    $otroCheckboxMétodoPago.checked = false;
                }
            });
        });
    });
};

// const díasMínimosParaCita = 7;

// const validarSiUnCheckboxMétodoPagoEstáActivado = checkboxesMétodoPago => checkboxesMétodoPago
// .some($checkboxMétodoPago => $checkboxMétodoPago.checked);

// const validarSiTodosLosRequiredCumplenRequisitos = requiredElements => requiredElements
// .every(requiredElement => {
//     if(requiredElement.type === "date"){
//         return diferenciaDeDiasEnFechas(new Date(requiredElement.value), new Date()) >= 7;
//     }
// });

// const diferenciaDeDiasEnFechas = (fechaCita, fechaActual) => {
//     const diferenciaEnMilisegundos = fechaCita.getTime() + 1000 * 60 * 60 * 24 - fechaActual.getTime();
//     const milisegundosEnUnDia = 1000 * 60 * 60 * 24;
//     const diferenciaEnDias = Math.round(diferenciaEnMilisegundos / milisegundosEnUnDia);
//     return diferenciaEnDias;
// }

// const formatearFecha = (año, mes, día) => `${año}-${mes}-${día}`;

document.addEventListener('DOMContentLoaded', () => {
    const $botónSubmit = document.getElementById('submit');
    const $form = document.querySelector('form');
    const $selectProductos = $form.querySelector('select[name="producto"]');

    $selectProductos.addEventListener('change', () => {
        const divValue = $selectProductos.value;
        const $sectionDivs = $selectProductos.parentElement.nextElementSibling;
        const divAMostrar = $sectionDivs.querySelector(`div.${divValue}`);
        const todosLosDivs = Array.from($sectionDivs.querySelectorAll('div'));
        todosLosDivs.map($div => {
            if($div !== divAMostrar) {
                $div.classList.add('hidden');
            } else {
                $div.classList.remove('hidden');
            }
        });
    });

    $form.addEventListener('input', () => {
        const checkboxesMétodoPago = Array.from($form.querySelectorAll('fieldset.metodo-pago input[type="checkbox"]'));
        // const requiredElements = Array.from($form.querySelectorAll('[required]'));
        modificarValorCheckboxesMétodoPago(checkboxesMétodoPago);
        // const anyCheckboxMatched = validarSiUnCheckboxMétodoPagoEstáActivado(checkboxesMétodoPago);
        // $botónSubmit.disabled = !(validarSiTodosLosRequiredCumplenRequisitos(requiredElements) && anyCheckboxMatched);
    });

    $botónSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'question',
            title: '¿Estás seguro de enviar la información?',
            text: 'Tómate tu tiempo antes de enviar la información, hombre precavido vale por 2',
            showCancelButton: true,
            confirmButtonText: "Enviar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33"
        })
        .then(result => {
            if(result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Información recibida',
                    text: 'La información se ha registrado con éxito'
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Acción cancelada',
                    text: 'Tome su tiempo antes de enviar la información'
                });
            }
        });
    });
});