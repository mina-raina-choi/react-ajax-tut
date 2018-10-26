import React from 'react';
import './PostWrapper.css';

const PostWrapper = ({children}) => (
    <div className="postWrapper">
        {children}
    </div>
)


export default PostWrapper;