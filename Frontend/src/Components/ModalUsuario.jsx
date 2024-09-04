
import { useState } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from './Input2';
import BotonSegundo from './BotonSegundoModal';
import RadioButton from './RadioButton3';
import SelectBoxRol from './SelectBoxRol2';
import SelectBoxTi from './SelectBoxTI2';
import '../css/ModalUsuario.css';



export default function Usuario() {
  const [isOpen, setIsOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleValidation = () => {
    let errors = {};
    let isValid = true;

    // Validar Nombre del usuario (solo letras)
    const nombreUsu = document.getElementById("nombreUsu").value.trim();
    if (!/^[A-Za-z\s]{2,50}$/.test(nombreUsu)) {
      errors.nombreUsu = "El nombre debe contener solo letras";
      isValid = false;
    }

    // Validar Tipo de documento
    const tipoDoc = document.getElementById("tipoDoc").value;
    if (!tipoDoc) {
      errors.tipoDoc = "Este campo es obligatorio.";
      isValid = false;
    }

    // Validar Número de documento (solo números, longitud mínima de 10 dígitos)
    const numeroDoc = document.getElementById("numeroDoc").value.trim();
    if (!/^[0-9]{6,15}$/.test(numeroDoc)) {
      errors.numeroDoc = "El número de documento debe tener una longitud de 10 dígitos.";
      isValid = false;
    }

    // Validar Correo Electrónico
    const correo = document.getElementById("correo").value.trim();
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo)) {
      errors.correo = "El correo debe tener un formato válido (ejemplo@dominio.com).";
      isValid = false;
    }

    // Validar Contraseña (longitud mínima 8 caracteres)
    const contrasena = document.getElementById("contrasena").value.trim();
    if (contrasena.length < 8) {
      errors.contrasena = "La contraseña debe tener al menos 8 caracteres.";
      isValid = false;
    }

    // Validar Tipo de Rol
    const tipoRol = document.getElementById("tipoRol").value;
    if (!tipoRol) {
      errors.tipoRol = "Este campo es obligatorio.";
      isValid = false;
    }

    // Validar Estado (al menos un radio button debe estar seleccionado)
    const estadoActivo = document.getElementById("estadoActivo").checked;
    const estadoInactivo = document.getElementById("estadoInactivo").checked;
    if (!estadoActivo && !estadoInactivo) {
      errors.estado = "Debe seleccionar un estado.";
      isValid = false;
    }

    // Validar Teléfono (solo números, longitud mínima de 10 dígitos)
    const celular = document.getElementById("celular").value.trim();
    if (!/^[0-9]{10,15}$/.test(celular)) {
      errors.celular = "El teléfono debe contener solo números, con una longitud de 10 dígitos.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (handleValidation()) {
      // Si el formulario es válido, puedes mostrar el modal o enviar los datos al servidor
      const modal = document.querySelector('.modal');
      modal.classList.remove('hidden');

      const closeModal = document.querySelector('.close-modal');
      closeModal?.addEventListener('click', function () {
        modal?.classList.add('hidden');
      });

      // Mapeo de roles
      const roleMap = {
        administrador: 1,
        aprendiz: 4,
      };

      // Obtener los datos del formulario
      const formData = {
        nombre: document.getElementById("nombreUsu").value.trim(),
        tipodocumento: document.getElementById("tipoDoc").value,
        numerodocumento: document.getElementById("numeroDoc").value.trim(),
        nombreempresa: document.getElementById("nombreEmpresa") ? document.getElementById("nombreEmpresa").value.trim() : null, // Campo opcional
        telefono: document.getElementById("celular").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        contraseña: document.getElementById("contrasena").value.trim(),
        idrol: roleMap[document.getElementById("tipoRol").value.toLowerCase()], // Convertir el nombre del rol a su ID
        estado: document.querySelector('input[name="estado"]:checked') ? document.querySelector('input[name="estado"]:checked').value : null // Campo opcional
      };

      console.log('Datos del formulario:', formData);

      fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(`Error: ${error.error || 'Unknown error'}`);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log('Usuario registrado con éxito:', data);
        })
        .catch((error) => {
          console.error('Error al registrar usuario:', error);
        });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center py-20">
        <button
          type="button"
          className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2 text-center text-tremor-default font-medium bg-tremor-background-emphasis text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
          onClick={() => setIsOpen(true)}
        >
          Show Dialog
        </button>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className="fixed inset-0 flex items-center justify-center z-[100] bg-white "
      >
        <DialogPanel className="w-full max-w-2xl p-6 sm:mx-auto relative">
          <button
            type="button"
            className="absolute right-4 top-4 p-2 bg-white border-none text-tremor-content-subtle hover:text-tremor-content hover:bg-tremor-background-subtle dark:text-dark-tremor-content-subtle dark:hover:bg-dark-tremor-background-subtle dark:hover:text-tremor-content"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <RiCloseLine className="size-5" aria-hidden={true} />
          </button>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Añade nuevo usuario
            </h4>
            <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              Por favor llene todos los datos del usuario
            </p>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3 space-y-4">
                <div>
                  <Input2
                    id="nombreUsu"
                    type="text"
                    placeholder="Nombre del usuario"
                    Text="Nombre del usuario:"
                  />
                  {formErrors.nombreUsu && (
                    <p className="text-red-500">{formErrors.nombreUsu}</p>
                  )}
                </div>
                <div>
                  <SelectBoxTi id="tipoDoc" text="Tipo de documento" />
                  {formErrors.tipoDoc && (
                    <p className="text-red-500">{formErrors.tipoDoc}</p>
                  )}
                </div>
                <div>
                  <Input2
                    id="numeroDoc"
                    type="text"
                    placeholder="Numero de documento"
                    Text="Numero de documento:"
                  />
                  {formErrors.numeroDoc && (
                    <p className="text-red-500">{formErrors.numeroDoc}</p>
                  )}
                </div>
                <div>
                  <Input2
                    id="correo"
                    type="email"
                    placeholder="Correo"
                    Text="Correo Electrónico:"
                  />
                  {formErrors.correo && (
                    <p className="text-red-500">{formErrors.correo}</p>
                  )}
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 space-y-4">
                <div>
                  <Input2
                    id="contrasena"
                    type="password"
                    placeholder="Contraseña"
                    Text="Contraseña:"
                  />
                  {formErrors.contrasena && (
                    <p className="text-red-500">{formErrors.contrasena}</p>
                  )}
                </div>
                <div>
                  <SelectBoxRol id="tipoRol" text="Tipo de Rol" />
                  {formErrors.tipoRol && (
                    <p className="text-red-500">{formErrors.tipoRol}</p>
                  )}
                </div>
                <div>
                  <Input2
                    id="celular"
                    type="text"
                    placeholder="Telefono"
                    Text="Telefono:"
                  />
                  {formErrors.celular && (
                    <p className="text-red-500">{formErrors.celular}</p>
                  )}
                </div>
                <div>
                <div className="space-y-4">
                    <label className="font-josefin-slab font-semibold text-black">
                      Estado
                    </label>
                  
                <div className="flex gap-x-6">
                <RadioButton id="estadoActivo" value="activo" name="estado" Text="Activo" />
                <RadioButton id="estadoInactivo" value="inactivo" name="estado" Text="Inactivo" />
                </div>
                </div>

                  {formErrors.estado && (
                    <p className="text-red-500">{formErrors.estado}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-6">
              <div className="flex justify-center gap-x-6">
                <BotonSegundo type="submit" nombre="Añadir Usuario" />
              </div>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}