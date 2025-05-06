import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE;

const SearchBar = ({ onSearch }) => {
  const [category, setCategory] = useState('');
  const [tenant, setTenant] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [skipSuggestions, setSkipSuggestions] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tenants, setTenants] = useState([]);
  const suggestionRef = useRef();


  useEffect(() => {
    const fetchFilteredFilters = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/filtered-filters`, {
          params: { category, tenant },
        });
        setCategories(data.categories);
        setTenants(data.tenants);
      } catch (e) {
        console.error('Failed to load filtered filters:', e);
      }
    };
  
    fetchFilteredFilters();
  }, [category, tenant]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setSuggestions([]); 
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty =
    category.trim() === '' &&
    tenant.trim() === '' &&
    keyword.trim() === '';

  if (isEmpty) {
    alert('Please enter a search keyword or select a filter.');
    return;
  }

    onSearch({ category, tenant, keyword, sort, page: 1 });
  };

  const handleClear = () => {
    setCategory('');
    setTenant('');
    setKeyword('');
    setSort('');
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setSkipSuggestions(true);
    setKeyword(suggestion);
    setSuggestions([]);
    onSearch({ category, tenant, keyword: suggestion, sort, page: 1 });
  };

  useEffect(() => {
    if (skipSuggestions) {
      setSkipSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      if (!keyword.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const { data } = await axios.get(`${BASE_URL}/suggestions`, {
          params: { keyword },
        });
        setSuggestions(data);
      } catch (e) {
        console.error('Suggestion fetch failed:', e);
      }
    };

    const delay = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword]);

  return (
    <div className="search-bar-container">
    <form onSubmit={handleSubmit} className="search-form">
  <div className="form-group">
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((c, i) => (
        <option key={i} value={c}>{c}</option>
      ))}
    </select>
  </div>

  <div className="form-group">
    <select value={tenant} onChange={(e) => setTenant(e.target.value)}>
      <option value="">All Brands</option>
      {tenants.map((t, i) => (
        <option key={i} value={t}>{t}</option>
      ))}
    </select>
  </div>

  <div className="form-group keyword-wrapper">
  <input
  type="text"
  placeholder="Search..."
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSuggestions([]); 
      onSearch({ category, tenant, keyword, sort, page: 1 }); 
    }
  }}
  />

    {suggestions.length > 0 && (
      <ul className="suggestions-dropdown" ref={suggestionRef}>
        {suggestions.map((s, idx) => (
          <li key={idx} onClick={() => handleSuggestionClick(s)}>
            {s}
          </li>
        ))}
      </ul>
    )}
  </div>

  <div className="form-group">
    <select value={sort} onChange={(e) => setSort(e.target.value)}>
      <option value="">Sort by</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A → Z</option>
      <option value="name-desc">Name: Z → A</option>
    </select>
  </div>

  <div className="form-group">
    <button type="submit">Search</button>
    <button type="button" onClick={handleClear} className="clear-btn">Clear</button>
  </div>
</form>
</div>

  );
};

export default SearchBar;
