import React from 'react';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products matched your search. Try adjusting your filters or keyword.</p>;
  }

  return (
    <div>
      {products.map((p) => (
        <div key={p._id} className="product-card">
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>
            <strong>Tenant:</strong> {p.tenant} | <strong>Category:</strong> {p.category}
          </p>
          <p><strong>Price:</strong> ${p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
