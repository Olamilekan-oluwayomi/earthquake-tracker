import "./ReportShakingButton.css";

function ReportShakingButton() {
  return (
    <button className="report-fab">
      <span className="material-symbols-outlined report-fab__icon">
        sensors
      </span>
      <span className="report-fab__label">Report Shaking</span>
    </button>
  );
}

export default ReportShakingButton;
