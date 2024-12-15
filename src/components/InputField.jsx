import React from 'react'

const InputField = ({ id, value, onchange, error, label, type }) => {
    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <input
               type={type && type}
                id={id}
                value={value}
                onChange={onchange}
                style={{ border: error ? '1px solid red' : '1px solid #444' }}
            />
            {error && <small className='error'>{error}</small>}
        </div>
    )
}

export default InputField
