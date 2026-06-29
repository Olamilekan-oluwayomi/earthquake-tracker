import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import MapSection from "./components/MapSection/MapSection";
import FilterBar from "./components/FilterBar/FilterBar";
import EventList from "./components/EventList/EventList";
import StatsModule from "./components/StatsModule/StatsModule";
import BottomNav from "./components/BottomNav/BottomNav";
import ReportShakingButton from "./components/ReportShakingButton/ReportShakingButton";
import { useEffect, useState } from "react";
import EventCardSkeleton from "./components/EventCardSkeleton/EventCardSkeleton";

function formatTimeAgo(timestamp) {
  const diffMs = Date.now() - timestamp;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 24) return `${diffMins} mins ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function transformEarthquake(feature) {
  return {
    id: feature.id,
    place: feature.properties.place,
    magnitude: feature.properties.mag,
    time: feature.properties.time,
    formattedTime: formatTimeAgo(feature.properties.time),
    longitude: feature.geometry.coordinates[0],
    latitude: feature.geometry.coordinates[1],
    depth: feature.geometry.coordinates[2].toFixed(1),
    tsunami: feature.properties.tsunami === 1,
    status: feature.properties.status,
    sig: feature.properties.sig,
    alert: feature.properties.alert,
  };
}

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [magnitudeFilter, setMagnitudeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [timeframe, setTimeframe] = useState("day");
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchEarthquake() {
        try {
          setIsLoading(true);
          setError(null);
          const res = await fetch(
            `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${timeframe}.geojson`,
            { signal: controller.signal },
          );

          if (!res.ok) throw new Error("Data fetching went wrong");

          const data = await res.json();

          setEarthquakes((data.features || []).map(transformEarthquake));
          setError(null);
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err);
            setError(err.message);
            setIsLoading(false);
          }
        }
      }

      fetchEarthquake();

      return function () {
        controller.abort();
      };
    },
    [timeframe],
  );

  const filteredEarthquakes = earthquakes.filter((eq) => {
    const matchesSearch =
      searchTerm === "" ||
      eq.place.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMagnitude = (() => {
      if (magnitudeFilter === "all") return true;
      if (magnitudeFilter === "significant") return eq.sig >= 600;
      return eq.magnitude >= Number(magnitudeFilter);
    })();

    return matchesSearch && matchesMagnitude;
  });

  const sortedEarthquakes = filteredEarthquakes.slice().sort((a, b) => {
    if (sortBy === "recent") return b.time - a.time;
    if (sortBy === "strongest") return b.magnitude - a.magnitude;
  });

  const visibleEarthquakes = sortedEarthquakes.slice(0, visibleCount);

  function handleMagnitudeFilter(value) {
    setMagnitudeFilter(value);
  }
  function handleSortBy(value) {
    setSortBy(value);
  }
  function handleTimeframeChange(value) {
    setTimeframe(value);
  }
  function handleLoadMore() {
    setVisibleCount((prev) => prev + 30);
  }
  function handleSearchTerm(value) {
    setSearchTerm(value);
  }

  const avgMagnitude =
    earthquakes.length === 0
      ? 0
      : (
          earthquakes.reduce((acc, eq) => acc + eq.magnitude, 0) /
          earthquakes.length
        ).toFixed(1);
  const significantCount = earthquakes.filter((eq) => eq.sig >= 600).length;
  const globalAlertsCount = earthquakes.filter(
    (eq) => eq.alert !== null,
  ).length;

  return (
    <div className="app">
      <Header searchTerm={searchTerm} onSearchTerm={handleSearchTerm} />
      <div className="app__layout">
        <Sidebar
          onMagnitudeFilter={handleMagnitudeFilter}
          magnitudeFilter={magnitudeFilter}
          onSortBy={handleSortBy}
          sortBy={sortBy}
          timeframe={timeframe}
          onTimeframeChange={handleTimeframeChange}
        />
        <main className="app__main">
          <MapSection earthquakes={sortedEarthquakes} />
          <FilterBar
            onMagnitudeFilter={handleMagnitudeFilter}
            magnitudeFilter={magnitudeFilter}
            onSortBy={handleSortBy}
            sortBy={sortBy}
            eventCount={sortedEarthquakes.length}
            searchTerm={searchTerm}
            onSearchTerm={handleSearchTerm}
          />
          <div className="app__section-heading">
            <h2 className="app__section-title">Recent Seismic Events</h2>
            <p className="app__section-subtitle">
              Found {sortedEarthquakes.length} earthquakes in the Past{" "}
              {timeframe}s
            </p>
          </div>

          <div className="event-list">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
          </div>
          {!error && !isLoading && (
            <EventList
              earthquakes={visibleEarthquakes}
              onLoadMore={handleLoadMore}
              sortedEarthquakes={sortedEarthquakes}
            />
          )}
          {error && (
            <div className="app__error">
              <span className="material-symbols-outlined app__error-icon">
                error
              </span>
              <p className="app__error-title">Couldn't load earthquake data</p>
              <p className="app__error-message">{error}</p>
            </div>
          )}
          <StatsModule
            avgMagnitude={avgMagnitude}
            significantCount={significantCount}
            globalAlertsCount={globalAlertsCount}
          />
        </main>
      </div>
      <BottomNav />
      <ReportShakingButton />
    </div>
  );
}

export default App;
