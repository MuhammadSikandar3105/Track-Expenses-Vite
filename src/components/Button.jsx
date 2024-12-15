import React from 'react'

const Button = ({onclick, title}) => {
    return (
        <button
            type="button"
            className="add-btn"
            onClick={onclick}
        >
            {title}
        </button>
    )
}

export default Button
