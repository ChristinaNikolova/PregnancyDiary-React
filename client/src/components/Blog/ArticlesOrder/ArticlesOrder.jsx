import { useState } from 'react';

import './ArticlesOrder.css';

function ArticlesOrder({ clickHandler }) {
    const [isShown, setIsShown] = useState(false);

    const toogle = (criteria) => {
        const prevState = isShown;
        setIsShown(!prevState);
        clickHandler(criteria);
    };

    return (
        <div className="order-wrapper">
            <button
                className="btn m-4"
                onClick={toogle}>
                {isShown
                    ? <i className="fas fa-hand-point-down p-2"></i>
                    : <i className="fas fa-hand-point-right p-2"></i>}
                Order by
            </button>

            {isShown
                ? <ul>
                    <li
                        className="article-order"
                        onClick={() => toogle("old")}>
                        <i className="fas fa-check-circle"></i>Oldest to newest</li>
                    <li
                        className="article-order"
                        onClick={() => toogle("new")}>
                        <i className="fas fa-check-circle"></i>Newest to oldest</li>
                    <li
                        className="article-order"
                        onClick={() => toogle("likes")}>
                        <i className="fas fa-check-circle"></i>Likes Count</li>
                    <li
                        className="article-order"
                        onClick={() => toogle("comments")}>
                        <i className="fas fa-check-circle"></i>Comments Count</li>
                </ul>
                : <div></div>}
        </div>
    );
}

export default ArticlesOrder