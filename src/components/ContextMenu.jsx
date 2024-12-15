import React, { useCallback, useContext } from 'react'
import { useItems } from '../hooks/UseItems';
import { EditingContext } from '../context/ItemsChanger';

const ContextMenu = ({ position, setPosition, id, setFormData }) => {
    const [items, setItems] = useItems()
    console.dir(useContext(EditingContext))
    const [isEditing, setIsEditing] = useContext(EditingContext)

    const handleDelete = useCallback(() => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setPosition({});
    }, [id, setItems, setPosition])

    const handleEdit = useCallback(() => {
        const {title, category, amount} = items.find((data) => data.id === id)
        setIsEditing(id)

        if (!title) {
            console.log('No Data to be edited')
            return;
        }

        setFormData({title, category, amount})
        setPosition({})
    }, [id, items, setPosition])

    return (
        <div className="context-menu" style={position} >
            <div onClick={handleEdit} >Edit</div>
            <div onClick={handleDelete} >Delete</div>
        </div>
    )
}

export default ContextMenu
