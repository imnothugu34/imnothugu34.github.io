document.addEventListener('DOMContentLoaded', () => {
    const $header = document.querySelector('header');
    const $nav = document.createElement('nav');

    const IconSocialMedia = (redSocial) => {
        const $div = document.createElement('div');
        $div.classList.add('icon-social-media');
        $div.innerHTML = `
            <span>${redSocial.nombreIcono}</span>
            <span>
                <i class="${redSocial.claseIcono}" aria-hidden="true"></i>
            </span>
        `;
        $div.addEventListener('click', () => {
            window.open(redSocial.redirección, '_blank');
        })
        return $div;
    };

    const Anchor = (enlace, texto) => {
        const $a = document.createElement('a');
        $a.href = enlace;
        $a.textContent = texto;
        return $a;
    }

    // const isLogIn = true;
    // const isAdministrator = true;

    const $redesSociales = document.createElement('section');
    $redesSociales.classList.add('redes-sociales');

    fetch('../../JSON/Header/redesSociales.json')
    .then(response => response.json())
    .then(redesSociales => {
        Object.values(redesSociales).map(redSocial => {
            $redesSociales.appendChild(IconSocialMedia(redSocial));
        });
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Algo inesperado ha ocurrido...',
            text: `Error ocurrido: ${error}`
        })
    });

    const $menu = document.createElement('section');
    $menu.classList.add('menu');

    const $nombreEmpresa = document.createElement('div');
    $nombreEmpresa.className = 'nombre-empresa';
    $nombreEmpresa.innerHTML = `
        <h2>Alsa el León</h2>
        <p>Fabricación y Mantenimiento de estructuras metálicas</p>
    `;

    const $navegacion = document.createElement('div');
    $navegacion.classList.add('navegacion');
    $navegacion.appendChild(Anchor('../../index.html', 'Inicio'));
    $navegacion.appendChild(Anchor('../../empresa.html', 'Empresa'));
    $navegacion.appendChild(Anchor('../../portafolio.html', 'Portafolio'));
    $navegacion.appendChild(Anchor('../../productos.html', 'Productos'));

    // if(!isLogIn){
    $navegacion.appendChild(Anchor('../../inicioSesion.html', 'Iniciar sesión'));
    // }else{
        // if(isAdministrator){
    $navegacion.appendChild(Anchor('../../administrador.html', 'Administrador'))
        // }
    $navegacion.appendChild(Anchor('../../agendarCita.html', 'Agendar cita'));
    $navegacion.appendChild(Anchor('../../citas.html', 'Mis citas'));
    //}

    $menu.appendChild($nombreEmpresa);
    $menu.appendChild($navegacion);

    const $label = document.createElement('label');
    $label.setAttribute('for', 'check');
    $label.classList.add('esconder-menu');
    $label.innerHTML = '&#215';
    $menu.appendChild($label);

    $nav.appendChild($redesSociales);
    $nav.appendChild($menu);

    $header.innerHTML = `
        <input type="checkbox" id="check"/>
        <label for="check" class="mostrar-menu">&#8801</label>
    `;
    $header.appendChild($nav);
});