import "./MapSection.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef, useState } from "react";
import L from "leaflet";

function getMarkerIcon(magnitude) {
  if (magnitude === null) {
    return L.divIcon({
      className: "",
      html: `<div style="width:14px; height:14px; background:var(--color-on-surface-variant); opacity:0.5; border-radius:50%; border:2px solid rgba(255,255,255,0.4);"></div>`,
      iconSize: [14, 14],
    });
  }

  let color = "var(--color-primary)"; // minor
  let size = 16;

  if (magnitude >= 6.0) {
    color = "var(--color-secondary)"; // major
    size = 28;
  } else if (magnitude >= 4.5) {
    color = "var(--color-tertiary)"; // moderate
    size = 22;
  }

  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px; height:${size}px; background:${color}; border-radius:50%; border:2px solid rgba(255,255,255,0.6); box-shadow: 0 0 6px ${color};"></div>`,
    iconSize: [size, size],
  });
}

function MapSection({ earthquakes }) {
  const mapRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("street");

  return (
    <section className="map-section">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="map-section__image"
        scrollWheelZoom={false}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer
          url={
            mapStyle === "street"
              ? `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
              : `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`
          }
          attribution={
            mapStyle === "street"
              ? `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
              : `&copy; OpenStreetMap contributors &copy; CARTO`
          }
        />

        {earthquakes.map((eq) => (
          <Marker
            key={eq.id}
            position={[eq.latitude, eq.longitude]}
            icon={getMarkerIcon(eq.magnitude)}
          >
            <Popup>
              <div className="map-section__popup">
                <strong>{eq.place}</strong>
                <p>
                  Magnitude:{" "}
                  {eq.magnitude === null ? "N/A" : eq.magnitude.toFixed(1)}
                </p>
                <p>{eq.formattedTime}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Mobile only: layers + locate, top-right */}
      <div className="map-section__controls map-section__controls--mobile">
        <button className="map-section__control-btn">
          <span
            className="material-symbols-outlined"
            onClick={() =>
              setMapStyle(mapStyle === "street" ? "dark" : "street")
            }
          >
            layers
          </span>
        </button>
        <button className="map-section__control-btn">
          <span
            className="material-symbols-outlined"
            onClick={() =>
              mapRef.current.locate({ setView: true, maxZoom: 10 })
            }
          >
            my_location
          </span>
        </button>
      </div>

      {/* Desktop only: zoom controls, bottom-right */}
      <div className="map-section__controls map-section__controls--desktop">
        <button className="map-section__control-btn">
          <span
            className="material-symbols-outlined"
            onClick={() => mapRef.current.zoomIn()}
          >
            add
          </span>
        </button>
        <button className="map-section__control-btn">
          <span
            className="material-symbols-outlined"
            onClick={() => mapRef.current.zoomOut()}
          >
            remove
          </span>
        </button>
        <button className="map-section__control-btn">
          <span
            className="material-symbols-outlined"
            onClick={() =>
              mapRef.current.locate({ setView: true, maxZoom: 10 })
            }
          >
            my_location
          </span>
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
      {/* <div className="map-section__marker">
        <span className="map-section__marker-label">6.4</span>
      </div> */}

      {/* Mobile only: bottom fade into page */}
      <div className="map-section__fade" />
    </section>
  );
}

export default MapSection;
