document.addEventListener('DOMContentLoaded', function () {
    const formu = document.getElementById('formu');
    const correoInicio = document.getElementById('CorreoInicio');
    const correoError = document.getElementById('correoError');

    if (formu) {
        formu.addEventListener('submit', async function (event) {
            event.preventDefault();

            const correoValue = correoInicio ? correoInicio.value.trim() : '';

            try {
                const response = await fetch('http://localhost:4000/api/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: correoValue })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.error) {
                    correoError.textContent = result.error;
                } else {
                    correoError.textContent = 'Se ha enviado un correo de recuperación.';
                }
            } catch (error) {
                console.error('Error en el envío de correo:', error);
                correoError.textContent = 'Hubo un error al enviar el correo. Inténtelo nuevamente.';
            }
        });
    }

    const modal = document.querySelector('.modal');
    const showModal = document.querySelector('.show-modal');
    const closeModal = document.querySelector('.close-modal');

    showModal?.addEventListener('click', function () {
        modal?.classList.remove('hidden');
    });

    closeModal?.addEventListener('click', function () {
        modal?.classList.add('hidden');
    });
});
