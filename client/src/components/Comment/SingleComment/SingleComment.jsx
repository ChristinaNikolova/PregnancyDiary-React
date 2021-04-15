import './SingleComment.css';

function SingleComment({ content, formattedCreatedOn, userUserName }) {
    return (
        <article className="post post-content">
            <div className="single-comment-wripper">
                <p className="comment-content">{content}</p>
                <hr />
                <div className="info">
                    <i className="fas fa-calendar-alt"></i><span className="ml-1 custom-font">{formattedCreatedOn}</span>
                </div>
                <div className="info">
                    <i className="fas fa-user"></i><span className="ml-1 custom-font">{userUserName}</span>
                </div>
            </div>
        </article>
    );
}

export default SingleComment;