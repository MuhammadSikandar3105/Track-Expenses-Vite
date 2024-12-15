import { useEffect, useState } from "react"

export const useLocalStorage = (key, initialdata) => {
    const [data, setData] = useState(initialdata)

    useEffect(() => {
        const existingdata = JSON.parse(localStorage.getItem(key))
        if (existingdata) {
            setData(existingdata)
        } else {
            localStorage.setItem(key, JSON.stringify(initialdata))
        }
    }, [])


    const setLocalstorage = (newdata) => {
        if (typeof newdata === 'function') {
            localStorage.setItem(key, JSON.stringify(newdata(data)))
        } else {
            localStorage.setItem(key, JSON.stringify(newdata))
        }
        setData(newdata)
    }
    return [data, setLocalstorage]
}