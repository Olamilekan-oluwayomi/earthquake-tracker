import "./EventCard.css";

function getMagnitudeTier(magnitude) {
  if (magnitude >= 6.0) return "major";
  if (magnitude >= 4.5) return "moderate";
  return "minor";
}

function getTierLabel(tier) {
  if (tier === "major") return "Significant";
  if (tier === "moderate") return "Moderate";
  return "Minor";
}

function EventCard({
  place,
  magnitude,
  formattedTime,
  depth,
  tsunami,
  status,
}) {
  const tier = getMagnitudeTier(magnitude);

  return (
    <div className={`event-card event-card--${tier}`}>
      <div className="event-card__main">
        <div className="event-card__badge">
          <span className="event-card__badge-value">
            {magnitude === null ? "N/A" : magnitude.toFixed(1)}
          </span>
          <span className="event-card__badge-label">{getTierLabel(tier)}</span>
        </div>

        <div className="event-card__info">
          <h3 className="event-card__title">{place}</h3>
          <div className="event-card__meta">
            <span className="event-card__meta-item">
              <span className="material-symbols-outlined event-card__meta-icon">
                schedule
              </span>
              {formattedTime}
            </span>
            <span className="event-card__meta-item event-card__meta-item--mobile">
              <span className="material-symbols-outlined event-card__meta-icon">
                straighten
              </span>
              {depth} km depth
            </span>
          </div>
        </div>

        {tsunami && (
          <span className="material-symbols-outlined event-card__warning-icon">
            warning
          </span>
        )}
      </div>

      {tsunami && (
        <div className="event-card__tsunami-banner">
          <span className="event-card__tsunami-text">
            <span className="event-card__tsunami-dot"></span>
            Tsunami Warning Active
          </span>
          <span className="material-symbols-outlined event-card__tsunami-chevron">
            chevron_right
          </span>
        </div>
      )}

      <div className="event-card__footer">
        <div className="event-card__footer-item">
          <span className="event-card__footer-label">Depth</span>
          <span className="event-card__footer-value">{depth} km</span>
        </div>
        <div className="event-card__footer-item">
          <span className="event-card__footer-label">Status</span>
          <span className="event-card__footer-value">
            <span className="event-card__status-dot"></span>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
