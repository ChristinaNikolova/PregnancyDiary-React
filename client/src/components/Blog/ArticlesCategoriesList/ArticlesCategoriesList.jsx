import { useState, useEffect } from 'react';

import * as categoriesService from '../../../services/categoriesService.js';
import SingleArticleCategory from '../SingleArticleCategory/SingleArticleCategory.jsx';

import './ArticlesCategoriesList.css'

function ArticlesCategoriesList({ clickHandler }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoriesService
            .getArticlesCountByCategories()
            .then(res => setCategories(res))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="artilces-categories-wrapper">
            <h4 className="text-center custom-font">Articles by Categories</h4>
            <div className="text-center custom-color-link">
                {categories
                    .map(c => <SingleArticleCategory
                        key={c.id}
                        id={c.id}
                        name={c.name}
                        articlesCount={c.articlesCount}
                        clickHandler={clickHandler} />)}
            </div>
        </div>
    )
}

export default ArticlesCategoriesList;