import React, { useState, useEffect } from 'react';
import api from './api';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState({});
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const fetchProducts = async (params) => {
    const { category, tenant, keyword, sort, page = 1 } = params;

    try {
      setIsLoading(true); 
      setError(null); 
      const { data } = await api.get('/search', {
        params: { category, tenant, keyword, sort, page, limit: 10 },
      });

      setProducts(data.docs);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error('Error fetching products:', e);
      setError('Failed to fetch products. Please try again.'); 
    }
    finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      fetchProducts({ ...searchParams, page });
    }
  }, [page]);

  const handleSearch = (params) => {
    setSearchParams(params);
    setPage(1); 
    fetchProducts(params);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'auto' });

  };
  

  return (
    <div className="App">
      <h1 className="app-title">Product Peek</h1>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <p>Loading products…</p>} 
      {error && <p className="error-message">{error}</p>} 
      <ProductList products={products} />
      {products.length > 0 && totalPages > 1 && (
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />

      )}

    </div>
  );
}

export default App;

