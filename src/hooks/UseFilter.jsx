import { useMemo, useState } from "react"

export const UseFilter = (data = [], filterargu = []) => {
    const [filters, setFilters] = useState(filterargu)


    const filteredItem = useMemo(() => {
        if (!Array.isArray(data)) {
            // console.log(`Data must be array form`)
            return [];
        };
        if (data.length === 0) {
            // console.log(`data is empty`)
            return [];
        };
        if (filters.length === 0) {
            // console.log('No filter applied')
            return data;
        };

      return  data.filter((item) => {
            return filters.every((filter) => filter(item))
        });
    }, [data, filters]);

    return [filteredItem, setFilters]
}