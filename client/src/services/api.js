const baseUrl = 'https://localhost:44391/api';

const accountUrl = `${baseUrl}/account`
const articlesUrl = `${baseUrl}/articles`;
const categoriesUrl = `${baseUrl}/categories`;
const commentsUrl = `${baseUrl}/comments`;
const usersUrl = `${baseUrl}/users`;

const adminBaseUrl = `${baseUrl}/admin`;
const adminArticleUrl = `${adminBaseUrl}/articles`;
const adminCategoryUrl = `${adminBaseUrl}/categories`;

const api = {
    register: `${accountUrl}/register`,
    login: `${accountUrl}/login`,
    allArticles: `${articlesUrl}/all`,
    allArticlesCurrentCategory: `${articlesUrl}/byCategory`,
    searchArticles: `${articlesUrl}/search`,
    orderArticles: `${articlesUrl}/order`,
    detailsArticle: `${articlesUrl}/details`,
    articleDislike: `${articlesUrl}/dislike`,
    articleLike: `${articlesUrl}/like`,
    articlesCountByCategories: `${categoriesUrl}/getArticlesCountByCategories`,
    categoryNameById: `${categoriesUrl}/getNameById`,
    commentsCurrentArticle: `${commentsUrl}/all`,
    createComment: `${commentsUrl}/create`,
    userFavArticles: `${usersUrl}/favourite`,
    adminAllCategories: `${adminCategoryUrl}/all`,
    removeCategory: `${adminCategoryUrl}/delete`,
    adminGetCategoryForUpdate: `${adminCategoryUrl}/categoryForUpdate`,
    adminUpdateCategory: `${adminCategoryUrl}/update`,
    adminCreateCategory: `${adminCategoryUrl}/create`,
}

export default api;