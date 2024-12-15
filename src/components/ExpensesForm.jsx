import React, { useContext } from 'react'
import InputField from './InputField'
import SelectMenue from './SelectMenue'
import Button from './Button'
import { EditingContext } from '../context/ItemsChanger'

const ExpensesForm = ({ handleAddItem, handleInputChange, formData, errors, handleSaveItem }) => {
    const [isEditing, setIsEditing] = useContext(EditingContext)
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <InputField id='title' value={formData.title} label='Title' onchange={handleInputChange} error={errors.title} />
            <SelectMenue id='category' options={['Grocery', 'Clothes', 'Bills', 'Education', 'Medicine']} defaultValue='Select Category' value={formData.category} label='Category' onchange={handleInputChange} error={errors.category} />
            <InputField id='amount' type='number' value={formData.amount} label='Amount' onchange={handleInputChange} error={errors.amount} />
            {isEditing ? <Button title={'Save'} onclick={handleSaveItem} /> : <Button title={'Add'} onclick={handleAddItem} />}
        </form>
    )
}

export default ExpensesForm
