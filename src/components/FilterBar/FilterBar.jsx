import { useEffect, useRef } from "react";
import "./FilterBar.css";

function FilterBar({
  onMagnitudeFilter,
  magnitudeFilter,
  onSortBy,
  sortBy,
  eventCount,
  searchTerm,
  onSearchTerm,
}) {
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  });

  return (
    <div className="filter-bar">
      <div className="filter-bar__search">
        <span className="material-symbols-outlined filter-bar__search-icon">
          search
        </span>
        <input
          type="text"
          className="filter-bar__search-input"
          placeholder="Search region..."
          value={searchTerm}
          onChange={(e) => onSearchTerm(e.target.value)}
          ref={inputEl}
        />
      </div>

      <div className="filter-bar__pills">
        <button
          className={`filter-bar__pill ${magnitudeFilter === "all" ? "filter-bar__pill--active" : ""}`}
          onClick={() => onMagnitudeFilter("all")}
        >
          All Magnitudes
        </button>
        <button
          className={`filter-bar__pill ${magnitudeFilter === "4.5" ? "filter-bar__pill--active" : ""}`}
          onClick={() => onMagnitudeFilter("4.5")}
        >
          4.5+ Mag
        </button>
        <button
          className={`filter-bar__pill ${magnitudeFilter === "6.0" ? "filter-bar__pill--active" : ""}`}
          onClick={() => onMagnitudeFilter("6.0")}
        >
          6.0+ Mag
        </button>
        <button
          className={`filter-bar__pill ${magnitudeFilter === "significant" ? "filter-bar__pill--active" : ""}`}
          onClick={() => onMagnitudeFilter("significant")}
        >
          Significant
        </button>
      </div>

      <div className="filter-bar__meta">
        <span className="filter-bar__count">{`${eventCount} events in the last 24h`}</span>
        <div
          className="filter-bar__sort"
          onClick={() =>
            sortBy === "recent" ? onSortBy("strongest") : onSortBy("recent")
          }
        >
          <span className="material-symbols-outlined filter-bar__sort-icon">
            sort
          </span>
          <span>{sortBy === "recent" ? "Most Recent" : "Strongest"}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
