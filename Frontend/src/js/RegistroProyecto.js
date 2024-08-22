document.addEventListener("DOMContentLoaded", function () {
    const nextPageLink = document.getElementById("nextPageLink");

    nextPageLink.addEventListener("click", async function (event) {
        // Previene la redirección por defecto
        event.preventDefault();

        // Obteniendo los valores de los campos
        const nombreProyecto = document.getElementById("NombreDelProyecto").value.trim();
        const impactoDelProyecto = document.getElementById("ImpactoDelProyecto").value.trim();
        const responsable = document.getElementById("Responsable").value.trim();

        // Obtener valores de los campos adicionales
        const idrespuestaalcance = document.getElementById("idrespuestaalcance") ? document.getElementById("idrespuestaalcance").value.trim() : "";
        const idrespuestaobjetivos = document.getElementById("idrespuestaobjetivos") ? document.getElementById("idrespuestaobjetivos").value.trim() : "";
        const idarea = document.getElementById("idarea") ? document.getElementById("idarea").value.trim() : "";
        const idficha = document.getElementById("idficha") ? document.getElementById("idficha").value.trim() : "";
        const idpersona = document.getElementById("idpersona") ? document.getElementById("idpersona").value.trim() : "";
        const iditems = document.getElementById("iditems") ? document.getElementById("iditems").value.trim() : "";
        const idtiposdearea = document.getElementById("idtiposdearea") ? document.getElementById("idtiposdearea").value.trim() : "";

        // Limpiar mensajes de error previos
        document.getElementById("errorNombreDelProyecto").textContent = "";
        document.getElementById("errorImpactoDelProyecto").textContent = "";
        document.getElementById("errorResponsable").textContent = "";
        document.getElementById("errorDiasReunion").textContent = ""; // Limpiar mensaje de error de días de reunión
        document.getElementById("errorFrecuenciaReunion").textContent = ""; // Limpiar mensaje de error de frecuencia

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
            document.getElementById("errorDiasReunion").textContent = "Seleccione un día para las reuniones.";
            hasError = true;
        }

        // Validación de la frecuencia de reunión
        const btnSemanal = document.getElementById("btnSemanal");
        const btnQuincenal = document.getElementById("btnQuincenal");
        const btnMensual = document.getElementById("btnMensual");

        let frecuencia = null;
        if (btnSemanal.classList.contains("selected")) {
            frecuencia = "Semanal";
        } else if (btnQuincenal.classList.contains("selected")) {
            frecuencia = "Quincenal";
        } else if (btnMensual.classList.contains("selected")) {
            frecuencia = "Mensual";
        }

        if (!frecuencia) {
            document.getElementById("errorFrecuenciaReunion").textContent = "Seleccione una frecuencia para las reuniones.";
            hasError = true;
        }

        // Si no hay errores, enviar los datos al servidor
        if (!hasError) {
            const diasSeleccionadosStr = dias.map((checked, index) => checked ? ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][index] : "").filter(day => day).join(", ");
            
            try {
                const response = await fetch('http://localhost:4000/api/proyectos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre: nombreProyecto,
                        impacto: impactoDelProyecto,
                        responsable: responsable,
                        disponibilidad: frecuencia,
                        idrespuestaalcance: idrespuestaalcance.trim() === "" ? null : idrespuestaalcance, 
                        idrespuestaobjetivos: idrespuestaobjetivos.trim() === "" ? null : idrespuestaobjetivos,
                        idarea: idarea.trim() === "" ? null : idarea,
                        idficha: idficha.trim() === "" ? null : idficha,
                        idpersona: idpersona.trim() === "" ? null : idpersona,
                        iditems: iditems.trim() === "" ? null : iditems,
                        idtiposdearea: idtiposdearea.trim() === "" ? null : idtiposdearea,
                        dia: diasSeleccionadosStr, 
                    })
                });
            
                if (response.ok) {
                    window.location.href = '/VistaAreas1';  // Redirigir a VistaAreas1
                } else {
                    const errorText = await response.text(); // Lee la respuesta como texto
                    console.error('Error al registrar proyecto:', errorText);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        }
    });


    // Función para manejar la selección de botones
    const buttons = document.querySelectorAll('.btn-frecuencia');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});

// Esperar 2 segundos y luego mostrar el contenido
setTimeout(() => {
    document.querySelector('.loading-container')?.classList.add('hidden');
    document.querySelector('.content-container')?.classList.remove('hidden');
}, 2000); // 2 segundos de retraso