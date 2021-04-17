const baseUrl = 'https://localhost:44391/api';

const accountUrl = `${baseUrl}/account`
const articlesUrl = `${baseUrl}/articles`;
const categoriesUrl = `${baseUrl}/categories`;
const commentsUrl = `${baseUrl}/comments`;
const diariesUrl = `${baseUrl}/diaries`;
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
    allCategoriesNames: `${categoriesUrl}/allNames`,
    commentsCurrentArticle: `${commentsUrl}/all`,
    createComment: `${commentsUrl}/create`,
    createDiary: `${diariesUrl}/create`,
    removeDiary: `${diariesUrl}/delete`,
    diaryDetails: `${diariesUrl}/details`,
    userDiaries: `${usersUrl}/diaries`,
    userFavArticles: `${usersUrl}/favourite`,
    adminAllCategories: `${adminCategoryUrl}/all`,
    removeCategory: `${adminCategoryUrl}/delete`,
    adminGetCategoryForUpdate: `${adminCategoryUrl}/categoryForUpdate`,
    adminUpdateCategory: `${adminCategoryUrl}/update`,
    adminCreateCategory: `${adminCategoryUrl}/create`,
    adminAllArticles: `${adminArticleUrl}/all`,
    removeArticle: `${adminArticleUrl}/delete`,
    adminGetArticleForUpdate: `${adminArticleUrl}/articleForUpdate`,
    adminUpdateArticle: `${adminArticleUrl}/update`,
    adminCreateArticle: `${adminArticleUrl}/create`,
}

export default api;