import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiClock, FiX } from 'react-icons/fi';

const SearchBar = ({ onSearch, history = [], onClearHistory, loading }) => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (city) => {
    setQuery(city);
    onSearch(city);
    setShowHistory(false);
  };

  return (
    <div className="search-container" ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => history.length > 0 && setShowHistory(true)}
            id="city-search-input"
            autoComplete="off"
          />
          <button
            type="submit"
            className="search-btn"
            disabled={!query.trim() || loading}
            id="city-search-btn"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {showHistory && history.length > 0 && (
        <div className="search-history">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.4rem 0.8rem',
              marginBottom: '4px',
            }}
          >
            <span
              style={{
                fontSize: 'var(--font-xs)',
                fontWeight: 600,
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Recent Searches
            </span>
            {onClearHistory && (
              <button
                onClick={onClearHistory}
                style={{
                  fontSize: 'var(--font-xs)',
                  color: 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <FiX size={12} /> Clear
              </button>
            )}
          </div>
          {history.map((item, i) => (
            <div
              key={i}
              className="search-history-item"
              onClick={() => handleHistoryClick(item.city)}
            >
              <FiClock size={14} />
              <span>{item.city}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
