import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import axios from "axios";
import Input from "../../Components/Input";
import BotonPrincipal from "../../Components/BotonPrincipal";
import AceptarTerminos from "../../Components/AceptarTerminos";
import SelectBoxTI from "../../Components/SelectBoxTI";
import Loader from "../../Components/Loader";
import LayoutFormulario from "../../layouts/LayoutFormulario";

const Registro = () => {
  const [formValues, setFormValues] = useState({
    nombre: "",
    tipoDocumento: "",
    numeroDc: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: "",
    aceptarTerminos: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Crea una constante para navegar

  // Función de validación
  const validate = async () => {
    const newErrors = {};
    let valid = true;

    // Validación del correo electrónico
    const correoValue = formValues.correo.trim();
    if (!correoValue) {
      newErrors.correo = "El correo electrónico es requerido.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(correoValue)) {
      newErrors.correo = "El correo electrónico debe tener un formato válido.";
      valid = false;
    } else {
      // Verificar si el correo ya está en uso
      try {
        const response = await fetch("http://localhost:4000/api/check-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo: correoValue }),
        });

        const result = await response.json();

        if (response.ok && result.exists) {
          newErrors.correo = "Este correo electrónico ya está en uso.";
          valid = false;
        }
      } catch (error) {
        newErrors.correo = "Error al verificar el correo electrónico.";
        valid = false;
      }
    }

    // Validación del nombre
    if (!formValues.nombre) {
      newErrors.nombre = "El nombre es requerido.";
      valid = false;
    }

    // Validación del tipo de documento
    if (!formValues.tipoDocumento) {
      newErrors.tipoDocumento = "Seleccione un tipo de documento.";
      valid = false;
    }

    // Validación del número de documento
    if (!formValues.numeroDc || !/^\d{7,10}$/.test(formValues.numeroDc)) {
      newErrors.numeroDc = "Ingrese un número de documento válido.";
      valid = false;
    }

    // Validación del teléfono
    if (!formValues.telefono || !/^\d{7,12}$/.test(formValues.telefono)) {
      newErrors.telefono = "Ingrese un número de teléfono válido.";
      valid = false;
    }

    // Validación de la contraseña
    if (!formValues.contrasena) {
      newErrors.contrasena = "La contraseña es requerida.";
      valid = false;
    } else if (formValues.contrasena.length < 8) {
      newErrors.contrasena = "La contraseña debe tener al menos 8 caracteres.";
      valid = false;
    } else if (!/[A-Z]/.test(formValues.contrasena)) {
      newErrors.contrasena = "La contraseña debe contener al menos una letra mayúscula.";
      valid = false;
    }

    // Validación de la confirmación de la contraseña
    if (formValues.contrasena !== formValues.confirmarContrasena) {
      newErrors.confirmarContrasena = "Las contraseñas no coinciden.";
      valid = false;
    }

    // Validación de aceptación de términos
    if (!formValues.aceptarTerminos) {
      newErrors.aceptarTerminos = "Debe aceptar los términos y condiciones.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await validate();

    if (isValid) {
      try {
        const { nombre, tipoDocumento, numeroDc, correo, telefono, contrasena } = formValues;

        const response = await axios.post("http://localhost:4000/api/register", {
          nombre,
          tipodocumento: tipoDocumento,
          numerodocumento: numeroDc,
          nombreempresa: formValues.nombreEmpresa,
          telefono,
          correo,
          contraseña: contrasena,
          idrol: 2,
        });

        setSuccessMessage("Registro exitoso");
        console.log("Respuesta del servidor:", response.data);

        // Restablece los valores del formulario
        setFormValues({
          nombre: "",
          tipoDocumento: "",
          numeroDc: "",
          correo: "",
          telefono: "",
          contrasena: "",
          confirmarContrasena: "",
          aceptarTerminos: false,
        });

        // Redirigir a la vista de Inicio después de unos segundos
        setTimeout(() => {
          navigate("/Principal/Inicio");
        }, 3000); // Espera 3 segundos antes de redirigir

      } catch (error) {
        if (error.response && error.response.status === 409) {
          // El correo ya está registrado
          setErrors({ correo: "El correo electrónico ya está registrado." });
        } else {
          console.error("Error al registrar la persona:", error);
          setErrors({ server: "Hubo un problema al registrar. Inténtalo de nuevo más tarde." });
        }
      }
    }
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: type === "checkbox" ? checked : value,
    }));
  };


  return (
    <LayoutFormulario>
    <div className="flex flex-col-reverse md:flex-row min-h-screen items-center justify-center p-4 md:p-8">
  <div className="flex justify-center w-full md:w-1/2">
        <form
          id="formu"
          className="form flex flex-col w-96 items-center gap-4"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="logo-sena flex m-auto items-center justify-center w-full h-28 bg-[#A3E784] rounded-bl-[50px] rounded-br-[50px]">
            <img
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
              src="/public/img/Logo.png"
              width="10"
              height="10"
              alt="Logo Sena"
            />
          </div>

          <div className="registro flex flex-col items-center gap-y-2 w-full max-w-sm">
            <div className="text-2xl sm:text-3xl  ">REGISTRO</div>

            <div className="relative w-full">
              <Input
                type="text"
                Text=""
                placeholder="Nombre Completo:"
                id="nombre"
                value={formValues.nombre}
                onChange={handleChange}
              />
              <span id="nombreError" className="error-message">
                {errors.nombre}
              </span>
            </div>

            <div className="relative w-full">
              <SelectBoxTI
                Text=""
                id="tipoDocumento"
                value={formValues.tipoDocumento}
                onChange={handleChange}
              />
              <span id="tipoDocumentoError" className="error-message">
                {errors.tipoDocumento}
              </span>
            </div>

            <div className="relative w-full">
              <Input
                type="text"
                Text=""
                placeholder="Número De Documento:"
                id="numeroDc"
                value={formValues.numeroDc}
                onChange={handleChange}
              />
              <span id="numeroDcError" className="error-message">
                {errors.numeroDc}
              </span>
            </div>

            <div className="relative w-full">
              <Input
                type="email"
                Text=""
                placeholder="Correo:"
                id="correo"
                value={formValues.correo}
                onChange={handleChange}
              />
              <span id="correoError" className="error-message">
                {errors.correo}
              </span>
            </div>

            <div className="relative w-full">
              <Input
                type="text"
                Text=""
                placeholder="Teléfono:"
                id="telefono"
                value={formValues.telefono}
                onChange={handleChange}
              />
              <span id="telefonoError" className="error-message">
                {errors.telefono}
              </span>
            </div>

            <div className="relative w-full">
              <Input
                type="text"
                Text=""
                placeholder="Nombre De la Empresa:"
                id="nombreEmpresa"
                value={formValues.nombreEmpresa}
                onChange={handleChange}
              />
              <div id="empresaError" className="error-message"></div>
            </div>

            <div className="relative w-full">
              <Input
                type="password"
                Text=""
                placeholder="Contraseña:"
                id="contrasena"
                value={formValues.contrasena}
                onChange={handleChange}
              />
              <i
                className="bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4"
                id="togglePasswordRegistro"
              ></i>
              <span id="contrasenaError" className="error-message">
                {errors.contrasena}
              </span>
            </div>

            <div className="relative w-full">
              <Input
                type="password"
                Text=""
                placeholder="Confirmar Contraseña:"
                id="confirmarContrasena"
                value={formValues.confirmarContrasena}
                onChange={handleChange}
              />
              <i
                className="bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4"
                id="togglePasswordConfirmacion"
              ></i>
              <span id="confirmarContrasenaError" className="error-message">
                {errors.confirmarContrasena}
              </span>
            </div>

            <div className="relative w-full">
              <div className="flex items-center">
                <AceptarTerminos
                  Text="Aceptar Términos y Condiciones"
                  id="aceptarTerminos"
                  checked={formValues.aceptarTerminos}
                  onChange={handleChange}
                />
              </div>
              <span id="terminosError" className="error-message">
                {errors.aceptarTerminos}
              </span>
            </div>

            {errors.server && <span className="error-message">{errors.server}</span>}
            {successMessage && <span className="text-green-600 font-bold mt-2 text-center">{successMessage}</span>}

            <BotonPrincipal Text="Registrarse" id="Registro" />
            <h3 className="w-[200px] h-[44px] py-[10px] cursor-pointer text-[15px] mt-3 self-center">
              ¿Ya tienes cuenta?
              <a
                href="/Principal/Inicio"
                className="text-blue-500 underline decoration-1"
              >
                Iniciar Sesión
              </a>
            </h3>
          </div>
        </form>
      </div>

      <div className="hidden lg:flex lg:w-1/2 xl:w-[600px] 2xl:w-[800px] items-center justify-center">
        <img
          className="w-full h-auto max-h-[80vh] object-contain"
          src="/Img/registro.png"
          alt="Registro"
        />
      </div>
    </div>
    </LayoutFormulario>
  );
};

export default Registro;