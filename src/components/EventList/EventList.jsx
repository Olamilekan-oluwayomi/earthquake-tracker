import EventCard from "../EventCard/EventCard";
import "./EventList.css";

function EventList({ earthquakes }) {
  return (
    <div className="event-list">
      {earthquakes.map((eq) => (
        <EventCard key={eq.id} {...eq} />
      ))}
    </div>
  );
}

export default EventList;
