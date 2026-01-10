import React from "react";
import "./parallax.css"; // custom CSS

export default function ParallaxShowcase() {
  return (
    <section className="w-full">

      {/* PARALLAX SECTION 1 */}
      <div className="parallax bg-car1">
        <div className="overlay">
          <h1 className="title">Drive Beyond Limits</h1>
          <p className="subtitle">Experience Luxury Performance</p>
        </div>
      </div>

      {/* PARALLAX SECTION 2 */}
      <div className="content-section">
        <h2 className="section-heading">Precision. Power. Perfection.</h2>
        <p className="section-text">
          Discover next-gen automotive intelligence designed to evolve your driving lifestyle.
        </p>
      </div>

      <div className="parallax bg-car2">
        <div className="overlay">
          <h1 className="title">Unmatched Comfort</h1>
          <p className="subtitle">Where Design Meets Innovation</p>
        </div>
      </div>

      {/* PARALLAX SECTION 3 */}
      <div className="content-section">
        <h2 className="section-heading">Drive Smarter with Drivana</h2>
        <p className="section-text">
          Compare, explore, and understand cars like never before.
        </p>
      </div>

      <div className="parallax bg-car3">
        <div className="overlay">
          <h1 className="title">Feel the Power</h1>
          <p className="subtitle">Luxury Reimagined</p>
        </div>
      </div>

    </section>
  );
}
