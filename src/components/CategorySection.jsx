// src/components/CategorySection.jsx
import PlantCard from './PlantCard';

/**
 * Renders a named category section with a PlantCard for each plant.
 * Requirements: 3.1, 3.2, 3.3
 */
export default function CategorySection({ category, plants }) {
  return (
    <section className="category-section" aria-label={category}>
      <h2 className="category-heading">{category}</h2>
      <div className="plants-grid">
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </section>
  );
}
