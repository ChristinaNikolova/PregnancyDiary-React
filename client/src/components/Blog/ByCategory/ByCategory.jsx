import { useState, useEffect } from 'react';

import * as articlesService from '../../../services/articlesService.js';
import ArticlesCategoriesList from '../ArticlesCategoriesList/ArticlesCategoriesList.jsx';
import SingleArticle from '../SingleArticle/SingleArticle.jsx';

function ByCategory({ match }) {
    const [articles, setArticles] = useState([]);
    const categoryId = match.params.id;

    useEffect(() => {
        articlesService
            .allCurrentCategory(categoryId)
            .then(res => setArticles(res))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="by-category-wrapper">
            <h1 className="text-center pt-2 custom-font">Articles by Category</h1>
            <hr />
            <ArticlesCategoriesList />
            {articles?.map(a => <SingleArticle
                key={a.id}
                id={a.id}
                title={a.title}
                shortContent={a.shortContent}
                picture={a.picture}
                categoryName={a.categoryName}
                likesCount={a.likesCount}
                commentsCount={a.commentsCount}
                createdOnAsString={a.createdOnAsString} />)}
        </div>
    );
}

export default ByCategory;