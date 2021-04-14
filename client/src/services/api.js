const baseUrl = 'https://localhost:44391/api';

const accountUrl = `${baseUrl}/account`
const articlesUrl = `${baseUrl}/articles`;

const api = {
    register: `${accountUrl}/register`,
    login: `${accountUrl}/login`,
    allArticles: `${articlesUrl}/all`,
}

export default api;