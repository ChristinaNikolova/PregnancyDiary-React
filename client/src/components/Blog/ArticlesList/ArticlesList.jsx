import { useState, useEffect } from 'react';

import * as articlesService from '../../../services/articlesService.js';
import ArticlesCategoriesList from '../ArticlesCategoriesList/ArticlesCategoriesList.jsx';
import SingleArticle from '../SingleArticle/SingleArticle.jsx';

import './ArticlesList.css';

function ArticlesList() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        articlesService
            .all()
            .then(res => setArticles(res))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="articles-wrapper">
            <h1 className="text-center pt-2 custom-font">All Articles</h1>
            <hr />
            <ArticlesCategoriesList />
            <div className="text-center">
                <img className="main-pic-artilces mt-4 mb-4" src="./pregnant-woman-feeling-bakick-vector-19759205.jpg" alt="preg-article-woman"></img>
            </div>
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

export default ArticlesList;