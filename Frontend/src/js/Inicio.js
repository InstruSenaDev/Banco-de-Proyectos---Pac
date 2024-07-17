document.addEventListener('DOMContentLoaded', function() {
    const formu = document.getElementById('formu');
    const correoInicio = document.getElementById('CorreoInicio');
    const contrasenaInicio = document.getElementById('contrasenaInicio');
    const togglePasswordInicio = document.getElementById('togglePasswordInicio');
    const correoError = document.getElementById('correoError');
    const contrasenaError = document.getElementById('contrasenaError');

    if (formu) {
      // Resetear el formulario
      formu.reset();
    }

    if (togglePasswordInicio) {
      // Toggle password visibility
      togglePasswordInicio.addEventListener('click', function() {
        const type = contrasenaInicio.getAttribute('type') === 'password' ? 'text' : 'password';
        contrasenaInicio.setAttribute('type', type);
        this.classList.toggle('bx-show');
        this.classList.toggle('bx-hide');
      });
    }

    if (formu) {
      formu.addEventListener('submit', function(event) {
        let valid = true;
        if (correoError) correoError.textContent = '';
        if (contrasenaError) contrasenaError.textContent = '';

        // Validación del correo electrónico
        const correoValue = correoInicio ? correoInicio.value.trim() : '';
        if (!correoValue) {
          valid = false;
          if (correoError) correoError.textContent = 'El correo electrónico es requerido.';
        } else if (!/\S+@\S+\.\S+/.test(correoValue)) {
          valid = false;
          if (correoError) correoError.textContent = 'El correo electrónico debe tener formato válido.';
        }

        // Validación de la contraseña
        const contrasenaValue = contrasenaInicio ? contrasenaInicio.value : '';
        if (!contrasenaValue || contrasenaValue.length < 8) {
          valid = false;
          if (contrasenaError) contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        }

        if (!valid) {
          event.preventDefault();
        }
      });
    }

    window.addEventListener('pageshow', function(event) {
      if (event.persisted && formu) {
        formu.reset();
        }
    });
});