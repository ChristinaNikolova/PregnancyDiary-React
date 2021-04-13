const baseUrl = 'https://localhost:44391/api';

const accountUrl = `${baseUrl}/account`
const api = {
    register: `${accountUrl}/register`,
    login: `${accountUrl}/login`,
}

export default api;