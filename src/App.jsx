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

  useEffect(function () {
    async function fetchEarthquake() {
      try {
        const res = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
        );

        if (!res.ok) throw new Error("Data fetching went wrong");

        const data = await res.json();

        setEarthquakes((data.features || []).map(transformEarthquake));
      } catch (error) {
        console.error(error);
      }
    }

    fetchEarthquake();
  }, []);

  const filteredEarthquakes = earthquakes.filter((eq) => {
    if (magnitudeFilter === "all") return true;
    if (magnitudeFilter === "significant") return eq.sig >= 600;
    return eq.magnitude >= Number(magnitudeFilter);
  });

  const sortedEarthquakes = filteredEarthquakes.slice().sort((a, b) => {
    if (sortBy === "recent") return b.time - a.time;
    if (sortBy === "strongest") return b.magnitude - a.magnitude;
  });

  function handleMagnitudeFilter(value) {
    setMagnitudeFilter(value);
  }

  function handleSortBy(value) {
    setSortBy(value);
  }

  return (
    <div className="app">
      <Header />
      <div className="app__layout">
        <Sidebar
          onMagnitudeFilter={handleMagnitudeFilter}
          magnitudeFilter={magnitudeFilter}
          onSortBy={handleSortBy}
          sortBy={sortBy}
        />
        <main className="app__main">
          <MapSection />
          <FilterBar
            onMagnitudeFilter={handleMagnitudeFilter}
            magnitudeFilter={magnitudeFilter}
            onSortBy={handleSortBy}
            sortBy={sortBy}
            eventCount={sortedEarthquakes.length}
          />
          <div className="app__section-heading">
            <h2 className="app__section-title">Recent Seismic Events</h2>
            <p className="app__section-subtitle">
              Found {sortedEarthquakes.length} earthquakes in the last 24 hours
            </p>
          </div>
          <EventList earthquakes={sortedEarthquakes} />
          <StatsModule />
        </main>
      </div>
      <BottomNav />
      <ReportShakingButton />
    </div>
  );
}

export default App;
