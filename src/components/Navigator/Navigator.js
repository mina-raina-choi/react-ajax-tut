import React from 'react';
import {Button} from 'semantic-ui-react';
import './Navigator.css'

const Navigator = ({onClick, postId, disabled}) => (
    <div className="navigator">
        <Button 
        color="teal"
        content="Previous"
        icon="left arrow"
        labelPosition="left"
        onClick={
            () => onClick('PREV')
        }
        disabled={disabled}
        ></Button>
        <div className="navigator-page-num">
            {postId}
        </div>
        <Button 
        color="teal"
        content="Next"
        icon="right arrow"
        labelPosition="right"
        onClick={
            () => onClick('NEXT')
        }
        disabled={disabled}
        ></Button>
    </div>
)

export default Navigator;