interface FeaturedSectionProps {
  icon?: string;    // Make optional if not always needed
  title: string;
  description: string;
}

export default function FeaturedSection({ 
  icon, 
  title, 
  description 
}: FeaturedSectionProps) {
  return (
    <section className="featured-section">
      {icon && <img src={icon} alt={title} className="featured-icon" />}
      <h3>{title}</h3>
      <div className="featured-content">
        <p>{description}</p>
        {/* Add your featured items here */}
      </div>
    </section>
  );
}