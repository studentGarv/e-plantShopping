// src/components/LandingPage.jsx
/**
 * Landing page — first view the user sees.
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */
import AboutUs from "./AboutUs";

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-page" role="main">
      <div className="landing-overlay" />
      <div className="landing-content">
        <h1 className="landing-title">Paradise Nursery</h1>
        <AboutUs />
        <button
          id="get-started-btn"
          className="btn btn-primary landing-cta"
          onClick={onGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
