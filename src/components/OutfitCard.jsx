import "../components/OutfitCard.css";
const OutfitCard = ({ outfit }) => {
  return (
    <div className="outfit-card">
      <div className="outfit-image">
        <img src={outfit.image} alt={outfit.title} />
      </div>
      <div className="outfit-content">
        <h3>{outfit.title}</h3>
        <p>{outfit.description}</p>
        <div className="outfit-items">
          <h4>Items:</h4>
          <ul>
            {outfit.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <button className="try-outfit-btn">Try This Outfit</button>
      </div>
    </div>
  );
};

export default OutfitCard;
