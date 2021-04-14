import { Link } from 'react-router-dom';

import './SingleArticle.css';

function SingleArticle({ id, title, shortContent, picture, categoryName, likesCount, commentsCount, createdOnAsString }) {
    return (
        <div className="media mb-4">
            <img className="mr-3 article-pic ml-3" src={picture} alt="article-picture"></img>
            <div className="media-body custom-font">
                <h5 className="mt-0">{title}</h5>
                {shortContent}
                <div>
                    <hr />
                    <span className="m-2"><i className="far fa-folder-open"></i> <b>{categoryName}</b></span>
                    <span className="m-2"><i className="far fa-heart"></i> <b>{likesCount}</b></span>
                    <span className="m-2"><i className="far fa-comments"></i> <b>{commentsCount}</b></span>
                    <span className="m-2"><i className="far fa-calendar-alt"></i> <b>{createdOnAsString}</b></span>
                    <div>
                        <Link to={`/articles/current-article/${id}`}>
                            <button className="btn btn-secondary m-2">Read more</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleArticle;