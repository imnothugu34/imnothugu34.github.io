const $form = document.querySelector('form');
const $botónEnvío = document.getElementById('enviar');

$form.addEventListener('input', () => {
    const todoLleno = Array.from($form.querySelectorAll('[required]'))
    .every(input => input.value !== '' && input.value !== 'on' || input.checked);
    $botónEnvío.disabled = !todoLleno;
});

$botónEnvío.addEventListener('click', (e) => {
    e.preventDefault();
    const contraseña = document.querySelector('input[name="contraseña"]').value;
    const confirmarContraseña = document.querySelector('input[name="confirmarContraseña"]').value;
    if(contraseña.length < 8 || confirmarContraseña.length < 8){
        Swal.fire({
            icon: 'error',
            text: 'La contraseña tiene menos de 8 caracteres',
            title: 'Longitud inválida'
        });
        return;
    }

    if(contraseña !== confirmarContraseña){
        Swal.fire({
            icon: 'error',
            text: 'Las contraseñas no coinciden',
            title: 'Contraseñas distintas'
        });
        return;
    }
});