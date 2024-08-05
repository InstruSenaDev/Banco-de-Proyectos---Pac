document.addEventListener("DOMContentLoaded", function () {
    const areaSelect = document.getElementById("Area");

    // Llenar el select con áreas
    fetch('http://localhost:4000/api/registerTipoDeArea')
        .then(response => response.json())
        .then(data => {
            data.areas.forEach(area => {
                const option = document.createElement('option');
                option.value = area.id;
                option.textContent = area.nombre;
                areaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener áreas:', error));

    const guardarBtn = document.getElementById("guardarBtn");

    guardarBtn.addEventListener("click", function (event) {
        event.preventDefault();

        // Validar todos los campos
        const isValid = validateForm();

        if (isValid) {
            // Obtener los datos del formulario
            const formData = {
                areaId: document.getElementById("Area").value,
                tipoDeArea: document.getElementById("nombreTipoArea").value.trim(),
                estado: document.querySelector('input[name="estado"]:checked')?.value
            };

            console.log('Datos del formulario:', formData);

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
                // Redirigir a otra página después de un registro exitoso
                window.location.href = '/VistaCrearRegistro';
            })
            .catch(error => {
                console.error('Error al registrar tipo de área:', error);
            });
        }
    });

    function validateForm() {
        let isValid = true;

        // Validar Área
        const Area = document.getElementById("Area");
        const AreaError = document.getElementById("AreaError");
        if (Area.selectedIndex === 0) {
            AreaError.textContent = "Este campo es obligatorio.";
            isValid = false;
        } else {
            AreaError.textContent = "";
        }

        // Validar Nombre del tipo de área (solo letras)
        const nombreTipoArea = document.getElementById("nombreTipoArea");
        const TipoAreaError = document.getElementById("TipoAreaError");
        const nombrePattern = /^[A-Za-zÀ-ÿ\s.,]{2,50}$/;
        if (!nombrePattern.test(nombreTipoArea.value.trim())) {
            TipoAreaError.textContent = "El nombre debe contener solo letras";
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
