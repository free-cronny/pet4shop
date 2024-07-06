// resources/js/Components/SelectInput.js

import React from 'react';

export default function InputSelect({ id, name, value, onChange, options, className }) {
    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`border-gray-300 focus:border-lime-500 focus:ring-lime-500 rounded-md shadow-sm ${className}`}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
