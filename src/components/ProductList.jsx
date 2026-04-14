// src/components/ProductList.jsx
import Header from './Header';
import CategorySection from './CategorySection';
import { plants } from '../data/plants';

/**
 * Product listing page — shows all plants grouped by category.
 * Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3
 */
export default function ProductList({ navigate }) {
  // Group plants by category, preserving order of first appearance.
  const grouped = plants.reduce((acc, plant) => {
    if (!acc[plant.category]) acc[plant.category] = [];
    acc[plant.category].push(plant);
    return acc;
  }, {});

  return (
    <div className="product-listing-page">
      <Header
        onLogoClick={() => navigate('landing')}
        onCartClick={() => navigate('cart')}
      />
      <main className="product-listing-main">
        {Object.entries(grouped).map(([category, categoryPlants]) => (
          <CategorySection
            key={category}
            category={category}
            plants={categoryPlants}
          />
        ))}
      </main>
    </div>
  );
}
