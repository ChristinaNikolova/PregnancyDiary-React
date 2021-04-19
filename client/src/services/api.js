const baseUrl = 'https://localhost:44391/api';

const accountUrl = `${baseUrl}/account`
const articlesUrl = `${baseUrl}/articles`;
const categoriesUrl = `${baseUrl}/categories`;
const commentsUrl = `${baseUrl}/comments`;
const diariesUrl = `${baseUrl}/diaries`;
const weeksUrl = `${baseUrl}/weeks`;
const usersUrl = `${baseUrl}/users`;
const memoryUrl = `${baseUrl}/memories`;
const babiesUrl = `${baseUrl}/babies`;

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
    updateDiary: `${diariesUrl}/update`,
    diaryDetails: `${diariesUrl}/details`,
    
    createWeek: `${weeksUrl}/create`,
    removeWeek: `${weeksUrl}/delete`,
    updateWeek: `${weeksUrl}/update`,
    getAllCurrentDiary: `${weeksUrl}/allCurrentDiary`,
    
    createMemory: `${memoryUrl}/create`,
    getAllMemoriesCurrentWeek: `${memoryUrl}/all`,
    removeMemory: `${memoryUrl}/delete`,
    updateMemory: `${memoryUrl}/update`,
    
    createBaby: `${babiesUrl}/create`,
    updateBaby: `${babiesUrl}/update`,
    removeBaby: `${babiesUrl}/delete`,
    getBabyDetails: `${babiesUrl}/details`,
    
    userFavArticles: `${usersUrl}/favourite`,
    userDiaries: `${usersUrl}/diaries`,

    adminAllCategories: `${adminCategoryUrl}/all`,
    removeCategory: `${adminCategoryUrl}/delete`,
    adminUpdateCategory: `${adminCategoryUrl}/update`,
    adminCreateCategory: `${adminCategoryUrl}/create`,
    
    adminAllArticles: `${adminArticleUrl}/all`,
    removeArticle: `${adminArticleUrl}/delete`,
    adminUpdateArticle: `${adminArticleUrl}/update`,
    adminCreateArticle: `${adminArticleUrl}/create`,
}

export default api;