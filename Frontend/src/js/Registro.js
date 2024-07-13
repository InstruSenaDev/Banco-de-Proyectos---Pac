//script.js
    document.addEventListener('DOMContentLoaded', function() {
    const formu = document.getElementById('formu');
    const nombre = document.getElementById('registroNombre');
    const correoRegistro = document.getElementById('CorreoRegistro');
    const contrasenaRegistro = document.getElementById('contrasenaRegistro') ;
    const confirmarContrasena = document.getElementById('confirmarContrasena');
    const numeroDc = document.getElementById('numeroDc') ;
    const telefono = document.getElementById('telefono');


    const nombreError = document.getElementById('nombreError');
    const correoError = document.getElementById('correoError');
    const contrasenaError = document.getElementById('contrasenaError');
    const confirmarContrasenaError = document.getElementById('confirmarContrasenaError');
    const numeroDcError = document.getElementById('numeroDcError');
    const telefonoError = document.getElementById('telefonoError');
    const togglePasswordRegistro = document.getElementById('togglePasswordRegistro');
    const togglePasswordConfirmacion = document.getElementById('togglePasswordConfirmacion');


    if (formu) {
// Resetear el formulario
formu.reset();
}

if (togglePasswordRegistro) {
// Toggle password visibility
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
// Toggle password visibility
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
        formu.addEventListener('submit', function(event) {
            let valid = true;
            if (nombreError) nombreError.textContent = '';
            if (correoError) correoError.textContent = '';
            if (contrasenaError) contrasenaError.textContent = '';
            if (confirmarContrasenaError) confirmarContrasenaError.textContent = '';
            if (numeroDcError) numeroDcError.textContent = '';
            if (telefonoError) telefonoError.textContent = '';

            // Validación del nombre
            const nombreValue = nombre ? nombre.value.trim() : '';
            if (!nombreValue || !/^[A-Za-z\s]+$/.test(nombreValue)) {
                valid = false;
                if (nombreError) nombreError.textContent = 'Ingrese un nombre válido.';
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
                if (contrasenaError) contrasenaError.textContent = 'El correo electrónico debe contener al menos una letra mayúscula.';
            }

            // Validación de la confirmación de contraseña
            const confirmarContrasenaValue = confirmarContrasena ? confirmarContrasena.value : '';
            if (contrasenaValue !== confirmarContrasenaValue) {
                valid = false;
                if (confirmarContrasenaError) confirmarContrasenaError.textContent = 'Las contraseñas no coinciden.';
            }

            // Validación del número de documento
            const numeroDcValue = numeroDc ? numeroDc.value.trim() : '';
            if (!numeroDcValue || isNaN(parseInt(numeroDcValue)) || numeroDcValue.length !== 10) {
                valid = false;
                if (numeroDcError) numeroDcError.textContent = 'Ingrese un número de documento válido de 10 dígitos.';
            }
            if (Number.isInteger){
                valid = false;
                if (telefonoError) telefonoError.textContent = 'Ingrese solo numeros.';
             }

            // Validación del teléfono
            const telefonoValue = telefono ? telefono.value.trim() : '';
          
            if (Number.isInteger){
                valid = false;
                if (telefonoError) telefonoError.textContent = 'Ingrese solo números.';

             }

             else if(Number.isInteger){
                valid = true
               if (telefonoValue.length !== 10 || isNaN(parseInt(telefonoValue))) {
                    valid = false;
                    if (telefonoError) telefonoError.textContent = 'Ingrese un número de teléfono válido de 10 dígitos.';
                }
            }

             if (!valid) {
                event.preventDefault();
            } else {
                // Aquí puedes redirigir al usuario a la página de destino después de enviar el formulario
                window.location.href = '/Inicio';
            }
     
        });
    }
 

    window.addEventListener('pageshow', function(event) {
        if (event.persisted && formu) {
            formu.reset();
        }
    });
});