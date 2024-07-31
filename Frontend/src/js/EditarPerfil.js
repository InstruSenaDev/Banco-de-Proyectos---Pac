document.addEventListener('DOMContentLoaded', () => {
    const nombre = document.getElementById('nombre');
    const numeroDoc = document.getElementById('numeroDoc');
    const telefono = document.getElementById('telefono');
    const correo = document.getElementById('correo');
    const nombreEmpresa = document.getElementById('nombreEmpresa');
    const contraseña = document.getElementById('contraseña');
    const confiContraseña = document.getElementById('confiContraseña');

    const errorNombre = document.getElementById('error-nombre');
    const errorNumeroDoc = document.getElementById('error-numeroDoc');
    const errorTelefono = document.getElementById('error-telefono');
    const errorCorreo = document.getElementById('error-correo');
    const errorNombreEmpresa = document.getElementById('error-nombreEmpresa');
    const errorContraseña = document.getElementById('error-contraseña');
    const errorConfiContraseña = document.getElementById('error-confiContraseña');

    const guardarBtn = document.getElementById('guardarBtn');

    const validarFormulario = () => {
        let esValido = true;

        // Validar nombre
        if (nombre.value.trim() === '') {
            errorNombre.textContent = 'El nombre completo es requerido.';
            esValido = false;
        } else if (!/^[a-zA-Z\s]+$/.test(nombre.value.trim())) {
            errorNombre.textContent = 'El nombre solo puede contener letras y espacios.';
            esValido = false;
        } else if (nombre.value.trim().length > 40) {
            errorNombre.textContent = 'El nombre no puede tener más de 40 caracteres.';
            esValido = false;
        } else {
            errorNombre.textContent = '';
        }

        // Validar numero de documento
        if (numeroDoc.value.trim() === '') {
            errorNumeroDoc.textContent = 'El número de documento es requerido.';
            esValido = false;
        } else if (!/^\d+$/.test(numeroDoc.value.trim())) {
            errorNumeroDoc.textContent = 'El número de documento solo puede contener dígitos.';
            esValido = false;
            errorNumeroDoc.textContent = 'El número de documento  no puede tener espacios.';
esValido = false;
        } else if (numeroDoc.value.trim().length < 10) {
            errorNumeroDoc.textContent = 'El número de documento debe tener al menos 10 dígitos.';
            esValido = false;
        } else {
            errorNumeroDoc.textContent = '';
        }

      // Validar telefono
if (telefono.value.trim() === '') {
errorTelefono.textContent = 'El teléfono es requerido.';
esValido = false;
} else if (!/^\d+$/.test(telefono.value.trim())) {
errorTelefono.textContent = 'El teléfono solo puede contener dígitos.';
esValido = false;
errorTelefono.textContent = 'El teléfono no puede tener espacios.';
esValido = false;
} else if (telefono.value.trim().length < 10) {
errorTelefono.textContent = 'El teléfono debe contener al menos 10 dígitos.';
esValido = false;
} else {
errorTelefono.textContent = '';
}

        // Validar correo
        if (correo.value.trim() === '') {
            errorCorreo.textContent = 'El correo es requerido.';
            esValido = false;
        } else if (!/\S+@\S+\.\S+/.test(correo.value.trim())) {
            errorCorreo.textContent = 'El correo electrónico debe contener al menos un arroba (@) y un dominio.';
            esValido = false;
        } else {
            errorCorreo.textContent = '';
        }

        // Validar nombre de la empresa
        if (nombreEmpresa.value.trim() === '') {
            errorNombreEmpresa.textContent = 'El nombre de la empresa es requerido.';
            esValido = false;
        } else if (nombreEmpresa.value.trim().length > 50) {
            errorNombreEmpresa.textContent = 'El nombre de la empresa no puede tener más de 50 caracteres.';
            esValido = false;
        } else {
            errorNombreEmpresa.textContent = '';
        }

        // Validar contraseña
        if (contraseña.value.trim() === '') {
            errorContraseña.textContent = 'La contraseña es requerida.';
            esValido = false;
        } else if (contraseña.value.trim().length < 8) {
            errorContraseña.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            esValido = false;
        } else {
            errorContraseña.textContent = '';
        }

        // Validar confirmar contraseña
        if (confiContraseña.value.trim() === '') {
            errorConfiContraseña.textContent = 'Debe confirmar su contraseña.';
            esValido = false;
        } else if (confiContraseña.value.trim() !== contraseña.value.trim()) {
            errorConfiContraseña.textContent = 'Las contraseñas no coinciden.';
            esValido = false;
        } else {
            errorConfiContraseña.textContent = '';
        }

        return esValido;
    };

    guardarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            // Aquí puedes agregar el código para enviar el formulario
            alert('Formulario válido. ¡Enviando datos!');
        } 
    });
});