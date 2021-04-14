const baseUrl = 'https://localhost:44391/api';

const accountUrl = `${baseUrl}/account`
const articlesUrl = `${baseUrl}/articles`;
const categoriesUrl = `${baseUrl}/categories`;

const api = {
    register: `${accountUrl}/register`,
    login: `${accountUrl}/login`,
    allArticles: `${articlesUrl}/all`,
    allArticlesCurrentCategory: `${articlesUrl}/byCategory`,
    searchArticles: `${articlesUrl}/search`,
    orderArticles: `${articlesUrl}/order`,
    articlesCountByCategories: `${categoriesUrl}/getArticlesCountByCategories`,
}

export default api;