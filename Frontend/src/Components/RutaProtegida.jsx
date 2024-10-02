// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const RutaProtegida = ({ children }) => {
//     const { user } = useContext(AuthContext);

//     if (!user) {
//         return <Navigate to="/Principal/Inicio" />; // Redirige al inicio de sesión si no está autenticado
//     }

//     return children;
// };

// export default RutaProtegida;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RutaProtegida = ({ allowedRoles }) => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const isAuthorized = user && allowedRoles.includes(user.rol.toString());

    if (!user) {
        return <Navigate to="/Principal/Inicio" replace />;
    }

    if (!isAuthorized) {
        return <Navigate to="/403" replace />;
    }

    return <Outlet />;
};

export default RutaProtegida;