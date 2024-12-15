import React, { useContext, useState } from 'react'
import Result from './Result';
import { useItems } from '../hooks/UseItems';
import ExpensesForm from './ExpensesForm';
import { EditingContext } from '../context/ItemsChanger';
import { useLocalStorage } from '../hooks/UseLocalStorage';

const Adding = () => {
    const [formData, setFormData] = useLocalStorage('formData', { id: crypto.randomUUID(), title: '', category: '', amount: '' });
    const [items, setItems] = useItems();
    const [errors, setErrors] = useState({})
    const [isEditing, setIsEditing] = useContext(EditingContext)

    // Handlers for inputs
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
        setErrors({})
    };

    const Emailvlaidation = {
        email: [
            { pateren: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ }
        ]
    };


    const validate = () => {
        const newErrors = {}; // Local object to store all errors
        for (const [key, value] of Object.entries(formData)) {
            if (!value.trim()) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
                break;
            };
            if (value.trim().length < 2) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} must be at least 2 chracter`
                break;
            };
            // email validation
            // if (!Emailvlaidation[key][0].pateren.test(value)) {
            //     newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is not valid`
            // }
        };
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Add item handler
    const handleAddItem = () => {
        if (!validate()) return;

        if (isEditing) {
            setItems((prevState) =>
                prevState.map((item) => {
                    if (item.id === isEditing) {
                        return { ...formData, id: isEditing }
                    }
                    return item
                })
            )
            setFormData({ id: crypto.randomUUID(), title: '', category: '', amount: '' });
            setIsEditing('')
            return
        }
        // Add the current formData as a new object in the items array
        setItems(prevItems => [...prevItems, { ...formData, id: crypto.randomUUID() }]);
        // Reset formData to clear the fields
        setFormData({ id: crypto.randomUUID(), title: '', category: '', amount: '' });
        setErrors({})
    };

    return (
        <>
            <main>
                <h1>Track Your Expense</h1>
                <div className="expense-tracker">
                    <ExpensesForm errors={errors} handleSaveItem={handleAddItem} handleAddItem={handleAddItem} handleInputChange={handleInputChange} formData={formData} />
                    <Result setFormData={setFormData} />
                </div>
            </main>
        </>
    );
}

export default Adding
