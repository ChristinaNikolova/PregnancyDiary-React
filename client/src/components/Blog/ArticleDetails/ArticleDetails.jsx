import { useState, useContext, useEffect } from 'react';

import * as articlesService from '../../../services/articlesService.js';

import './ArticleDetails.css';

function ArticleDetails({ match }) {
    const [article, setArticle] = useState({});
    const articleId = match.params.id;

    useEffect(() => {
        articlesService
            .getDetails(articleId)
            .then(res => setArticle(res))
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="article-details-wrapper" >
            <div className="pl-4">
                <h2 className="text-center p-1">{article.title}</h2>
                <hr />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-6">
                                <img />
                            </div>
                        </div>
                        <div className="col-lg-12 meta mb-2 mt-2">
                            <span className="single-meta m-2">
                                <i className="far fa-calendar-alt"></i> Created on:
                            </span>
                            <span className="single-meta m-2">
                                <i className="fas fa-user"></i> by <span></span>
                            </span>
                            <span className="single-meta m-2">
                                {/* {recipe.isFavourite
                                    ? <i className="fas fa-heart" onClick={this.removeFromFav.bind(this)}><span className="like-text cursive-font-style"> Remove from favourites</span></i>
                                    : <i className="far fa-heart" onClick={this.addToFav.bind(this)}><span className="like-text cursive-font-style"> Add to favourites</span></i>} */}
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <hr />
                        <h4 className="cursive-font-style">How to prepare:</h4>
                        <p className="item-description m-2">
                        </p>
                    </div>
                </div>
            </div>
            <hr className="custom-margin-left" />
            {/* { recipe.id
            ? <CommentsListCurrentRecipe recipeId={recipe.id} />
            : null
        }
        < div className="fill pt-1 pb-1" ></div > */}
        </div >
    );
}

export default ArticleDetails;