import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/animeSlice';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for anime..."
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;