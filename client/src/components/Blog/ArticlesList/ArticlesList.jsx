import { useState, useEffect } from 'react';

import * as articlesService from '../../../services/articlesService.js';
import ArticlesCategoriesList from '../ArticlesCategoriesList/ArticlesCategoriesList.jsx';
import SearchArticle from '../SearchArticle/SearchArticle.jsx';
import SingleArticle from '../SingleArticle/SingleArticle.jsx';

import './ArticlesList.css';

function ArticlesList() {
    const [articles, setArticles] = useState([]);
    const [isSearched, setIsSearched] = useState(false);


    useEffect(() => {
        articlesService
            .all()
            .then(res => setArticles(res))
            .catch(err => console.error(err));
    }, [isSearched]);

    const search = (query) => {
        if (query === undefined) {
            setIsSearched(false);
            return;
        }

        articlesService
            .search(query)
            .then(res => setTimeout(() => {
                setArticles(res)
            }, 100))
            .catch(err => console.error(err));

        setIsSearched(true);
    }

    return (
        <div className="articles-wrapper">
            <h1 className="text-center pt-2 custom-font">All Articles</h1>
            <hr />
            <ArticlesCategoriesList />
            <div className="text-center">
                <img className="main-pic-artilces mt-4 mb-4" src="./pregnant-woman-feeling-bakick-vector-19759205.jpg" alt="preg-article-woman"></img>
            </div>

            <SearchArticle
                clickHandler={search}
                isSearched={isSearched} />

            {articles.length > 0
                ? articles.map(a => <SingleArticle
                    key={a.id}
                    id={a.id}
                    title={a.title}
                    shortContent={a.shortContent}
                    picture={a.picture}
                    categoryName={a.categoryName}
                    likesCount={a.likesCount}
                    commentsCount={a.commentsCount}
                    createdOnAsString={a.createdOnAsString} />)
                : <div className="text-center">
                    <h3 className="col-lg-12 text-center nothing-found custom-font">Nothing found!</h3>
                    <img className="nothing-found-pic m-3" src="./pregnant-woman-concept-in-cute-cartoon-style-free-vector.jpg" alt="nothing-found-pic"></img>
                </div>}
        </div>
    );
}

export default ArticlesList;