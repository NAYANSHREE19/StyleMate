import OutfitCard from "../components/OutfitCard";
import "../components/RecommendationPage.css";
import casualpairing from "../assets/casual pairing.png";
import formalWomen from "../assets/formal-women.png";
import fasion from "../assets/fasion.png";
const RecommendationsPage = () => {
  const recommendations = [
    {
      id: 1,
      title: "Casual Weekend Look",
      image: casualpairing,
      description: "Perfect for a relaxed weekend outing",
      items: ["Blue Jeans", "White T-shirt", "Sneakers"],
    },
    {
      id: 2,
      title: "Business Casual",
      image: formalWomen,
      description: "Professional yet comfortable for office",
      items: ["Chinos", "Button-up Shirt", "Loafers"],
    },
    {
      id: 3,
      title: "Evening Dinner",
      image: fasion,
      description: "Elegant outfit for special occasions",
      items: ["Dark Suit", "Dress Shirt", "Oxford Shoes"],
    },
  ];

  return (
    <div className="recommendations-page">
      <div className="container">
        <h2>Recommendations</h2>
        <p>
          Check out the latest outfit suggestions based on your style
          preferences.
        </p>

        <div className="recommendations-grid">
          {recommendations.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
