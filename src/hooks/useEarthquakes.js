import { useState, useEffect } from "react";

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

export function useEarthquakes(timeframe) {
  const [earthquakes, setEarthquakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { earthquakes, isLoading, error };
}
