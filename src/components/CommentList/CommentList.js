import React from 'react';
import './CommentList.css';
import {Comment} from '../';

const CommentList = ({comments}) => {

    const commentList = comments.map(
        (comment, index)=>(
            <Comment
                name={comment.email.split('@')[0]}
                body={comment.body}
                key={index}
            />
        )
    )

    return (
        <ul className="commentList">
            {commentList}
        </ul>
    )
}

export default CommentList;