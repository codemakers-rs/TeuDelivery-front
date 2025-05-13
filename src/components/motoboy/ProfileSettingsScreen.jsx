// src/components/motoboy/ProfileSettingsScreen.jsx
import React from 'react';
import GenericProfileSettingsScreen from '../common/GenericProfileSettingsScreen';

const ProfileSettingsScreenMotoboy = () => {
    const handleMotoboyProfileSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        alert(`Salvar Perfil Motoboy - Nome: ${name}, Email: ${email} (Lógica real de salvar aqui)`);
        // Chamaria uma API para salvar perfil aqui...
    };

    return (
        <GenericProfileSettingsScreen
            userType="motoboy"
            onSubmit={handleMotoboyProfileSubmit}
        />
    );
};

export default ProfileSettingsScreenMotoboy;