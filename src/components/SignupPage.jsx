import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import "./SignupPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Signup data:", formData);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setErrors({ submit: "Signup failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const levels = [
      { strength: 1, text: "Very Weak", color: "#EF4444" },
      { strength: 2, text: "Weak", color: "#F59E0B" },
      { strength: 3, text: "Fair", color: "#EAB308" },
      { strength: 4, text: "Good", color: "#10B981" },
      { strength: 5, text: "Strong", color: "#059669" },
    ];

    return levels[strength - 1] || levels[0];
  };

  const passwordStrength = getPasswordStrength();

  if (submitSuccess) {
    return (
      <div className="signup-page">
        <div className="signup-container">
          <div className="success-card">
            <CheckCircle className="success-icon" />
            <h2 className="success-title">Account Created Successfully!</h2>
            <p className="success-text">
              Redirecting you to login page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Create Your Account</h2>
          <p className="signup-subtitle">
            Join StyleMate and discover your perfect fashion style
          </p>

          <div className="signup-form">
            {/* Name Fields */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                  placeholder="John"
                />
                {errors.firstName && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.firstName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <span className="error-message">
                  <AlertCircle size={14} /> {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-button"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className="strength-fill"
                      style={{
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                        backgroundColor: passwordStrength.color,
                      }}
                    />
                  </div>
                  <span 
                    className="strength-text" 
                    style={{ color: passwordStrength.color }}
                  >
                    {passwordStrength.text}
                  </span>
                </div>
              )}
              {errors.password && (
                <span className="error-message">
                  <AlertCircle size={14} /> {errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "error" : ""}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="eye-button"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">
                  <AlertCircle size={14} /> {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <label htmlFor="acceptTerms" className="checkbox-label">
                I agree to the{" "}
                <a href="/terms">Terms and Conditions</a>{" "}
                and{" "}
                <a href="/privacy">Privacy Policy</a>
              </label>
            </div>
            {errors.acceptTerms && (
              <span className="error-message">
                <AlertCircle size={14} /> {errors.acceptTerms}
              </span>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? (
                <span className="spinner" />
              ) : (
                "Create Account"
              )}
            </button>

            {errors.submit && (
              <div className="submit-error">
                <AlertCircle size={16} /> {errors.submit}
              </div>
            )}
          </div>

          <p className="login-link">
            Already have an account?{" "}
            <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;