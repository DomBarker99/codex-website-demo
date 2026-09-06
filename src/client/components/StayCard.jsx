const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function StayCard({ stay }) {
  return (
    <article className="stay-card">
      <div className={`stay-art scene-${stay.scene}`} aria-hidden="true">
        <span className="art-sun" />
        <span className="art-landscape" />
        <span className="art-house" />
        <span className="art-caption">{stay.caption}</span>
      </div>
      <div className="stay-content">
        <p className="stay-location">{stay.city}</p>
        <h3 className="stay-name">{stay.name}</h3>
        <p className="stay-description">{stay.description}</p>
        <div className="stay-details">
          <span className="stay-guests">Up to {stay.guests} guests</span>
          <p className="stay-price"><strong>{dollars.format(stay.price)}</strong><span> / night</span></p>
        </div>
      </div>
    </article>
  );
}
