import "./BottomNav.css";

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <a href="#" className="bottom-nav__item">
        <span className="material-symbols-outlined">map</span>
        <span className="bottom-nav__label">Map</span>
      </a>
      <a href="#" className="bottom-nav__item bottom-nav__item--active">
        <span className="material-symbols-outlined">list</span>
        <span className="bottom-nav__label">List</span>
      </a>
      <a href="#" className="bottom-nav__item">
        <span className="material-symbols-outlined">notifications</span>
        <span className="bottom-nav__label">Alerts</span>
      </a>
      <a href="#" className="bottom-nav__item">
        <span className="material-symbols-outlined">person</span>
        <span className="bottom-nav__label">Profile</span>
      </a>
    </nav>
  );
}

export default BottomNav;
