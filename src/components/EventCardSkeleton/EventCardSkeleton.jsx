import "./EventCardSkeleton.css";

function EventCardSkeleton() {
  return (
    <div className="event-skeleton">
      <div className="event-skeleton__main">
        <div className="event-skeleton__text">
          <div className="event-skeleton__line event-skeleton__line--title"></div>
          <div className="event-skeleton__line event-skeleton__line--subtitle"></div>
        </div>
        <div className="event-skeleton__badge"></div>
      </div>
      <div className="event-skeleton__footer">
        <div className="event-skeleton__block"></div>
        <div className="event-skeleton__block"></div>
      </div>
    </div>
  );
}

export default EventCardSkeleton;
