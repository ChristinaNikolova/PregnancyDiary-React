import { Link } from "react-router-dom";

import './SingleArticleCategory.css';

function SingleArticleCategory({ id, name, articlesCount, clickHandler }) {
    return (
        <>
            <Link onClick={clickHandler} to={`/articles/by-category/${id}`}>{name}: </Link><span className="articles-count mr-2">{articlesCount}</span>
        </>
    );
}

export default SingleArticleCategory;