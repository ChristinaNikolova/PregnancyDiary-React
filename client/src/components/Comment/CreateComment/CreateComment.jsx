import { useState } from 'react';

import * as validator from '../../../utils/validators/commentValidator.js';

import Input from '../../shared/Input/Input.jsx';

import './CreateComment.css';

function CreateComment({ createHandler }) {
    const [errorMessage, setErrorMessage] = useState('');

    const onCreateCommentSubmitHandler = (e) => {
        e.preventDefault();

        const content = e.target.content.value;

        setErrorMessage(validator.validContent(content));

        if (validator.validContent(content) === '') {
            e.target.content.value = '';
            createHandler(content);
        };
    };

    return (
        <div className="create-comment-wrapper">
            <h2 className="pl-2 custom-font">Comments</h2>
            <div className="post post-content">
                <h5 className="comments-title-second-title custom-font">Leave comment</h5>
                <form className="comment-form" onSubmit={onCreateCommentSubmitHandler}>
                    <Input
                        type='text'
                        name='content'
                        label=''
                        placeholder='Write you comment...'
                        error={errorMessage} />
                    <button type="submit" className="btn mt-2"> Add Comment</button >
                </form>
            </div>
        </div>);
}

export default CreateComment;