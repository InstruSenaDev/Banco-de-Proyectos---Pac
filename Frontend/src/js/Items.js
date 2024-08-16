document.addEventListener("DOMContentLoaded", function () {
    const guardarBtn = document.getElementById("guardarBtn");
    guardarBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const isValid = validateForm();
        if (isValid) {
            const idarea = Number(document.getElementById("Area").value); // Convertir a número
            const Items = document.getElementById("Items").value.trim();
            const estado = document.querySelector('input[name="estado"]:checked')?.value;

            // Aquí puedes continuar con el código para procesar los datos y enviarlos al servidor.
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
        const Items = document.getElementById("Items");
        const ItemsError = document.getElementById("ItemsError");
        const nombrePattern = /^[A-Za-zÀ-ÿ\s.,0-9()]{2,50}$/;
        const nombreValue = Items.value.trim();
        const digitCount = (nombreValue.match(/\d/g) || []).length;

        if (!nombrePattern.test(nombreValue) || digitCount !== 1) {
            ItemsError.textContent = "El nombre debe contener solo letras y un solo número.";
            isValid = false;
        } else {
            ItemsError.textContent = "";
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
