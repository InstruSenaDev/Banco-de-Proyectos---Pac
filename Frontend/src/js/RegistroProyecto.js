



document.addEventListener("DOMContentLoaded", function () {
    const nextPageLink = document.getElementById("nextPageLink");

    nextPageLink.addEventListener("click", function (event) {
        // Previene la redirección por defecto
        event.preventDefault();

        // Obteniendo los valores de los campos
        const nombreProyecto = document.getElementById("NombreDelProyecto").value.trim();
        const impactoDelProyecto = document.getElementById("ImpactoDelProyecto").value.trim();
        const responsable = document.getElementById("Responsable").value.trim();

        // Limpiar mensajes de error previos
        document.getElementById("errorNombreDelProyecto").textContent = "";
        document.getElementById("errorImpactoDelProyecto").textContent = "";
        document.getElementById("errorResponsable").textContent = "";

        // Bandera para saber si hay errores
        let hasError = false;

        // Validación de los campos
        if (nombreProyecto === "") {
            document.getElementById("errorNombreDelProyecto").textContent = "Este campo es obligatorio.";
            hasError = true;
        }
        if (impactoDelProyecto === "") {
            document.getElementById("errorImpactoDelProyecto").textContent = "Este campo es obligatorio.";
            hasError = true;
        }
        if (responsable === "") {
            document.getElementById("errorResponsable").textContent = "Este campo es obligatorio.";
            hasError = true;
        }

 // Validación de los días de reunión
 const dias = [
    document.getElementById("checkboxLunes").checked,
    document.getElementById("checkboxMartes").checked,
    document.getElementById("checkboxMiercoles").checked,
    document.getElementById("checkboxJueves").checked,
    document.getElementById("checkboxViernes").checked,
    document.getElementById("checkboxSabado").checked
];

const diasSeleccionados = dias.some(day => day);
if (!diasSeleccionados) {
    document.getElementById("errorDiasReunion").textContent = "Seleccione al menos un día para las reuniones.";
    hasError = true;
}

// Si no hay errores, redirecciona a la siguiente página
if (!hasError) {
    window.location.href = nextPageLink.href;
}
});
});