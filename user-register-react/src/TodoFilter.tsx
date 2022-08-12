import React from "react";
import { UserStatus } from "./todo.model";
import { FilterChangeListener, FilterType } from "./TodoApp";
import './TodoFilter.css'

interface UserFilterProps {
    filter: FilterType;
    onFilterChange: FilterChangeListener;
}

export default function UserFilter({filter, onFilterChange}: UserFilterProps) {
    function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange(event.target.value === '0'? undefined: parseInt(event.target.value))
    }
    return(
        <select value={filter} onChange={handleFilterChange} className='UserFilter'>
            <option value="0">ALL</option>
            <option value={UserStatus.Active}>Active</option>
            <option value={UserStatus.Suspended}>Suspended</option>
            <option value={UserStatus.Deactivated}>Deactivated</option>
        </select>
    );
} 