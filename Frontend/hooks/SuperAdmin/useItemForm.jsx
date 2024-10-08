import { useState } from 'react';

export function useItemForm(onSuccess) {
    const [formValues, setFormValues] = useState({
        tipoArea: '',
        itemName: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        let isValid = true;


        const itemPattern = /^[A-Za-zÀ-ÿ\s.,]{2,50}$/;
        if (!itemPattern.test(formValues.itemName.trim())) {
            errors.itemName = 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres.';
            isValid = false;
        }

        if (!formValues.tipoArea) {
            errors.tipoArea = 'Selecciona un tipo de área.';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:4000/api/insertItem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formValues)
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.error('Error en la respuesta del servidor:', error);
                    throw new Error(error.message || 'Error desconocido');
                }

                const data = await response.json();
                onSuccess(data);
            } catch (error) {
                console.error('Error al registrar el área:', error);
            }
        }
    };

    return {
        formValues,
        errors,
        handleInputChange,
        handleSubmit,
    };
}
