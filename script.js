
document.addEventListener('DOMContentLoaded', function () {

    // Автоматически устанавливаем текущий год
    const year = document.getElementById('year');

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Мобильное меню
    const menuButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('open');

            menuButton.textContent = isOpen ? '×' : '☰';
            menuButton.setAttribute('aria-expanded', isOpen);
        });

        // Закрываем меню после нажатия на ссылку
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                menuButton.textContent = '☰';
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Копирование номера телефона
    const copyButtons = document.querySelectorAll('[data-copy]');
    const toast = document.querySelector('.toast');

    copyButtons.forEach(function (button) {
        button.addEventListener('click', async function () {
            const phone = button.dataset.copy;

            try {
                await navigator.clipboard.writeText(phone);
                showMessage('Номер телефона скопирован!');
            } catch (error) {
                showMessage('Наш номер: ' + phone);
            }
        });
    });

    // Показываем сообщение на экране
    let timer;

    function showMessage(message) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');

        clearTimeout(timer);

        timer = setTimeout(function () {
            toast.classList.remove('show');
        }, 2500);
    }

});
