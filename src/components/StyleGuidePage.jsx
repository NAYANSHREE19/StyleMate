import React, { useState } from "react";
import { Heart, Star, Bookmark, Share2, Filter, Search } from "lucide-react";
import "../components/StyleGuidePage.css";

const StyleGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Styles", count: 24 },
    { id: "casual", name: "Casual", count: 8 },
    { id: "formal", name: "Formal", count: 6 },
    { id: "business", name: "Business", count: 5 },
    { id: "evening", name: "Evening", count: 5 },
  ];

  const styleItems = [
    {
      id: 1,
      title: "Minimalist Chic",
      category: "casual",
      image: "/api/placeholder/300/400",
      description: "Clean lines and neutral tones for effortless elegance",
      tags: ["minimalist", "neutral", "comfortable"],
      rating: 4.8,
      likes: 127,
    },
    {
      id: 2,
      title: "Business Professional",
      category: "business",
      image: "/api/placeholder/300/400",
      description: "Sharp tailoring meets modern sophistication",
      tags: ["professional", "structured", "confident"],
      rating: 4.9,
      likes: 203,
    },
    {
      id: 3,
      title: "Romantic Evening",
      category: "evening",
      image: "/api/placeholder/300/400",
      description: "Soft fabrics and delicate details for special occasions",
      tags: ["romantic", "elegant", "feminine"],
      rating: 4.7,
      likes: 189,
    },
    {
      id: 4,
      title: "Smart Casual",
      category: "casual",
      image: "/api/placeholder/300/400",
      description: "The perfect balance between comfort and style",
      tags: ["versatile", "comfortable", "polished"],
      rating: 4.6,
      likes: 156,
    },
    {
      id: 5,
      title: "Power Dressing",
      category: "formal",
      image: "/api/placeholder/300/400",
      description: "Command attention with bold and structured pieces",
      tags: ["bold", "structured", "confident"],
      rating: 4.9,
      likes: 234,
    },
    {
      id: 6,
      title: "Bohemian Luxe",
      category: "casual",
      image: "/api/placeholder/300/400",
      description: "Free-spirited style with premium fabrics and details",
      tags: ["bohemian", "luxurious", "artistic"],
      rating: 4.5,
      likes: 142,
    },
  ];

  const filteredItems = styleItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="style-guide">
      <div className="container">
        {/* Header */}
        <div className="style-guide-header">
          <div className="header-content">
            <h1>Style Guide</h1>
            <p className="header-description">
              Discover curated fashion styles and find inspiration for your
              personal wardrobe. Each style is carefully crafted to help you
              express your unique personality.
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search styles, tags, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <Filter className="filter-icon" />
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`category-btn ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                >
                  {category.name}
                  <span className="category-count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Style Grid */}
        <div className="styles-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="style-card">
              <div className="style-image">
                <img src={item.image} alt={item.title} />
                <div className="style-overlay">
                  <div className="overlay-actions">
                    <button className="action-btn" title="Add to favorites">
                      <Heart className="icon" />
                    </button>
                    <button className="action-btn" title="Save to collection">
                      <Bookmark className="icon" />
                    </button>
                    <button className="action-btn" title="Share style">
                      <Share2 className="icon" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="style-content">
                <div className="style-header">
                  <h3 className="style-title">{item.title}</h3>
                  <div className="style-rating">
                    <Star className="star-icon" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <p className="style-description">{item.description}</p>

                <div className="style-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="style-footer">
                  <div className="likes">
                    <Heart className="heart-icon" />
                    <span>{item.likes} likes</span>
                  </div>
                  <button className="try-style-btn">Try This Style</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="empty-state">
            <div className="empty-content">
              <h3>No styles found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="reset-btn"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StyleGuide;
