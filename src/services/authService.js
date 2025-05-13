// src/services/authService.js
import apiClient from './apiClient';

const TOKEN_STORAGE_KEY = 'teu_delivery_app_token'; // Chave para armazenar o token no localStorage

const authService = {
    async login(username, password, userType) {
        const endpoint = userType === 'web' ? 'client/login.php' : 'login.php';
        try {
            const response = await apiClient.apiClient(endpoint, { // Corrected line: apiClient.apiClient
                method: 'POST',
                data: { username, password },
            });

            const token = response.token;
            if (!token) {
                throw new Error("Token não recebido do servidor após login.");
            }

            localStorage.setItem(TOKEN_STORAGE_KEY, token); // Armazena o token no localStorage
            return response; // Retorna a resposta completa (pode ser útil para outros dados)

        } catch (error) {
            console.error("Erro durante o login:", error);
            localStorage.removeItem(TOKEN_STORAGE_KEY); // Limpa token em caso de erro para garantir consistência
            throw error; // Re-lança o erro para o componente LoginScreen tratar
        }
    },

    logout() {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        console.log("Usuário deslogado. Token removido.");
    },

    isAuthenticated() {
        return !!localStorage.getItem(TOKEN_STORAGE_KEY); // !! converte para booleano (true se token existe, false se não)
    },

    getToken() {
        return localStorage.getItem(TOKEN_STORAGE_KEY);
    },

    // (Opcional, por enquanto não vamos usar diretamente, mas pode ser útil no futuro)
    // decodeToken() {
    //     const token = authService.getToken();
    //     if (!token) {
    //         return null;
    //     }
    //     try {
    //         // !!!  IMPORTANTE:  Em um sistema real, a decodificação do JWT no frontend
    //         // !!!  é apenas para leitura de informações NÃO SENSÍVEIS.
    //         // !!!  NUNCA use o frontend para verificar a assinatura do JWT, pois a chave secreta
    //         // !!!  estaria exposta no código do frontend, o que é uma VULNERABILIDADE DE SEGURANÇA GRAVE.
    //         // !!!  A verificação e validação do JWT SEMPRE devem ser feitas no backend.
    //         const base64Url = token.split('.')[1];
    //         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //         const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    //             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //         }).join(''));

    //         return JSON.parse(jsonPayload); // Retorna o payload decodificado como objeto Javascript
    //     } catch (error) {
    //         console.error("Erro ao decodificar JWT:", error);
    //         return null;
    //     }
    // },

    // getUserId() {
    //     const decodedToken = authService.decodeToken();
    //     return decodedToken ? decodedToken.userId : null;
    // },

    // getUsername() {
    //     const decodedToken = authService.decodeToken();
    //     return decodedToken ? decodedToken.username : null;
    // },

    // getUserType() {
    //     const decodedToken = authService.decodeToken();
    //     return decodedToken ? decodedToken.userType : null;
    // }
};

export default authService;