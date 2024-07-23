
const nombreError = document.getElementById('nombreError');
const tipoDocumentoError = document.getElementById('tipoDocumentoError');
const numeroDcError = document.getElementById('numeroDcError');
const correoError = document.getElementById('correoError');
const contrasenaError = document.getElementById('contrasenaError');
const telefonoError = document.getElementById('telefonoError');
const tipoRolError = document.getElementById('tipoRolError');
const togglePasswordRegistro = document.getElementById('togglePasswordUsuario');

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

if (formu) {
    formu.addEventListener('submit', async function(event) {
        event.preventDefault();
        let valid = true;

        // Limpia los mensajes de error
        if (nombreError) nombreError.textContent = '';
        if (tipoDocumentoError) tipoDocumentoError.textContent = '';
        if (numeroDcError) numeroDcError.textContent = '';
        if (correoError) correoError.textContent = '';
        if (contrasenaError) contrasenaError.textContent = '';
        if (telefonoError) telefonoError.textContent = '';
        if (tipoRolError) tipoRolError.textContent = '';

        // Validación del nombre
        const nombreValue = nombre ? nombre.value.trim() : '';
        if (!nombreValue || !/^[A-Za-z\s]+$/.test(nombreValue) || nombreValue.split(' ').length < 2) {
            valid = false;
            if (nombreError) nombreError.textContent = 'Ingrese un nombre completo válido.';
        }

        // Validación del tipo de documento
        const tipoDocumentoValue = tipoDocumento ? tipoDocumento.value : '';
        if (!tipoDocumentoValue) {
            valid = false;
            if (tipoDocumentoError) tipoDocumentoError.textContent = 'El tipo de documento es requerido.';
        }

        // Validación del número de documento
        const numeroDcValue = numeroDc ? numeroDc.value.trim() : '';
        if (!/^\d{10}$/.test(numeroDcValue)) {
            valid = false;
            if (numeroDcError) numeroDcError.textContent = 'Ingrese un número de documento válido de 10 dígitos.';
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


        // Validación del teléfono
        const telefonoValue = telefono ? telefono.value.trim() : '';
        if (!/^\d{10}$/.test(telefonoValue)) {
            valid = false;
            if (telefonoError) telefonoError.textContent = 'Ingrese un número de teléfono válido de 10 dígitos.';
        }


        // Validación del rol
        const tipoRolValue = tipoRol ? tipoRol.value : '';
        if (!tipoRolValue) {
            valid = false;
            if (tipoRolError) tipoRolError.textContent = 'El tipo de rol es requerido.';
        }

        if (valid) {
            const estadoValue = estadoActivo ? (estadoActivo.checked ? 'Activo' : 'Inactivo') : 'Inactivo';

            const data = {
                nombre: nombreValue,
                tipodocumento: tipoDocumentoValue,
                numerodocumento: numeroDcValue,
                correo: correoValue,
                contraseña: contrasenaValue,
                idrol: tipoRolValue,
                telefono: telefonoValue,
                estado: estadoValue
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
                    console.log('Registro exitoso');
                    // Muestra el modal o redirige según sea necesario
                } else {
                    console.error('Error en el registro');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        }
    });
}

