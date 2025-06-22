// src/pages/Home.tsx
import ProductList from '../components/ProductList';
import FeaturedSection from '../components/FeaturedSection';

export default function Home() {
  return (
    <main className="home-page">
      <h2>Welcome to Our Store</h2>
      <FeaturedSection />
      <ProductList />
    </main>
  );
}