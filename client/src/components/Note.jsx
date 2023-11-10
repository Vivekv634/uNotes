import React from 'react';

export default function Note(props) {
    return (
        <div>
            <div>{props.title}</div>
            <div>{props.body}</div>
        </div>
    )
}
