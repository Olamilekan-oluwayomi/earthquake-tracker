# 🌍 Earthquake Tracker

A live, responsive earthquake tracking dashboard built with React + Vite, pulling real-time seismic data directly from the USGS Earthquake API. Built as a practice project to work through data fetching, derived state, and responsive design patterns in React.

## ✨ Features

- **Live data** — fetches real earthquake data from the [USGS Earthquake Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/), no API key required
- **Fully responsive** — distinct, purpose-built layouts for mobile and desktop, not just scaled versions of each other (e.g. a horizontal filter bar on mobile vs. a persistent sidebar on desktop)
- **Filtering** — by magnitude range (All / 2.5+ / 4.5+ / 6.0+) and by USGS's real "significant" event score
- **Sorting** — Most Recent or Strongest, synced across both the mobile and desktop controls
- **Region search** — filter events by location name, available on both breakpoints
- **Timeframe selection** — Past Hour / Day / Week / Month, each pulling from a different live USGS feed
- **Pagination** — "Load More" to safely handle large datasets (a full month's feed can include 10,000+ events)
- **Loading, error, and empty states** — skeleton cards while fetching, a friendly message on fetch failure, and a clear "no results" state for narrow filters
- **Interactive map** — built with `react-leaflet`, featuring:
  - Custom color-coded circle markers (sized and colored by magnitude tier)
  - Click-to-view popups with event details
  - Toggleable light/dark map styles
  - Custom zoom and "locate me" controls wired directly to the Leaflet map instance

## 🛠️ Tech Stack

- **React** (Vite)
- **react-leaflet** + **Leaflet** for the interactive map
- Plain CSS with custom properties (design tokens) — no CSS framework
- **USGS GeoJSON Earthquake Feed** as the live data source

## 🚀 Getting Started

\`\`\`bash
git clone https://github.com/Olamilekan-oluwayomi/earthquake-tracker.git
cd earthquake-tracker
npm install
npm run dev
\`\`\`

The app will be available at \`http://localhost:5173\`.

## 📁 Project Structure

\`\`\`
src/
  components/
    Header/
    Sidebar/
    MapSection/
    FilterBar/
    EventList/
    EventCard/
    EventCardSkeleton/
    StatsModule/
    BottomNav/
    ReportShakingButton/
  App.jsx       # state, data fetching, filtering/sorting logic
  App.css
  index.css     # design tokens (colors, spacing, typography)
\`\`\`

## 🌐 Data Source

All earthquake data comes from the public [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/feed/) GeoJSON feeds — no authentication or API key needed. Feed endpoint changes dynamically based on the selected timeframe (\`all_hour.geojson\`, \`all_day.geojson\`, \`all_week.geojson\`, \`all_month.geojson\`).

## 📌 Possible Future Improvements

- Pull live stats (Significant / Avg Magnitude / Global Alerts) over a rolling window rather than the full fetched dataset
- Wire up the "Report Shaking" button to an actual submission flow
- Add clustering for markers at low zoom levels, given dense regions like the Pacific Ring of Fire

## 📄 License

Personal practice project — free to use or adapt.
