import React from 'react'
import './input.scss';

export const Input = (props) => {
    return (
        <input
            className='input'
            onChange={(event) => props.setValue(event.target.value)}
            value={props.value}
            type={props.type}
            placeholder={props.placeholder}
        />
    )
}
