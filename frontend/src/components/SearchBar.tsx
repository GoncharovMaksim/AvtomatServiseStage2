import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            className="search-clear"
            onClick={onClearSearch}
            title="Очистить поиск"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
