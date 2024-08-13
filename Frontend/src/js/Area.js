// Código del frontend (Areas.js)
document.addEventListener("DOMContentLoaded", function () {
    const guardarBtn = document.getElementById("guardarBtn");

    guardarBtn.addEventListener("click", function (event) {
        event.preventDefault();

        // Validar todos los campos
        const isValid = validateForm();

        if (isValid) {
            // Obtener los datos del formulario
            const formData = {
                area: document.getElementById("nombreArea").value.trim(),
                estado: document.querySelector('input[name="estado"]:checked')?.value === 'on' ? true : false
            };

            console.log('Datos del formulario:', formData);

            fetch('http://localhost:4000/api/registerArea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        console.error('Error en el servidor:', error);
                        throw new Error(`Error: ${error.error || 'Unknown error'}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Área registrada con éxito:', data);
                window.location.href = '/VistaCrearRegistro';
            })
            .catch(error => {
                console.error('Error al registrar área:', error);
            });
        }
    });

    function validateForm() {
        let isValid = true;

        // Validar Nombre del área (solo letras)
        const nombreArea = document.getElementById("nombreArea");
        const nombreError = document.getElementById("nombreError");
        const nombrePattern = /^[A-Za-zÀ-ÿ\s.,]{2,50}$/;
        if (!nombrePattern.test(nombreArea.value.trim())) {
            nombreError.textContent = "El nombre debe contener solo letras";
            isValid = false;
        } else {
            nombreError.textContent = "";
        }

        // Validar Estado (al menos un radio button debe estar seleccionado)
        const estadoActivo = document.getElementById("estadoActivo");
        const estadoInactivo = document.getElementById("estadoInactivo");
        const estadoError = document.getElementById("estadoError");
        if (!estadoActivo.checked && !estadoInactivo.checked) {
            estadoError.textContent = "Debe seleccionar un estado.";
            isValid = false;
        } else {
            estadoError.textContent = "";
        }

        return isValid;
    }
});
