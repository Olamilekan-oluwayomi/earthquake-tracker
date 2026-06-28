import "./Sidebar.css";

function Sidebar({
  onMagnitudeFilter,
  magnitudeFilter,
  onSortBy,
  sortBy,
  timeframe,
  onTimeframeChange,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar__content">
        <div className="sidebar__section">
          <label className="sidebar__label">Magnitude Range</label>
          <div className="sidebar__magnitude-grid">
            <button
              className={`filter-bar__pill ${magnitudeFilter === "all" ? "filter-bar__pill--active" : ""}`}
            >
              All
            </button>
            <button
              className={`filter-bar__pill ${magnitudeFilter === "2.5" ? "filter-bar__pill--active" : ""}`}
              onClick={() => onMagnitudeFilter("2.5")}
            >
              2.5+
            </button>
            <button
              className={`filter-bar__pill ${magnitudeFilter === "4.5" ? "filter-bar__pill--active" : ""}`}
              onClick={() => onMagnitudeFilter("4.5")}
            >
              4.5+
            </button>
            <button
              className={`filter-bar__pill ${magnitudeFilter === "6.0" ? "filter-bar__pill--active" : ""}`}
              onClick={() => onMagnitudeFilter("6.0")}
            >
              6.0+
            </button>
          </div>
        </div>

        <div className="sidebar__section">
          <label className="sidebar__label">Timeframe</label>
          <select
            className="sidebar__select"
            value={timeframe}
            onChange={(e) => onTimeframeChange(e.target.value)}
          >
            <option value="hour">Past Hour</option>
            <option value="day">Past Day</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </select>
        </div>

        <div className="sidebar__section sidebar__section--row">
          <label className="sidebar__label">Sort By</label>
          <div className="sidebar__sort-toggle">
            <button
              className={`sidebar__sort-btn  ${sortBy === "recent" ? "sidebar__sort-btn--active" : ""}`}
              onClick={() => onSortBy("recent")}
            >
              Recent
            </button>
            <button
              className={`sidebar__sort-btn  ${sortBy === "strongest" ? "sidebar__sort-btn--active" : ""}`}
              onClick={() => onSortBy("strongest")}
            >
              Strongest
            </button>
          </div>
        </div>

        <div className="sidebar__nav-section">
          <h3 className="sidebar__nav-title">Quick Navigation</h3>
          <nav className="sidebar__nav">
            <a href="#" className="sidebar__nav-link sidebar__nav-link--active">
              <span className="material-symbols-outlined">map</span>
              <span>Map View</span>
            </a>
            <a href="#" className="sidebar__nav-link">
              <span className="material-symbols-outlined">list</span>
              <span>Global List</span>
            </a>
            <a href="#" className="sidebar__nav-link">
              <span className="material-symbols-outlined">warning</span>
              <span>Significant</span>
            </a>
            <a href="#" className="sidebar__nav-link">
              <span className="material-symbols-outlined">tsunami</span>
              <span>Tsunami</span>
            </a>
          </nav>
        </div>

        <button className="sidebar__report-btn">
          <span className="material-symbols-outlined">campaign</span>
          Report Shaking
        </button>
      </div>

      <div className="sidebar__footer">
        <a href="#" className="sidebar__footer-link">
          <span className="material-symbols-outlined">help</span>
          <span>Help</span>
        </a>
        <a href="#" className="sidebar__footer-link">
          <span className="material-symbols-outlined">shield</span>
          <span>Privacy</span>
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
