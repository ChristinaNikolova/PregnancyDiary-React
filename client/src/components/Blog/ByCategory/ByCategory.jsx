import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as articlesService from '../../../services/articlesService.js';
import * as categoriesService from '../../../services/categoriesService.js';
import ArticlesCategoriesList from '../ArticlesCategoriesList/ArticlesCategoriesList.jsx';
import SingleArticle from '../SingleArticle/SingleArticle.jsx';

import './ByCategory.css';

function ByCategory({ match }) {
    const [articles, setArticles] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [hasToReload, setHasToReload] = useState(false);
    const categoryId = match.params.id;

    useEffect(() => {
        articlesService
            .allCurrentCategory(categoryId)
            .then(res => setArticles(res))
            .then(setHasToReload(false))
            .catch(err => console.error(err));

        categoriesService
            .getCategoryNameById(categoryId)
            .then(res => setCategoryName(res))
            .catch(err => console.error(err));
    }, [hasToReload]);

    const reload = () => {
        setTimeout(() => {
            setHasToReload(true);
        }, 100);
    }

    return (
        <div className="by-category-wrapper">
            <h1 className="text-center pt-2 custom-font">Articles by <span className="pink-color mr-1">{categoryName}</span>Category</h1>
            <div className="text-center">
                <Link to="/articles"><button className="btn btn-clear-article-by-category">Get All Articles</button></Link>
            </div>
            <hr />
            <ArticlesCategoriesList clickHandler={reload} />
            <div className="m-3"></div>
            <hr />
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
            < div className="fill pt-1 pb-1"></div >
        </div>
    );
}

export default ByCategory;