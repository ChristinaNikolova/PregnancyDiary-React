import { useState, useEffect } from 'react';

import * as commentsService from '../../../services/commentsService.js';

import CreateComment from '../CreateComment/CreateComment.jsx';
import SingleComment from '../SingleComment/SingleComment.jsx';

import './CommentsListCurrentArticle.css';

function CommentsListCurrentArticle({ articleId }) {
    const [comments, setComments] = useState([]);
    const [hasToReload, setHasToReload] = useState(false);

    useEffect(() => {
        commentsService
            .getForCurrentArticle(articleId)
            .then(res => setComments(res))
            .then(setHasToReload(false))
            .catch(err => console.error(err));
    }, [hasToReload]);

    const reload = () => {
        setTimeout(() => {
            setHasToReload(true)
        }, 100);
    };

    return (
        <div className="comments-list-wrapper" >

            <CreateComment
                clickHandler={reload}
                articleId={articleId} />

            <div>
                {comments && comments.map(c =>
                    <SingleComment
                        key={c.id}
                        content={c.content}
                        formattedCreatedOn={c.createdOnAsString}
                        userUserName={c.userUserName} />)
                }
            </div>
        </div >
    );
}

export default CommentsListCurrentArticle;