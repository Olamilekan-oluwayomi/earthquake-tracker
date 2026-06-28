import "./MapSection.css";

function MapSection() {
  return (
    <section className="map-section">
      <div className="map-section__image" />

      {/* Mobile only: layers + locate, top-right */}
      <div className="map-section__controls map-section__controls--mobile">
        <button className="map-section__control-btn">
          <span className="material-symbols-outlined">layers</span>
        </button>
        <button className="map-section__control-btn">
          <span className="material-symbols-outlined">my_location</span>
        </button>
      </div>

      {/* Desktop only: zoom controls, bottom-right */}
      <div className="map-section__controls map-section__controls--desktop">
        <button className="map-section__control-btn">
          <span className="material-symbols-outlined">add</span>
        </button>
        <button className="map-section__control-btn">
          <span className="material-symbols-outlined">remove</span>
        </button>
        <button className="map-section__control-btn">
          <span className="material-symbols-outlined">my_location</span>
        </button>
      </div>

      {/* Desktop only: legend, top-left */}
      <div className="map-section__legend">
        <div className="map-section__legend-item">
          <span className="map-section__legend-dot map-section__legend-dot--minor"></span>
          <span>Minor</span>
        </div>
        <div className="map-section__legend-item">
          <span className="map-section__legend-dot map-section__legend-dot--moderate"></span>
          <span>Moderate</span>
        </div>
        <div className="map-section__legend-item">
          <span className="map-section__legend-dot map-section__legend-dot--strong"></span>
          <span>Strong</span>
        </div>
      </div>

      {/* Mobile only: example marker */}
      <div className="map-section__marker">
        <span className="map-section__marker-label">6.4</span>
      </div>

      {/* Mobile only: bottom fade into page */}
      <div className="map-section__fade" />
    </section>
  );
}

export default MapSection;
