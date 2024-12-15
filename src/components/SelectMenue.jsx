import React from 'react'

const SelectMenue = ({ id, value, onchange, error, label, options, defaultValue }) => {
    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <select id={id} value={value} onChange={onchange} style={{ border: error ? '1px solid red' : '1px solid #444' }}>
                {
                    defaultValue && <option value="" hidden>{defaultValue}</option>
                }
                {options?.map((option) => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
            {error && <small className='error'>{error}</small>}
        </div>
    )
}

export default SelectMenue
