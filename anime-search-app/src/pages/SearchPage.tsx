import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchAnime, setCurrentPage } from '../store/animeSlice';
import { RootState } from '../store';
import { useDebounce } from '../hooks/useDebounce';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';

const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error, searchQuery, currentPage, hasNextPage } = useSelector(
    (state: RootState) => state.anime
  );

  const debouncedSearchQuery = useDebounce(searchQuery, 250);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      setHasSearched(true);
      dispatch(searchAnime({ query: debouncedSearchQuery, page: currentPage }) as any);
    } else {
      setHasSearched(false);
    }
  }, [debouncedSearchQuery, currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="search-page">
      <h1>Anime Search</h1>
      <SearchBar />
      
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <div className="loading-text">Loading anime...</div>
        </div>
      )}
      
      {error && <div className="error">Error: {error}</div>}
      
      {!loading && !error && hasSearched && items.length === 0 && (
        <div className="no-results">No anime found for "{debouncedSearchQuery}"</div>
      )}
      
      {!loading && !error && items.length > 0 && (
        <>
          <div className="anime-grid">
            {items.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
      
      {!loading && !error && !hasSearched && items.length === 0 && (
        <div className="welcome-message">Enter an anime title to start searching</div>
      )}
    </div>
  );
};

export default SearchPage;