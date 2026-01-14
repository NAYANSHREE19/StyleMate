import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Upload, Sparkles, TrendingUp } from 'lucide-react';
// import WardrobeML from '../utils/wardrobe-ml';
import '../components/RecommendationPage.css';

function RecommendationPage() {
  const [wardrobe, setWardrobe] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [stats, setStats] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('All Season');
  const [tags, setTags] = useState({
    type: '',
    color: '',
    season: ''
  });

  // Load from storage on mount
  useEffect(() => {
    loadWardrobe();
  }, []);

  // Update recommendations when wardrobe changes
  useEffect(() => {
    if (wardrobe.length > 0) {
      const { recommendations: recs } = WardrobeML.getOutfitRecommendations(
        wardrobe,
        null,
        selectedSeason === 'All Season' ? null : selectedSeason
      );
      setRecommendations(recs);
      setStats(WardrobeML.getWardrobeStats(wardrobe));
      setSuggestions(WardrobeML.getWardrobeSuggestions(wardrobe));
    }
  }, [wardrobe, selectedSeason]);

  const loadWardrobe = async () => {
    try {
      const result = await window.storage.get('wardrobe-items');
      if (result) {
        setWardrobe(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No items in wardrobe yet');
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagChange = (e) => {
    const { name, value } = e.target;
    setTags(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClothes = async () => {
    if (!imagePreview || !tags.type || !tags.color || !tags.season) {
      alert('Please select an image and fill all tags');
      return;
    }

    const newItem = {
      id: Date.now(),
      image: imagePreview,
      tags: { ...tags },
      addedDate: new Date().toLocaleDateString()
    };

    const updatedWardrobe = [...wardrobe, newItem];
    setWardrobe(updatedWardrobe);

    try {
      await window.storage.set('wardrobe-items', JSON.stringify(updatedWardrobe));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }

    // Reset form
    setImagePreview(null);
    setSelectedFile(null);
    setTags({ type: '', color: '', season: '' });
  };

  const handleDeleteItem = async (id) => {
    const updatedWardrobe = wardrobe.filter(item => item.id !== id);
    setWardrobe(updatedWardrobe);

    try {
      await window.storage.set('wardrobe-items', JSON.stringify(updatedWardrobe));
    } catch (error) {
      console.error('Error updating storage:', error);
    }
  };

  return (
    <div className="wardrobe-main-container">
      <div className="wardrobe-max-width">
        {/* Header */}
        <div className="wardrobe-header">
          <h1>Virtual Wardrobe</h1>
          <p>Upload and organize the clothes you already own</p>
        </div>

        <div className="wardrobe-main-grid">
          {/* Upload Section */}
          <div>
            <div className="upload-card">
              <h2>Add Clothes</h2>

              {/* Image Upload */}
              <div className="image-upload-section">
                <label className="image-upload-label">
                  Upload Image
                </label>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    id="image-input"
                  />
                  <label
                    htmlFor="image-input"
                    className={`image-upload-box ${imagePreview ? 'has-preview' : ''}`}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="preview"
                      />
                    ) : (
                      <div className="upload-placeholder">
                        <Upload size={32} />
                        <p>Click to upload</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Tags */}
              <div className="form-groups">
                {/* Type */}
                <div className="form-group">
                  <label>Type</label>
                  <select
                    name="type"
                    value={tags.type}
                    onChange={handleTagChange}
                  >
                    <option value="">Select type</option>
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pants">Pants</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Dress">Dress</option>
                    <option value="Skirt">Skirt</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Sweater">Sweater</option>
                    <option value="Shorts">Shorts</option>
                    <option value="Shoes">Shoes</option>
                  </select>
                </div>

                {/* Color */}
                <div className="form-group">
                  <label>Color</label>
                  <select
                    name="color"
                    value={tags.color}
                    onChange={handleTagChange}
                  >
                    <option value="">Select color</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Pink">Pink</option>
                    <option value="Purple">Purple</option>
                    <option value="Brown">Brown</option>
                    <option value="Gray">Gray</option>
                    <option value="Navy">Navy</option>
                  </select>
                </div>

                {/* Season */}
                <div className="form-group">
                  <label>Season</label>
                  <select
                    name="season"
                    value={tags.season}
                    onChange={handleTagChange}
                  >
                    <option value="">Select season</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="All Season">All Season</option>
                  </select>
                </div>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddClothes}
                className="btn-add-clothes"
              >
                <Plus size={20} />
                Add to Wardrobe
              </button>
            </div>
          </div>

          {/* Wardrobe Display */}
          <div>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>My Wardrobe</h2>
            
            {wardrobe.length === 0 ? (
              <div className="empty-state">
                <p>No clothes added yet. Start by uploading your first item!</p>
              </div>
            ) : (
              <div className="wardrobe-grid">
                {wardrobe.map(item => (
                  <div
                    key={item.id}
                    className="clothing-card"
                  >
                    <div className="clothing-card-image-wrapper">
                      <img
                        src={item.image}
                        alt={item.tags.type}
                        className="clothing-card-image"
                      />
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="delete-button"
                        title="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="clothing-card-content">
                      <p className="clothing-type">{item.tags.type}</p>
                      <div className="clothing-tags">
                        <span className="tag tag-color">
                          {item.tags.color}
                        </span>
                        <span className="tag tag-season">
                          {item.tags.season}
                        </span>
                      </div>
                      <p className="clothing-date">Added: {item.addedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        {wardrobe.length > 0 && stats && (
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              <TrendingUp size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Wardrobe Stats
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="empty-state" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #ec4899, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {stats.totalItems}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Items</p>
              </div>
              <div className="empty-state" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #ec4899, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {stats.colorDiversity}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Colors</p>
              </div>
              <div className="empty-state" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #ec4899, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {stats.typeDiversity}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Types</p>
              </div>
            </div>
          </div>
        )}

        {/* Suggestions Section */}
        {suggestions.length > 0 && (
          <div style={{ marginTop: '3rem', background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>
              <Sparkles size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
              AI Suggestions
            </h3>
            {suggestions.map((suggestion, idx) => (
              <div key={idx} style={{ padding: '1rem', background: '#f9fafb', borderLeft: '4px solid #ec4899', borderRadius: '0.5rem', marginBottom: '0.75rem', fontSize: '0.95rem', color: '#374151' }}>
                {suggestion}
              </div>
            ))}
          </div>
        )}

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ marginRight: '1rem', fontWeight: '600' }}>Filter by Season:</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
              >
                <option value="All Season">All Season</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
              </select>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Outfit Recommendations
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {recommendations.map((outfit) => (
                <div key={outfit.id} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {outfit.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} style={{ flex: 1, minWidth: '80px' }}>
                        <img
                          src={item.image}
                          alt={item.tags.type}
                          style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '0.5rem' }}
                        />
                        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'center', fontWeight: '600' }}>
                          {item.tags.type}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {outfit.items.map((item, idx) => (
                      <span key={idx} style={{ fontSize: '0.75rem', background: '#fce7f3', color: '#be185d', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: '600' }}>
                        {item.tags.color}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f0fdf4', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#15803d' }}>
                      Score: {outfit.score}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendationPage;