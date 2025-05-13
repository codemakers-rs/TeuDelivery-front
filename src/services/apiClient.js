// src/services/apiClient.js
const API_BASE_URL = 'http://teudeliverybackend.test/api'; // Ajuste se a URL base da sua API for diferente

async function apiClient(endpoint, options = {}) {
    const url = `${API_BASE_URL}/${endpoint}`;
    let body = options.data;

    if (body) {
        // Explicitly URL-encode username and password
        const encodedData = new URLSearchParams();
        for (const key in body) {
            encodedData.append(key, encodeURIComponent(body[key])); // URL-encode each value
        }
        body = encodedData.toString(); // Convert to URL-encoded string
    }


    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Padrão para formulários PHP
            ...options.headers, // Permite sobrescrever headers se necessário
        },
        ...(body ? { body } : {}), // Add body only if it exists
    };

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            // Tratar erros HTTP (ex: 404, 500)
            const message = await response.json().then(err => err.error || `HTTP error! status: ${response.status}`);
            throw new Error(message);
        }
        return await response.json(); // Parsear resposta JSON em caso de sucesso
    } catch (error) {
        console.error("API Error:", error); // Log de erro para o console
        throw error; // Re-lançar o erro para quem chamou a função poder tratar
    }
}

const fetchRecentOrdersWeb = async (userId) => {
    try {
        const response = await apiClient(`client/orders.php?type=active&user_id=${userId}`, { // Endpoint para pedidos ativos do cliente web
            method: 'GET', // Explicitamente GET
        });
        return response.orders; // Retorna apenas a lista de pedidos (já parseada como JSON pelo apiClient)
    } catch (error) {
        console.error("Erro ao buscar pedidos recentes:", error);
        throw error; // Re-lança o erro para o componente tratar
    }
};


const api = { // Agrupar apiClient e fetchRecentOrdersWeb em um objeto 'api' para exportar
    apiClient,
    fetchRecentOrdersWeb,
    // ... (adicione outras funções de API aqui no futuro) ...
};


export default api; // Exporta o objeto 'api'