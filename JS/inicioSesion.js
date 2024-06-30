document.addEventListener('DOMContentLoaded', () => {
    const $form = document.querySelector('form');
    const longitudMínimaContraseña = 8;
    const $botónEnviar = document.getElementById('enviar');
    $form.addEventListener('input', () => {
        const requiredElements = Array.from($form.querySelectorAll('[required]'));
        const todoVálido = requiredElements.every(requiredElement => {
            if(requiredElement.type === "text"){
                return requiredElement.value != '';
            }
            return requiredElement.value.length >= longitudMínimaContraseña;
        });
        $botónEnviar.disabled = !todoVálido;
    });
});