import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import MapSection from "./components/MapSection/MapSection";
import FilterBar from "./components/FilterBar/FilterBar";
import EventList from "./components/EventList/EventList";
import StatsModule from "./components/StatsModule/StatsModule";
import BottomNav from "./components/BottomNav/BottomNav";
import ReportShakingButton from "./components/ReportShakingButton/ReportShakingButton";
import { useState } from "react";
import EventCardSkeleton from "./components/EventCardSkeleton/EventCardSkeleton";
import { useEarthquakes } from "./hooks/useEarthquakes";

function App() {
  const [magnitudeFilter, setMagnitudeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [timeframe, setTimeframe] = useState("day");
  const [visibleCount, setVisibleCount] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  const { earthquakes, isLoading, error } = useEarthquakes(timeframe);

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
