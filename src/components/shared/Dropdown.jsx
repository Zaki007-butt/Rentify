import React, { useState } from 'react';

const Dropdown = ({ filterField, list = [], setElement }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSetElement = (id, name) => {
    setElement(id);
    setSelectedItem(name || null);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative py-8 pr-2">
      <button
        id="dropdownDefault"
        onClick={toggleDropdown}
        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition duration-200"
        type="button"
      >
        {selectedItem ? `${selectedItem}` : `Filter by ${filterField}`}
        <svg
          className="w-4 h-4 ml-2 transition-transform duration-200"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdown"
          className="absolute mt-2 z-10 w-48 p-3 bg-white rounded-lg shadow-lg dark:bg-gray-700 transition-opacity duration-200"
        >
          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            {filterField}
          </h6>
          <ul
            className="space-y-2 text-sm max-h-60 overflow-y-auto"
            aria-labelledby="dropdownDefault"
          >
            {list.map((element) => (
              <li
                key={element.id}
                className="flex items-center cursor-pointer px-2 py-1 rounded-lg hover:bg-primary-100 dark:hover:bg-gray-600 transition duration-200"
                onClick={() => handleSetElement(element.id, element.name)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleSetElement(element.id, element.name)
                }
                tabIndex={0}
                role="button"
              >
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {element.name}
                </span>
              </li>
            ))}
            <li
              className="flex items-center cursor-pointer px-2 py-1 rounded-lg hover:bg-red-100 dark:hover:bg-gray-600 text-red-500 dark:text-red-400 transition duration-200"
              onClick={() => handleSetElement(null, null)}
              onKeyDown={(e) => e.key === 'Enter' && handleSetElement(null, null)}
              tabIndex={0}
              role="button"
            >
              <span className="ml-2 text-sm font-medium">Reset Category</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
