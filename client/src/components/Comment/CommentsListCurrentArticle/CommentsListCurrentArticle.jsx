import { useState, useEffect } from 'react';

import * as commentsService from '../../../services/commentsService.js';

import './CommentsListCurrentArticle.css';

function CommentsListCurrentArticle({ articleId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        commentsService
            .getForCurrentArticle(articleId)
            .then(res => setComments(res))
            .catch(err => console.error(err));
    }, []);

    console.log(comments);

    return (
        <div className="comments-list-wrapper" >

            {/* <CreateComment
            clickHandler={reload}
            recipeId={recipeId} />
        <div>
            {comments.map(c => <SingleComment
                key={c.id}
                content={c.content}
                formattedCreatedOn={c.formattedCreatedOn}
                clientUserName={c.clientUserName} />)}
        </div> */}
        </div >
    );
}

export default CommentsListCurrentArticle;