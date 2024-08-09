document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('update-password-form') | null;
    const messageElement = document.getElementById('message') | null;
    const tokenInput = document.getElementById('token') | null;
    const emailInput = document.getElementById('email') | null;
    const newPasswordInput = document.getElementById('new-password')| null;
    const confirmPasswordInput = document.getElementById('confirm-password')  | null;
    const newPasswordError = document.getElementById('new-password-error') | null;
    const confirmPasswordError = document.getElementById('confirm-password-error') | null;

    // Extraer el token y el email de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    if (token && email && tokenInput && emailInput) {
      tokenInput.value = token;
      emailInput.value = email;
    }

    if (form && messageElement && newPasswordInput && confirmPasswordInput && newPasswordError && confirmPasswordError) {
      form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        let valid = true;

        // Validar nueva contraseña
        if (newPassword.length < 8) {
          newPasswordError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
          valid = false;
        } else if (!/[A-Z]/.test(newPassword)) {
          newPasswordError.textContent = 'La contraseña debe contener al menos una letra mayúscula.';
          valid = false;
        } else if (!/[a-z]/.test(newPassword)) {
          newPasswordError.textContent = 'La contraseña debe contener al menos una letra minúscula.';
          valid = false;
        } else if (!/[0-9]/.test(newPassword)) {
          newPasswordError.textContent = 'La contraseña debe contener al menos un número.';
          valid = false;
        } else if (!/[@$!%*?&]/.test(newPassword)) {
          newPasswordError.textContent = 'La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &).';
          valid = false;
        } else {
          newPasswordError.textContent = '';
        }

        // Validar confirmación de contraseña
        if (newPassword !== confirmPassword) {
          confirmPasswordError.textContent = 'Las contraseñas no coinciden.';
          valid = false;
        } else {
          confirmPasswordError.textContent = '';
        }

        if (!valid) return;

        try {
          const response = await fetch('http://localhost:4000/api/update-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, email, newPassword })
          });

          const result = await response.json();

          if (response.ok) {
            messageElement.textContent = 'Contraseña actualizada exitosamente.';
            messageElement.classList.remove('text-red-500');
            messageElement.classList.add('text-green-500');
          } else {
            messageElement.textContent = result.error;
            messageElement.classList.add('text-red-500');
          }
        } catch (error) {
          messageElement.textContent = 'Error al actualizar la contraseña.';
          messageElement.classList.add('text-red-500');
        }
      });
    }
  });