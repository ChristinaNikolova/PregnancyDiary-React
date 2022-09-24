import { useState, useEffect } from 'react';
import toastr from 'toastr';

import * as commentsService from '../../../services/commentsService.js';

import CreateComment from '../CreateComment/CreateComment.jsx';
import SingleComment from '../SingleComment/SingleComment.jsx';

import './CommentsListCurrentArticle.css';

function CommentsListCurrentArticle({ articleId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        loadComments();
    }, []);

    const onCreateCommentHandler = (content) => {
        commentsService
            .create(content, articleId)
            .then((data) => {
                if (data['status'] === 400) {
                    toastr.error(data['message'], 'Error');
                    return;
                };
                loadComments();
                toastr.success(data['message'], 'Success');
            });
    }

    const loadComments = () => {
        commentsService
            .getForCurrentArticle(articleId)
            .then(res => setComments(res))
            .catch(err => console.error(err));
    }

    return (
        <div className="comments-list-wrapper" >

            <CreateComment
                createHandler={onCreateCommentHandler}
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