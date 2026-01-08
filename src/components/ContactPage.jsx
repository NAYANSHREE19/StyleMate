import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare } from "lucide-react";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
      
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            Have questions or feedback? We'd love to hear from you.
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-card">
            {submitSuccess && (
              <div className="contact-success-alert">
                <CheckCircle className="success-icon" />
                <div className="success-content">
                  <h3>Message Sent!</h3>
                  <p>Thank you for contacting us. We'll respond within 24 hours.</p>
                </div>
              </div>
            )}

            <div className="contact-form-group">
              <label htmlFor="name" className="contact-label">
                <User size={18} className="label-icon" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`contact-input ${
                  errors.name && touched.name ? "error" : ""
                }`}
                placeholder="John Doe"
              />
              {errors.name && touched.name && (
                <span className="contact-error-message">
                  <AlertCircle size={14} /> {errors.name}
                </span>
              )}
            </div>

            <div className="contact-form-group">
              <label htmlFor="email" className="contact-label">
                <Mail size={18} className="label-icon" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`contact-input ${
                  errors.email && touched.email ? "error" : ""
                }`}
                placeholder="john.doe@example.com"
              />
              {errors.email && touched.email && (
                <span className="contact-error-message">
                  <AlertCircle size={14} /> {errors.email}
                </span>
              )}
            </div>

            <div className="contact-form-group">
              <label htmlFor="message" className="contact-label">
                <MessageSquare size={18} className="label-icon" />
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`contact-textarea ${
                  errors.message && touched.message ? "error" : ""
                }`}
                placeholder="Tell us what's on your mind..."
                rows="6"
              />
              <div className="char-count">
                {formData.message.length} characters
                {formData.message.length > 0 && formData.message.length < 10 && 
                  " (minimum 10 required)"}
              </div>
              {errors.message && touched.message && (
                <span className="contact-error-message">
                  <AlertCircle size={14} /> {errors.message}
                </span>
              )}
            </div>

            {errors.submit && (
              <div className="contact-submit-error">
                <AlertCircle size={18} />
                {errors.submit}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="contact-submit-button"
            >
              {isLoading ? (
                <>
                  <span className="button-spinner" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </div>

          <div className="contact-sidebar">
            <div className="contact-info-card">
              <h3 className="info-title">Other Ways to Reach Us</h3>
              
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div className="info-details">
                  <h4>Email</h4>
                  <a href="mailto:support@stylemate.com" className="info-link">
                    support@stylemate.com
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📱</div>
                <div className="info-details">
                  <h4>Phone</h4>
                  <a href="tel:+1234567890" className="info-link">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">🕐</div>
                <div className="info-details">
                  <h4>Business Hours</h4>
                  <p className="info-text">Mon - Fri: 9AM - 6PM EST</p>
                </div>
              </div>
            </div>

            <div className="contact-faq-card">
              <h3 className="faq-title">Quick Questions?</h3>
              <p className="faq-text">
                Check out our FAQ section for instant answers to common questions.
              </p>
              <button 
                onClick={() => window.location.href = '/faq'}
                className="faq-button"
              >
                Visit FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;