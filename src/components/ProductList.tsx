// src/components/ProductList.tsx
import { Product } from '../types'; // You'll need to define this type

export default function ProductList() {
  // Temporary mock data - replace with your real data source
  const products: Product[] = [
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    { id: 3, name: 'Product 3', price: 39.99 }
  ];

  return (
    <div className="product-list">
      <h3>Our Products</h3>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}