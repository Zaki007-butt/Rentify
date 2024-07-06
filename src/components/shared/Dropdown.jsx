import React, { useState } from 'react';

const Dropdown = ({filterField}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="py-8 pr-2">
      <button
        id="dropdownDefault"
        onClick={toggleDropdown}
        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="button"
      >
        Filter by {filterField}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 ${isDropdownOpen ? '' : 'hidden'} w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}
      >
        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
          {filterField}
        </h6>
        <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
          <li className="flex items-center">
            <input
              id="apple"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="apple"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Apple (56)
            </label>
          </li>
          {/* Add more list items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
