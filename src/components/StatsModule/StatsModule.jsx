import "./StatsModule.css";

function StatsModule() {
  return (
    <div className="stats-module">
      <div className="stats-module__card">
        <div className="stats-module__icon stats-module__icon--major">
          <span className="material-symbols-outlined">warning</span>
        </div>
        <div className="stats-module__text">
          <span className="stats-module__label">Significant (24h)</span>
          <span className="stats-module__value">3</span>
        </div>
      </div>

      <div className="stats-module__card">
        <div className="stats-module__icon stats-module__icon--minor">
          <span className="material-symbols-outlined">show_chart</span>
        </div>
        <div className="stats-module__text">
          <span className="stats-module__label">Avg Magnitude</span>
          <span className="stats-module__value">3.4</span>
        </div>
      </div>

      <div className="stats-module__card">
        <div className="stats-module__icon stats-module__icon--moderate">
          <span className="material-symbols-outlined">bar_chart</span>
        </div>
        <div className="stats-module__text">
          <span className="stats-module__label">Global Alerts</span>
          <span className="stats-module__value">12</span>
        </div>
      </div>
    </div>
  );
}

export default StatsModule;
