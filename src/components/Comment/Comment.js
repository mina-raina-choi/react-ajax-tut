import React from 'react';
import './Comment.css';

const Comment = ({name, body}) => {
    return (
        <li className="comment">
            <p>
                <b>{name}</b> {body}
            </p>
        </li>
    )
}

export default Comment;