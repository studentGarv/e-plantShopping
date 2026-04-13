// src/components/LandingPage.jsx
/**
 * Landing page — first view the user sees.
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */
export default function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-page" role="main">
      <div className="landing-overlay" />
      <div className="landing-content">
        <h1 className="landing-title">Paradise Nursery</h1>
        <p className="landing-description">
          Bring nature indoors. At Paradise Nursery we curate the world's most
          beautiful houseplants — handpicked for air quality, fragrance, and
          effortless care. Whether you're a seasoned plant parent or just
          getting started, your perfect green companion is waiting.
        </p>
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
