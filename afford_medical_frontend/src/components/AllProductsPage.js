import React, { useState } from 'react';
import axios from 'axios';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [company, setCompany] = useState('all');
  const [topN, setTopN] = useState(10);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//     //   const response = await axios.get(`http://localhost:5000/${company}/categories/${category}/products`, {
//     //     params: {
//     //       top: topN,
//     //       minPrice: minPrice,
//     //       maxPrice: maxPrice
//     //     }
//     //   });
//     const response = await axios.get('http://localhost:5000/categories/Laptop/products?n=5&page=1&maxPrice=1000&sortBy=price&order=asc&minPrice=100'),{
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     });
//       setProducts(response.data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/categories/Laptop/products?n=5&page=1&maxPrice=1000&sortBy=price&order=asc&minPrice=100`, {
        headers: {
          'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MjI5MTI2LCJpYXQiOjE3MTcyMjg4MjYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImUwNjVhN2M1LTcyZGQtNDQ3ZS04ZWNkLWQ1NzNkNGVmYjU4MiIsInN1YiI6ImF5dXNoLjIxMjVjc2UxMTk3QGtpZXQuZWR1In0sImNvbXBhbnlOYW1lIjoiS0lFVCBHcm91cCBvZiBJbnN0aXR1dGlvbiIsImNsaWVudElEIjoiZTA2NWE3YzUtNzJkZC00NDdlLThlY2QtZDU3M2Q0ZWZiNTgyIiwiY2xpZW50U2VjcmV0IjoiY0FTcmtkVEFSbm9xUlJQaSIsIm93bmVyTmFtZSI6IkF5dXNoIFNhY2hhbiIsIm93bmVyRW1haWwiOiJheXVzaC4yMTI1Y3NlMTE5N0BraWV0LmVkdSIsInJvbGxObyI6IjIxMDAyOTAxMDAwNDQifQ.pCH1kjZW55NV0ll0iv0kbKG8VX-e8SXJoq_y-4vU0aM" // Include the authorization token in the request headers
        }
      });
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div>
      <h1>All Products</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Company:
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
        <label>
          Top N:
          <input type="number" value={topN} onChange={(e) => setTopN(parseInt(e.target.value))} />
        </label>
        <label>
          Min Price:
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(parseInt(e.target.value))} />
        </label>
        <label>
          Max Price:
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="product-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>Company: {product.company}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}</p>
              <p>Availability: {product.availability}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductPage;
