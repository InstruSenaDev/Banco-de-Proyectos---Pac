document.addEventListener('DOMContentLoaded', function() {
    const formu = document.getElementById('formu');
    const nombre = document.getElementById('registroNombre');
    const empresa = document.getElementById('nombreEmpresa');
    const correoRegistro = document.getElementById('CorreoRegistro');
    const contrasenaRegistro = document.getElementById('contrasenaRegistro');
    const confirmarContrasena = document.getElementById('confirmarContrasena');
    const numeroDc = document.getElementById('numeroDc');
    const telefono = document.getElementById('telefono');
    const aceptarTerminos = document.getElementById('aceptarTerminos');

    const nombreError = document.getElementById('nombreError');
    const empresaError = document.getElementById('empresaError');
    const correoError = document.getElementById('correoError');
    const contrasenaError = document.getElementById('contrasenaError');
    const confirmarContrasenaError = document.getElementById('confirmarContrasenaError');
    const numeroDcError = document.getElementById('numeroDcError');
    const telefonoError = document.getElementById('telefonoError');
    const terminosError = document.getElementById('terminosError');
    const togglePasswordRegistro = document.getElementById('togglePasswordRegistro');
    const togglePasswordConfirmacion = document.getElementById('togglePasswordConfirmacion');

    if (formu) {
        formu.reset();
    }

    if (togglePasswordRegistro) {
        togglePasswordRegistro.addEventListener('click', function() {
            if (contrasenaRegistro) {
                const type = contrasenaRegistro.getAttribute('type') === 'password' ? 'text' : 'password';
                contrasenaRegistro.setAttribute('type', type);
            }
            this.classList.toggle('bx-show');
            this.classList.toggle('bx-hide');
        });
    }

    if (togglePasswordConfirmacion) {
        togglePasswordConfirmacion.addEventListener('click', function() {
            if (confirmarContrasena) {
                const type = confirmarContrasena.getAttribute('type') === 'password' ? 'text' : 'password';
                confirmarContrasena.setAttribute('type', type);
            }
            this.classList.toggle('bx-show');
            this.classList.toggle('bx-hide');
        });
    }

    if (formu) {
        formu.addEventListener('submit', async function(event) {
            let valid = true;
            if (nombreError) nombreError.textContent = '';
            if (empresaError) empresaError.textContent = '';
            if (correoError) correoError.textContent = '';
            if (contrasenaError) contrasenaError.textContent = '';
            if (confirmarContrasenaError) confirmarContrasenaError.textContent = '';
            if (numeroDcError) numeroDcError.textContent = '';
            if (telefonoError) telefonoError.textContent = '';
            if (terminosError) terminosError.textContent = '';

            // Validación del nombre
            const nombreValue = nombre ? nombre.value.trim() : '';
            if (!nombreValue || !/^[A-Za-z\s]+$/.test(nombreValue) || nombreValue.split(' ').length < 1) {
                valid = false;
                if (nombreError) nombreError.textContent = 'Ingrese un nombre completo válido.';
            }

            // Validación del correo electrónico
            const correoValue = correoRegistro ? correoRegistro.value.trim() : '';
            if (!correoValue) {
                valid = false;
                if (correoError) correoError.textContent = 'El correo electrónico es requerido.';
            } else if (!/\S+@\S+\.\S+/.test(correoValue)) {
                valid = false;
                if (correoError) correoError.textContent = 'El correo electrónico debe tener formato válido.';
            }

            // Validación de la contraseña
            const contrasenaValue = contrasenaRegistro ? contrasenaRegistro.value : '';
            if (!contrasenaValue || contrasenaValue.length < 8) {
                valid = false;
                if (contrasenaError) contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            } else if (!/[A-Z]/.test(contrasenaValue)) {
                valid = false;
                if (contrasenaError) contrasenaError.textContent = 'La contraseña debe contener al menos una letra mayúscula.';
            }

            // Validación de la confirmación de contraseña
            const confirmarContrasenaValue = confirmarContrasena ? confirmarContrasena.value : '';
            if (contrasenaValue !== confirmarContrasenaValue) {
                valid = false;
                if (confirmarContrasenaError) confirmarContrasenaError.textContent = 'Las contraseñas no coinciden.';
            }

            // Validación del número de documento
            const numeroDcValue = numeroDc ? numeroDc.value.trim() : '';
            if (!/^\d{10}$/.test(numeroDcValue)) {
                valid = false;
                if (numeroDcError) numeroDcError.textContent = 'Ingrese un número de documento válido de 10 dígitos.';
            }

            // Validación del teléfono
            const telefonoValue = telefono ? telefono.value.trim() : '';
            if (!/^\d{10}$/.test(telefonoValue)) {
                valid = false;
                if (telefonoError) telefonoError.textContent = 'Ingrese un número de teléfono válido de 10 dígitos.';
            }

            // Validación de aceptación de términos y condiciones
            if (!aceptarTerminos || !aceptarTerminos.checked) {
                valid = false;
                if (terminosError) terminosError.textContent = 'Debe aceptar los términos y condiciones.';
            }

            if (!valid) {
                event.preventDefault();
            } else {
                // Aquí enviamos los datos del formulario al servidor
                event.preventDefault();
                const tipodocumento = "CC"; // Esto puede venir del formulario si tienes un campo para tipo de documento
                const idrol = 1; // Puedes ajustar esto según sea necesario

                const data = {
                    nombre: nombreValue,
                    tipodocumento: tipodocumento,
                    numerodocumento: numeroDcValue,
                    nombreempresa: empresa.value.trim(),
                    telefono: telefonoValue,
                    correo: correoValue,
                    contraseña: contrasenaValue,
                    idrol: idrol
                };

                try {
                    const response = await fetch('/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        // Redirigir al usuario a la página de destino después de enviar el formulario
                        window.location.href = '/Inicio';
                    } else {
                        const errorData = await response.json();
                        console.error('Error al registrar:', errorData);
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
