import React from 'react';
import './index.css';

export default function Square(props) {

    return (
        <img className='square'
            onClick={props.onClick}
            src={props.value}
            alt="" />
    );
}
