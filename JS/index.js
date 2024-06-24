document.addEventListener('DOMContentLoaded', () => {
    const valoresNuméricos = [35, 7, 12, 487];
    const $informaciónNúmeros = document.querySelectorAll('section.nuestros-numeros p.numero');
    for(let i = 0; i < $informaciónNúmeros.length; i++){
        $informaciónNúmeros[i].textContent = `${valoresNuméricos[i]}`;
    }
});