import EventCard from "../EventCard/EventCard";
import "./EventList.css";

function EventList({ earthquakes, sortedEarthquakes, onLoadMore }) {
  if (earthquakes.length === 0)
    return (
      <div className="event-list__empty">
        <div className="event-list__empty-icon-wrap">
          <span className="material-symbols-outlined event-list__empty-icon">
            search_off
          </span>
        </div>
        <h3 className="event-list__empty-title">No earthquakes found</h3>
        <p className="event-list__empty-message">
          Try adjusting your filters or magnitude range to see more seismic
          activity from this region.
        </p>
      </div>
    );

  return (
    <>
      <div className="event-list">
        {earthquakes.map((eq) => (
          <EventCard key={eq.id} {...eq} />
        ))}
      </div>

      <button
        className="event-list__load-more"
        onClick={onLoadMore}
        disabled={earthquakes.length === sortedEarthquakes.length}
      >
        Load More
      </button>
    </>
  );
}

export default EventList;
