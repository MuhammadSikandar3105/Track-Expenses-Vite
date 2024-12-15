import React, { useEffect, useState } from 'react'
import { useItems } from '../hooks/UseItems';
import { UseFilter } from '../hooks/UseFilter';
import ContextMenu from './ContextMenu'
import { useLocalStorage } from '../hooks/UseLocalStorage';

const Result = ({ setFormData }) => {
    const [items, setItems] = useItems()
    const [filteredItem, setFilters] = UseFilter(items)
    const [position, setPosition] = useLocalStorage('position',{})
    const [id, setId] = useLocalStorage('id','')
    const [sortCallback, setSortCallback] = useState(() => () => { })


    // filter function onchange and set the filters to the hook
    const handleFilter = (e) => {
        if (e.target.value === 'all') {
            return setFilters([])
        }
        const filters = [
            (item) => item.category.toLowerCase() === e.target.value.toLowerCase(),
            // (item) => item.amount === '200'
        ];
        setFilters(filters)
    }

    const handleSorting = (e) => {
        const value = e.currentTarget.dataset.value
        if (value === 'titleAscending') {
            return setSortCallback(() => (a, b) => b.title.localeCompare(a.title))
        }
        if (value === 'titleDescending') {
            return setSortCallback(() => (a, b) => a.title.localeCompare(b.title))
        }
        if (value === 'amountAscending') {
            return setSortCallback(() => (a, b) => b.amount - a.amount)
        }
        if (value === 'amountDescending') {
            return setSortCallback(() => (a, b) => a.amount - b.amount)
        }
    }
    const handleClearSort = () => {
        setSortCallback(() => () => { })
    }

    return (
        <>
            {position && position.left ? (
                <ContextMenu key={id} position={position} setPosition={setPosition} id={id} setFormData={setFormData} />
            ) : null}
            <table className="expense-table" onClick={() => {
                if (position.left) {
                    setPosition({})
                }
            }} >
                <thead>
                    <tr>
                        <th className="amount-column">
                            <div>
                                <span>Title</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    viewBox="0 0 384 512"
                                    className="arrow up-arrow"
                                    data-value="titleAscending"
                                    onClick={handleSorting}
                                >
                                    <title>Ascending</title>
                                    <path
                                        d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    viewBox="0 0 384 512"
                                    className="arrow down-arrow"
                                    data-value="titleDescending"
                                    onClick={handleSorting}
                                >
                                    <title>Descending</title>
                                    <path
                                        d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                                    />
                                </svg>
                            </div>
                        </th>
                        <th>
                            <select onChange={handleFilter} >
                                <option value="all">All</option>
                                <option value="grocery">Grocery</option>
                                <option value="clothes">Clothes</option>
                                <option value="bills">Bills</option>
                                <option value="education">Education</option>
                                <option value="medicine">Medicine</option>
                            </select>
                        </th>
                        <th className="amount-column">
                            <div>
                                <span>Amount</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    viewBox="0 0 384 512"
                                    className="arrow up-arrow"
                                    data-value="amountAscending"
                                    onClick={handleSorting}
                                >
                                    <title>Ascending</title>
                                    <path
                                        d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    viewBox="0 0 384 512"
                                    className="arrow down-arrow"
                                    data-value="amountDescending"
                                    onClick={handleSorting}
                                >
                                    <title>Descending</title>
                                    <path
                                        d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                                    />
                                </svg>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItem ? Object.values(filteredItem).sort(sortCallback).map((item) => {
                        return (
                            <tr key={item.id} onContextMenu={(e) => {
                                e.preventDefault()
                                setPosition({ left: e.clientX + 6, top: e.clientY + 6 })
                                setId(item.id)
                            }} >
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>{item.amount}</td>
                            </tr>
                        )
                    }) : ''}

                    <tr>
                        <th>Total</th>
                        <th className='clearsort' onClick={handleClearSort}>Clear sort</th>
                        <th>Rs {filteredItem ? filteredItem.reduce((acumulator, current) => {
                            return acumulator + Number(current.amount)
                        }, 0) : ''}</th>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Result
