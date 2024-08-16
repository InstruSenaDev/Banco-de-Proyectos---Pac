document.addEventListener("DOMContentLoaded", function () {
    const guardarBtn = document.getElementById("guardarBtn");
    guardarBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const isValid = validateForm();
        if (isValid) {
            const idarea = Number(document.getElementById("Area").value); // Convertir a número
            const tiposdearea = document.getElementById("nombreTipoArea").value.trim();
            const estado = document.querySelector('input[name="estado"]:checked')?.value;

            // Depuración: Mostrar valores capturados
            console.log('Area ID:', idarea);
            console.log('Tipo de Área:', tiposdearea);
            console.log('Estado:', estado);

            const formData = { idarea, tiposdearea, estado };
            console.log(formData);

            // Asegúrate de usar JSON.stringify para convertir el objeto en una cadena JSON
            fetch('http://localhost:4000/api/registerTipoDeArea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(error => {
                            throw new Error(`Error: ${error.error || 'Unknown error'}`);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Tipo de Área registrado con éxito:', data);
                    window.location.href = '/VistaCrearRegistro';
                })
                .catch(error => {
                    console.error('Error al registrar tipo de área:', error);
                });
        }
    });

    function validateForm() {
        let isValid = true;

        // Validar Area
        const Area = document.getElementById("Area");
        const AreaError = document.getElementById("AreaError");
        if (Area.selectedIndex === 0) {
            AreaError.textContent = "Este campo es obligatorio.";
            isValid = false;
        } else {
            AreaError.textContent = "";
        }

        // Validar Nombre del tipo de área (solo letras y un solo número)
        const nombreTipoArea = document.getElementById("nombreTipoArea");
        const TipoAreaError = document.getElementById("TipoAreaError");
        const nombrePattern = /^[A-Za-zÀ-ÿ\s.,0-9()]{2,50}$/;
        const nombreValue = nombreTipoArea.value.trim();
        const digitCount = (nombreValue.match(/\d/g) || []).length;

        if (!nombrePattern.test(nombreValue) || digitCount !== 1) {
            TipoAreaError.textContent = "El nombre debe contener solo letras y un solo número.";
            isValid = false;
        } else {
            TipoAreaError.textContent = "";
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
