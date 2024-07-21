document.addEventListener('DOMContentLoaded', function() {
    const formu = document.getElementById('formu');
    const nombre = document.getElementById('registroNombre');
    const correoInicio = document.getElementById('CorreoInicio');
    const contrasenaInicio = document.getElementById('contrasenaInicio');
    const numeroDc = document.getElementById('numeroDc');
    const telefono = document.getElementById('telefono');

    const nombreError = document.getElementById('nombreError');
    const correoError = document.getElementById('correoError');
    const contrasenaError = document.getElementById('contrasenaError');
    const numeroDcError = document.getElementById('numeroDcError');
    const telefonoError = document.getElementById('telefonoError');
    const togglePasswordInicio = document.getElementById('togglePasswordInicio');

    if (formu) {
        formu.reset();
    }

    if (togglePasswordInicio) {
        togglePasswordInicio.addEventListener('click', function() {
            if (contrasenaInicio) {
                const type = contrasenaInicio.getAttribute('type') === 'password' ? 'text' : 'password';
                contrasenaInicio.setAttribute('type', type);
            }
            this.classList.toggle('bx-show');
            this.classList.toggle('bx-hide');
        });
    }

    if (formu) {
        formu.addEventListener('submit', async function(event) {
            event.preventDefault();
            let valid = true;

            // Limpiar mensajes de error
            nombreError.textContent = '';
            correoError.textContent = '';
            contrasenaError.textContent = '';
            numeroDcError.textContent = '';
            telefonoError.textContent = '';

            // Validación del nombre
            const nombreValue = nombre ? nombre.value.trim() : '';
            if (!nombreValue || !/^[A-Za-z\s]+$/.test(nombreValue) || nombreValue.split(' ').length < 1) {
                valid = false;
                nombreError.textContent = 'Ingrese un nombre completo válido.';
            }

            // Validación del correo electrónico
            const correoValue = correoInicio ? correoInicio.value.trim() : '';
            if (!correoValue) {
                valid = false;
                correoError.textContent = 'El correo electrónico es requerido.';
            } else if (!/\S+@\S+\.\S+/.test(correoValue)) {
                valid = false;
                correoError.textContent = 'El correo electrónico debe tener formato válido.';
            }

            // Validación de la contraseña
            const contrasenaValue = contrasenaInicio ? contrasenaInicio.value : '';
            if (!contrasenaValue || contrasenaValue.length < 8) {
                valid = false;
                contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            } else if (!/[A-Z]/.test(contrasenaValue)) {
                valid = false;
                contrasenaError.textContent = 'La contraseña debe contener al menos una letra mayúscula.';
            }

            // Validación del número de documento
            const numeroDcValue = numeroDc ? numeroDc.value.trim() : '';
            if (!/^\d{10}$/.test(numeroDcValue)) {
                valid = false;
                numeroDcError.textContent = 'Ingrese un número de documento válido de 10 dígitos.';
            }

            // Validación del teléfono
            const telefonoValue = telefono ? telefono.value.trim() : '';
            if (!/^\d{10}$/.test(telefonoValue)) {
                valid = false;
                telefonoError.textContent = 'Ingrese un número de teléfono válido de 10 dígitos.';
            }

            if (valid) {
                const tipoDocumentoValue = document.getElementById('tipoDocumento').value;
                const data = {
                    nombre: nombre.value.trim(),
                    tipodocumento: tipoDocumentoValue,
                    numerodocumento: numeroDc.value.trim(),
                    telefono: telefono.value.trim(),
                    correo: correoInicio.value.trim(),
                    contraseña: contrasenaInicio.value,
                    idrol: 3 // Hardcoded idrol value
                };

                console.log('Datos enviados al servidor:', data);

                try {
                    const response = await fetch('http://localhost:4000/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        console.log('Registro Exitoso');
                    } else {
                        console.error('Error al Registrar');
                    }
                } catch (error) {
                    console.error('Error al enviar la solicitud:', error);
                }
            }
        });
    }

    window.addEventListener('pageshow', function(event) {
        if (event.persisted && formu) {
            formu.reset();
        }
    });
});
