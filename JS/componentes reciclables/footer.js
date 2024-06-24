document.addEventListener('DOMContentLoaded', () => {
    const $footer = document.querySelector('footer');

    $footer.innerHTML = `
        <div class="go-top-container">
            <div class="go-top-button">
                <i class="bi bi-chevron-up"></i>
            </div>
        </div>
        <p>&copy; 2024 Diseñado por: Hugu34</p>
    `;

    window.onscroll = function(){
        if(document.documentElement.scrollTop > 300) {
            document.querySelector('.go-top-container').classList.add('show');
        }
        else{
            document.querySelector('.go-top-container').classList.remove('show');
        }
    }

    document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})