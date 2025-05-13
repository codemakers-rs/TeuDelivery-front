// src/components/web/ProfileSettingsScreen.jsx
import React from 'react';
import GenericProfileSettingsScreen from '../common/GenericProfileSettingsScreen';

const ProfileSettingsScreenWeb = () => {
    const handleWebProfileSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        alert(`Salvar Perfil Web - Nome: ${name}, Email: ${email} (Lógica real de salvar aqui)`);
        // Chamaria uma API para salvar perfil aqui...
    };

    return (
        <GenericProfileSettingsScreen
            userType="web"
            onSubmit={handleWebProfileSubmit}
        />
    );
};

export default ProfileSettingsScreenWeb;


