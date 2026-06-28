import "./Header.css";

function Header({ searchTerm, onSearchTerm }) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="material-symbols-outlined header__logo-icon">
          public
        </span>

        <div className="header__brand-text">
          <h1 className="header__title">Earthquake Tracker</h1>
          <p className="header__subtitle">
            Live seismic activity, powered by USGS
          </p>
        </div>
      </div>

      <nav className="header__nav">
        <a href="#" className="header__nav-link header__nav-link--active">
          Live Map
        </a>
        <a href="#" className="header__nav-link ">
          Recent Events
        </a>
        <a href="#" className="header__nav-link ">
          Analytics
        </a>
        <a href="#" className="header__nav-link ">
          Alerts
        </a>
      </nav>

      <div className="header__actions">
        <div className="header__search">
          <span className="material-symbols-outlined header__search-icon">
            search
          </span>
          <input
            type="text"
            className="header__search-input"
            placeholder="Search region..."
            value={searchTerm}
            onChange={(e) => onSearchTerm(e.target.value)}
          />
        </div>
        <button className="header__icon-btn">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="header__icon-btn">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="header__avatar">
          <span className="material-symbols-outlined">person</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
