import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { SortOption } from '../types/User.js';
import { getSortOptionLabel } from '../utils/helpers.js';

interface SortButtonProps {
    currentSort: SortOption;
    onSortChange: (sortOption: SortOption) => void;
}

const SortButton: React.FC<SortButtonProps> = ({ currentSort, onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const sortOptions: SortOption[] = ['nameAsc', 'nameDesc', 'countryAsc', 'countryDesc'];

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: SortOption) => {
        onSortChange(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <button
                onClick={handleToggle}
                className="btn btn-outline dropdown-trigger"
                aria-label={`Current sort: ${getSortOptionLabel(currentSort)}. Click to open sort options.`}
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                <ArrowUpDown className="icon-sm" />
                {getSortOptionLabel(currentSort)}
                <ChevronDown className={`icon-sm dropdown-chevron ${isOpen ? 'dropdown-chevron-open' : ''}`} />
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <ul role="menu">
                        {sortOptions.map((option) => (
                            <li key={option} role="none">
                                <button
                                    onClick={() => handleOptionSelect(option)}
                                    className={`dropdown-item ${option === currentSort ? 'dropdown-item-active' : ''}`}
                                    role="menuitem"
                                >
                                    <span>{getSortOptionLabel(option)}</span>
                                    {option === currentSort && (
                                        <Check className="icon-sm dropdown-check" />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SortButton;

